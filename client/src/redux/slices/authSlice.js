import { createSlice } from "@reduxjs/toolkit";

let userInfo = null;
try {
  const storedUserInfo = localStorage.getItem("userInfo");
  if (storedUserInfo) {
    userInfo = JSON.parse(storedUserInfo);
  }
} catch (error) {
  console.error("Error parsing userInfo from localStorage:", error);
  localStorage.removeItem("userInfo"); // Optionally remove invalid JSON from localStorage
}

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("userInfo");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;