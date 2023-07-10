import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";

export default function Dropdown({ items, label, onSelectDropdown }) {
  return (
    <div className="relative w-20 text-right">
      <Menu as="div">
        <div>
          <Menu.Button className="flex h-8 w-full items-center justify-center rounded-md border border-science-blue-950 bg-white text-sm font-medium text-science-blue-950 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <div className="flex items-center justify-between">
              <span className="h-full">{label}</span>
              <BsChevronDown className="-mt-1 ml-2 h-4 w-4 text-science-blue-950" />
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
          <Menu.Items className="absolute left-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {items.map((item) => (
                <Menu.Item key={item.value}>
                  {({ active }) => (
                    <button
                      onClick={() => onSelectDropdown(item.value)}
                      className={`${
                        active
                          ? "bg-science-blue-700 text-white"
                          : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-center text-sm font-semibold capitalize`}
                    >
                      {item.title}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
