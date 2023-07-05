import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Formik, useFormik } from 'formik'

function ProductForm() {
  const [post, setPost] = useState({
    name: "",
    Description: "",
    price: "",
    category: ""
  })

  const handleInput = (event) => {
    setPost({ ...post, [event.target.name]: event.target.event })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    axios.post("http://localhost:8000/product/createProduct", { post })
      .then(response => console.log(response))
      .catch(err => console.log(err))

  }
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      description: "",
      category: "",
    }, onSubmit: handleSubmit
  })
  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        keywords: "",
        description: "",
        category: "",
      }}
      onSubmit={handleSubmit}
    >{props => (

      <div onSubmit={props.handleSubmit} className='flex flex-col justify-center item-center h-screen w-screen'>
        <div className='mb-9 flex justify-center'>
          <img className="box-border h-40 w-40 p-4 border-4 item" src="https://www.blibli.com/friends-backend/wp-content/uploads/2022/08/5-Ciri-Sepatu-Warrior-Asli-Kamu-Wajib-Tahu.jpeg" alt="" />
        </div>
        <label className="bg-contain text-center text-slate-100 bg-indigo-500" htmlFor='inputFile'>
          import photo product
          {/* <button type="button" className="text-slate-100	bg-indigo-500 mb-10 border border-1 border-black sbg-indigo-500">Import Photo Product</button> */}
        </label>
        <input style={{ display: "none" }} id='inputFile' type='file' name='inputFile' />
        <span>Name</span>
        <input className="text-center	 mb-6 flex-row border border-1 border-black" onChange={props.handleChange} placeholder="name" type="text" name='name' />
        <span>Description</span>
        <textarea className="text-center	mb-10 flex-row justify-center border border-1 border-black" onChange={props.handleChange} placeholder="description" name="description" />
        <span>Price</span>
        <input className="text-center	mb-6 flex-row justify-center border border-1 border-black" onChange={props.handleChange} placeholder="Price" type="text" name='price' />
        <span>Category</span>
        <input className="text-center	mb-6 flex-row justify-center border border-1 border-black" onChange={props.handleChange} placeholder="Category" type="text" name='category' />
        <button onChange={e => {
          props.setFieldValue("file", e.target.files[0])
        }} type="submit" className="text-slate-100	bg-indigo-500">Publish</button>
      </div>

    )}
    </Formik>
  )
}

export default ProductForm