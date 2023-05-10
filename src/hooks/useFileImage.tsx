import {SetStateAction, useEffect, useRef, useState} from "react";
import {toast} from "react-toastify";
import {getBase64} from "../utils/utils";

const imageMimeType = /image\/(png|jpg|jpeg)/i;
const useFileImage = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState<File | null>(null);
	const [fileDataURL, setFileDataURL] = useState(null);
	const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || e.target.files.length === 0) {
			return;
		}
		const file = e.target.files[0];

		if (!file.type.match(imageMimeType)) {
			toast.error("Image mime type is not valid");
			return;
		}
		setFile(file);
	};
	const handleResetFile = () => {
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
			setFileDataURL(null);
		}
	};
	useEffect(() => {
		if (file) {
			getBase64(file).then((data) => {
				return setFileDataURL(data as SetStateAction<null>);
			});
		}
	}, [file]);
	return {
		file,
		fileDataURL,
		setFile,
		setFileDataURL,
		handleChangeFile,
		handleResetFile,
		fileInputRef,
	};
};

export default useFileImage;
