import React from "react";
import ReactStars from "react-stars";
import {Product as ProductType} from "../../../types/product.type";
import {
	formatCurrency,
	formatNumberToSocialStyle,
	generateNameId,
} from "../../../utils/utils";
import {Link} from "react-router-dom";

interface Props {
	product: ProductType;
}
const Product = ({product}: Props) => {
	return (
		<Link
			to={`/product-list/${generateNameId({
				name: product.name,
				id: product.id.toString(),
			})}`}
			className="shadow rounded-md transition duration-200 ease-in-out delay-150 hover:-translate-y-1 cursor-pointer"
		>
			<div className="w-full pt-[100%] relative">
				<img
					src={product?.images[0]}
					alt=""
					className="w-full h-full object-cover absolute top-0 left-0 bg-white"
				/>
			</div>
			<div className="p-2 overflow-hidden">
				<p className="line-clamp-2 text-xs font-light">{product.name}</p>
				<div className="flex items-center gap-2 mt-2">
					<div className="text-gray-400 line-through flex items-center gap-[1px]">
						<span className="text-xs">₫</span>
						<span className=" text-sm">
							{formatCurrency(product.price_before_discount)}
						</span>
					</div>
					<span className="text-red-500 font-semibold">
						₫{formatCurrency(product.price)}
					</span>
				</div>
				<div className="flex items-center gap-2 mt-2">
					<ReactStars
						count={5}
						value={product.rating}
						size={14}
						color2={"#ffd700"}
						edit={false}
					/>
					<div className="text-xs font-normal">
						Đã bán {formatNumberToSocialStyle(product.sold)}
					</div>
				</div>
				<div className="text-xs font-normal mt-2">Tp. Hồ Chí Minh</div>
			</div>
		</Link>
	);
};

export default Product;
