import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function ProfileDropdown({ user, onLogout }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-[36px] bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <div className="flex flex-row items-center justify-center">
            <p className="font-semibold">{user.username}</p>
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <Link to="/profile">
                <div
                  className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-[#1B3044] hover:font-semibold`}
                >
                  My Profile
                </div>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                className={`group flex w-full items-center rounded-md px-2 py-2 text-sm text-[#1B3044] hover:font-semibold`}
                onClick={() => onLogout()}
              >
                Logout
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ProfileDropdown;
