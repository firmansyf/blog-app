import { FC } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
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

  return (
    <Pagination className="">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={handlePrevPage}
            className="cursor-pointer"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink onClick={() => handlePageClick(1)}>1</PaginationLink>
          <PaginationLink onClick={() => handlePageClick(2)}>2</PaginationLink>
          <PaginationLink onClick={() => handlePageClick(3)}>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext onClick={handleNextPage} className="cursor-pointer" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
