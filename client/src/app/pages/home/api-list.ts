const API_LIST = {
  /**
   * 获取所有分类
   */
  GET_CATEGORY: 'http://127.0.0.1:3000/api/admin/type-list',
  /**
   * 获取新闻列表
   */
  GET_NEWS_LIST: 'http://127.0.0.1:3000/api/client/news-list',
  /**
   * 根据ID查询新闻
   */
  FIND_ONE_NEWS: 'http://127.0.0.1:3000/api/admin/find-one-news',
  /**
   * 添加评论
   */
  ADD_COMMENT: 'http://127.0.0.1:3000/api/client/add-comment'
};
export  default API_LIST;
