import React, {createContext, useContext, useState} from "react";
import {ExtendedPurChases} from "../types/purchase";

interface CartContextInterface {
	extendedPurchases: ExtendedPurChases[];
	setExtendedPurchases: React.Dispatch<
		React.SetStateAction<ExtendedPurChases[]>
	>;
}
const initialCartContext: CartContextInterface = {
	extendedPurchases: [],
	setExtendedPurchases: () => null,
};

const CartContext = createContext<CartContextInterface>(initialCartContext);

const CartProvider = ({children}: {children: React.ReactNode}) => {
	const [extendedPurchases, setExtendedPurchases] = useState<
		ExtendedPurChases[]
	>(initialCartContext.extendedPurchases);
	return (
		<CartContext.Provider
			value={{
				extendedPurchases,
				setExtendedPurchases,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

const useCart = () => {
	const context = useContext(CartContext);
	if (typeof context === "undefined") {
		throw new Error("useCart must be within CartProvider");
	}
	return context;
};

export {CartProvider, useCart};
