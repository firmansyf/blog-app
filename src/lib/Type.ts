export interface BlogPost {
  id: number;
  user_id: string;
  body: string;
  title: string;
}

export interface PaginationProps {
  page: number;
  totalPages?: number;
  handleNextPage: () => void;
  handlePrevPage: () => void;
  handlePageClick: (e: number) => void;
}
