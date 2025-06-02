// frontend/src/components/common/FilterList.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * 过滤列表组件 (例如用于分类或标签)。
 * @param {object} props
 * @param {Array<{name: string, count?: number}>} props.items - 列表项数组。
 * @param {string} props.filterKey - 点击后在URL查询参数中使用的键名 (e.g., 'category', 'tag')。
 * @param {string} [props.activeFilter] - 当前激活的过滤器值。
 */
function FilterList({ items = [], filterKey, activeFilter }) {
  const location = useLocation();

  const getFilterLink = (value) => {
    const params = new URLSearchParams(location.search);
    // 清除所有可能的分页参数，因为过滤条件变了
    for (const key of Array.from(params.keys())) {
        if (key.endsWith('_page') || key === 'page') {
            params.delete(key);
        }
    }
    // 设置新的过滤器，如果值为空字符串，则移除该过滤器
    if (value === '') {
        params.delete(filterKey);
    } else {
        params.set(filterKey, value);
    }
    return `${location.pathname}?${params.toString()}`;
  };

  if (!items || items.length === 0) {
    return <p className="text-sm text-gray-400">暂无可用过滤器。</p>;
  }

  return (
    <ul className="space-y-2">
      {/* "显示全部" 选项 */}
      <li>
        <Link
          to={getFilterLink('')}
          className={`flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
            ${!activeFilter ? 'bg-purple-600 text-white shadow-md' : 'text-gray-300 hover:bg-slate-700 hover:text-purple-300'}`}
        >
          <span>全部</span>
          {/* 可以考虑显示总数，但这需要后端提供 */}
        </Link>
      </li>
      {items.map((item) => (
        <li key={item.name}>
          <Link
            to={getFilterLink(item.name)}
            className={`flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
              ${activeFilter === item.name ? 'bg-purple-600 text-white shadow-md' : 'text-gray-300 hover:bg-slate-700 hover:text-purple-300'}`}
          >
            <span className="truncate">{item.name}</span>
            {typeof item.count === 'number' && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${activeFilter === item.name ? 'bg-white text-purple-700' : 'bg-slate-600 text-gray-200'}`}>
                {item.count}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default FilterList;