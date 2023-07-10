import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ArchiveBoxIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  ShoppingCartIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DashboardLayout({ children }) {
  const { pathname } = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState([
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
    {
      name: "Store",
      href: "/dashboard/store",
      icon: ShoppingCartIcon,
      current: false,
    },
    {
      name: "Create Product",
      href: "/dashboard/product",
      icon: FolderIcon,
      current: false,
    },
    {
      name: "Category",
      href: "/dashboard/category",
      icon: ArchiveBoxIcon,
      current: false,
    },
    {
      name: "Transactions",
      href: "/dashboard/transactions",
      icon: DocumentDuplicateIcon,
      current: false,
    },
    {
      name: "Income",
      href: "/dashboard/income",
      icon: ChartPieIcon,
      current: false,
    },
  ]);

  useEffect(() => {
    if (pathname) {
      const update = navigation.map((nav) => {
        if (nav.href === pathname) {
          return {
            ...nav,
            current: true,
          };
        }
        return {
          ...nav,
          current: false,
        };
      });
      setNavigation(update);
    }
  }, [pathname]);

  const logout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                  <div className="flex h-16 shrink-0 flex-row items-center justify-between">
                    <Logo />
                    <span className="mt-1 rounded-lg bg-science-blue-600 px-3 py-1 text-sm font-semibold capitalize text-white">
                      {user.storeName}
                    </span>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <Link
                                to={item.href}
                                className={classNames(
                                  item.current
                                    ? "bg-science-blue-700 text-white"
                                    : "text-science-blue-800 hover:bg-science-blue-700 hover:text-white",
                                  "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                                )}
                              >
                                <item.icon
                                  className={classNames(
                                    item.current
                                      ? "text-white"
                                      : "text-science-blue-800 group-hover:text-white",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-science-blue-50 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <Logo />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-science-blue-700 text-white"
                            : "text-science-blue-800 hover:bg-science-blue-700 hover:text-white",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-white"
                              : "text-science-blue-800 group-hover:text-white",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="-mx-6 mt-auto">
                <div className="flex items-center justify-between gap-x-4 bg-science-blue-700 px-6 py-3 text-sm font-semibold leading-6 text-white">
                  <span
                    aria-hidden="true"
                    className="mt-1 text-lg font-bold capitalize"
                  >
                    {user.storeName}
                  </span>
                  <button
                    onClick={logout}
                    className="rounded-lg border-2 border-white px-2 py-1 text-white"
                  >
                    Log out
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-science-blue-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-science-blue-200 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          Dashboard
        </div>
        <button
          onClick={logout}
          className="text-sm font-semibold capitalize text-white"
        >
          Log out
        </button>
      </div>

      <main className="py-10 lg:pl-72">
        <div className="mx-4 rounded-lg bg-science-blue-100 px-4 py-5 sm:mx-6 sm:px-6 lg:mx-8 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
