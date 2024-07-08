import { API } from "./apiAuth";

// 상품 정보 전체 조회 api 호출
const viewAllProduct = async () => {
  try {
    const response = await API.get("product/");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 개별 상품 조회 api 호출
const viewIndividualProduct = async (product_id) => {
  try {
    const response = await API.get(`product/${product_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 상품 등록 api 호출
const postProduct = async (formData) => {
  try {
    const response = await API.post("product/", formData, {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ5ZWFqaW4iLCJleHAiOjE3MjA1MTA4NTl9.s4K9wuWkqu-cyjwMBtogKZaxUxBAsMD2L6mVmGYWavk",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 상품 수정 api 호출
const editProduct = async (product_id, formData) => {
  try {
    const response = await API.put(`product/${product_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// 상품 삭제 api 호출
const deleteProduct = async (product_id) => {
  try {
    const response = await API.delete(`product/${product_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default {
  viewAllProduct,
  viewIndividualProduct,
  postProduct,
  editProduct,
  deleteProduct,
};
