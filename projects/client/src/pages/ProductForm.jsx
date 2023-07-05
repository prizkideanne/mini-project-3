import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import InputWithValidation from "../components/InputWithValidation";
import { useNavigate } from "react-router-dom";
import { Formik, useFormik } from 'formik'
import withAuth from '../withAuth';

function ProductForm() {
  const [errorMessage, setErrorMessage] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token")

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      category: ""
    }, onSubmit: (values) => {
      setErrorMessage("");
      console.log("test", values)
      // console.log("file", file.name)
      handleOnCreateproduct(values);
    },
  })

  const handleOnCreateproduct = (values) => {
    const {
      name,
      price,
      description,
      category,

    } = values;
    console.log("productForm", values);
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    data.append("categoryId", category);
    data.append("file", file);
    axios
      .post("http://localhost:8000/product/createProduct", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
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
    <div className="flex h-screen w-full bg-blue-600 justify-center lg:mt-0 lg:items-center">
      <div>
        <form
          className="w-[390px] lg:w-[1800px] md:w-[600px] flex flex-col rounded-md border bg-yellow-300 border-red-400 p-10"
          onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
          }}
        >
          {/* tampilan gambar */}
          <div className='w-[390px] lg:w-[1800px] md:w-[600px] mb-9 flex justify-center'>
            <img className="box-border h-40 w-40 p-4 border-4 item" src={file ? URL.createObjectURL(file) : "https://www.freepnglogos.com/uploads/plus-icon/red-plus-clip-art-clkerm-vector-clip-art-online-15.png"} alt="" />
          </div>

          {/* tombol pilih gambar */}
          <label className="w-[390px] lg:w-[1800px] md:w-[600px] mb-9 bg-contain text-center text-slate-100 bg-indigo-500" htmlFor='fileinput'>
            Choose Photo Product
          </label>
          <input onChange={e => {
            console.log(e.target.files[0])
            setFile(e.target.files[0])
          }} style={{ display: "none" }} id='fileinput' type='file' name='file' />

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
          <textarea name="description"
            placeholder="description"
            className='border border-1 border-black  rounded-md'
            values={formik.values.description}
            onChange={formik.handleChange}>
          </textarea>

          <span>Category</span>
          <InputWithValidation
            formikConfig={formik.getFieldProps("category")}
            name="category"
            placeholder="category"
            touched={formik.touched.category}
            error={formik.errors.category}
          />

          <button type="submit" className="text-slate-100	bg-indigo-500">Publish</button>
        </form>
      </div>


    </div>
    // <Formik

    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     formik.handleSubmit();
    //   }}
    // >{props => (

    //   <form onSubmit={props.handleSubmit} className='flex flex-col justify-center item-center h-screen w-screen'>
    //     <div className='mb-9 flex justify-center'>
    //       <img className="box-border h-40 w-40 p-4 border-4 item" src="https://www.blibli.com/friends-backend/wp-content/uploads/2022/08/5-Ciri-Sepatu-Warrior-Asli-Kamu-Wajib-Tahu.jpeg" alt="" />
    //     </div>
    //     <label className="bg-contain text-center text-slate-100 bg-indigo-500" htmlFor='inputFile'>
    //       import photo product
    //       {/* <button type="button" className="text-slate-100	bg-indigo-500 mb-10 border border-1 border-black sbg-indigo-500">Import Photo Product</button> */}
    //     </label>
    //     <input onChange={e => {
    //       props.setFieldValue("file", e.target.files[0])
    //     }} style={{ display: "none" }} id='inputFile' type='file' name='inputFile' />
    //     <span>Name</span>
    //     <input className="text-center	 mb-6 flex-row border border-1 border-black" onChange={props.handleChange} placeholder="name" type="text" name='name' />
    //     <span>Description</span>
    //     <textarea className="text-center	mb-10 flex-row justify-center border border-1 border-black" onChange={props.handleChange} placeholder="description" name="description" />
    //     <span>Price</span>
    //     <input className="text-center	mb-6 flex-row justify-center border border-1 border-black" onChange={props.handleChange} placeholder="Price" type="text" name='price' />
    //     <span>Category</span>
    //     <input className="text-center	mb-6 flex-row justify-center border border-1 border-black" onChange={props.handleChange} placeholder="Category" type="text" name='category' />
    //     <button type="submit" className="text-slate-100	bg-indigo-500">Publish</button>
    //   </form>

    // )}
    // </Formik>
  )
}


export default withAuth(ProductForm)