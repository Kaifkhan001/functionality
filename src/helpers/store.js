import { create } from "zustand";

const useStore = create((set) => ({
  isLogged: JSON.parse(localStorage.getItem("isLogged")),
  toggleLogg: (status) => set({ isLogged: status }),
}));



export default useStore;
