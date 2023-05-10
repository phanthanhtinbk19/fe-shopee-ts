import axios, {AxiosError} from "axios";
import HttpStatusCode from "../constants/httpStatusCode";

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
	// eslint-disable-next-line import/no-named-as-default-member
	return axios.isAxiosError(error);
}

export function isAxiosUnprocessableEntity<FormError>(
	error: unknown
): error is AxiosError<FormError> {
	return (
		isAxiosError(error) &&
		error.response?.status === HttpStatusCode.UnprocessableEntity
	);
}

export const formatCurrency = (price: number) => {
	return new Intl.NumberFormat("de-De").format(price);
};

export const formatNumberToSocialStyle = (price: number) => {
	return new Intl.NumberFormat("en", {
		notation: "compact",
		maximumFractionDigits: 1,
	})
		.format(price)
		.replace(".", ",");
};

const removeSpecialCharacter = (str: string) => {
	return str.replace(
		// eslint-disable-next-line no-useless-escape
		/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
		""
	);
};

export const generateNameId = ({name, id}: {name: string; id: string}) => {
	return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};

export const getIdFromNameId = (nameId: string): string => {
	return nameId.split("-i-")[1];
};

export const getBase64 = (file: Blob) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};
export const handleParseBufferImage = (image: string) => {
	const imageBase64 = new Buffer(image, "base64").toString("binary");
	return imageBase64;
};
