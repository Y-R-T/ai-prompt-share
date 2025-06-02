// frontend/src/components/common/GlobalSpinner.js
import React from 'react';

/**
 * 全局加载指示器组件。
 * @param {object} props
 * @param {string} props.message - 加载时显示的文本消息。
 * @param {boolean} props.overlay - 是否作为覆盖整个页面的蒙层显示。
 */
function GlobalSpinner({ message = "正在加载...", overlay = false }) {
  const spinnerBaseClasses = "flex flex-col items-center justify-center text-gray-200";
  
  const overlayClasses = overlay 
    ? "fixed inset-0 bg-slate-900 bg-opacity-80 backdrop-blur-sm z-[9999]" 
    : "py-10"; // 非覆盖层时的基本样式

  return (
    <div className={`${spinnerBaseClasses} ${overlayClasses}`}>
      <svg 
        className="animate-spin h-12 w-12 text-purple-500" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        ></circle>
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
    </div>
  );
}

export default GlobalSpinner;