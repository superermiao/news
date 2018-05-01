const API_LIST = {
  /**
   * 增加分类
   */
  ADD_TYPE: 'http://127.0.0.1:3000/api/admin/add-type',
  /**
   * 获取分类列表
   */
  GET_TYPE: 'http://127.0.0.1:3000/api/type/list',
  /**
   * 修改分类
   */
  UPDATE_TYPE: 'http://127.0.0.1:3000/api/admin/update-type',
  /**
   * 查找某个ID对应的分类名
   */
  FIND_TYPE: 'http://127.0.0.1:3000/api/admin/find-one-type',
  /**
   * 单个删除
   */
  DELETE_ONE_TYPE: 'http://127.0.0.1:3000/api/admin/delete-one'
};
export  default API_LIST;
