import useFileImage from "../../../../hooks/useFileImage";
import {useQuery} from "@tanstack/react-query";
import userApi from "../../../../api/user.api";
import {Controller, useForm} from "react-hook-form";
import MyInput from "../../../../components/input/MyInput";
import {UserSchema, userSchema} from "../../../../utils/validate";
import {yupResolver} from "@hookform/resolvers/yup";
import DateSelect from "../../components/DateSelect/DateSelect";

type FormData = Pick<
	UserSchema,
	"userName" | "address" | "date_of_birth" | "phone"
>;
const profileSchema = userSchema.pick([
	"userName",
	"phone",
	"date_of_birth",
	"address",
]);
const Profile = () => {
	const {fileDataURL, handleChangeFile, handleResetFile, fileInputRef} =
		useFileImage();
	const {data: profileData} = useQuery({
		queryKey: ["profile"],
		queryFn: userApi.getProfile,
	});
	const {
		handleSubmit,
		control,
		formState: {errors},
	} = useForm<FormData>({
		defaultValues: {
			userName: "",
			address: "",
			date_of_birth: new Date(1990, 0, 1),
			phone: "",
		},
		resolver: yupResolver(profileSchema),
	});
	const onSubmit = handleSubmit((data) => {
		console.log(data);
	});

	return (
		<div>
			<div className="rounded-md bg-white shadow px-4 pb-10  w-full">
				<div className="border-b border-slate-200 py-4">
					<h3>Hồ Sơ Của Tôi</h3>
					<p className="text-sm">
						Quản lý thông tin hồ sơ để bảo mật tài khoản
					</p>
				</div>
				<form className="flex mt-4" onSubmit={onSubmit}>
					<div className="flex-grow pl-6 pr-12">
						<div className="flex flex-wrap items-center">
							<div className="w-[20%] capitalize text-sm text-gray-500 text-right">
								Tên đăng nhập
							</div>
							<div className="w-[80%] pl-5">phanthanhtincr7</div>
						</div>
						<div className="flex flex-wrap mt-4 items-center">
							<label
								className="w-[20%] capitalize text-sm text-gray-500 text-right"
								htmlFor="userName"
							>
								Tên
							</label>
							<div className="w-[80%] pl-5">
								<MyInput
									name="userName"
									id="userName"
									type="text"
									placeholder="enter your name"
									control={control}
									errorMessage={errors.userName?.message}
								/>
							</div>
						</div>
						<div className="flex flex-wrap mt-4 items-center">
							<div className="w-[20%] capitalize text-sm text-gray-500 text-right">
								Số điện thoại
							</div>
							<div className="w-[80%] pl-5">
								<MyInput
									name="phone"
									id="phone"
									type="number"
									placeholder="enter your name"
									control={control}
									errorMessage={errors.phone?.message}
								/>
							</div>
						</div>
						<div className="flex flex-wrap mt-4 items-center">
							<div className="w-[20%] capitalize text-sm text-gray-500 text-right">
								địa chỉ
							</div>
							<div className="w-[80%] pl-5">
								<MyInput
									name="address"
									id="address"
									type="text"
									placeholder="enter your name"
									control={control}
									errorMessage={errors.address?.message}
								/>
							</div>
						</div>
						<Controller
							control={control}
							name="date_of_birth"
							render={({field}) => {
								console.log(field.value);
								return (
									<DateSelect
										value={field.value}
										onChange={field.onChange}
										errorMessage={errors.date_of_birth?.message}
									/>
								);
							}}
						/>

						<div className="flex flex-wrap mt-4 items-center">
							<div className="w-[20%] capitalize text-right"></div>
							<div className="w-[80%] pl-5">
								<button
									type="submit"
									className="bg-primary rounded-sm px-8 py-2 text-white"
								>
									Lưu
								</button>
							</div>
						</div>
					</div>
					<div className="w-72 flex justify-center border-l border-slate-200">
						<div className="flex flex-col gap-2 items-center">
							<div className="h-24 w-24">
								<img
									src="https://images.unsplash.com/photo-1682999028840-2457da56071c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
									alt=""
									className="w-full h-full object-cover rounded-full"
								/>
							</div>
							<input
								className=" w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hidden"
								accept=".png, .jpg, .jpeg"
								type="file"
								ref={fileInputRef}
								onChange={handleChangeFile}
								id="actual-btn"
							/>
							<button
								type="button"
								className="py-2 px-4 border border-slate-200 rounded-sm capitalize text-gray-500  text-sm"
								onClick={() => {
									fileInputRef.current?.click();
								}}
							>
								Chọn ảnh
							</button>
							<div className="L4SAGB">
								<div className="text-sm text-gray-500">
									Dụng lượng file tối đa 1 MB
								</div>
								<div className="text-sm text-gray-500">
									Định dạng:.JPEG, .PNG
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Profile;
