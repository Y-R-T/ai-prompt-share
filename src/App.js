// frontend/src/App.js
// 版本: V53
// 修改目的: 移除未使用的 navigate 变量以解决 ESLint 警告，使其能通过 CI 构建。
// 修改内容: 注释掉或删除 useNavigate 的导入和 navigate 常量的初始化。

import React, { useState, useEffect, useCallback } from 'react';
// 【V53 修改】如果 navigate 确实未使用，则移除 useNavigate 导入
import { BrowserRouter as Router, useLocation /*, useNavigate */ } from 'react-router-dom'; 
import { Helmet, HelmetProvider } from 'react-helmet-async'; 

import { getPageLayout, getPromptDetails } from './services/api';
import { getComponent } from './utils/componentRegistry';
import PromptDetailModal from './components/prompts/PromptDetailModal';
import GlobalSpinner from './components/common/GlobalSpinner';

function MainApp() {
  const [pageLayout, setPageLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPromptData, setModalPromptData] = useState(null);
  
  const location = useLocation(); 
  // 【V53 修改】如果 navigate 确实未使用，则注释或删除此行
  // const navigate = useNavigate(); 

  const handleOpenPromptDetail = useCallback(async (promptId) => {
    try {
      setModalPromptData(null); 
      setIsModalOpen(true);
      const promptData = await getPromptDetails(promptId);
      setModalPromptData(promptData);
    } catch (err) {
      console.error("Failed to load prompt details for modal:", err);
      setModalPromptData({ error: "无法加载Prompt详情。" });
    }
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setModalPromptData(null);
  }, []);

  const fetchLayout = useCallback(async (searchParams) => {
    setLoading(true);
    setError(null);
    try {
      const layoutData = await getPageLayout(searchParams);
      setPageLayout(layoutData);
      if (layoutData.pageTitle) {
        document.title = layoutData.pageTitle;
      }
    } catch (err) {
      console.error("Error fetching page layout:", err);
      setError(err.message || "加载页面布局失败，请稍后重试。");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryParams = {};
    for (const [key, value] of params.entries()) {
      queryParams[key] = value;
    }
    fetchLayout(queryParams);
  }, [location.search, fetchLayout]); 

  const renderDynamicComponent = (config, key, passThroughProps = {}) => {
    if (!config || !config.component) return null;
    const ComponentToRender = getComponent(config.component);
    // Pass openPromptDetail down so child components can trigger the modal
    const combinedProps = { ...config.props, ...passThroughProps, openPromptDetail: handleOpenPromptDetail };
    return <ComponentToRender key={key || config.id} {...combinedProps} />;
  };

  if (loading && !pageLayout) return <GlobalSpinner message="正在初始化页面..." />; 
  if (error) return <div className="container mx-auto p-8 text-center text-red-600 bg-red-100 border border-red-500 rounded-md shadow-lg">错误: {error}</div>;
  if (!pageLayout) return <div className="container mx-auto p-8 text-center text-gray-600">未能加载页面布局数据。</div>;

  const { header, sections = [], sidebar, footer, pageTitle, seo = {} } = pageLayout;

  return (
    <>
      <Helmet>
        <title>{pageTitle || 'AI Prompt Universe'}</title>
        {seo.description && <meta name="description" content={seo.description} />}
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
      </Helmet>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100 font-sans antialiased">
        {loading && <GlobalSpinner overlay={true} message="更新中..." />} 
        
        {header && renderDynamicComponent(header, "main-header")}

        <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex-grow w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            <main className={`space-y-8 ${sidebar ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'}`}>
              {sections.map(section => (
                <section key={section.id} id={section.id} className="bg-slate-800 bg-opacity-50 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-2xl border border-slate-700">
                  {section.title && <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6 pb-2 border-b border-slate-700">{section.title}</h2>}
                  {renderDynamicComponent(section)}
                </section>
              ))}
            </main>

            {sidebar && (
              <aside className="lg:col-span-4 xl:col-span-3 space-y-6 lg:sticky lg:top-24 self-start"> 
                {renderDynamicComponent(sidebar)}
              </aside>
            )}
          </div>
        </div>

        {footer && renderDynamicComponent(footer, "main-footer")}

        <PromptDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          promptData={modalPromptData}
        />
      </div>
    </>
  );
}

// App component wraps Router and HelmetProvider
function App() {
  return (
    <Router>
      {/* HelmetProvider should wrap all components that might use Helmet */}
      <HelmetProvider> 
        <MainApp />
      </HelmetProvider>
    </Router>
  );
}

export default App;