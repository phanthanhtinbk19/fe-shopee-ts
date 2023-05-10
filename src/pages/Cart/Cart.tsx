import {Link, useLocation} from "react-router-dom";
import {FaSortDown} from "react-icons/fa";
import QuantityController from "../../components/quantity-controller/QuantityController";
import {useEffect, useMemo, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Purchase, PurchaseListStatus} from "../../types/purchase";
import purchaseApi from "../../api/purchase";
import {purchaseStatus} from "../../constants/purchase";
import {produce} from "immer";
import {keyBy} from "lodash";
import {toast} from "react-toastify";
import ModalDelete from "../../components/Modal/ModalDelete";
import {formatNumberToSocialStyle, formatCurrency} from "../../utils/utils";
import {useCart} from "../../contexts/cart.context";
import path from "../../constants/path";

const Cart = () => {
	const {extendedPurchases, setExtendedPurchases} = useCart();
	const [showModalDelete, setShowModalDelete] = useState(false);
	const location = useLocation();

	const choosenPurchaseFromLocation = location.state?.purchaseId;
	const {data: purchases, refetch} = useQuery({
		queryKey: ["purchases", {status: purchaseStatus?.inCart}],
		queryFn: () =>
			purchaseApi.getPurchases({
				status: purchaseStatus?.inCart as PurchaseListStatus,
			}),
	});
	const updatePurchaseMutation = useMutation({
		mutationFn: (body: {productId: number; buyCount: number}) =>
			purchaseApi.updatePurchase(body),
		onSuccess: () => {
			refetch();
		},
	});
	const deletePurchaseMutation = useMutation({
		mutationFn: (body: number[]) => purchaseApi.deletePurchase(body),
		onSuccess: () => {
			refetch();
		},
	});

	const purchasesData = purchases?.data?.data;

	const isCheckedAll = extendedPurchases?.every((purchase) => purchase.checked);
	const handleChecked = (id: number) => {
		setExtendedPurchases((prev) =>
			prev.map((purchase) =>
				purchase.id === id
					? {...purchase, checked: !purchase.checked}
					: purchase
			)
		);
	};
	const handleCheckedAll = () => {
		setExtendedPurchases((prev) =>
			prev.map((purchase) => ({...purchase, checked: !isCheckedAll}))
		);
	};

	const handleQuantity = (index: number, value: number, enable: boolean) => {
		if (enable) {
			const purchase = extendedPurchases[index];
			setExtendedPurchases(
				produce((draft) => {
					draft[index].disabled = true;
				})
			);
			updatePurchaseMutation.mutate({
				productId: purchase.productData.id,
				buyCount: value,
			});
		}
	};
	const handleTypeQuantity = (index: number) => (value: number) => {
		setExtendedPurchases(
			produce((draft) => {
				draft[index].buyCount = value;
			})
		);
	};
	const checkedPurchases = useMemo(
		() => extendedPurchases?.filter((purchase) => purchase.checked),
		[extendedPurchases]
	);

	const totalCheckedPurchasePrice = useMemo(
		() =>
			checkedPurchases.reduce((total, purchase) => {
				return total + purchase.price * purchase.buyCount;
			}, 0),
		[checkedPurchases]
	);
	const totalCheckedPurchaseSavingPrice = useMemo(
		() =>
			checkedPurchases.reduce((total, purchase) => {
				return (
					total +
					(purchase.price_before_discount - purchase.price) * purchase.buyCount
				);
			}, 0),
		[checkedPurchases]
	);

	const handleDeletePurchases = (id?: number) => {
		if (id) {
			deletePurchaseMutation.mutate([id]);
		} else {
			deletePurchaseMutation.mutate(
				checkedPurchases?.map((purchase) => purchase.id)
			);
			setShowModalDelete(false);
		}
	};
	const handleShowModalDelete = () => {
		if (checkedPurchases.length > 0) {
			setShowModalDelete(true);
		} else {
			toast.error("Vui lòng chọn sản phẩm cần xóa");
		}
	};
	useEffect(() => {
		purchasesData &&
			setExtendedPurchases((prev) => {
				const extendedPurchaseObject = keyBy(prev, "id");
				return purchasesData.map((purchase) => ({
					...purchase,
					disabled: false,
					checked:
						choosenPurchaseFromLocation === purchase.id ||
						Boolean(extendedPurchaseObject[purchase.id]?.checked),
				}));
			});
	}, [choosenPurchaseFromLocation, purchasesData]);

	useEffect(() => {
		return history.replaceState(null, "", location.pathname);
	});
	useEffect(() => {
		if (showModalDelete) {
			document.body.style.overflow = "hidden";
			return () => {
				document.body.style.overflow = "unset";
			};
		}
	}, [showModalDelete]);

	return (
		<>
			{purchasesData && (
				<div className="bg-slate-50 py-5  relative">
					{purchasesData?.length > 0 ? (
						<>
							<div className="container">
								<div className="bg-white px-5 py-3 rounded-md shadow">
									<div className="grid grid-cols-12 ">
										<div className="col-span-6">
											<div className="flex items-center gap-5">
												<div className="flex items-center flex-shrink-0">
													<input
														type="checkbox"
														className="accent-primary w-4 h-4"
														checked={isCheckedAll}
														onChange={handleCheckedAll}
													/>
												</div>
												<span>Sản Phẩm</span>
											</div>
										</div>
										<div className="col-span-6">
											<div className="grid grid-cols-5 text-center">
												<div className="col-span-2">
													<span className="text-sm text-gray-400 font-medium">
														Đơn Giá
													</span>
												</div>
												<div className="col-span-1">
													<span className="text-sm text-gray-400 font-medium">
														Số Lượng
													</span>
												</div>
												<div className="col-span-1">
													<span className="text-sm text-gray-400 font-medium">
														Số Tiền
													</span>
												</div>
												<div className="col-span-1">
													<span className="text-sm text-gray-400 font-medium">
														Thao Tác
													</span>
												</div>
											</div>
										</div>
									</div>
								</div>
								{extendedPurchases?.map((purchase, index) => (
									<div
										key={purchase.id}
										className="bg-white px-5 py-3 rounded-md shadow mt-5"
									>
										<div className="grid grid-cols-12 items-center">
											<div className="col-span-6">
												<div className="flex items-center">
													<div className="flex flex-shrink-0">
														<input
															type="checkbox"
															checked={purchase.checked}
															className="accent-primary w-4 h-4"
															onChange={() => handleChecked(purchase.id)}
														/>
													</div>
													<div className="flex flex-1">
														<div className="flex gap-2 flex-1">
															<Link
																to="/"
																className="flex items-center flex-shrink-0"
															>
																<img
																	src="https://down-vn.img.susercontent.com/file/fd34585312b45d691f078645deeb678f_tn"
																	alt=""
																	className="w-[80px] h-[80px] object-cover "
																/>
															</Link>
															<div>
																<h3 className="line-clamp-2 text-sm">
																	{purchase.productData.name}
																</h3>
															</div>
														</div>
														<div className="flex item-center gap-2">
															<span className="text-sm text-gray-400">
																Phân Loại Hàng:
															</span>
															<FaSortDown className="text-gray-400" />
														</div>
													</div>
												</div>
											</div>
											<div className="col-span-6">
												<div className="grid grid-cols-5 text-center">
													<div className="col-span-2">
														<div className="flex items-center justify-center gap-2">
															<div className="text-gray-500 line-through flex items-center">
																<span className="text-xs">₫</span>
																<span className="text-sm">
																	{purchase.price_before_discount}
																</span>
															</div>
															<div className="text-primary  flex items-center font-medium">
																<span className="text-xs">₫</span>
																<span>{purchase.price}</span>
															</div>
														</div>
													</div>
													<div className="col-span-1">
														<QuantityController
															max={purchase.productData.quantity}
															value={purchase.buyCount}
															onDecrease={(value) =>
																handleQuantity(
																	index,
																	value,
																	value >= 1 && value !== purchase.buyCount
																)
															}
															onIncrease={(value) =>
																handleQuantity(
																	index,
																	value,
																	+value <= purchase.productData.quantity
																)
															}
															onType={handleTypeQuantity(index)}
															onFocusOut={(value) =>
																handleQuantity(
																	index,
																	value,
																	value <= purchase.productData.quantity &&
																		value >= 1 &&
																		value !==
																			(purchasesData as Purchase[])[index]
																				.buyCount
																)
															}
															disabled={purchase.disabled}
														/>
													</div>
													<div className="col-span-1">
														<div className="text-primary flex justify-center items-center font-medium ">
															<span className="text-xs">₫</span>
															<span>
																{purchase.buyCount * purchase.productData.price}
															</span>
														</div>
													</div>
													<div className="col-span-1">
														<button
															className="text-sm text-gray-400 font-medium"
															onClick={() => handleDeletePurchases(purchase.id)}
														>
															Xóa
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>

							<div className="bg-white px-5 py-3 rounded-sm shadow-sm  sticky bottom-0 left-0 right-0 container mt-2">
								<div className="grid grid-cols-12 items-center ">
									<div className="col-span-6">
										<div className="flex items-center gap-5">
											<div className="flex items-center flex-shrink-0">
												<input
													type="checkbox"
													className="accent-primary w-4 h-4"
													checked={isCheckedAll}
													onChange={handleCheckedAll}
												/>
											</div>
											<button>Chọn Tất Cả (14)</button>
											<button
												className="hover:text-primary"
												onClick={handleShowModalDelete}
											>
												Xóa
											</button>
										</div>
									</div>
									<div className="col-span-6">
										<div className="flex gap-5 items-center">
											<div>
												<div className="flex justify-end gap-1 items-center">
													<div className="text-sm">
														Tổng thanh toán (0 Sản phẩm):
													</div>
													<div className="flex items-center">
														<span className="text-sm text-primary">₫</span>
														<span className="text-primary text-lg">
															{formatCurrency(totalCheckedPurchasePrice)}
														</span>
													</div>
												</div>
												{checkedPurchases.length > 0 && (
													<div className="flex justify-end gap-1">
														<span> Tiết kiệm</span>
														<div className="text-primary text-sm">
															<span>₫</span>
															<span>
																{formatNumberToSocialStyle(
																	totalCheckedPurchaseSavingPrice
																)}
															</span>
														</div>
													</div>
												)}
											</div>
											<button className="w-52 py-2 rounded-sm bg-primary  text-white flex items-center justify-center">
												<span>Mua hàng</span>
											</button>
										</div>
									</div>
								</div>
							</div>
						</>
					) : (
						<div className="flex flex-col gap-4 justify-center items-center py-10">
							<div className="flex flex-shrink-0">
								<img
									src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/9bdd8040b334d31946f49e36beaf32db.png"
									className="w-[100px] h-[100px] object-cover"
									alt=""
								/>
							</div>
							<h3 className="text-sm font-bold text-gray-600">
								Giỏ hàng của bạn còn trống
							</h3>
							<Link
								to={path.home}
								className="py-2 px-10 rounded-sm uppercase text-white bg-primary"
							>
								mua ngay
							</Link>
						</div>
					)}
				</div>
			)}
			{showModalDelete && (
				<ModalDelete
					count={checkedPurchases.length}
					handleDelete={handleDeletePurchases}
					setShowModalDelete={setShowModalDelete}
				/>
			)}
		</>
	);
};

export default Cart;
