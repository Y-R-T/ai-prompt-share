// frontend/src/components/common/HeroBanner.js
import React from 'react';

/**
 * 英雄横幅组件。
 * @param {object} props
 * @param {string} props.title - 主标题。
 * @param {string} props.subtitle - 副标题。
 * @param {object} [props.ctaButton] - 行动号召按钮配置 {text: string, action: string, target: string}。
 * @param {string} [props.backgroundImageUrl] - 背景图片URL (可选)。
 */
function HeroBanner({ title, subtitle, ctaButton, backgroundImageUrl }) {
  const handleCtaClick = () => {
    if (ctaButton && ctaButton.action === 'scrollTo' && ctaButton.target) {
      const targetElement = document.getElementById(ctaButton.target);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // 可以扩展其他 action 类型, e.g., navigate, openModal
  };

  const style = backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {};

  return (
    <section 
      className="py-16 sm:py-24 text-center bg-gradient-to-b from-purple-900/30 via-slate-800/10 to-transparent rounded-xl shadow-2xl border border-slate-700 mb-8"
      style={style} // 用于背景图片
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            {subtitle}
          </p>
        )}
        {ctaButton && ctaButton.text && (
          <button
            onClick={handleCtaClick}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-lg font-semibold rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
          >
            {ctaButton.text}
          </button>
        )}
      </div>
    </section>
  );
}

export default HeroBanner;