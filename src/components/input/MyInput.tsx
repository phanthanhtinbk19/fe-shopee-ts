import {useController, Control, UseControllerProps} from "react-hook-form";

type FormValues = {
	[key: string]: string;
};

interface MyInputProps {
	control: Control<any, object>;
	name: string;
	errorMessage?: string;
	id: string;
	type: string;
	placeholder: string;
}
const MyInput = ({control, errorMessage, ...props}: MyInputProps) => {
	const {field} = useController({
		control,
		name: props.name,
		defaultValue: "",
	});
	return (
		<>
			<input
				className="border w-full border-slate-500 p-1.5  rounded-sm"
				{...field}
				{...props}
			/>
			<span className="text-primary text-xs">{errorMessage}</span>
		</>
	);
};

export default MyInput;
