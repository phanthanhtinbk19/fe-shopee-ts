import * as yup from "yup";
const registerSchema = yup.object({
	email: yup.string().email("Email is invalid").required("Email is required"),
	password: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.required("Password is required"),
	confirm_password: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.required("Confirm Password is required")
		.oneOf([yup.ref("password")], "Passwords must match"),
});
const schema = yup.object({
	email: yup.string().email("Email is invalid").required("Email is required"),
	password: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.required("Password is required"),
	confirmPassword: yup
		.string()
		.min(5, "Password must be at least 5 characters")
		.required("Confirm Password is required")
		.oneOf([yup.ref("password")], "Passwords must match"),
	search: yup.string().trim().required("Search is required"),
});

const userSchema = yup.object({
	userName: yup.string().trim().required("User name is required"),
	phone: yup
		.string()
		.trim()
		.max(10, "Độ dài tối đa là 10 kí tự")
		.required("Phone is required"),
	address: yup
		.string()
		.trim()
		.max(160, "Độ dài tối đa là 160 kí tự")
		.required("Address is required"),
	password: schema.fields.password,
	date_of_birth: yup.date().max(new Date(), "Hãy chọn một ngày trong khóa khứ"),
	newPassword: schema.fields.password,
	confirmPassword: schema.fields.confirmPassword,
});
const loginSchema = registerSchema.omit(["confirm_password"]);
export type UserSchema = yup.InferType<typeof userSchema>;
export type Schema = yup.InferType<typeof schema>;

export {loginSchema, registerSchema, schema, userSchema};
