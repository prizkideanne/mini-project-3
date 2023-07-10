import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import InputWithValidation from "../components/InputWithValidation";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import withAuth from "../withAuth";

function ProductForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      category: "",
    },
    onSubmit: (values) => {
      setErrorMessage("");
      console.log("test", values);
      // console.log("file", file.name)
      handleOnCreateproduct(values);
    },
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/category/getAllCategories")
      .then((response) => {
        setCategories(response.data.data);
        console.log(response.data)
        console.log(categories)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOnCreateproduct = (values) => {
    const { name, price, description, category } = values;
    console.log("productForm", values);
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category", category);
    data.append("file", file);
    axios
      .post("http://localhost:8000/product/createProduct", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        alert("Create Product Success, " + data.message);
        navigate("/");
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.message);
      });
  };
  return (
    <div className="flex h-screen w-full justify-center bg-yellow-300 lg:mt-0 lg:items-center">
      <div>
        <form
          className="flex w-[390px]:left-1 flex-col rounded-md bg-yellow-300 p-10 md:w-[600px] lg:w-full"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          {/* tampilan gambar */}
          <div className="mb-9 flex max-w-[956px]:  justify-center md:w-[600px] lg:w-full">
            <img
              className=" w-[726px]:left-1  p-0 h-40 w-50 border-0 scale-125 space-x-4 my-8 object-fill "
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://logodix.com/logo/360466.png"
              }
              alt=""
            />
          </div>

          {/* tombol pilih gambar */}
          <label
            className="cursor-pointer text-slate-100 mb-9 w-full text-white bg-indigo-500 bg-contain text-center"
            htmlFor="fileinput"
          >
            Choose Photo Product
          </label>
          <input
            onChange={(e) => {
              console.log(e.target.files[0]);
              setFile(e.target.files[0]);
            }}
            style={{ display: "none" }}
            id="fileinput"
            type="file"
            name="file"
          />

          <span>Product Name</span>
          <InputWithValidation
            formikConfig={formik.getFieldProps("name")}
            name="name"
            placeholder="name"
            touched={formik.touched.name}
            error={formik.errors.name}
          />

          <span>Price</span>
          <InputWithValidation
            formikConfig={formik.getFieldProps("price")}
            name="price"
            placeholder="price"
            touched={formik.touched.price}
            error={formik.errors.price}
          />

          <span>description</span>
          <textarea
            name="description"
            placeholder="description"
            className="resize border-1 rounded-md border  border-black"
            values={formik.values.description}
            onChange={formik.handleChange}
          ></textarea>

          <span>Category</span>

          <select
            className="mb-5 ml-2 bg-gray-200 outline-none border-rounded"
            onChange={formik.handleChange}
            value={formik.values.category}
            name="category"
          >
            <option value="">select category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>


          <button type="submit" className="cursor-pointer text-slate-100	bg-indigo-500 text-white" useNavigate="/myStore" >
            Publish
          </button>
        </form>
      </div>
    </div>

  );
}

export default withAuth(ProductForm);
