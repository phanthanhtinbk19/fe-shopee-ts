import {Product} from "./product.type";
export type PurchaseStatus = -1 | 1 | 2 | 3 | 4 | 5;
export type PurchaseListStatus = PurchaseStatus | 0;
export interface Purchase {
	id: number;
	buyCount: number;
	price: number;
	price_before_discount: number;
	status: PurchaseStatus;
	userId: string;
	productData: Product;
	createdAt: string;
	updatedAt: string;
	productId: number;
}

export interface ExtendedPurChases extends Purchase {
	disabled: boolean;
	checked: boolean;
}
