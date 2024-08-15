"use client";

import useModalStore from "@/stores/modalStore";
import React from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

type Props = {
  isStorybook?: boolean;
};

const Modal = ({ isStorybook }: Props) => {
  const { isOpen, toggleModal, modalContent } = useModalStore();
  return (
    <Dialog open={isStorybook ? true : isOpen} onClose={toggleModal}>
      <DialogBackdrop className="fixed inset-0 bg-black-dark/50 backdrop-blur-sm" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="w-[480px] max-h-full  max-w-full space-y-4 bg-white dark:bg-black-light shadow-1 rounded-lg">
          {modalContent}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
