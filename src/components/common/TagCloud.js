// frontend/src/components/common/TagCloud.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * 标签云组件。
 * @param {object} props
 * @param {Array<{name: string, count?: number}>} props.tags - 标签数组。
 * @param {string} props.filterKey - 点击后在URL查询参数中使用的键名 (通常是 'tag')。
 * @param {string} [props.activeFilter] - 当前激活的标签。
 */
function TagCloud({ tags = [], filterKey, activeFilter }) {
  const location = useLocation();

  const getTagLink = (tagName) => {
    const params = new URLSearchParams(location.search);
    // 清除所有可能的分页参数
    for (const key of Array.from(params.keys())) {
        if (key.endsWith('_page') || key === 'page') {
            params.delete(key);
        }
    }
    if (tagName === activeFilter || tagName === '') { // 点击当前激活的标签或“全部”则取消该标签过滤
      params.delete(filterKey);
    } else {
      params.set(filterKey, tagName);
    }
    return `${location.pathname}?${params.toString()}`;
  };

  if (!tags || tags.length === 0) {
    return <p className="text-sm text-gray-400">暂无标签。</p>;
  }
  
  // 简单的字体大小计算，可以根据 count 调整
  const getTagStyle = (count) => {
    if (count === undefined) return { fontSize: '0.875rem' }; // 14px
    if (count > 10) return { fontSize: '1.125rem' }; // 18px
    if (count > 5) return { fontSize: '1rem' }; // 16px
    return { fontSize: '0.875rem' }; // 14px
  };


  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag.name}
          to={getTagLink(tag.name)}
          style={getTagStyle(tag.count)}
          className={`px-3 py-1 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110
            ${activeFilter === tag.name 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg' 
              : 'bg-slate-700 text-purple-300 hover:bg-slate-600 hover:text-purple-200 shadow-md'
            }`}
        >
          {tag.name}
          {/* Optional: show count in tooltip or small text */}
          {/* {typeof tag.count === 'number' && ` (${tag.count})`} */}
        </Link>
      ))}
    </div>
  );
}

export default TagCloud;