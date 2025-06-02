// frontend/src/components/ListDisplay.js
import React from 'react';
import { getComponent } from '../utils/componentRegistry';
import Pagination from './common/Pagination'; // 确保路径正确，Pagination 在 common 文件夹

/**
 * ListDisplay component: Renders a list of items using a dynamically specified item component.
 * @param {object} props
 * @param {Array<object>} props.items - The array of items to display.
 * @param {string} [props.itemComponent='PromptListItem'] - The name of the component to use for rendering each item.
 * @param {object} [props.paginationInfo] - Pagination data from the backend.
 * @param {string} [props.loadingMessage="加载中..."] - Message to display when items are loading/null.
 * @param {string} [props.emptyMessage="没有内容可显示。"] - Message to display when items array is empty.
 * @param {function} props.openPromptDetail - Function to open the prompt detail modal.
 * @param {object} [props.itemProps={}] - Additional props to pass down to each ItemComponent.
 */
function ListDisplay({
  items,
  itemComponent = 'PromptListItem', // Default component name, resolved by getComponent
  paginationInfo,
  loadingMessage = "正在加载内容...", // 更新了加载信息
  emptyMessage = "未能找到匹配的内容。", // 更新了空信息
  openPromptDetail, // 这个 prop 由 App.js 传递下来
  itemProps = {} // 允许从后端传递额外的 props 给每个列表项
}) {
  const ItemComponent = getComponent(itemComponent);

  if (!items) { // items 可能为 null (初始加载中) 或 undefined
    return <p className="text-center text-gray-400 py-8">{loadingMessage}</p>;
  }
  if (items.length === 0) {
    return <p className="text-center text-gray-400 py-8">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {items.map(item => (
        // 假设列表项组件 (如 PromptListItem) 期望一个名为 'prompt' 的 prop 来接收数据
        // 并期望 'openPromptDetail' prop 来处理点击事件
        <ItemComponent
            key={item.id}
            prompt={item} 
            openPromptDetail={openPromptDetail}
            {...itemProps} // 传递任何从后端指定的额外 itemProps
        />
      ))}
      {paginationInfo && paginationInfo.pages > 1 && (
        <Pagination
          currentPage={paginationInfo.page}
          totalPages={paginationInfo.pages}
          dataSourceIdentifier={paginationInfo.dataSourceIdentifier}
        />
      )}
    </div>
  );
}

export default ListDisplay;