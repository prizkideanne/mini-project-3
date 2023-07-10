import React, { useEffect, useState } from "react";
import { Label, TextInput, Textarea } from "flowbite-react";
import { Formik } from "formik";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ModifyProduct = () => {
  const { id } = useParams();

  const [value, setValue] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState("1");

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

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_BASE_URL + "/product/getMyProduct/:id");
  });

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
      .patch(
        process.env.REACT_APP_API_BASE_URL + `/product/editProduct/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

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
        <div className="flex h-screen w-full justify-center lg:mt-0 lg:items-center">
          <form
            className="w-[390px]:left-1 flex flex-col rounded-md p-10 md:w-[600px] lg:w-full"
            onSubmit={props.handleSubmit}
          >
            {/* tampilan gambar */}
            <div className="max-w-[956px]: mb-9 flex  justify-center md:w-[600px] lg:w-full">
              <img
                className=" w-[726px]:left-1  w-50 my-8 h-40 scale-125 space-x-4 border-0 object-fill p-0"
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
              className="text-slate-100 w-100% w-[390px]: item-center mb-4 rounded-md px-2 py-1 flex cursor-pointer justify-center bg-science-blue-500 bg-contain p-1 text-center text-white"
              htmlFor="fileinput"
            >
              Choose Photo Product
            </label>
            <input
              onChange={(e) => {
                props.setFieldValue("file", e.currentTarget.files[0]);
                setFile(e.target.files[0]);
              }}
              style={{ display: "none" }}
              className="text-white"
              id="fileinput"
              type="file"
              name="file"
            />

            <div className="flex flex-col items-center justify-center ">
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
                <Label htmlFor="price" value="Price" />
                <TextInput
                  className="mb-4"
                  type="text"
                  placeholder="Price"
                  name="price"
                  onChange={props.handleChange}
                  value={props.values.price}
                />

                <div id="textarea" className="">
                  <div className="mb-4 block">
                    <Label
                      htmlFor="description"
                      value="Description"
                    />
                    <Textarea
                      type="text"
                      className="border-1 mb-9 resize rounded-md border  border-black"
                      placeholder="description of product"
                      name="description"
                      onChange={(event) => {
                        props.setFieldValue("description", event.target.value);
                      }}
                    />
                    <select
                      className="item-center border-rounded mb-5 ml-8 flex justify-center bg-science-blue-200 outline-none"
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
            <button
              type="submit"
              className="text-slate-100 px-2 py-1 rounded-md cursor-pointer	bg-science-blue-500 text-white"
            >
              Publish
            </button>
          </form>
        </div>
      )}
    </Formik>
  );
};

export default ModifyProduct;
