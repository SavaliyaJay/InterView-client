import { Breadcrumbs, Input, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addNewCategoryThunkAction } from "@/redux/sidebarList/action";

const AddCategory = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      categoryName: ""
    },
    validationSchema: Yup.object().shape({
      categoryName: Yup.string().trim().required("Category Name is required.")
    }),
    onSubmit: (values, { resetForm }) => {
      const data = { name: values.categoryName };
      dispatch(
        addNewCategoryThunkAction(data, () => {
          resetForm();
        })
      );
    }
  });
  return (
    <div>
      <div>
        <Breadcrumbs>
          <Link href="/">
            <span className="opacity-60">home</span>
          </Link>
          <span className="opacity-60">Dashboard</span>
          <span className="opacity-60">Category</span>
          <span>Add Category</span>
        </Breadcrumbs>
      </div>

      <div className="flex-grow flex mt-3 ml-1 mb-3">
        <div className="flex-grow bg-[#f1f1f1] rounded-md p-4">
          <div className="flex flex-col gap-2 items-center justify-center text-2xl font-bold pt-5">
            Category
          </div>
          <div>
            <form className="mt-8 mb-2 mx-5" onSubmit={formik.handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Category Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="category name.."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none"
                  }}
                  {...formik.getFieldProps("categoryName")}
                />
              </div>
              {formik.touched.categoryName && formik.errors.categoryName ? (
                <div className="text-red-800 mt-1">{formik.errors.categoryName}</div>
              ) : null}
              <div className="flex items-center justify-center ">
                <Button
                  className="mt-4 bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding text-transparent bg-opacity-50 text-white font-bold rounded-md hover:from-blue-700 hover:to-purple-600"
                  type="submit"
                >
                  submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
