"use client";

import FooterComponent from "@/components/layout/footer";
import NavbarComponent from "@/components/layout/navbar";

import { FC, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchBlogPosts } from "@/redux/reducer/postsBlogReducer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUser, getUserById } from "@/service/user";
import PaginationComponent from "@/components/pagination";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  EyeIcon as MataIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { AddEditModal } from "./AddEdit";
import ModalDelete from "./Delete";
import ModalDetail from "./Detail";

const UserManagement: FC = () => {
  const dispatch: any = useDispatch();
  const [isPage, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [data, setData] = useState<any[]>([]);
  const [reloadData, setReloadData] = useState<number>(0);
  const [openModalAddEdit, setOpenModalAddEdit] = useState<boolean>(false);
  const [getItemId, setGetItemId] = useState<number | any>(null);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const [detail, setDetail] = useState<any>({});
  const [searchData, setSearchData] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const { posts, page, per_page } = useSelector(
    (state: RootState) => state.posts
  );

  useEffect(() => {
    getUserById(getItemId)
      .then(({ data }) => {
        setDetail(data);
      })
      .catch((err) => console.log("Fetching data error :", err));
  }, [getItemId, reloadData]);

  useEffect(() => {
    dispatch(fetchBlogPosts({ page, per_page }));
  }, [dispatch, page, per_page]);

  // Fetch data users
  useEffect(() => {
    getUser({ page: isPage, per_page: perPage })
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => console.log("Fetch data error :", error));
  }, [isPage, perPage, reloadData]);

  const handleNextPage = () => {
    setPage(isPage + 1);
  };
  const handlePrevPage = () => {
    if (isPage > 1) {
      setPage(isPage - 1);
    }
  };
  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  const onEdit = (id: number) => {
    setGetItemId(id);
    setOpenModalAddEdit(true);
  };

  const onDelete = (id: number) => {
    setOpenModalDelete(true);
    setGetItemId(id);
  };

  const onDetail = (id: number) => {
    setOpenModalDetail(true);
    setGetItemId(id);
  };

  const searchUser = (keyword: string) => {
    const filteredData = data?.filter((item) =>
      item?.name?.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchData(filteredData);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    searchUser(e.target.value);
  };
  return (
    <>
      <NavbarComponent />
      <main className="py-24 w-full flex justify-center items-center flex-col">
        <div className="xl:w-2/3 lg:w-2/3 md:w-full sm:w-full flex items-center justify-between max-sm:flex-col max-lg:flex-row">
          <span className="text-2xl font-bold tracking-wide">Users Data</span>

          <div className="flex items-center gap-2">
            <input
              placeholder="Search data user"
              className="w-full border-2 bg-opacity-50 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out rounded-md"
              value={searchInput}
              onChange={handleSearchChange}
            />

            <Button
              size="sm"
              className="bg-blue-800"
              onClick={() => {
                setOpenModalAddEdit(true);
                setGetItemId(null);
              }}
            >
              Add Data
            </Button>
          </div>
        </div>

        <div className="overflow-auto max-sm:w-full md:w-full lg:w-2/3 mt-6  xl:w-2/3">
          <Table className="p-0">
            <TableCaption>A list of User Management.</TableCaption>
            <TableHeader className="p-0">
              <TableRow>
                <TableHead className="flex items-center justify-center">
                  <EyeIcon className="h-4 w-4" />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="pl-0">Gender</TableHead>
                <TableHead className="pl-0">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchData?.length > 0
                ? searchData?.map((item: any, index: number) => (
                    <TableRow key={index} className="p-1">
                      <TableCell className="p-1">
                        <ToggleGroup variant="outline" type="single">
                          <ToggleGroupItem
                            value="italic"
                            aria-label="Toggle italic"
                            onClick={() => onDetail(item.id)}
                          >
                            <MataIcon className="h-4 w-4" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                      <TableCell className="font-medium p-1">
                        {item.name}
                      </TableCell>
                      <TableCell className="p-1">{item.email}</TableCell>
                      <TableCell className="p-1 capitalize">
                        {item.gender}
                      </TableCell>
                      <TableCell className="p-1 capitalize">
                        {item.status}
                      </TableCell>
                      <TableCell className="p-1">
                        <ToggleGroup variant="outline" type="multiple">
                          <ToggleGroupItem
                            value="bold"
                            aria-label="Toggle bold"
                            className="cursor-pointer"
                            onClick={() => onEdit(item.id)}
                          >
                            <PencilIcon className="h-4 w-4 text-orange-500" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="italic"
                            aria-label="Toggle bold"
                            className="cursor-pointer"
                            onClick={() => onDelete(item.id)}
                          >
                            <TrashIcon className="h-4 w-4 text-red-700" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                  ))
                : data?.map((item: any, index: number) => (
                    <TableRow key={index} className="p-1">
                      <TableCell className="p-1">
                        <ToggleGroup variant="outline" type="single">
                          <ToggleGroupItem
                            value="italic"
                            aria-label="Toggle italic"
                            onClick={() => onDetail(item.id)}
                          >
                            <MataIcon className="h-4 w-4" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                      <TableCell className="font-medium p-1">
                        {item.name}
                      </TableCell>
                      <TableCell className="p-1">{item.email}</TableCell>
                      <TableCell className="p-1 capitalize">
                        {item.gender}
                      </TableCell>
                      <TableCell className="p-1 capitalize">
                        {item.status}
                      </TableCell>
                      <TableCell className="p-1">
                        <ToggleGroup variant="outline" type="multiple">
                          <ToggleGroupItem
                            value="bold"
                            aria-label="Toggle bold"
                            className="cursor-pointer"
                            onClick={() => onEdit(item.id)}
                          >
                            <PencilIcon className="h-4 w-4 text-orange-500" />
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="italic"
                            aria-label="Toggle bold"
                            className="cursor-pointer"
                            onClick={() => onDelete(item.id)}
                          >
                            <TrashIcon className="h-4 w-4 text-red-700" />
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <Separator className="my-3" />
          <PaginationComponent
            page={isPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            handlePageClick={handlePageClick}
          />
        </div>
      </main>
      <FooterComponent data={posts} />
      <AddEditModal
        detail={detail}
        getId={getItemId}
        setReload={setReloadData}
        reload={reloadData}
        openModal={openModalAddEdit}
        setOpenModal={setOpenModalAddEdit}
        setDetail={setDetail}
        setSearchInput={setSearchInput}
        setSearchData={setSearchData}
      />
      <ModalDelete
        reload={reloadData}
        setReload={setReloadData}
        openModal={openModalDelete}
        setOpenModal={setOpenModalDelete}
        getId={getItemId}
        setSearchInput={setSearchInput}
        setSearchData={setSearchData}
      />
      <ModalDetail
        openModal={openModalDetail}
        setOpenModal={setOpenModalDetail}
        detail={detail}
      />
    </>
  );
};

export default UserManagement;
