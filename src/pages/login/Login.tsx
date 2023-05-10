import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "../../components/input/Input";
import {loginSchema, Schema} from "../../utils/validate";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {loginAccount} from "../../api/auth.api";
import {isAxiosUnprocessableEntity} from "../../utils/utils";
import {ErrorResponseApi} from "../../types/utils.type";
import {useAuthentication} from "../../contexts/app.context";
import Button from "../../components/button/Button";
import path from "../../constants/path";

type FormData = Omit<Schema, "confirm_password">;
const Login = () => {
	const {setIsAuthenticated, setProfile} = useAuthentication();

	const navigate = useNavigate();
	const loginAccountMutation = useMutation({
		mutationFn: (body: FormData) => loginAccount(body),
	});
	const {
		register,
		handleSubmit,
		setError,
		formState: {errors},
	} = useForm<FormData>({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = handleSubmit((data) => {
		loginAccountMutation.mutate(data, {
			onSuccess: (data) => {
				setProfile(data.data.data.user);
				setIsAuthenticated(true);
				navigate("/");
			},
			onError: (error) => {
				if (isAxiosUnprocessableEntity<ErrorResponseApi<FormData>>(error)) {
					const formError = error?.response?.data.data;
					if (formError) {
						Object.keys(formError).forEach((key) => {
							setError(key as keyof FormData, {
								message: formError[key as keyof FormData],
								type: "Server",
							});
						});
					}
				}
			},
		});
	});
	return (
		<div className=" w-full bg-[#f9f0eb]">
			<div className="bg-[url('https://down-vn.img.susercontent.com/file/sg-11134004-23030-vhzme1v5qvov4a')] bg-contain bg-no-repeat bg-center w-full h-[90vh]">
				<div className="grid grid-cols-1 lg:grid-cols-5  lg:py-32 lg:pr-12">
					<div className="lg:col-span-2 lg:col-start-4">
						<form onSubmit={onSubmit} className="rounded-lg p-5 bg-white">
							<h2 className="text-lg text-bold mb-5">Đăng nhập</h2>
							<div className="mb-5">
								<Input
									type="email"
									register={register}
									name="email"
									placeholder="Enter your email"
									className=""
									errorMessage={errors.email?.message}
								/>
							</div>
							<div className="mb-5">
								<Input
									type="password"
									register={register}
									name="password"
									placeholder="Enter your password"
									className=""
									errorMessage={errors.password?.message}
								/>
							</div>

							<Button
								type="submit"
								className="text-white  bg-primary text-bold w-full text-center p-2 rounded-md"
								isLoading={loginAccountMutation.isLoading}
								disabled={loginAccountMutation.isLoading}
							>
								Đăng nhập
							</Button>
							<p className="text-center text-sm mt-5 ">
								<span className="text-[rgba(0,0,0,.26)]">
									Bạn mới biết đến Shopee?
								</span>{" "}
								<Link className="text-primary" to={path.register}>
									Đăng ký ngay
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
