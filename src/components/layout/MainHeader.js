// frontend/src/components/layout/MainHeader.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SearchBar from '../common/SearchBar'; // 引入 SearchBar

/**
 * 网站主导航头部组件。
 * @param {object} props
 * @param {string} props.siteName - 网站名称。
 * @param {Array<{text: string, href: string}>} props.navLinks - 导航链接数组。
 * @param {boolean} props.showSearch - 是否显示搜索框。
 */
function MainHeader({ siteName = "AI Prompts", navLinks = [], showSearch = true }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/'); // 如果搜索词为空，导航到首页或移除搜索参数
    }
  };
  
  // 从当前 URL 获取搜索词以填充搜索框
  const currentSearchTerm = new URLSearchParams(location.search).get('search') || '';

  return (
    <header className="bg-slate-800 bg-opacity-70 backdrop-blur-lg shadow-lg sticky top-0 z-40 border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Site Logo/Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 hover:opacity-80 transition-opacity">
              {siteName}
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.text}
                to={link.href}
                className={`text-base font-medium ${
                  location.pathname === link.href || (link.href !== '/' && location.search.includes(link.href.substring(1)))
                    ? 'text-purple-400 border-b-2 border-purple-400'
                    : 'text-gray-300 hover:text-purple-300 transition-colors'
                } pb-1`}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          {showSearch && (
            <div className="hidden sm:block md:ml-6">
              <SearchBar onSearch={handleSearch} initialValue={currentSearchTerm} />
            </div>
          )}
          
          {/* Mobile Menu Button (basic placeholder) */}
          <div className="md:hidden">
            {/* TODO: Implement mobile menu */}
            <button className="text-gray-300 hover:text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Search Bar - Renders below nav on small screens if needed */}
        {showSearch && (
            <div className="sm:hidden pb-4">
              <SearchBar onSearch={handleSearch} initialValue={currentSearchTerm} />
            </div>
        )}
      </div>
    </header>
  );
}

export default MainHeader;