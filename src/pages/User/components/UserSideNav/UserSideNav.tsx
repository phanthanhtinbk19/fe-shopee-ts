import {Link} from "react-router-dom";
import path from "../../../../constants/path";
import {BsFillPencilFill} from "react-icons/bs";
import {AiOutlineUser} from "react-icons/ai";
import {TbNotes} from "react-icons/tb";
const UserSideNav = () => {
	return (
		<div>
			<div className="flex items-center gap-4 border-b border-slate-200 py-4">
				<Link to={path.profile}>
					<img
						src="https://images.unsplash.com/photo-1682685796063-d2604827f7b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
						alt=""
						className="w-7 h-7 object-cover rounded-full"
					/>
				</Link>
				<div>
					<div className="font-bold text-sm">phanthanhtincr7</div>
					<Link to={path.profile} className="flex items-center gap-1">
						<BsFillPencilFill className="text-gray-500" />
						<span className="capitalize text-sm text-gray-500">Sửa hồ sơ</span>
					</Link>
				</div>
			</div>
			<div className="mt-3">
				<Link to={path.profile} className="flex items-center gap-2">
					<AiOutlineUser className="text-blue-500" />
					<span className="capitalize text-sm">Tài khoản của tôi</span>
				</Link>
			</div>
			<div className="mt-3">
				<Link to={path.profile} className="flex items-center gap-2">
					<AiOutlineUser className="text-blue-500" />
					<span className="capitalize text-sm">Đổi mật khẩu</span>
				</Link>
			</div>
			<div className="mt-3">
				<Link to={path.profile} className="flex items-center gap-2">
					<TbNotes className="text-blue-500" />
					<span className="capitalize text-sm">Đơn Mua</span>
				</Link>
			</div>
		</div>
	);
};

export default UserSideNav;
