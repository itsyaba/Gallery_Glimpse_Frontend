import { useAppDispatch } from "./app/hooks";
import { useEffect } from "react";

import { logout } from "./app/slices/authSlice";
import { Outlet } from "react-router-dom";

import { SideNav } from "./components/SideNav";
import { Navbar } from "./components/Navbar";

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");
    if (expirationTime && new Date() > new Date(expirationTime)) {
      dispatch(logout(null));
    }
  }, [dispatch]);

  // TODO : MAKE THE PIN DETAIL PAGE RESPONSIVE
  // TODO : CREATE THE CREATE NEW PIN PAGE
  // TODO  : CREATE THE EDIT PIN PAGE
  // TODO : CREATE THE DELETE PIN PAGE
  // TODO : FIX THE GETFIRSTTWOLETTERS FUNCTION
  // TODO : ADD A DROPDOWN IN THE AVATAR ICON


  return (
      <div className="flex flex-row h-full">
        <div className="w-1/6 hidden lg:flex flex-col">
          <SideNav />
        </div>
        <div className="lg:w-5/6 px-4 w-full">
          <Navbar />
          <Outlet />
        </div>
      </div>
    );
};

export default App;
