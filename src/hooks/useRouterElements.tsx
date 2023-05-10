import {Navigate, Outlet, useRoutes} from "react-router-dom";
import AuthLayout from "../layouts/auth-layout/AuthLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import MainLayout from "../layouts/main-layout/MainLayout";

import {useAuthentication} from "../contexts/app.context";
import path from "../constants/path";
import ProductList from "../pages/ProductList/ProductList";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import Cart from "../pages/Cart/Cart";
import CartLayout from "../layouts/CartLayout/CartLayout";
import UserLayout from "../pages/User/layouts/UserLayout";
import ChangePassword from "../pages/User/pages/ChangePassword/ChangePassword";
import Profile from "../pages/User/pages/Profile/Profile";

const ProtectedRoute = () => {
	const {isAuthenticated} = useAuthentication();

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
const RejectedRoute = () => {
	const {isAuthenticated} = useAuthentication();
	return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export const useRouterElements = () => {
	const routerElements = useRoutes([
		{
			path: "/",
			index: true,
			element: (
				<MainLayout>
					<Home />
				</MainLayout>
			),
		},
		{
			path: "/product-list",
			element: (
				<MainLayout>
					<ProductList />
				</MainLayout>
			),
		},
		{
			path: "/product-list/:nameId",
			element: (
				<MainLayout>
					<ProductDetail />
				</MainLayout>
			),
		},
		{
			path: "/",
			element: <ProtectedRoute />,
			children: [
				{
					path: path.cart,
					element: (
						<CartLayout>
							<Cart />
						</CartLayout>
					),
				},
				{
					path: path.user,
					element: (
						<MainLayout>
							<UserLayout />
						</MainLayout>
					),
					children: [
						{
							path: path.profile,
							element: <Profile />,
						},
						{
							path: path.changePassword,
							element: <ChangePassword />,
						},
					],
				},
			],
		},
		{
			path: "/",
			element: <RejectedRoute />,
			children: [
				{
					path: path.login,
					element: (
						<AuthLayout>
							<Login />
						</AuthLayout>
					),
				},
				{
					path: path.register,
					element: (
						<AuthLayout>
							<Register />
						</AuthLayout>
					),
				},
			],
		},
	]);

	return routerElements;
};
