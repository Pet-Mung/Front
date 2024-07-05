import { API } from "./apiAuth";

// 상품 정보 전체 조회 api 호출
const searchAllProduct = async () => {
  try {
    const response = await API.get("product/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 개별 상품 조회 api 호출
const searchIndividualProduct = async (product_id) => {
  try {
    const response = await API.get(`product/${product_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 상품 등록 api 호출
const postProduct = async () => {
  try {
    const response = await API.post("product/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 상품 수정 api 호출
const editProduct = async (product_id) => {
  try {
    const response = await API.put(`product/${product_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 상품 삭제 api 호출
const deleteProduct = async (product_id) => {
  try {
    const response = await API.put(`product/${product_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  searchAllProduct,
  searchIndividualProduct,
  postProduct,
  editProduct,
  deleteProduct,
};
