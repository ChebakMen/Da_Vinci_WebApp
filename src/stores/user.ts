import { IUser } from "@/models/IUser";
import { makeAutoObservable } from "mobx";
import  AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/AuthResponce";

class userStore {
  user: IUser | null = null; 

  constructor() {
    makeAutoObservable(this)
  }

  setUser = (user: IUser | null) => {
    this.user = user;
  }

  async login(email:string, password: string) {
    try {
      const response = await AuthService.login(email,password)
      console.log(response)

      localStorage.setItem('token', response.data.accessToken)
      this.setUser(response.data.userInfo)

    } catch (e:any) {
      console.log(e.response?.data?.error)
    }
  }

  async registration(userInfo:IUser, password: string) {
    try {
      const response = await AuthService.registration({
        ...userInfo,
        password
      });
      console.log(response)
      
      localStorage.setItem('token', response.data.accessToken)
      this.setUser(response.data.userInfo)

    } catch (e:any) {
      console.log(e.response?.data?.error)
    }
  }
  async logout() {
    try {
      await AuthService.logout()
      localStorage.removeItem('token')
      this.setUser(null )

    } catch (e:any) {
      console.log(e.response?.data?.error)
    }
  }
  async checkAuth() {
    try {
      const response = await axios.get<AuthResponse>(`${import.meta.env.SERVER_URL}/refresh_token`, {withCredentials: true})
      // console.log(response)
      
      localStorage.setItem('token', response.data.accessToken)
      this.setUser(response.data.userInfo)
    } catch (e:any) {
      console.log(e.response?.data?.error)
    }
  }


}

export default new userStore();

