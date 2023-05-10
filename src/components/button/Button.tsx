import React, {ButtonHTMLAttributes} from "react";
import Spinner from "../spinner/Spinner";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
}
const Button = (props: ButtonProps) => {
	const {children, className, disabled, isLoading, ...rest} = props;
	const newClassName = disabled
		? `${className} cursor-not-allowed bg-opacity-70`
		: className;

	return (
		<button className={newClassName} disabled={disabled} {...rest}>
			{isLoading ? <Spinner /> : <span>{children}</span>}
		</button>
	);
};

export default Button;
