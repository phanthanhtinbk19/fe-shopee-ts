import React from "react";
import AsideFilter from "./AsideFilter/AsideFilter";
import SortProductList from "./SortProductList/SortProductList";
import Product from "./Product/Product";
import useQueryParams from "../../hooks/useQueryParams";
import {useQuery} from "@tanstack/react-query";
import productApi from "../../api/product.api";
import Pagination from "../../components/pagination/Pagination";
import {ProductListConfig} from "../../types/product.type";
import {isUndefined, omitBy} from "lodash";
import categoryApi from "../../api/category.api";
import useQueryConfig from "../../hooks/useQueryConfig";

export type QueryConfig = {
	[key in keyof ProductListConfig]: string;
};
const ProductList = () => {
	const queryConfig = useQueryConfig();

	const {data: productsData} = useQuery({
		queryKey: ["products", queryConfig],
		queryFn: () => {
			return productApi.getProducts(queryConfig as ProductListConfig);
		},
		keepPreviousData: true,
		staleTime: 3 * 60 * 1000,
	});
	const {data: categoriesData} = useQuery({
		queryKey: ["categories"],
		queryFn: () => {
			return categoryApi.getCategories();
		},
		keepPreviousData: true,
	});

	return (
		<div className="bg-[#f5f5f5] pt-4">
			<div className="container ">
				<div className="grid grid-cols-12 gap-6">
					<div className="col-span-2">
						<AsideFilter
							queryConfig={queryConfig}
							categories={categoriesData?.data?.data || []}
						/>
					</div>

					{productsData?.data && (
						<div className="col-span-10">
							<SortProductList
								queryConfig={queryConfig}
								totalPage={productsData?.data?.data?.pagination?.page_size}
							/>
							<div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
								{productsData?.data?.data?.products?.map((product) => (
									<Product key={product.id} product={product} />
								))}
							</div>
							<div className="mt-5">
								<Pagination
									queryConfig={queryConfig}
									totalPage={productsData?.data?.data?.pagination?.page_size}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ProductList;
