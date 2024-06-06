import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useDispatch } from "react-redux";
import { setPage } from "@/redux/reducer/postsBlogReducer"; // Import setPage action
import { PaginationProps } from "@/lib/Type";

const PaginationComponent: FC<PaginationProps> = ({ page, totalPages }) => {
  const dispatch = useDispatch();

  const handleNextPage = () => {
    // if (page < totalPages) {
    dispatch(setPage(page + 1));
    // }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const handlePageClick = (pageNumber: number) => {
    dispatch(setPage(pageNumber));
  };

  console.log("totalPages :", totalPages);

  return (
    <Pagination className="">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevPage}
            className={
              page === 1 ? `cursor-not-allowed text-gray-400` : `cursor-pointer`
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageClick(1)}
            className={page === 1 ? `text-white bg-blue-700` : ""}
          >
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageClick(2)}
            className={page === 2 ? `text-white bg-blue-700` : ""}
          >
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageClick(3)}
            className={page === 3 ? `text-white bg-blue-700` : ""}
          >
            3
          </PaginationLink>
        </PaginationItem>
        {page !== 4 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {page > 3 && (
          <PaginationItem>
            <PaginationLink
              onClick={() => handlePageClick(page)}
              className={page > 3 ? `text-white bg-blue-700` : ""}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} className="cursor-pointer" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
