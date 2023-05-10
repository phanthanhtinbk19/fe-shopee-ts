import React, {useState} from "react";
import {FiMinus, FiPlus} from "react-icons/fi";
interface Props {
	max?: number;
	onType?: (value: number) => void;
	onIncrease?: (value: number) => void;
	onDecrease?: (value: number) => void;
	onFocusOut?: (value: number) => void;
	value?: number;
	disabled?: boolean;
}

const QuantityController = ({
	max,
	onType,
	onIncrease,
	onDecrease,
	onFocusOut,
	value,
	disabled,
}: Props) => {
	const [localValue, setLocalValue] = useState<number>(Number(value) || 1);
	const handleInCrease = () => {
		let _value = Number(value || localValue) + 1;
		if (max !== undefined && _value > max) {
			_value = max;
		}
		onIncrease && onIncrease(_value);
		setLocalValue(_value);
	};
	const handleDecrease = () => {
		let _value = Number(value || localValue) - 1;
		if (_value < 1) {
			_value = 1;
		}
		onDecrease && onDecrease(_value);
		setLocalValue(_value);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let _value = +e.target.value;
		if (max !== undefined && _value > max) {
			_value = max;
		}
		if (_value < 1) {
			_value = 1;
		}
		onType && onType(_value);
		setLocalValue(_value);
	};
	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const _value = +event.target.value;
		onFocusOut && onFocusOut(_value);
	};
	return (
		<div className="flex items-center">
			<button
				className="h-8 w-8 flex items-center rounded-l-sm justify-center border border-gray-300 text-gray-600"
				onClick={handleDecrease}
			>
				<FiMinus />
			</button>
			<input
				type="number"
				className="w-12 text-center h-8 border border-gray-300 text-gray-600"
				onChange={handleChange}
				value={value || localValue}
				disabled={disabled}
				onBlur={handleBlur}
			/>

			<button
				className="h-8 w-8 flex items-center rounded-l-sm justify-center border border-gray-300 text-gray-600"
				onClick={handleInCrease}
			>
				<FiPlus />
			</button>
		</div>
	);
};

export default QuantityController;
