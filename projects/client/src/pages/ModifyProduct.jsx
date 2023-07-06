import React, { useEffect, useState } from "react";
import {
    Label,
    TextInput,
    Textarea,
} from "flowbite-react";
import FilterDropdown from "../components/FilterDropdown";
import SortDropdown from "../components/SortDropdown";
import { Formik } from "formik";
import axios from "axios";
import withAuth from "../withAuth";
import { useNavigate, useParams } from "react-router-dom";

const ModifyProduct = () => {
    const { id } = useParams();

    const handleSelectChange = (event) => {
        setSelectedItem(event.target.value);
    };

    const onSelectCategory = (category) => {
        console.log(category)
    };

    const [value, setValue] = useState("");
    const [products, setProducts] = useState([]);
    const [file, setFile] = useState(null);
    const [categories, setCategories] = useState([]);
    const [selectedItem, setSelectedItem] = useState('1');

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
                <div className="flex h-screen w-full bg-blue-600 justify-center lg:mt-0 lg:items-center">
                    <form className="flex flex-col w-[390px] lg:w-[1800px] md:w-[600px] flex flex-col rounded-md border bg-yellow-300 border-red-400 p-10-4" onSubmit={props.handleSubmit}>
                        {/* tampilan gambar */}
                        <div className='w-[390px] lg:w-[1800px] md:w-[600px] mb-9 flex justify-center'>
                            <img className="box-border h-40 w-40 p-4 border-4 item" src={file ? URL.createObjectURL(file) : "https://www.freepnglogos.com/uploads/plus-icon/red-plus-clip-art-clkerm-vector-clip-art-online-15.png"} alt="" />
                        </div>

                        {/* tombol pilih gambar */}
                        <label className="w-[390px] lg:w-[1800px] md:w-[600px] mb-9 bg-contain text-center text-slate-100 bg-indigo-500" htmlFor='fileinput'>
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
                                    id="name"
                                    type="text"
                                    placeholder="Product Name"
                                    name="name"
                                    onChange={props.handleChange}
                                    value={props.values.name}
                                />
                                <Label htmlFor="price" value="change price" />
                                <TextInput
                                    type="text"
                                    placeholder="Change Price"
                                    name="price"
                                    onChange={props.handleChange}
                                    value={props.values.price}
                                />

                                <div id="textarea">
                                    <div className="mb-3 block">
                                        <Label
                                            htmlFor="description"
                                            value="change product description"
                                        />
                                        <Textarea
                                            type="text"
                                            placeholder="description of product"
                                            name="description"
                                            onChange={(event) => {
                                                props.setFieldValue("description", event.target.value);
                                            }}
                                        />
                                        <select
                                            className="ml-2 bg-gray-200 outline-none border-rounded"
                                            onChange={props.handleChange}
                                            name="CategoryId"
                                            onChange={props.handleChange}
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
                        <button type="submit" className="text-slate-100	bg-indigo-500">Publish</button>
                        <div className="flex justify-center item-center">
                            <p>{JSON.stringify(props.values)}</p>
                        </div>
                    </form>
                </div>
            )}
        </Formik>
    );
};

export default ModifyProduct;