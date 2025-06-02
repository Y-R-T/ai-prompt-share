// frontend/src/components/display/GridDisplay.js
import React from 'react';
import { getComponent } from '../../utils/componentRegistry';
import Pagination from '../common/Pagination'; // 引入分页组件

function GridDisplay({ 
    items, 
    columns = 3, 
    itemComponent = 'PromptCard', 
    paginationInfo, 
    loadingMessage = "加载中...",
    emptyMessage = "没有内容可显示。",
    openPromptDetail // 从 App.js 透传下来
}) {
  const ItemComponent = getComponent(itemComponent);

  if (!items) { // items 可能为 null (加载中) 或 undefined
    return <p className="text-center text-gray-400 py-8">{loadingMessage}</p>;
  }
  if (items.length === 0) {
    return <p className="text-center text-gray-400 py-8">{emptyMessage}</p>;
  }

  // 响应式列数，Tailwind CSS class names
  let gridColsClass = 'grid-cols-1'; // 默认手机端1列
  if (columns === 2) {
    gridColsClass = 'grid-cols-1 sm:grid-cols-2';
  } else if (columns === 3) {
    gridColsClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
  } else if (columns === 4) {
    gridColsClass = 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  }
  // 也可以直接传递 Tailwind class string, e.g., "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

  return (
    <div>
      <div className={`grid ${gridColsClass} gap-4 md:gap-6`}>
        {items.map(item => (
          <ItemComponent key={item.id} prompt={item} openPromptDetail={openPromptDetail} />
        ))}
      </div>
      {paginationInfo && paginationInfo.pages > 1 && (
        <Pagination 
            currentPage={paginationInfo.page}
            totalPages={paginationInfo.pages}
            dataSourceIdentifier={paginationInfo.dataSourceIdentifier} // 用于生成分页链接
        />
      )}
    </div>
  );
}

export default GridDisplay;