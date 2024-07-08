export default {
    namespaced : true,
    state(){
        return{
            isModalOpen : false,
        }
    },
    mutations: {
        setIsModalOpen(state,payload){
            state.isModalOpen = payload;
        }
    },
    actions : {

    },
    getters : {
        
    }
}