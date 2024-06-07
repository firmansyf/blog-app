import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/service/user";

interface Props {
  openModal: boolean;
  setOpenModal: any;
  reload: any;
  setReload: any;
  getId: any;
}
export default function ModalDelete({
  openModal,
  setOpenModal,
  getId,
  reload,
  setReload,
}: Props) {
  const handleDelete = () => {
    deleteUser(getId)
      .then((res: any) => {
        setOpenModal(false);
        setReload(reload + 1);
      })
      .catch((err: any) => console.log("Delete error :", err));
  };
  const onClose = () => {
    setOpenModal(false);
  };
  return (
    <Dialog open={openModal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Data</DialogTitle>
        </DialogHeader>

        <span>Are you sure want to delete data ?</span>
        <DialogFooter className='gap-1'>
          <Button className="bg-red-700" onClick={handleDelete}>
            Delete
          </Button>
          <Button className="bg-gray-500" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
