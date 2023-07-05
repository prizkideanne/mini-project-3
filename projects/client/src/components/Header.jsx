import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";


import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userReducer/userSlice";
import ProfileDropdown from "./ProfileDropdown";

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  return (
    <div className="flex flex-row items-center justify-between bg-[#F1C831] px-10 py-4">
      <div className="flex flex-row items-center">
        <Link to={"/"}>
          <button className="flex flex-row items-center">
            <img alt="logo" src={Logo} className="w-10" />
            <span className="font-bold text-[#1B3044]">TOKO</span>
          </button>
        </Link>
      </div>

      <div className="text-right">
        {isLoggedIn ? (
          <div className="flex flex-row items-center">
            <ProfileDropdown
              user={user}
              onLogout={() => {
                dispatch(logout());
                navigate("/");
              }}
            />
          </div>
        ) : (
          <Link to="/login">
            <button className="rounded-[20px] border-2 border-[#9B3838] bg-[#9B3838] px-3 py-1 text-[18px] text-[#F3ECD7] shadow-md shadow-black">
              Login/Register
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;
