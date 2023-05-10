import {createContext, useContext, useState} from "react";
import {getAccessTokenFromLS, getProfileFromLS} from "../utils/auth";
import {User} from "../types/user.type";

interface AuthenticationContextInterface {
	isAuthenticated: boolean;
	setIsAuthenticated: (value: boolean) => void;
	profile: User | null;
	setProfile: (value: User | null) => void;
}
const initialAuthenticationContext: AuthenticationContextInterface = {
	isAuthenticated: Boolean(getAccessTokenFromLS()),
	setIsAuthenticated: () => null,
	profile: getProfileFromLS(),
	setProfile: () => null,
};

const AuthenticationContext = createContext<AuthenticationContextInterface>(
	initialAuthenticationContext
);

const AuthenticationProvider = ({children}: {children: React.ReactNode}) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		initialAuthenticationContext.isAuthenticated
	);
	const [profile, setProfile] = useState<User | null>(
		initialAuthenticationContext.profile
	);
	return (
		<AuthenticationContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				profile,
				setProfile,
			}}
		>
			{children}
		</AuthenticationContext.Provider>
	);
};

const useAuthentication = () => {
	const context = useContext(AuthenticationContext);
	if (typeof context === "undefined") {
		throw new Error("useAuthentication must be within AuthenticationProvider");
	}
	return context;
};

export {AuthenticationProvider, useAuthentication};
