import {Purchase, PurchaseListStatus} from "../types/purchase";
import {SuccessResponseApi} from "../types/utils.type";
import http from "../utils/http";
const URL = "/purchases";
const purchaseApi = {
	addToCart: (body: {buyCount: number; productId: number}) => {
		return http.post<SuccessResponseApi<Purchase>>(`${URL}/add-to-cart`, body);
	},
	getPurchases: (params: {status: PurchaseListStatus}) => {
		return http.get<SuccessResponseApi<Purchase[]>>(URL, {
			params,
		});
	},
	buyProducts: (body: {productId: number; buyCount: number}) => {
		return http.post<SuccessResponseApi<Purchase[]>>(
			`${URL}/buy-products`,
			body
		);
	},
	updatePurchase: (body: {productId: number; buyCount: number}) => {
		return http.put<SuccessResponseApi<Purchase>>(
			`${URL}/update-purchase`,
			body
		);
	},
	deletePurchase: (purchaseIds: number[]) => {
		return http.delete<SuccessResponseApi<{deletedAcount: number}>>(`${URL}`, {
			data: purchaseIds,
		});
	},
};
export default purchaseApi;
