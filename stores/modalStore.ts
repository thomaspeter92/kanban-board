import React from "react";
import { create } from "zustand";

type State = {
  isOpen: boolean;
  toggleModal: (modalContent: React.ReactNode | null) => void;
  modalContent: React.ReactNode | null;
};

const useModalStore = create<State>((set, get) => ({
  isOpen: false,
  modalContent: null,
  toggleModal: (modalContent) =>
    set((state) => ({ modalContent: modalContent, isOpen: !state.isOpen })),
}));

export default useModalStore;
