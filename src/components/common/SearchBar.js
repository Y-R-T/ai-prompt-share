// frontend/src/components/common/SearchBar.js
import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

/**
 * 搜索框组件。
 * @param {object} props
 * @param {function(string): void} props.onSearch - 执行搜索时的回调函数，参数为搜索词。
 * @param {string} [props.placeholder="搜索 Prompts..."] - 输入框的占位文本。
 * @param {string} [props.initialValue=""] - 搜索框的初始值。
 */
function SearchBar({ onSearch, placeholder = "搜索 Prompts...", initialValue = "" }) {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // 如果 initialValue (来自URL) 变化，更新内部 searchTerm
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xs sm:max-w-sm md:max-w-md">
      <div className="relative">
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-4 py-2.5 text-sm text-gray-100 bg-slate-700 border border-slate-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      {/* 隐藏提交按钮，回车即可提交，或者你可以选择显示它 */}
      {/* <button type="submit" className="hidden">Search</button> */}
    </form>
  );
}

export default SearchBar;