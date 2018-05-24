const API_LIST = {
  /**
   *获取用户列表
   */
   GET_USER_LIST: 'http://127.0.0.1:3000/api/admin/user-list',
  /**
   * 单个删除用户
   */
  DELETE_ONE_USER: 'http://127.0.0.1:3000/api/admin/delete-user',
  /**
   * 获取管理员列表
   */
  GET_ADMIN_LIST: 'http://127.0.0.1:3000/api/admin/admin-list',
  /**
   * 单个删除管理员
   */
  DELETE_ONE_ADMIN: 'http://127.0.0.1:3000/api/admin/delete-admin',
  /**
   * 添加管理员
   */
  ADD_ONE_ADMIN: 'http://127.0.0.1:3000/api/admin/add-admin',
  /**
   * 修改管理员
   */
  UPDATE_ONE_ADMIN: 'http://127.0.0.1:3000/api/admin/update-admin',
  /**
   *根绝ID查找管理员
   */
  FIND_ONE_ADMIN: 'http://127.0.0.1:3000/api/admin/find-one-admin',
  /**
   * 批量删除管理员
   */
  BATCH_DELET_ADMIN: 'http://127.0.0.1:3000/api/admin/batch-delete-admin',
  /**
   * 批量删除用户
   */
  BATCH_DELET_USER: 'http://127.0.0.1:3000/api/admin/batch-delete-user'
};
export  default API_LIST;
