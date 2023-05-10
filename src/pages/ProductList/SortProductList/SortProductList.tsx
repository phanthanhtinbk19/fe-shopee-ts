import React from "react";
import {AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
import {QueryConfig} from "../ProductList";
import {sortBy} from "../../../constants/product";
import {ProductListConfig} from "../../../types/product.type";
import {Link, createSearchParams, useNavigate} from "react-router-dom";
import {omit} from "lodash";
interface Props {
	totalPage: number;
	queryConfig: QueryConfig;
}
const SortProductList = ({queryConfig, totalPage}: Props) => {
	const navigate = useNavigate();
	const {sort_by = sortBy.createdAt, order} = queryConfig;
	const page = Number(queryConfig.page);

	const isActiveSortBy = (
		sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
	) => {
		return sort_by === sortByValue;
	};
	const handleSort = (
		sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
	) => {
		navigate({
			pathname: "/product-list",
			search: createSearchParams(
				omit(
					{
						...queryConfig,
						sort_by: sortByValue,
					},
					["order"]
				)
			).toString(),
		});
	};
	const handlePriceOrder = (
		sortByValue: Exclude<ProductListConfig["order"], undefined>
	) => {
		navigate({
			pathname: "/product-list",
			search: createSearchParams({
				...queryConfig,
				sort_by: sortBy.price,
				order: sortByValue,
			}).toString(),
		});
	};
	return (
		<div className="bg-[rgba(0,0,0,.03)] py-4 px-3">
			<div className="flex justify-between">
				<div className="flex justify-center items-center gap-2">
					<span>Sắp xếp theo</span>
					<button
						className={`h-8 px-4 rounded-sm  text-sm capitalize ${
							isActiveSortBy("view")
								? "bg-primary hover:bg-primary/80 text-white"
								: "bg-white hover:bg-slate-100 text-black"
						}`}
						onClick={() => handleSort("view")}
					>
						Phổ biến
					</button>
					<button
						className={`h-8 px-4 rounded-sm  text-sm capitalize ${
							isActiveSortBy("createdAt")
								? "bg-primary hover:bg-primary/80 text-white"
								: "bg-white hover:bg-slate-100 text-black"
						}`}
						onClick={() => handleSort("createdAt")}
					>
						Mới nhất
					</button>
					<button
						className={`h-8 px-4 rounded-sm  text-sm capitalize ${
							isActiveSortBy("sold")
								? "bg-primary hover:bg-primary/80 text-white"
								: "bg-white hover:bg-slate-100 text-black"
						}`}
						onClick={() => handleSort("sold")}
					>
						Bán chạy
					</button>

					<select
						id="countries"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm  block h-8 px-2 "
						value={order || ""}
						onChange={(e) =>
							handlePriceOrder(
								e.target.value as Exclude<ProductListConfig["order"], undefined>
							)
						}
						defaultValue={""}
					>
						<option value="" disabled>
							Giá
						</option>
						<option value="asc">Giá: Từ thấp đến cao</option>
						<option value="desc">Giá: Từ cao đến thấp</option>
					</select>
				</div>
				<div className="flex justify-center gap-4 items-center">
					<div className="text-sm">
						<span className="text-primary">{Number(page)}</span>
						<span>/{totalPage}</span>
					</div>
					<div className="flex items-center gap-[1px]">
						{page === 1 ? (
							<button className="p-2 rounded-sm bg-[#f9f9f9] cursor-not-allowed">
								<AiOutlineLeft size={14} fill="gray" />
							</button>
						) : (
							<Link
								to={{
									pathname: "/product-list",
									search: createSearchParams({
										...queryConfig,
										page: (page - 1).toString(),
									}).toString(),
								}}
								className="p-2 rounded-sm bg-white "
							>
								<AiOutlineLeft size={14} fill="gray" />
							</Link>
						)}

						{page === totalPage ? (
							<button className="p-2 rounded-sm bg-[#f9f9f9] cursor-not-allowed">
								<AiOutlineRight size={14} fill="gray" />
							</button>
						) : (
							<Link
								to={{
									pathname: "/product-list",
									search: createSearchParams({
										...queryConfig,
										page: (page + 1).toString(),
									}).toString(),
								}}
								className="p-2 rounded-sm bg-white"
							>
								<AiOutlineRight size={14} />
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SortProductList;
