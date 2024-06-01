"use client";
import Link from "next/link";
import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const page = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().trim().email("Invalid email address").required("Email is required."),
      password: Yup.string().trim().required("Password is required.")
      // .matches(
      //   /^(?=.*\d)(?=.*[!@#$%.^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
      //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      // )
    }),
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{ backgroundImage: 'url("/assets/loginImage.png")' }}
        />
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Sign In
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to register.
            </Typography>
            <form className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
              <div className="mb-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <div>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none"
                    }}
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-800 mt-1">{formik.errors.email}</div>
                  ) : null}
                </div>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Password
                </Typography>
                <div>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none"
                    }}
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-800 mt-1">{formik.errors.password}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button className="mt-6 flex" color="blue" type="submit">
                  Sign In
                </Button>
              </div>

              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link href="/auth/register" className="font-medium text-blue-700 underline">
                  Sign Up
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
