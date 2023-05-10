import React, {ReactNode} from "react";
import AuthHeader from "../../components/auth-header/AuthHeader";
import Footer from "../../components/footer/Footer";

const AuthLayout = ({children}: {children: ReactNode}) => {
	return (
		<div>
			<AuthHeader />
			{children}
			<Footer />
		</div>
	);
};

export default AuthLayout;
