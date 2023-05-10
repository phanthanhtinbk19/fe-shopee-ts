import {range} from "lodash";
import React, {useState} from "react";
interface Props {
	onChange?: (e: Date) => void;
	value?: Date;
	errorMessage?: string;
}
const DateSelect = ({onChange, value, errorMessage}: Props) => {
	const [birthDay, setBirthDay] = useState({
		date: value?.getDate() || 1,
		month: value?.getMonth() || 0,
		year: value?.getFullYear() || 1990,
	});

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const {name, value} = e.target;
		const newBirthDay = {...birthDay, [name]: value};
		setBirthDay(newBirthDay);
		onChange &&
			onChange(new Date(newBirthDay.year, newBirthDay.month, newBirthDay.date));
	};
	return (
		<div className="flex flex-wrap mt-4 items-center">
			<div className="w-[20%] capitalize text-sm text-gray-500 text-right">
				ngày sinh
			</div>
			<div className="w-[80%] pl-5 flex items-center gap-4">
				<select
					id="countries"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full py-2 px-3  "
					name="date"
					onChange={handleChange}
					value={birthDay.date}
				>
					<option disabled>Ngày</option>
					{range(1, 32).map((item) => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
				<select
					id="countries"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg py-2 px-3 block w-full  "
					name="month"
					onChange={handleChange}
					value={birthDay.month}
				>
					<option disabled>Tháng</option>
					{range(1, 13).map((item) => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
				<select
					id="countries"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full py-2 px-3 "
					name="year"
					onChange={handleChange}
					value={birthDay.year}
				>
					<option value="">Năm</option>
					{range(1900, 2023).map((item) => (
						<option key={item} value={item}>
							{item}
						</option>
					))}
				</select>
			</div>
			<span className="text-primary text-xs">{errorMessage}</span>
		</div>
	);
};

export default DateSelect;
