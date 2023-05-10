export interface User {
	id: number;
	userName: string;
	roles: string[];
	email: string;
	address?: string;
	avatar?: string;
	phone?: string;
	date_of_birth?: string;
	updatedAt: string;
	createdAt: string;
}
