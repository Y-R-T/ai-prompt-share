// frontend/src/components/prompts/PromptCard.js
// 版本: V53
// 修改目的: 移除未使用的 ChatBubbleLeftEllipsisIcon 导入以解决 ESLint 警告。
// 修改内容: 从 @heroicons/react/24/outline 的导入中移除了 ChatBubbleLeftEllipsisIcon。

import React from 'react';
// 【V53 修改】移除未使用的 ChatBubbleLeftEllipsisIcon
import { EyeIcon, TagIcon /*, ChatBubbleLeftEllipsisIcon */ } from '@heroicons/react/24/outline'; 

function PromptCard({ prompt, openPromptDetail }) {
  if (!prompt) return null;

  const handleCardClick = (e) => {
    // Prevent card click if a button inside the card was clicked
    if (e.target.closest('button')) {
        return;
    }
    if (openPromptDetail) {
      openPromptDetail(prompt.id);
    }
  };

  return (
    <div 
      className="bg-slate-800 rounded-lg shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/30 border border-slate-700 cursor-pointer flex flex-col justify-between"
      onClick={handleCardClick} 
      role="button" 
      tabIndex={0} 
      onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && handleCardClick(e)} 
    >
      <div className="p-5"> {/* Content area */}
        <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2 truncate" title={prompt.title}>
          {prompt.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 h-10 line-clamp-2" title={prompt.description || ''}>
          {prompt.description || "暂无描述"}
        </p>
        
        {prompt.tags && prompt.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2 items-center">
            <TagIcon className="h-4 w-4 text-purple-400 flex-shrink-0" />
            {prompt.tags.slice(0, 3).map((tag, index) => ( 
              <span key={index} className="bg-purple-500 bg-opacity-20 text-purple-300 text-xs px-2 py-0.5 rounded-full">
                {tag}
              </span>
            ))}
            {prompt.tags.length > 3 && (
              <span className="text-purple-400 text-xs">+{prompt.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
      
      {/* Footer/info area of the card */}
      <div className="p-5 pt-3 border-t border-slate-700">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span className="truncate max-w-[calc(100%-5rem)]" title={prompt.author_name || '匿名作者'}>
            作者: {prompt.author_name || '匿名作者'}
          </span>
          <div className="flex items-center space-x-2">
            <EyeIcon className="h-4 w-4 text-gray-500" />
            <span>{prompt.view_count || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PromptCard;