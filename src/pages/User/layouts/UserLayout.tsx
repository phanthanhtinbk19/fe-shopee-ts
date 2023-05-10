import React from "react";
import UserSideNav from "../components/UserSideNav/UserSideNav";
import {Outlet} from "react-router-dom";

const UserLayout = () => {
	return (
		<div className="bg-gray-100 py-4">
			<div className="container">
				<div className="grid grid-cols-12 gap-5">
					<div className="col-span-2">
						<UserSideNav />
					</div>
					<div className="col-span-10">
						<Outlet />
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserLayout;
