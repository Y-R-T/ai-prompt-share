// frontend/src/components/layout/MainSidebar.js
import React from 'react';
import { getComponent } from '../../utils/componentRegistry';

/**
 * 网站主侧边栏组件。
 * @param {object} props
 * @param {Array<object>} props.sections - 侧边栏区块配置数组。
 * 每个 section 包含 id, title, component, props。
 */
function MainSidebar({ sections = [] }) {
  if (!sections || sections.length === 0) {
    // 如果没有区块配置，可以返回 null 或者一个占位提示
    // return null; 
    return (
      <aside className="space-y-6 lg:sticky lg:top-24 self-start">
        <div className="bg-slate-800 bg-opacity-50 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-xl border border-slate-700">
          <p className="text-sm text-gray-400">侧边栏内容正在配置中...</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="space-y-6 lg:sticky lg:top-24 self-start"> {/* sticky top for desktop */}
      {sections.map(sectionConfig => {
        if (!sectionConfig || !sectionConfig.component) { // 增加对 sectionConfig 本身的检查
          console.warn(`Sidebar section with ID "${sectionConfig?.id || 'unknown'}" is missing a component definition or is malformed.`);
          return null;
        }
        const ComponentToRender = getComponent(sectionConfig.component);
        // 传递 openPromptDetail (如果存在于 props) 到侧边栏组件，尽管侧边栏通常不直接打开详情
        const passThroughProps = sectionConfig.props || {};

        return (
          <div 
            key={sectionConfig.id || sectionConfig.title} // 如果 id 可能不存在，用 title 作为备用 key
            className="bg-slate-800 bg-opacity-50 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-xl border border-slate-700"
          >
            {sectionConfig.title && (
              <h3 className="text-xl font-semibold text-purple-300 mb-4 pb-2 border-b border-slate-700">
                {sectionConfig.title}
              </h3>
            )}
            <ComponentToRender {...passThroughProps} />
          </div>
        );
      })}
    </aside>
  );
}

export default MainSidebar;