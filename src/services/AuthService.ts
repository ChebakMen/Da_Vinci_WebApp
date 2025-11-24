import { AxiosResponse } from "axios";
import $api from "../http";
import { AuthResponse } from "../models/AuthResponce";
import { IUser } from "@/models/IUser";

class AuthService {
    static async login(email:string,password: string): Promise<AxiosResponse<AuthResponse>>{
      return $api.post<AuthResponse>("/login", {email, password})
    }
    static async registration(userData: IUser & { password: string }): Promise<AxiosResponse<AuthResponse>> {
      return $api.post<AuthResponse>("/registration", userData);
    }
    static async logout(): Promise<AxiosResponse<AuthResponse>>{
      return $api.post<AuthResponse>("/logout")
    }
}

export default AuthService