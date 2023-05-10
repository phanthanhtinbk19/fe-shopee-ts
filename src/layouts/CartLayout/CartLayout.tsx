import React, {ReactNode} from "react";

import Footer from "../../components/footer/Footer";
import CartHeader from "../../components/CartHeader/CartHeader";

const CartLayout = ({children}: {children: ReactNode}) => {
	return (
		<div>
			<CartHeader />
			{children}
			<Footer />
		</div>
	);
};

export default CartLayout;
