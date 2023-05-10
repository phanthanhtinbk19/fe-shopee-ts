import React, {ReactNode} from "react";

import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const MainLayout = ({children}: {children: ReactNode}) => {
	return (
		<div>
			<Header />
			{children}
			<Footer />
		</div>
	);
};

export default MainLayout;
