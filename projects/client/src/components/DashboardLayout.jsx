import React, { useState } from "react";
import SideBar from "./SideBar";
import { Bars4Icon } from "@heroicons/react/24/solid";
import ProfileDropdown from "./ProfileDropdown";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../store/userReducer/userSlice";

function DashboardLayout({ children }) {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="relative bg-[#F3ECD7]">
      <div className="relative z-10 flex h-14 w-screen items-center bg-red-300 px-4 lg:fixed lg:left-72 lg:h-16">
        <Bars4Icon
          className="h-5 w-5 lg:hidden"
          onClick={() => setIsShowSideBar(true)}
        />

        <div className="absolute right-80">
          <ProfileDropdown
            user={user}
            onLogout={() => {
              dispatch(logout());
              navigate("/");
            }}
          />
        </div>
      </div>
      <SideBar
        closeSideBar={() => setIsShowSideBar(false)}
        isShow={isShowSideBar}
      />
      <div className="lg:relative lg:left-72 lg:top-16">{children}</div>
    </div>
  );
}

export default DashboardLayout;
