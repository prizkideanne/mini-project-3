import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import InputWithValidation from "../components/InputWithValidation";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

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
    onSubmit: (values, { resetForm }) => {
      setErrorMessage("");
      // console.log("file", file.name)
      handleOnCreateproduct(values, resetForm);
    },
  });

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/category/getAllCategories")
      .then((response) => {
        setCategories(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleOnCreateproduct = (values, resetForm) => {
    const { name, price, description, category } = values;
    console.log("productForm", values);
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("category", category);
    data.append("file", file);
    axios
      .post(
        process.env.REACT_APP_API_BASE_URL + "/product/createProduct",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data);
        alert("Create Product Success, " + data.message);
        resetForm();
        navigate("/dashboard/store");
      })
      .catch(({ response }) => {
        setErrorMessage(response.data.message);
      });
  };
  return (
    <div className="flex h-screen w-full justify-center  lg:mt-0 lg:items-center">
      <div>
        <form
          className="w-[390px]:left-1 flex flex-col rounded-md md:w-[600px] lg:w-full"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          {/* tampilan gambar */}
          <div className="mb-3 flex max-w-[956px] justify-center rounded-md border border-black bg-white md:w-[600px] lg:w-full">
            <img
              className=" w-[726px]:left-1  w-50 my-8 h-40 scale-125 space-x-4 border-0 object-fill p-0 "
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
            className="text-slate-100 mb-9 w-full cursor-pointer rounded-md bg-science-blue-800 bg-contain  px-2 py-1 text-center text-white"
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

          <div className="flex flex-col gap-4">
            <InputWithValidation
              formikConfig={formik.getFieldProps("name")}
              name="name"
              label="Product Name"
              touched={formik.touched.name}
              error={formik.errors.name}
            />

            <InputWithValidation
              formikConfig={formik.getFieldProps("price")}
              name="price"
              label="Price"
              touched={formik.touched.price}
              error={formik.errors.price}
            />

            <div className="flex flex-col">
              <span className="text-sm leading-6">Description</span>
              <textarea
                name="description"
                placeholder="description"
                className="border-1 resize rounded-md border  border-black"
                values={formik.values.description}
                onChange={formik.handleChange}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm leading-6">Category</span>
              <select
                className="border-rounded mb-5 ml-2 bg-science-blue-600 text-white outline-none"
                onChange={formik.handleChange}
                value={formik.values.category}
                name="category"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="text-slate-100 cursor-pointer rounded-md bg-science-blue-800 px-2	py-1 text-white"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductForm;
