// frontend/src/components/PromptListItem.js
import React from 'react';
import { EyeIcon, TagIcon } from '@heroicons/react/24/outline'; // 确保已安装 @heroicons/react

/**
 * Prompt 列表项组件。
 * @param {object} props
 * @param {object} props.prompt - Prompt 数据对象。
 * @param {function} props.openPromptDetail - 打开 Prompt 详情弹窗的函数。
 * @param {boolean} [props.showDescription=true] - 是否显示描述 (可以由后端 layout 配置控制)。
 */
function PromptListItem({ prompt, openPromptDetail, showDescription = true }) {
  if (!prompt) return null;

  const handleItemClick = (e) => {
    // 防止按钮等内部可交互元素的点击冒泡
    if (e.target.closest('a, button')) {
      return;
    }
    if (openPromptDetail) {
      openPromptDetail(prompt.id);
    }
  };

  return (
    <div 
      className="bg-slate-800 p-4 sm:p-5 rounded-lg shadow-lg border border-slate-700 hover:shadow-purple-500/20 hover:border-purple-600/50 transition-all duration-300 cursor-pointer group"
      onClick={handleItemClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleItemClick(e)}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        {/* 左侧内容 */}
        <div className="flex-grow min-w-0"> {/* min-w-0 解决 flex 布局中子元素溢出问题 */}
          <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 group-hover:from-purple-300 group-hover:to-pink-400 transition-colors truncate" title={prompt.title}>
            {prompt.title}
          </h3>
          
          {showDescription && prompt.description && (
            <p className="text-gray-400 text-sm mt-1 line-clamp-2" title={prompt.description}>
              {prompt.description}
            </p>
          )}

          {/* 标签和作者信息 */}
          <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:gap-4 text-xs text-gray-500">
            {prompt.tags && prompt.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 mb-1 sm:mb-0">
                <TagIcon className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                {prompt.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="bg-purple-500 bg-opacity-20 text-purple-300 px-1.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
                {prompt.tags.length > 3 && <span className="text-purple-400 text-xs">+{prompt.tags.length - 3}</span>}
              </div>
            )}
            <div className="flex items-center gap-1">
                <span className="truncate">作者: {prompt.author_name}</span>
            </div>
            <div className="flex items-center gap-1">
                <EyeIcon className="h-3.5 w-3.5" />
                <span>{prompt.view_count || 0}</span>
            </div>
          </div>
        </div>
        
        {/* 右侧操作按钮 (可选，因为整个条目可点击) */}
        {/* <div className="flex-shrink-0 mt-3 sm:mt-0">
          <button
            onClick={(e) => {
              e.stopPropagation(); // 阻止事件冒泡到父 div 的 onClick
              if (openPromptDetail) openPromptDetail(prompt.id);
            }}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            查看
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default PromptListItem;