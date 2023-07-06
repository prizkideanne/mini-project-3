import { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { BsChevronExpand } from "react-icons/bs";

function ArticleCategoryField({
    categories,
    selected,
    setSelected,
    setQuery,
    query,
}) {
    return (
        <div className="w-full">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative">
                    <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white  text-left focus:outline-none  focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none text-[18px] text-[#1B3044] px-4 py-[11px] leading-5 ring-0 focus:ring-0 focus:outline-none"
                            displayValue={(person) => person.name}
                            placeholder="Select a category"
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <BsChevronExpand
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {categories.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                categories.map((category) => (
                                    <Combobox.Option
                                        key={category.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-teal-600 text-white" : "text-gray-900"
                                            }`
                                        }
                                        value={category}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? "font-medium" : "font-normal"
                                                        }`}
                                                >
                                                    {category.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-teal-600"
                                                            }`}
                                                    >
                                                        <AiOutlineCheck
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
}

export default ArticleCategoryField;