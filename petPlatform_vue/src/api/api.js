import instance from "./instance";

/**
 * 请求宠物信息
 */
export const getPetInfo = (params) => instance.get("/admin/pet", { params });
/**
 * 请求user_id用户发布的宠物信息
 */
export const getPetInfoByUserId = (user_id) =>
  instance.get(`/admin/pet/${user_id}`);
/**
 * 新增宠物发布信息
 */
export const addPetInfo = (data) => instance.post("/admin/pet", data);
/**
 * 修改宠物发布信息
 */
export const updatePetInfo = (id, data) =>
  instance.put(`/admin/pet/${id}`, data);
/**
 * 删除宠物发布信息
 */
export const deletePetInfo = (id) => instance.delete(`/admin/pet/${id}`);

/**
 * 请求用户信息
 */
export const getUserInfo = (id) => instance.get(`/admin/users/${id}`);
/**
 * 修改用户信息
 */
export const updateUserInfo = (id, data) =>
  instance.put(`/admin/users/${id}`, data);
/**
 * 更新用户头像
 */
export const updateAvatar = (data) => instance.post("/uploads/avatar", data);
/**
 * 注册用户
 */
export const registerUser = (data) => instance.post("/admin/users", data);

/**
 * 请求领养信息
 */
export const getAdoptionInfo = (user_id) =>
  instance.get(`/admin/adoption/user/${user_id}`);
/**
 * 根据宠物id查询申请表
 */
export const getAdoptionInfoByPetId = (pet_id) =>
  instance.get(`/admin/adoption/${pet_id}`);
/**
 * 新增领养信息
 */
export const addAdoptionInfo = (data) => instance.post("/admin/adoption", data);
/**
 * 修改领养信息
 */
export const updateAdoptionInfo = (id, data) =>
  instance.put(`/admin/adoption/${id}`, data);
/**
 * 删除领养信息
 */
export const deleteAdoptionInfo = (id) =>
  instance.delete(`/admin/adoption/${id}`);
/**
 * 查询宠物所有照片
 */
export const getPetPhoto = (pet_id) =>
  instance.get(`/admin/petphoto/${pet_id}`);
/**
 * 新增宠物照片
 */
export const addPetPhoto = (data) => instance.post("/uploads/aliyun", data);
/**
 * 删除宠物照片
 */
export const deletePetPhoto = (id) => instance.delete(`/admin/petphoto/${id}`);
