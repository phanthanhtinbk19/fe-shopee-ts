import {User} from "./user.type";
import {SuccessResponseApi} from "./utils.type";

export type AuthResponse = SuccessResponseApi<{
	access_token: string;
	user: User;
}>;
