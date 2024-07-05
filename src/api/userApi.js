import { API } from "./apiAuth";

// password,password_check,username,email
// 회원가입 api 호출
const joinUser = async (info)=>{
    try{
        const response = await API.post(`user/create`,info);
        return response.data;
    } catch (error){
        console.log(error.response);
        if(error.response.status === 409){
            alert(error.response.data.detail)
        }
    }
}

// 로그인 api 호출
const loginUser = async (info)=>{
    try{
        const response = await API.get(`user/login`,info);
        return response.data;
    } catch (error){
        console.error(error);
    }
}

// Token 유효성 검사 api 호출
const checkLoginUser = async (info)=>{
    try{
        const response = await API.get(`user/ckeck-login`,info);
        return response.data;
    } catch (error){
        console.error(error);
    }
}

// Token 재발급 api 호출
const refreshUser = async (info)=>{
    try{
        const response = await API.get(`user/refresh`,info);
        return response.data;
    } catch (error){
        console.error(error);
    }
}

// 회원 정보 전체 조회 api 호출
const getUsers = async ()=>{
    try{
        const response = await API.get(`user/`);
        return response.data;
    } catch (error){
        console.error(error);
    }
}

// 특정 회원 정보 조회 api 호출
const getOnlyUser = async (user_id)=>{
    try{
        const response = await API.get(`user/${user_id}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
}

// 회원 정보 수정 api 호출
const putOnlyUser = async (user_id)=>{
    try{
        const response = await API.put(`user/${user_id}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
}

// 회원 정보 삭제 api 호출
const delOnlyUser = async (user_id)=>{
    try{
        const response = await API.delete(`user/${user_id}`);
        return response.data;
    } catch (error){
        console.error(error);
    }
}
export default {
    joinUser,
    loginUser,
    checkLoginUser,
    refreshUser,
    getUsers,
    getOnlyUser,
    putOnlyUser,
    delOnlyUser,
};