import request from "../utils/request"
// 获取/查询 供应商列表接口
const  supplierList= (currentPage, pageSize, data) => {
  return request({
    url: `supplier/list/search/${currentPage}/${pageSize}`,
    method: "POST",
    data
  });
};
export default {
    supplierList
}