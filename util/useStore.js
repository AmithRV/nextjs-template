import { create } from "zustand";

const useStore = create((set) => ({
  show: {
    isVisible: false,
    type: "",
    data: { sessionId: "" },
  },

  //
  setShow: (state) => set({ show: { ...state } }),
}));

export default useStore;
