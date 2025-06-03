// frontend/src/components/common/SimplePromptList.js (或 prompts/ 目录下)
import React from 'react';

function SimplePromptList({ items, emptyMessage = "暂无内容。", openPromptDetail }) {
  if (!items || items.length === 0) {
    return <p className="text-sm text-gray-400">{emptyMessage}</p>;
  }

  return (
    <ul className="space-y-2">
      {items.map(item => (
        <li key={item.id}>
          <button
            onClick={() => openPromptDetail && openPromptDetail(item.id)}
            className="text-sm text-gray-300 hover:text-purple-400 focus:outline-none focus:text-purple-400 transition-colors text-left w-full truncate"
            title={item.title}
          >
            {item.title}
          </button>
          {/* 可选：显示更新/创建日期 */}
          {/* <span className="text-xs text-gray-500 ml-2">({new Date(item.updated_at || item.created_at).toLocaleDateString()})</span> */}
        </li>
      ))}
    </ul>
  );
}

export default SimplePromptList;