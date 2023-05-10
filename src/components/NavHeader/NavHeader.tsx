import React from "react";
import {BiChevronDown} from "react-icons/bi";
import {MdOutlineLanguage} from "react-icons/md";
import Popover from "../popover/Popover";
import {useAuthentication} from "../../contexts/app.context";
import {Link} from "react-router-dom";
import {logoutAccount} from "../../api/auth.api";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import {purchaseStatus} from "../../constants/purchase";

const NavHeader = () => {
	const queryClient = useQueryClient();
	const {isAuthenticated, setIsAuthenticated, setProfile, profile} =
		useAuthentication();
	const logoutAccountMutation = useMutation({
		mutationFn: () => logoutAccount(),
		onSuccess: () => {
			setIsAuthenticated(false);
			setProfile(null);
			queryClient.removeQueries({
				queryKey: ["purchases", {status: purchaseStatus?.inCart}],
			});
		},
	});
	const handleLogout = () => {
		logoutAccountMutation.mutate();
	};

	return (
		<div className="flex gap-5 justify-end ">
			<Popover
				className="flex justify-end items-center gap-1 text-white hover:opacity-70 cursor-pointer"
				renderPopover={
					<div className="bg-white shadow-sm border border-gray-200 rounded-sm w-[150px]">
						<div className="flex flex-col px-2">
							<button className="p-2 text-left hover:text-primary">
								Tiếng việt
							</button>
							<button className="p-2 text-left hover:text-primary">
								English
							</button>
						</div>
					</div>
				}
			>
				<MdOutlineLanguage className="text-white" />
				<span className="text-sm font-light">Tiếng việt</span>
				<BiChevronDown size={20} />
			</Popover>
			{isAuthenticated && (
				<Popover
					className="flex items-center text-white  gap-2 hover:opacity-70 cursor-pointer"
					renderPopover={
						<div className="bg-white shadow-sm border border-gray-200 rounded-sm ">
							<div className="flex flex-col gap-2 items-start">
								<Link
									className="hover:text-cyan-400 p-2 text-sm hover:bg-gray-200 w-full"
									to="/profile"
								>
									Tài khoản của tôi
								</Link>
								<Link
									className="hover:text-cyan-400 p-2 text-sm hover:bg-gray-200 w-full"
									to="/"
								>
									Đơn mua
								</Link>
								<button
									className="hover:text-cyan-400 p-2 text-sm hover:bg-gray-200 w-full text-left"
									onClick={handleLogout}
								>
									Đăng xuất
								</button>
							</div>
						</div>
					}
				>
					<div className="flex-shrink-0 w-5 h-5">
						<img
							className="w-full h-full rounded-full object-cover"
							src="https://images.unsplash.com/photo-1682949029784-7776704dae01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=60"
							alt=""
						/>
					</div>
					<span className="text-sm">{profile?.userName || profile?.email}</span>
				</Popover>
			)}

			{!isAuthenticated && (
				<div className="flex items-center gap-2">
					<Link to="/register" className="text-sm text-white hover:opacity-70">
						Đăng ký
					</Link>
					<div className="border-r-[1px] border-r-white/40 h-4"></div>
					<Link to="/login" className="text-sm text-white hover:opacity-70">
						Đăng nhập
					</Link>
				</div>
			)}
		</div>
	);
};

export default NavHeader;
