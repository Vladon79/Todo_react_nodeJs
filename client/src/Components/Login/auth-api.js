import { instance } from "../../api/api"


export const authAPI = {
    registration(email, password){
        return instance.post('auth/registration', {email, password})
    },
    login(email, password){
        return instance.post('auth/login', {email, password})
    },
    auth(){
        return instance.get('auth')
    },
    logOut(){
        return instance.get('auth/logout')
    },
}