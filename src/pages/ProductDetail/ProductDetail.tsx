import {FiMinus, FiPlus} from "react-icons/fi";
// eslint-disable-next-line import/no-unresolved
import "swiper/css";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/navigation";
// eslint-disable-next-line import/no-unresolved
import "swiper/css/thumbs";

import ReactStars from "react-stars";
import {BiChevronLeft, BiChevronRight} from "react-icons/bi";
import {AiOutlineShoppingCart} from "react-icons/ai";
import {Link, useNavigate, useParams} from "react-router-dom";
import productApi from "../../api/product.api";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useMemo, useRef, useState} from "react";
import {
	Product as ProductType,
	ProductListConfig,
} from "../../types/product.type";
import {getIdFromNameId} from "../../utils/utils";
import Product from "../ProductList/Product/Product";
import QuantityController from "../../components/quantity-controller/QuantityController";
import purchaseApi from "../../api/purchase";

import {purchaseStatus} from "../../constants/purchase";
import {toast} from "react-toastify";
import path from "../../constants/path";

const ProductDetail = () => {
	const queryClient = useQueryClient();
	const {nameId} = useParams();
	const id = getIdFromNameId(nameId as string);
	const {data: productData} = useQuery({
		queryKey: ["product", id],
		queryFn: () => {
			return productApi.getProductDetail(id as string);
		},
	});
	const [currentIndexImages, setCurrentIndexImages] = useState([0, 5]);
	const [activeImage, setActiveImage] = useState("");
	const product = productData?.data?.data;
	const currentImages = useMemo(
		() => product?.images.slice(...currentIndexImages),
		[currentIndexImages, product?.images]
	);
	const queryConfig: ProductListConfig = {
		limit: "10",
		page: "1",
		category: product?.categoryData?.id,
	};
	const {data: productsData} = useQuery({
		queryKey: ["products", queryConfig],
		queryFn: () => {
			return productApi.getProducts(queryConfig);
		},
		enabled: Boolean(product),
		staleTime: 3 * 60 * 1000,
	});

	useEffect(() => {
		if (product && product.images.length > 0) {
			setActiveImage(product.images[0]);
		}
	}, [product]);

	const handelChooseImage = (img: string) => {
		setActiveImage(img);
	};
	const handleNextSlide = () => {
		if (currentIndexImages[1] < (product as ProductType)?.images.length) {
			setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1]);
		}
	};
	const handlePrevSlide = () => {
		if (currentIndexImages[0] > 0) {
			setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1]);
		}
	};
	const imageRef = useRef<HTMLImageElement>(null);
	const handleZoomImage = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const image = imageRef.current as HTMLImageElement;
		const {naturalWidth, naturalHeight} = image;
		const offsetX = e.pageX - (rect.x + window.scrollX);
		const offsetY = e.pageY - (rect.y + window.scrollY);
		const top = offsetY * (1 - naturalHeight / rect.height);
		const left = offsetX * (1 - naturalWidth / rect.width);
		image.style.width = naturalWidth + "px";
		image.style.height = naturalHeight + "px";
		image.style.maxWidth = "unset";
		image.style.top = top + "px";
		image.style.left = left + "px";
	};
	const handleRemoveZoomImage = () => {
		imageRef.current?.removeAttribute("style");
	};

	const [buyCount, setBuyCount] = useState(1);
	const handleBuyCount = (value: number) => {
		setBuyCount(value);
	};

	const addToCartMutation = useMutation({
		mutationFn: (body: {buyCount: number; productId: number}) =>
			purchaseApi.addToCart(body),
	});

	const addToCart = () => {
		addToCartMutation.mutate(
			{
				buyCount: buyCount,
				productId: product?.id as number,
			},
			{
				onSuccess: () => {
					queryClient.invalidateQueries({
						queryKey: ["purchases", {status: purchaseStatus?.inCart}],
					});
					toast.success("Thêm vào giỏ hàng thành công");
				},
			}
		);
	};
	const navigate = useNavigate();
	const handleBuyNow = async () => {
		const res = await addToCartMutation.mutateAsync({
			buyCount: buyCount,
			productId: product?.id as number,
		});
		const purchase = res?.data?.data;
		navigate(path.cart, {
			state: {
				purchaseId: purchase.id,
			},
		});
	};

	return (
		<div>
			<div className="bg-gray-100 py-5">
				<div className="container">
					<div className="bg-white shadow p-4">
						<div className="grid grid-cols-12 gap-9">
							<div className="col-span-5">
								<div
									className="relative w-full pt-[100%] shadow overflow-hidden"
									onMouseMove={handleZoomImage}
									onMouseLeave={handleRemoveZoomImage}
								>
									<img
										src={activeImage}
										alt=""
										className="absolute top-0 left-0 h-full w-full object-cover"
										ref={imageRef}
									/>
								</div>
								<div className="relative grid grid-cols-5 mt-4 gap-2">
									<button
										className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-9 z-10 bg-black/20 text-white"
										onClick={handlePrevSlide}
									>
										<BiChevronLeft />
									</button>
									{currentImages?.map((img, index) => {
										const isActive = img === activeImage;

										return (
											<div
												key={index}
												className="relative w-full pt-[100%] shadow cursor-pointer"
												onMouseEnter={() => handelChooseImage(img)}
											>
												<img
													src={img}
													alt=""
													className="absolute top-0 left-0 h-full w-full object-cover"
												/>
												{isActive && (
													<div className="absolute inset-0 border border-primary"></div>
												)}
											</div>
										);
									})}
									<button
										className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-9 z-10 bg-black/20 text-white"
										onClick={handleNextSlide}
									>
										<BiChevronRight />
									</button>
								</div>
							</div>
							<div className="col-span-7">
								<h1 className="text-xl font-medium">
									Giày Convers Chuck taylor 1970s đen trắng cổ thấp cao cổ, giày
									cv 1970s chuẩn S.Cấp Full pk
								</h1>
								<div className="flex items-center gap-4">
									<div className="flex items-center gap-1">
										<span className="text-sm font-medium text-primary">
											4.7
										</span>
										<ReactStars
											count={5}
											size={20}
											color2={"#f6442e"}
											value={4}
											edit={false}
										/>
									</div>
									<div className="mx bg-gray-300 w-[1px] h-5"></div>
									<div className="flex items-center gap-1">
										<span className="text-black font-medium underline">
											536
										</span>
										<span className="text-gray-500 text-sm">Đánh giá</span>
									</div>
									<div className="mx bg-gray-300 w-[1px] h-5"></div>
									<div className="flex items-center gap-1">
										<span className="text-black font-medium">22,2k</span>
										<span className="text-gray-500 text-sm">Đã bán</span>
									</div>
								</div>
								<div className="bg-gray-100 p-4">
									<div className="flex items-center gap-4">
										<div className="text-gray-500 line-through flex items-center">
											<span className="text-xs">₫</span>
											<span>550.000</span>
										</div>
										<div className="text-primary  flex items-center text-2xl font-medium">
											<span className="text-xs">₫</span>
											<span>349.000</span>
										</div>
										<div className="text-white  bg-primary rounded-md flex items-center">
											<span className="text-xs font-medium p-1 ">Giảm 36%</span>
										</div>
									</div>
								</div>

								<div className="flex  my-4">
									<h3 className="text-sm font-bold w-[100px]">Size :</h3>
									<div className="flex flex-wrap gap-4">
										<label htmlFor="color_tt" className="cursor-pointer">
											<input
												type="radio"
												name="color"
												id="color_tt"
												className="peer sr-only"
											/>

											<span className="group inline-block rounded-sm border px-3 py-1 text-sm font-medium peer-checked:bg-black peer-checked:text-white">
												Texas Tea
											</span>
										</label>

										<label htmlFor="color_fr" className="cursor-pointer">
											<input
												type="radio"
												name="color"
												id="color_fr"
												className="peer sr-only"
											/>

											<span className="group inline-block  rounded-sm border px-3 py-1 text-sm font-medium peer-checked:bg-black peer-checked:text-white">
												Fiesta Red
											</span>
										</label>

										<label htmlFor="color_cb" className="cursor-pointer">
											<input
												type="radio"
												name="color"
												id="color_cb"
												className="peer sr-only"
											/>

											<span className="group text-sm inline-block  rounded-sm border px-3 py-1  font-medium peer-checked:bg-black peer-checked:text-white">
												Cobalt Blue
											</span>
										</label>
									</div>
								</div>
								<div className="flex my-4">
									<h3 className="text-sm font-bold w-[100px]">Phân loại :</h3>
									<div className="flex flex-wrap gap-4 ">
										<label htmlFor="color_tt" className="cursor-pointer">
											<input
												type="radio"
												name="color"
												id="color_tt"
												className="peer sr-only"
											/>

											<span className="group inline-block rounded-sm border px-3 py-1 text-sm font-medium peer-checked:bg-black peer-checked:text-white">
												Texas Tea
											</span>
										</label>

										<label htmlFor="color_fr" className="cursor-pointer">
											<input
												type="radio"
												name="color"
												id="color_fr"
												className="peer sr-only"
											/>

											<span className="group inline-block  rounded-sm border px-3 py-1 text-sm font-medium peer-checked:bg-black peer-checked:text-white">
												Fiesta Red
											</span>
										</label>

										<label htmlFor="color_cb" className="cursor-pointer">
											<input
												type="radio"
												name="color"
												id="color_cb"
												className="peer sr-only"
											/>

											<span className="group text-sm inline-block  rounded-sm border px-3 py-1  font-medium peer-checked:bg-black peer-checked:text-white">
												Cobalt Blue
											</span>
										</label>
									</div>
								</div>
								<div className="flex items-center my-4">
									<h3 className="text-sm font-bold w-[100px]">Số Lượng :</h3>
									{product?.quantity && (
										<>
											<QuantityController
												onDecrease={handleBuyCount}
												onIncrease={handleBuyCount}
												onType={handleBuyCount}
												value={buyCount}
												max={product?.quantity}
											/>
											<div className="text-sm text-gray-500 ml-5">
												{product?.quantity} sản phẩm có sẵn
											</div>
										</>
									)}
								</div>
								<div className="flex items-center gap-5 mt-10 ">
									<button
										className="flex items-center gap-2 border border-primary py-2 px-4 text-primary bg-primary/20 rounded-sm"
										onClick={addToCart}
									>
										<AiOutlineShoppingCart size={20} />
										<span className="capitalize">thêm vào giỏ hàng</span>
									</button>
									<button
										className="flex items-center gap-2  py-2  px-4 text-white bg-primary rounded-sm capitalize"
										onClick={handleBuyNow}
									>
										Mua ngay
									</button>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-white shadow p-4 mt-5 rounded-sm">
						<div className="bg-gray-100 p-3">
							<h2>MÔ TẢ SẢN PHẨM</h2>
						</div>
					</div>
					<div className="bg-white shadow p-4 mt-5 rounded-sm">
						<div className="bg-gray-100 p-3">
							<h2>SẢN PHẨM LIÊN QUAN</h2>
							<div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
								{productsData?.data?.data?.products?.map((product) => (
									<Product key={product.id} product={product} />
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
