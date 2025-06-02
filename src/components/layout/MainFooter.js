// frontend/src/components/layout/MainFooter.js
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 网站主页脚组件。
 * @param {object} props
 * @param {string} props.copyrightText - 版权文本。
 * @param {Array<{text: string, href: string}>} props.links - 页脚链接数组。
 */
function MainFooter({ copyrightText = `© ${new Date().getFullYear()} My Site.`, links = [] }) {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-12">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-gray-400">
        {links.length > 0 && (
          <div className="mb-4">
            {links.map((link, index) => (
              <React.Fragment key={link.text}>
                <Link to={link.href} className="text-sm hover:text-purple-400 transition-colors">
                  {link.text}
                </Link>
                {index < links.length - 1 && <span className="mx-2">|</span>}
              </React.Fragment>
            ))}
          </div>
        )}
        <p className="text-sm">{copyrightText}</p>
        <p className="text-xs mt-2">
          Powered by AI & Imagination
        </p>
      </div>
    </footer>
  );
}

export default MainFooter;