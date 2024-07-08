import api from "@/api/apiAuth";
import userApi from "@/api/userApi";

export default {
    namespaced : true,
    state(){
        return{
            loginSuccess : false,
        }
    },
    mutations: {
        setLoginStatus(state,payload){
            state.loginSuccess = payload;
        },
    },
    actions : {
        async getLoginUser (context,info) {
            try {
              const result = await userApi.loginUser(info);
              if(result.access_token){
 
                localStorage.setItem('userId',result.access_token);
                localStorage.setItem('type',result.token_type);
                localStorage.setItem('username',result.username);
                localStorage.setItem('user_idx',result.user_id);
                context.commit('setLoginStatus',true);

              }
              // access Token, refresh Token, token_type, username 줌
              // access Token을 env 파일에 세팅 ?? api 확인하기
            } catch (error) {
              console.error(error);
            }
          },
    },
    getters : {
        
    }
}