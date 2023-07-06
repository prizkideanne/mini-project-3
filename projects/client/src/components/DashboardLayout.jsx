import React, { useState } from "react";
import SideBar from "./SideBar";
import { Bars4Icon } from "@heroicons/react/24/solid";
import ProfileDropdown from "./ProfileDropdown";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { logout } from "../store/userReducer/userSlice";
import Logo from "../assets/logo.png";

function DashboardLayout({ children }) {
  const [isShowSideBar, setIsShowSideBar] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="relative bg-[#F3ECD7]">
      <div className="relative z-10 flex h-14 w-screen items-center bg-red-300 px-4 lg:fixed lg:h-16 lg:pl-80">
        <div className="flex w-full flex-row items-center justify-between">
          <Bars4Icon
            className="h-5 w-5 lg:hidden"
            onClick={() => setIsShowSideBar(true)}
          />

          <div className="flex flex-row items-center">
            <Link to={"/"}>
              <button className="flex flex-row items-center">
                <img alt="logo" src={Logo} className="w-10" />
                <span className="font-bold text-[#1B3044]">TOKO</span>
              </button>
            </Link>
          </div>

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
      <div className="lg:relative lg:top-16 lg:pl-72">{children}</div>
    </div>
  );
}

export default DashboardLayout;
