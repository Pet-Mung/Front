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
                const now = new Date();
                //로그인 만료시간 30분으로 설정
                const ttl = 1800000;
                const expire = now.getTime() + ttl;
                console.log('expire',expire);
                const userInfoObj = {
                  userId : result.access_token,
                  type : result.token_type,
                  username : result.username,
                  user_idx : result.user_id,
                  expire : expire,
                  
                }

                window.sessionStorage.setItem('userInfoObj',JSON.stringify(userInfoObj));
                context.commit('setLoginStatus',true);
              }
            } catch (error) {
              console.error(error);
            }
          },
    },
    getters : {
        
    }
}