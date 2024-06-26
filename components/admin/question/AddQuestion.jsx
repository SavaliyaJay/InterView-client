import { Breadcrumbs, Input, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";

const AddQuestion = () => {
  const options = [
    { value: 1, label: "Chocolate" },
    { value: 2, label: "Strawberry" },
    { value: 3, label: "Vanilla" }
  ];

  const formik = useFormik({
    initialValues: {
      question: "",
      subCategoryId: ""
    },
    validationSchema: Yup.object().shape({
      question: Yup.string().trim().required("question is required."),
      subCategoryId: Yup.string().trim().required("Subcategory is required.")
    }),
    onSubmit: (values) => {
      console.log(values);
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
          <span>Add Subcategory</span>
        </Breadcrumbs>
      </div>

      <div className="flex-grow flex mt-3 ml-1 mb-3">
        <div className="flex-grow bg-[#f1f1f1] rounded-md p-4">
          <div className="flex flex-col gap-2 items-center justify-center text-2xl font-bold pt-5">
            Subcategory
          </div>
          <div>
            <form className="mt-8 mb-2 mx-5" onSubmit={formik.handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Subcategory Name
                </Typography>
                <Input
                  size="lg"
                  placeholder="category name.."
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none"
                  }}
                  {...formik.getFieldProps("question")}
                />
              </div>
              {formik.touched.question && formik.errors.question ? (
                <div className="text-red-800 mt-1">{formik.errors.question}</div>
              ) : null}

              <div className="mb-1 flex flex-col gap-6 mt-5">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Select Category
                </Typography>
                <Select
                  onChange={(option) => formik.setFieldValue("subCategoryId", option.value)}
                  options={options}
                />
              </div>
              {formik.touched.subCategoryId && formik.errors.subCategoryId ? (
                <div className="text-red-800 mt-1">{formik.errors.subCategoryId}</div>
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

export default AddQuestion;
