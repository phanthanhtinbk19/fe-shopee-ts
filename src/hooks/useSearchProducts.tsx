import useQueryConfig from "./useQueryConfig";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {omit} from "lodash";
import {Schema, schema} from "../utils/validate";
type FormData = Pick<Schema, "search">;
const searchSchema = schema.pick(["search"]);
const useSearchProducts = () => {
	const navigate = useNavigate();

	const queryConfig = useQueryConfig();
	const {
		register,
		handleSubmit,

		formState: {errors},
	} = useForm<FormData>({
		resolver: yupResolver(searchSchema),
	});
	const onSubmit = handleSubmit((data) => {
		const config = queryConfig.order
			? omit(
					{
						...queryConfig,
						name: data.search,
					},
					["order", "sort_by"]
			  )
			: {
					...queryConfig,
					name: data.search,
			  };
		navigate({
			pathname: "/product-list",
			search: createSearchParams(config).toString(),
		});
	});

	return {
		register,
		onSubmit,
	};
};

export default useSearchProducts;
