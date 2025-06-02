// frontend/src/components/prompts/PromptCard.js
import React from 'react';
import { EyeIcon, ChatBubbleLeftEllipsisIcon, TagIcon } from '@heroicons/react/24/outline'; // 使用Heroicons

function PromptCard({ prompt, openPromptDetail }) {
  if (!prompt) return null;

  const handleCardClick = (e) => {
    // 防止按钮点击也触发卡片点击 (如果卡片本身可点击)
    if (e.target.closest('button')) {
        return;
    }
    if (openPromptDetail) {
      openPromptDetail(prompt.id);
    }
  };

  return (
    <div 
      className="bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 border border-slate-700 cursor-pointer"
      onClick={handleCardClick} // 使整个卡片可点击打开详情
      role="button" // ARIA role
      tabIndex={0} // Make it focusable
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick(e)} // Keyboard accessibility
    >
      <div className="p-5">
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2 truncate" title={prompt.title}>
          {prompt.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 h-10 line-clamp-2" title={prompt.description}>
          {prompt.description || "暂无描述"}
        </p>
        
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2 items-center">
            <TagIcon className="h-4 w-4 text-purple-400 flex-shrink-0" />
            {prompt.tags.slice(0, 3).map((tag, index) => ( // 最多显示3个标签
              <span key={index} className="bg-purple-500 bg-opacity-20 text-purple-300 text-xs px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="text-purple-400 text-xs">+{prompt.tags.length - 3}</span>
            )}
          </div>
        )}

        <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-3 border-t border-slate-700">
          <span className="truncate">作者: {prompt.author_name}</span>
          <div className="flex items-center space-x-2">
            <EyeIcon className="h-4 w-4 text-gray-500" />
            <span>{prompt.view_count || 0}</span>
          </div>
        </div>
      </div>
       {/* 可以移除独立的查看详情按钮，因为整个卡片可点击 */}
       {/* <button
        onClick={(e) => {
          e.stopPropagation(); // 阻止事件冒泡到卡片点击
          if (openPromptDetail) openPromptDetail(prompt.id);
        }}
        className="block w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2.5 px-4 transition-colors duration-300 font-semibold"
      >
        查看详情
      </button> */}
    </div>
  );
}

export default PromptCard;