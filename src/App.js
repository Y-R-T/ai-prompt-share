// frontend/src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, useLocation, useNavigate } from 'react-router-dom';
// 【V5 修改】从 react-helmet-async 导入 HelmetProvider
// 修改版本: V5
// 修改目的: 解决 HelmetProvider is not defined 错误。
// 修改内容: 添加 HelmetProvider 的 import 语句。
import { Helmet, HelmetProvider } from 'react-helmet-async'; // <--- 添加 HelmetProvider

import { getPageLayout, getPromptDetails } from './services/api';
import { getComponent } from './utils/componentRegistry';
import PromptDetailModal from './components/prompts/PromptDetailModal';
import GlobalSpinner from './components/common/GlobalSpinner';

// ... MainApp 组件的代码保持不变 ...
function MainApp() {
  const [pageLayout, setPageLayout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPromptData, setModalPromptData] = useState(null);
  
  const location = useLocation(); 
  const navigate = useNavigate(); 

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


// App 组件包裹 Router 和 HelmetProvider
function App() {
  return (
    <Router>
      {/* HelmetProvider 包裹所有可能使用 Helmet 的组件 */}
      <HelmetProvider> {/* <--- HelmetProvider 在这里使用 */}
        <MainApp />
      </HelmetProvider>
    </Router>
  );
}

export default App;