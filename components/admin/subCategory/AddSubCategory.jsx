import { Breadcrumbs, Input, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryListThunkAction } from "@/redux/category/actions";
import { addNewSubCategoryThunkAction } from "@/redux/subcategory/actions";
import { selectCategoryList } from "@/redux/category/selectors";

const AddSubCategory = () => {
  const dispatch = useDispatch();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const { CategoryList } = useSelector(selectCategoryList);

  useEffect(() => {
    dispatch(fetchCategoryListThunkAction());
  }, [dispatch]);

  useEffect(() => {
    if (CategoryList && CategoryList.length > 0) {
      setOptions(CategoryList.map((category) => ({ value: category.c_id, label: category.name })));
    }
  }, [CategoryList]);

  const formik = useFormik({
    initialValues: {
      subCategoryName: "",
      categoryId: ""
    },
    validationSchema: Yup.object().shape({
      subCategoryName: Yup.string().trim().required("Subcategory Name is required."),
      categoryId: Yup.string().trim().required("Category is required.")
    }),
    onSubmit: (values, { resetForm }) => {
      console.log("Form Submitted:", values);
      const data = { name: values.subCategoryName, c_id: values.categoryId };
      console.log(data);
      dispatch(
        addNewSubCategoryThunkAction(data, () => {
          resetForm();
          setSelectedOption(null);
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
                  placeholder="category name..."
                  className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none"
                  }}
                  {...formik.getFieldProps("subCategoryName")}
                />
              </div>
              {formik.touched.subCategoryName && formik.errors.subCategoryName ? (
                <div className="text-red-800 mt-1">{formik.errors.subCategoryName}</div>
              ) : null}

              <div className="mb-1 flex flex-col gap-6 mt-5">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Select Category
                </Typography>
                <Select
                  value={selectedOption}
                  onChange={(option) => {
                    setSelectedOption(option);
                    formik.setFieldValue("categoryId", option.value);
                  }}
                  options={options}
                />
              </div>
              {formik.touched.categoryId && formik.errors.categoryId ? (
                <div className="text-red-800 mt-1">{formik.errors.categoryId}</div>
              ) : null}

              <div className="flex items-center justify-center">
                <Button
                  className="mt-4 bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-padding text-transparent bg-opacity-50 text-white font-bold rounded-md hover:from-blue-700 hover:to-purple-600"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategory;
