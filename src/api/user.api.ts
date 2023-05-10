import {User} from "../types/user.type";
import {SuccessResponseApi} from "../types/utils.type";
import http from "../utils/http";
interface BodyUpdateProfile
	extends Omit<User, "id" | "createdAt" | "roles" | "updatedAt"> {
	password: string;
	newPassword: string;
}
const userApi = {
	getProfile: () => {
		return http.get<SuccessResponseApi<User>>("/users/me");
	},
	updateProfile: (body: BodyUpdateProfile) => {
		return http.put<SuccessResponseApi<User>>("/users/profile", body);
	},
	uploadAvatar: (body: FormData) => {
		return (
			http.post("/users/upload-avatar", body),
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);
	},
};
export default userApi;
