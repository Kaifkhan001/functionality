import { create } from "zustand";

const useStore = create((set) => ({
  isLogged: typeof window !== "undefined" ? JSON.parse(localStorage.getItem("isLogged")) : false,
  toggleLogg: (status) => set({ isLogged: status }),
}));

export default useStore;
