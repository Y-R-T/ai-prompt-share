// frontend/src/index.js
// 版本: V9 (确认 React 18 Root API)
import React from 'react';
import ReactDOM from 'react-dom/client'; // 确保从 'react-dom/client' 导入
import './index.css'; // 你的全局样式
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();