const API_LIST = {
  /**
   * 获取所有分类
   */
  GET_CATEGORY: 'http://127.0.0.1:3000/api/admin/type-list',
  /**
   * 添加新闻
   */
  ADD_NEWS: 'http://127.0.0.1:3000/api/admin/add-news',
  /**
   * 获取所有新闻
   */
  GET_NEWS: 'http://127.0.0.1:3000/api/admin/news-list',
  /**
   * 修改新闻状态
   */
  UPDATE_STATUS: 'http://127.0.0.1:3000/api/admin/update-news-status',
  /**
   * 删除单条新闻
   */
  DELETE_ONE_NEWS: 'http://127.0.0.1:3000/api/admin/delete-one-news',
  /**
   * 根据ID查找新闻
   */
  FIND_ONE_NEWS: 'http://127.0.0.1:3000/api/admin/find-one-news',
  /**
   *根据ID修改新闻
   */
  UPDATE_NEWS: 'http://127.0.0.1:3000/api/admin/update-news'
};
export  default API_LIST;
