// frontend/src/components/common/Pagination.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'; // 确保 @heroicons/react 已安装

/**
 * 分页组件。
 * @param {object} props
 * @param {number} props.currentPage - 当前页码。
 * @param {number} props.totalPages - 总页数。
 * @param {string} [props.dataSourceIdentifier] - 用于生成分页链接的数据源标识符 (用于区分不同列表的分页参数)。
 */
function Pagination({ currentPage, totalPages, dataSourceIdentifier }) {
  const location = useLocation();

  const getPageLink = (pageNumber) => {
    const params = new URLSearchParams(location.search);
    const pageParamName = dataSourceIdentifier ? `${dataSourceIdentifier}_page` : 'page';

    if (pageNumber <= 0) pageNumber = 1; // 防止页码小于1
    if (pageNumber > totalPages) pageNumber = totalPages; // 防止页码大于总页数

    if (pageNumber === 1) { // 如果是第一页，移除分页参数以保持URL清洁
      params.delete(pageParamName);
    } else {
      params.set(pageParamName, pageNumber);
    }
    return `${location.pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null; // 如果只有一页或没有页，则不显示分页
  }

  // 生成页码按钮逻辑
  const pageNumbers = [];
  const maxPagesToShow = 5; // 最多显示的页码按钮数（不含上一页/下一页/首尾页）
  let startPage, endPage;

  if (totalPages <= maxPagesToShow + 2) { // +2 for first and last page if always shown
    startPage = 1;
    endPage = totalPages;
  } else {
    if (currentPage <= Math.ceil(maxPagesToShow / 2) + 1) {
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + Math.floor(maxPagesToShow / 2) >= totalPages -1) {
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - Math.floor(maxPagesToShow / 2);
      endPage = currentPage + Math.floor(maxPagesToShow / 2) ;
    }
  }
  
  for (let i = startPage; i <= endPage; i++) {
    if (i > 0 && i <= totalPages) { // 确保页码在有效范围内
        pageNumbers.push(i);
    }
  }

  const showFirstPageLink = startPage > 1;
  const showLastPageLink = endPage < totalPages;
  const showLeftEllipsis = startPage > 2;
  const showRightEllipsis = endPage < totalPages - 1;


  return (
    <nav className="flex items-center justify-between border-t border-slate-700 px-4 py-6 sm:px-6 mt-8" aria-label="Pagination">
      <div className="flex-1 flex justify-between sm:justify-center"> {/* 改为 sm:justify-center 使其居中在更大屏幕上 */}
        {/* 上一页按钮 */}
        {currentPage > 1 ? (
          <Link
            to={getPageLink(currentPage - 1)}
            className="relative inline-flex items-center rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-gray-300 hover:bg-slate-600 focus-visible:outline-offset-0 transition-colors mr-3"
          >
            <ChevronLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            上一页
          </Link>
        ) : (
          <span className="relative inline-flex items-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-gray-500 cursor-not-allowed mr-3">
            <ChevronLeftIcon className="h-5 w-5 mr-1" aria-hidden="true" />
            上一页
          </span>
        )}
        
        {/* 页码按钮 - 移动端可能隐藏部分 */}
        <div className="hidden sm:flex sm:items-baseline sm:space-x-1">
          {showFirstPageLink && (
            <Link to={getPageLink(1)} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-purple-400 rounded-md">
              1
            </Link>
          )}
          {showLeftEllipsis && <span className="px-2 py-2 text-sm text-gray-500">...</span>}

          {pageNumbers.map((number) => (
            <Link
              key={number}
              to={getPageLink(number)}
              aria-current={currentPage === number ? 'page' : undefined}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                currentPage === number ? 'bg-purple-600 text-white z-10 shadow-md' : 'text-gray-400 hover:text-purple-400 hover:bg-slate-700'
              }`}
            >
              {number}
            </Link>
          ))}
            
          {showRightEllipsis && <span className="px-2 py-2 text-sm text-gray-500">...</span>}
          {showLastPageLink && (
            <Link to={getPageLink(totalPages)} className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-purple-400 rounded-md">
              {totalPages}
            </Link>
          )}
        </div>

        {/* 下一页按钮 */}
        {currentPage < totalPages ? (
          <Link
            to={getPageLink(currentPage + 1)}
            className="relative inline-flex items-center rounded-md bg-slate-700 px-3 py-2 text-sm font-semibold text-gray-300 hover:bg-slate-600 focus-visible:outline-offset-0 transition-colors ml-3"
          >
            下一页
            <ChevronRightIcon className="h-5 w-5 ml-1" aria-hidden="true" />
          </Link>
        ) : (
           <span className="relative inline-flex items-center rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-gray-500 cursor-not-allowed ml-3">
            下一页
            <ChevronRightIcon className="h-5 w-5 ml-1" aria-hidden="true" />
          </span>
        )}
      </div>
    </nav>
  );
}

export default Pagination;