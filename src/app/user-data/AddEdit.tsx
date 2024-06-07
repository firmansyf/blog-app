"use client";

import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Formik, Form, Field } from "formik";
import { postUser, putUser } from "@/service/user";

interface Props {
  openModal: boolean;
  setOpenModal: any;
  setReload: any;
  reload: any;
  getId: number | any;
  detail: any;
}

const AddEditModal: FC<Props> = ({
  openModal,
  setOpenModal,
  setReload,
  reload,
  getId,
  detail,
}) => {
  const handleOnSubmit = (val: any) => {
    const params = {
      name: val?.name,
      email: val?.email,
      gender: val?.gender,
      status: val?.status,
    };

    if (getId) {
      putUser(getId, params)
        .then((res) => {
          setOpenModal(false);
          setReload(reload + 1);
        })
        .catch((error) => console.log("error :", error));
    } else {
      postUser(params)
        .then((res) => {
          setOpenModal(false);
          setReload(reload + 1);
        })
        .catch((error) => console.log("error :", error));
    }
  };

  const customStyle = {
    section: "flex flex-col gap-1",
    label: "text-semibold text-sm",
    field:
      "w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-ou",
    error: "text-red-500 text-xs italic",
  };

  const onClose = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Dialog open={openModal} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{getId ? "Edit" : "Add"} Data</DialogTitle>
          </DialogHeader>
          <Formik
            onSubmit={handleOnSubmit}
            enableReinitialize
            initialValues={{
              name: detail?.name,
              email: detail?.email,
              gender: detail?.gender,
              status: detail?.status,
            }}
          >
            {() => {
              return (
                <Form className="flex flex-col gap-3">
                  <div className={customStyle.section}>
                    <Label htmlFor="name" className={customStyle.label}>
                      Name
                    </Label>
                    <Field
                      type="text"
                      name="name"
                      className={customStyle.field}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className={customStyle.section}>
                    <Label htmlFor="name" className={customStyle.label}>
                      Email
                    </Label>
                    <Field
                      type="email"
                      name="email"
                      className={customStyle.field}
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className={customStyle.section}>
                    <Label htmlFor="name" className={customStyle.label}>
                      Gender
                    </Label>
                    <Field
                      as="select"
                      name="gender"
                      className={`${customStyle.field} w-full`}
                    >
                      <option>Choose Gender</option>
                      <option value={"male"}>Male</option>
                      <option value={"female"}>Femail</option>
                    </Field>
                  </div>
                  <div className={customStyle.section}>
                    <Label htmlFor="name" className={customStyle.label}>
                      Status
                    </Label>
                    <Field
                      as="select"
                      name="status"
                      className={`${customStyle.field} w-full`}
                    >
                      <option>Choose Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Field>
                  </div>

                  <div className="flex items-center w-full mt-10 justify-end gap-2">
                    <Button type="submit">{getId ? "Save" : "Add"}</Button>
                    <Button
                      type="button"
                      className="bg-gray-500"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { AddEditModal };
