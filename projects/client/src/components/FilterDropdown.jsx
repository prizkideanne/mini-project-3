import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsChevronDown } from "react-icons/bs";

export default function FilterDropdown({ categories, onSelectCategory }) {
  return (
    <div className="relative w-20 text-right">
      <Menu as="div" className="text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Filter
            <BsChevronDown
              color="#FFF"
              className="-mr-1 ml-2 h-5 w-5 text-pink-400 hover:text-red-100"
            />
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
          <Menu.Items className="absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {categories.map((category) => (
                <Menu.Item key={category}>
                  {({ active }) => (
                    <button
                      onClick={() => onSelectCategory(category)}
                      className={`${
                        active ? "bg-red-400 text-white" : "text-gray-900"
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm capitalize`}
                    >
                      {category}
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
