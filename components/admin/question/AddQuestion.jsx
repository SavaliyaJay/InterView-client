import { Breadcrumbs, Input, Button, Typography } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionThunkAction } from "@/redux/content/action";
import { selectCategoryList } from "@/redux/category/selectors";
import { selectSubCategoryList } from "@/redux/subcategory/selectors";
import { fetchCategoryListThunkAction } from "@/redux/category/actions";
import { fetchSubCategoryListThunkAction } from "@/redux/subcategory/actions";

const AddQuestion = () => {
  const dispatch = useDispatch();
  const [optionsOfCategory, setOptionsOfCategory] = useState([]);
  const [optionsOfSubCategory, setOptionsOfSubCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const { CategoryList } = useSelector(selectCategoryList);
  const { SubCategoryList } = useSelector(selectSubCategoryList);

  useEffect(() => {
    dispatch(fetchCategoryListThunkAction());
  }, [dispatch]);

  useEffect(() => {
    if (CategoryList && CategoryList.length > 0) {
      setOptionsOfCategory(
        CategoryList.map((category) => ({ value: category.c_id, label: category.name }))
      );
    }
  }, [CategoryList]);

  useEffect(() => {
    if (selectedCategory) {
      setOptionsOfSubCategory([]);
      dispatch(fetchSubCategoryListThunkAction(selectedCategory.value));
    }
  }, [dispatch, selectedCategory]);

  useEffect(() => {
    if (SubCategoryList && SubCategoryList.length > 0) {
      setOptionsOfSubCategory(
        SubCategoryList.map((subCategory) => ({
          value: subCategory.sc_id,
          label: subCategory.name
        }))
      );
    }
  }, [SubCategoryList]);

  const formik = useFormik({
    initialValues: {
      question: "",
      categoryId: "",
      subCategoryId: ""
    },
    validationSchema: Yup.object().shape({
      question: Yup.string().trim().required("Question is required."),
      categoryId: Yup.string().trim().required("Category is required."),
      subCategoryId: Yup.string().trim().required("Subcategory is required.")
    }),
    onSubmit: (values, { resetForm }) => {
      const data = {
        question: values.question,
        subCategory_id: values.subCategoryId
      };

      dispatch(addQuestionThunkAction(data)).then(() => {
        resetForm();
        setSelectedCategory(null);
        setSelectedSubCategory(null);
        setOptionsOfSubCategory([]);
      });
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
          <span>Add Question</span>
        </Breadcrumbs>
      </div>

      <div className="flex-grow flex mt-3 ml-1 mb-3">
        <div className="flex-grow bg-[#f1f1f1] rounded-md p-4">
          <div className="flex flex-col gap-2 items-center justify-center text-2xl font-bold pt-5">
            Question
          </div>
          <div>
            <form className="mt-8 mb-2 mx-5" onSubmit={formik.handleSubmit}>
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Question
                </Typography>
                <Input
                  size="lg"
                  placeholder="Enter your question.."
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
                  onChange={(option) => {
                    setSelectedCategory(option);
                    formik.setFieldValue("categoryId", option.value);
                  }}
                  options={optionsOfCategory}
                  value={selectedCategory}
                />
              </div>
              {formik.touched.categoryId && formik.errors.categoryId ? (
                <div className="text-red-800 mt-1">{formik.errors.categoryId}</div>
              ) : null}

              <div className="mb-1 flex flex-col gap-6 mt-5">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Select Subcategory
                </Typography>
                <Select
                  onChange={(option) => {
                    setSelectedSubCategory(option);
                    formik.setFieldValue("subCategoryId", option.value);
                  }}
                  options={optionsOfSubCategory}
                  value={selectedSubCategory}
                />
              </div>
              {formik.touched.subCategoryId && formik.errors.subCategoryId ? (
                <div className="text-red-800 mt-1">{formik.errors.subCategoryId}</div>
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

export default AddQuestion;
