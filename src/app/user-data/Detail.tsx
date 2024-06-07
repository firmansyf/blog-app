import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";

interface Props {
  openModal: boolean;
  setOpenModal: any;
  detail: any;
}
export default function ModalDetail({
  openModal,
  setOpenModal,
  detail,
}: Props) {
  const onClose = () => {
    setOpenModal(false);
  };

  const customStyle = {
    section: "flex flex-col gap-2",
    text: "text-sm font-bold",
    label: "text-gray-500",
  };
  return (
    <Dialog open={openModal} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
                  <DialogTitle>Detail Data {detail.name}</DialogTitle>
        </DialogHeader>
        <section className="flex flex-col gap-3">
          <div className={customStyle.section}>
            <Label className={customStyle.label}>Name</Label>
            <span className={customStyle.text}>{detail.name}</span>
          </div>
          <div className={customStyle.section}>
            <Label className={customStyle.label}>Email</Label>
            <span className={customStyle.text}>{detail.email}</span>
          </div>
          <div className={customStyle.section}>
            <Label className={customStyle.label}>Gender</Label>
            <span className={customStyle.text}>{detail.gender}</span>
          </div>
          <div className={customStyle.section}>
            <Label className={customStyle.label}>Status</Label>
            <span className={`${customStyle.text} capitalize`}>
              {detail.status}
            </span>
          </div>
        </section>
        <DialogFooter>
          <Button className="bg-gray-500" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
