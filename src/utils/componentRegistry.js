// frontend/src/utils/componentRegistry.js

// --- 布局和通用组件 ---
import MainHeader from '../components/layout/MainHeader';
import MainFooter from '../components/layout/MainFooter';
import MainSidebar from '../components/layout/MainSidebar';
import HeroBanner from '../components/common/HeroBanner';
import FilterList from '../components/common/FilterList';
import TagCloud from '../components/common/TagCloud';
import SearchBar from '../components/common/SearchBar'; // 我们会创建这个组件

// --- 内容展示组件 ---
import GridDisplay from '../components/display/GridDisplay';
import ListDisplay from '../components/ListDisplay'; // 修正路径: 原为 ../components/display/ListDisplay

// --- 条目级组件 ---
import PromptCard from '../components/prompts/PromptCard';
import PromptListItem from '../components/PromptListItem'; // 修正路径: 原为 ../components/prompts/PromptListItem

// 组件注册表
const componentRegistry = {
  // 布局
  MainHeader,
  MainFooter,
  MainSidebar,
  
  // 通用区块
  HeroBanner,
  FilterList,
  TagCloud,
  SearchBar, // 添加 SearchBar

  // 展示容器
  GridDisplay,
  ListDisplay,

  // 单个条目
  PromptCard,
  PromptListItem,
};

/**
 * 根据组件名称从注册表中获取 React 组件。
 * @param {string} componentName - 后端指定的组件名称。
 * @returns {React.ComponentType | (() => JSX.Element)} - 对应的 React 组件，如果找不到则返回一个错误提示组件。
 */
export function getComponent(componentName) {
  const Component = componentRegistry[componentName];
  if (!Component) {
    console.error(`Component '${componentName}' not found in registry. Make sure it's imported and registered in componentRegistry.js.`);
    return () => (
        <div style={{ padding: '20px', border: '2px dashed red', margin: '10px 0', backgroundColor: '#fff0f0', color: '#333' }}>
            <p style={{ color: 'red', fontWeight: 'bold' }}>Error: Component Not Found!</p>
            <p>The component "<code>{componentName}</code>" is not registered in the frontend.</p>
            <p>Please check <code>src/utils/componentRegistry.js</code> and ensure it's correctly imported and added to the <code>componentRegistry</code> object.</p>
        </div>
    );
  }
  return Component;
}