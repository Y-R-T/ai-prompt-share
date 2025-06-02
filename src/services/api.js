// frontend/src/services/api.js
import axios from 'axios';

// 从环境变量获取后端 API 地址
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // 默认本地开发

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // 允许跨域发送 cookies (用于管理员会话)
});

/**
 * 获取页面布局配置。
 * @param {object} params - 查询参数 (例如: tag, category, search, page)
 * @returns {Promise<object>} - 页面布局配置对象
 */
export const getPageLayout = async (params = {}) => {
  try {
    const response = await apiClient.get('/api/page-layout', { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching page layout:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Network error or server is down.');
  }
};

/**
 * 获取单个 Prompt 的详细信息。
 * @param {string} promptId - Prompt的ID
 * @returns {Promise<object>} - Prompt 详细信息对象
 */
export const getPromptDetails = async (promptId) => {
  try {
    const response = await apiClient.get(`/api/prompts/${promptId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching prompt details for ID ${promptId}:`, error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Failed to load prompt details.');
  }
};

/**
 * 获取所有标签。
 * @returns {Promise<Array<object>>} - 标签列表 [{name: string, count: number}, ...]
 */
export const getAllTags = async () => {
    try {
        const response = await apiClient.get('/api/tags');
        return response.data;
    } catch (error) {
        console.error("Error fetching tags:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Failed to load tags.');
    }
};

/**
 * 获取所有分类。
 * @returns {Promise<Array<object>>} - 分类列表 [{name: string, count: number}, ...]
 */
export const getAllCategories = async () => {
    try {
        const response = await apiClient.get('/api/categories');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Failed to load categories.');
    }
};


// --- 认证相关 API ---
/**
 * 管理员登录。
 * @param {string} username
 * @param {string} password
 * @param {boolean} remember - 是否记住登录状态
 * @returns {Promise<object>} - 登录结果
 */
export const loginAdmin = async (username, password, remember = true) => {
  try {
    const response = await apiClient.post('/auth/login', { username, password, remember });
    return response.data;
  } catch (error) {
    console.error("Admin login error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Login failed.');
  }
};

/**
 * 管理员登出。
 * @returns {Promise<object>} - 登出结果
 */
export const logoutAdmin = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  } catch (error) {
    console.error("Admin logout error:", error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : new Error('Logout failed.');
  }
};

/**
 * 获取当前用户登录状态。
 * @returns {Promise<object>} - 用户状态信息
 */
export const getAuthStatus = async () => {
  try {
    const response = await apiClient.get('/auth/status');
    return response.data;
  } catch (error)
 {
    console.error("Error fetching auth status:", error.response ? error.response.data : error.message);
    // 对于状态检查，如果失败，通常意味着未登录或网络问题，可以返回一个表示未登录的状态
    return { logged_in: false, error: "Could not fetch auth status." };
  }
};

export default apiClient;