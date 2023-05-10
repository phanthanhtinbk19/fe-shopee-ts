import React from "react";
import {AiFillCaretRight, AiOutlineMenu} from "react-icons/ai";
import {BiFilterAlt} from "react-icons/bi";
import {Link, createSearchParams} from "react-router-dom";
import Button from "../../../components/button/Button";
import ReactStars from "react-stars";
import {Category} from "../../../types/category.type";
import {QueryConfig} from "../ProductList";
interface Props {
	categories: Category[];
	queryConfig: QueryConfig;
}
const AsideFilter = ({categories, queryConfig}: Props) => {
	const ratingChanged = (newRating: number) => {
		console.log(typeof newRating);
	};
	const {category: categoryConfig} = queryConfig;

	return (
		<div className="">
			<div className="">
				<Link
					to="/product-list"
					className={`flex gap-2 items-center  font-bold py-4 ${
						!categoryConfig ? "text-primary" : " "
					}`}
				>
					<span>
						<AiOutlineMenu />
					</span>
					Tất cả Danh mục
				</Link>
				<div className="flex flex-col gap-2 py-4 border-t border-slate-300">
					{categories?.map((category) => {
						const isActive = category.id.toString() === categoryConfig;
						return isActive ? (
							<Link
								key={category.id}
								to={{
									pathname: "/product-list",
									search: createSearchParams({
										...queryConfig,
										category: category.id.toString(),
									}).toString(),
								}}
								className="flex items-center gap-2 text-primary font-medium text-sm"
							>
								<AiFillCaretRight />
								{category.name}
							</Link>
						) : (
							<Link
								key={category.id}
								to={{
									pathname: "/product-list",
									search: createSearchParams({
										...queryConfig,
										category: category.id.toString(),
									}).toString(),
								}}
								className="flex items-center gap-2  font-medium text-sm"
							>
								{category.name}
							</Link>
						);
					})}
				</div>
			</div>
			<div>
				<div className=" pb-2">
					<Link to="/" className="flex gap-2 items-center  font-bold">
						<BiFilterAlt />
						Bộ lọc tìm kiếm
					</Link>
				</div>
				<div>
					<div>Theo Danh Mục</div>
					<div className="flex flex-col gap-2 py-4">
						<div className="flex items-center">
							<input
								checked={false}
								id="checked-checkbox"
								type="checkbox"
								value=""
								className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded"
							/>
							<label
								htmlFor="checked-checkbox"
								className="ml-2 text-sm  text-gray-900 "
							>
								Áo thun (643k+)
							</label>
						</div>
						<div className="flex items-center">
							<input
								checked={false}
								id="checked-checkbox"
								type="checkbox"
								value=""
								className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded"
							/>
							<label
								htmlFor="checked-checkbox"
								className="ml-2 text-sm  text-gray-900 "
							>
								Áo thun (643k+)
							</label>
						</div>
						<div className="flex items-center">
							<input
								checked={false}
								id="checked-checkbox"
								type="checkbox"
								value=""
								className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 rounded"
							/>
							<label
								htmlFor="checked-checkbox"
								className="ml-2 text-sm  text-gray-900 "
							>
								Áo thun (643k+)
							</label>
						</div>
					</div>
				</div>

				<div className="py-4 border-t border-slate-300">
					<div>Khoảng giá</div>
					<form className="my-4">
						<div className="flex items-center gap-2">
							<input
								type="text"
								className="w-[80px] h-[30px] font-light px-2 border border-slate-400 rounded-sm"
								placeholder="Từ"
							/>
							<span className="w-4 h-[1px] bg-red-400"></span>
							<input
								type="text"
								className="w-[80px] h-[30px] font-light px-2"
								placeholder="Đến"
							/>
						</div>
					</form>
					<Button className="text-sm uppercase bg-primary text-center text-white w-full p-2 rounded-sm">
						Áp dụng
					</Button>
				</div>
				<div className="py-4 border-t border-slate-300">
					<div>Đánh giá</div>
					<div>
						<ReactStars
							count={5}
							value={5}
							onChange={ratingChanged}
							size={20}
							color2={"#ffd700"}
						/>
						<div className="flex gap-2 items-center">
							<ReactStars
								count={5}
								value={4}
								onChange={ratingChanged}
								size={20}
								color2={"#ffd700"}
							/>
							<span>trở lên</span>
						</div>
					</div>
				</div>
				<div className="py-4 border-t border-slate-300">
					<Button className="text-sm uppercase bg-primary text-center text-white w-full p-2 rounded-sm">
						Xóa tất cả
					</Button>
				</div>
			</div>
		</div>
	);
};

export default AsideFilter;
