import React, { useEffect, useState } from "react";
import {
    Label,
    TextInput,
    Textarea,
} from "flowbite-react";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../comp  onents/SortDropdown";
import { Formik } from "formik";
import axios from "axios";
import withAuth from "../withAuth";
import { useNavigate, useParams } from "react-router-dom";

const ModifyProduct = () => {
    const { id } = useParams();

    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    };

    const [value, setValue] = useState("");
    const [products, setProducts] = useState([]);
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedItem, setSelectedItem] = useState('1');

    useEffect(() => {
        axios.get("http://localhost:8000/category/getAllCategories")
            .then((response) => {
                setCategories(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/product/getProduct/:id")
    })

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleSubmit = (values, action) => {
        const { file, name, description, category, price } = values;
        const data = new FormData();
        data.append("name", name);
        data.append("price", price);
        data.append("description", description);
        data.append("categoryId", category);
        data.append("file", file);

        axios
            .patch(`http://localhost:8000/product/editProduct/${id}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            .then((response) => {
                console.log(response);
                setValue(response.data);
            })
            .catch((err) => console.log(err));

        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    return (
        <Formik
            initialValues={{
                file: null,
                name: "",
                description: "",
                price: Number(""),
                category: Number(""),
            }}
            // validationSchema={CreateSchema}
            onSubmit={handleSubmit}
        >

            {(props) => (
                <div className="flex h-screen w-full justify-center bg-yellow-300 lg:mt-0 lg:items-center">
                    <form className="flex w-[390px]:left-1 flex-col rounded-md bg-yellow-300 p-10 md:w-[600px] lg:w-full" onSubmit={props.handleSubmit}>
                        {/* tampilan gambar */}
                        <div className='mb-9 flex max-w-[956px]:  justify-center md:w-[600px] lg:w-full'>
                            <img className=" w-[726px]:left-1  p-0 h-40 w-50 border-0 scale-125 space-x-4 my-8 object-fill"
                                src={file ? URL.createObjectURL(file) : "https://logodix.com/logo/360466.png"} alt="" />
                        </div>

                        {/* tombol pilih gambar */}
                        <label className="p-1 mb-4 cursor-pointer text-slate-100 mb-9 w-100% text-white bg-indigo-500 bg-contain text-center flex w-[390px]: justify-center item-center" htmlFor='fileinput'>
                            Choose Photo Product
                        </label>
                        <input onChange={(e) => {
                            props.setFieldValue("file", e.currentTarget.files[0]);
                            setFile(e.target.files[0])
                        }} style={{ display: "none" }} id='fileinput' type='file' name='file' />

                        <div className="flex flex-col justify-center items-center ">
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Change Product Name" />
                                <TextInput
                                    className="mb-4"
                                    id="name"
                                    type="text"
                                    placeholder="Product Name"
                                    name="name"
                                    onChange={props.handleChange}
                                    value={props.values.name}
                                />
                                <Label htmlFor="price" value="change price" />
                                <TextInput
                                    className="mb-4"
                                    type="text"
                                    placeholder="Change Price"
                                    name="price"
                                    onChange={props.handleChange}
                                    value={props.values.price}
                                />

                                <div id="textarea">
                                    <div className="mb-4 block">
                                        <Label
                                            htmlFor="description"
                                            value="change product description"
                                        />
                                        <Textarea
                                            type="text"
                                            className="mb-9 resize border-1 rounded-md border  border-black"
                                            placeholder="description of product"
                                            name="description"
                                            onChange={(event) => {
                                                props.setFieldValue("description", event.target.value);
                                            }}
                                        />
                                        <select
                                            className="flex justify-center item-center mb-5 ml-8 bg-gray-200 outline-none border-rounded"
                                            onChange={props.handleChange}
                                            name="CategoryId"

                                        >

                                            {categories.map((category) => (
                                                <option value={category.id} key={category.id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="cursor-pointer text-slate-100	bg-indigo-500 text-white">Publish</button>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default ModifyProduct;