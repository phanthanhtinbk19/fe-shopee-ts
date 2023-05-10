import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Input from "../../components/input/Input";
import {Schema, registerSchema} from "../../utils/validate";
import {Link, useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {registerAccount} from "../../api/auth.api";
import {omit} from "lodash";
import {isAxiosUnprocessableEntity} from "../../utils/utils";
import {ErrorResponseApi} from "../../types/utils.type";
import Button from "../../components/button/Button";
import path from "../../constants/path";

type FormData = Schema;
const Register = () => {
	const navigate = useNavigate();
	const registerAccountMutation = useMutation({
		mutationFn: (body: Omit<FormData, "confirmPassword">) =>
			registerAccount(body),
	});
	const {
		register,
		handleSubmit,
		setError,
		watch,
		formState: {errors},
	} = useForm<FormData>({
		resolver: yupResolver(registerSchema),
	});

	const onSubmit = handleSubmit((data) => {
		const body = omit(data, ["confirmPassword"]);
		registerAccountMutation.mutate(body, {
			onSuccess: () => {
				navigate("/login");
			},
			onError: (error) => {
				if (
					isAxiosUnprocessableEntity<
						ErrorResponseApi<Omit<FormData, "confirmPassword">>
					>(error)
				) {
					const formError = error?.response?.data.data;
					if (formError) {
						Object.keys(formError).forEach((key) => {
							setError(key as keyof Omit<FormData, "confirmPassword">, {
								message:
									formError[key as keyof Omit<FormData, "confirmPassword">],
								type: "Server",
							});
						});
					}
					// if (formError?.message) {
					// 	setError("email", {
					// 		message: formError?.message,
					// 		type: "Server",
					// 	});
					// }
					// if (formError?.password) {
					// 	setError("password", {
					// 		message: formError.message,
					// 		type: "Server",
					// 	});
					// }
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
							<h2 className="text-lg text-bold mb-5">Đăng ký</h2>
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
							<div className="mb-5">
								<Input
									type="password"
									register={register}
									name="confirmPassword"
									placeholder="Enter your password"
									className=""
									errorMessage={errors.confirmPassword?.message}
								/>
							</div>
							<Button
								type="submit"
								className="text-white  bg-primary text-bold w-full text-center p-2 rounded-md"
								isLoading={registerAccountMutation.isLoading}
								disabled={registerAccountMutation.isLoading}
							>
								Đăng ký
							</Button>

							<p className="text-center text-sm mt-5">
								<span className="text-[rgba(0,0,0,.26)]">
									Bạn đã có tài khoản?
								</span>{" "}
								<Link className="text-primary" to={path.login}>
									Đăng nhập
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
