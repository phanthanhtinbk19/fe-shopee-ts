export interface Product {
	id: number;
	name: string;
	price: number;
	description: string;
	images: string[];
	categoryData: {
		id: number;
		name: string;
	};
	quantity: number;
	rating: number;
	price_before_discount: number;
	sold: number;
	view: number;
	updatedAt: string;
	createdAt: string;
}
export interface ProductList {
	products: Product[];
	pagination: {
		page: number;
		limit: number;
		page_size: number;
	};
}

export interface ProductListConfig {
	page?: number | string;
	limit?: number | string;
	sort_by?: "rating" | "sold" | "view" | "createdAt" | "price";
	order?: "asc" | "desc";
	exclude?: string;
	rating_filter?: number | string;
	price_min?: number | string;
	price_max?: number | string;
	name?: string;
	category?: string | number;
}
