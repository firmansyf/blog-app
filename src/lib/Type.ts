export interface BlogPost {
  id: number;
  user_id: string;
  body: string;
  title: string;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
}
