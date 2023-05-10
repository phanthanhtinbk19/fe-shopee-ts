import {AuthResponse} from "../types/auth.type";
import http from "../utils/http";

export const registerAccount = (body: {email: string; password: string}) =>
	http.post<AuthResponse>("/auth/register", body);
export const loginAccount = (body: {email: string; password: string}) =>
	http.post<AuthResponse>("/auth/login", body);

export const logoutAccount = () => http.post("/auth/logout");
