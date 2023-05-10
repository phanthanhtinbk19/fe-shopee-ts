import React from "react";
import {UseFormRegister} from "react-hook-form";
interface InputProps {
	type: React.HTMLInputTypeAttribute;
	register: UseFormRegister<any>;
	name: string;
	placeholder: string;
	className: string;
	errorMessage?: string;
}
const Input = ({
	type,
	register,
	name,
	placeholder,
	className,
	errorMessage,
}: InputProps) => {
	return (
		<>
			<input
				type={type}
				placeholder={placeholder}
				{...register(name)}
				className={`border border-gray-300 rounded-lg p-2 w-full ${className}`}
			/>
			<span className="text-primary text-xs">{errorMessage}</span>
		</>
	);
};

export default Input;
