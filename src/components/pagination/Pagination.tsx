import ReactPaginate from "react-paginate";
import {QueryConfig} from "../../pages/ProductList/ProductList";
import {createSearchParams, useNavigate} from "react-router-dom";

interface Props {
	totalPage: number;
	queryConfig: QueryConfig;
}
const Pagination = ({totalPage, queryConfig}: Props) => {
	const navigate = useNavigate();

	// Invoke when user click to request another page.
	const handlePageClick = (event: {selected: number}) => {
		navigate({
			pathname: "/product-list",
			search: createSearchParams({
				...queryConfig,
				page: (event.selected + 1).toString(),
			}).toString(),
		});
	};
	return (
		<>
			<ReactPaginate
				breakLabel="..."
				nextLabel="next >"
				onPageChange={handlePageClick}
				pageRangeDisplayed={5}
				pageCount={totalPage}
				previousLabel="< previous"
				renderOnZeroPageCount={null}
				className="pagination"
				forcePage={Number(queryConfig.page) - 1}
			/>
		</>
	);
};

export default Pagination;
