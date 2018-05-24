const API_LIST = {
  /**
   * 获取评论列表
   */
  GET_COMMENT_LIST: 'http://127.0.0.1:3000/api/admin/comment-list',
  /**
   * 删除单条评论
   */
  DELETE_ONE_COMMENT: 'http://127.0.0.1:3000/api/admin/delete-one-comment',
  /**
   * 更新某条评论
   */
  UPDATE_ONE_COMMENT: 'http://127.0.0.1:3000/api/admin/update-comment-status',
  /**
   * 批量删除
   */
  BATCH_COMMENTS: 'http://127.0.0.1:3000/api/admin/batch-delete-comment',
  /**
   * 根据ID查找新闻
   */
  FIND_ONE_NEWS: 'http://127.0.0.1:3000/api/admin/find-one-news',
};
export  default API_LIST;
