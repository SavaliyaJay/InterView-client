"use client";
import Link from "next/link";
import React from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const page = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().trim().required("Username is required."),
      email: Yup.string().trim().email("Invalid email address").required("Email is required."),
      password: Yup.string().trim().required("Password is required."),
      confirmPassword: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null], "Passwords must match.")
        .required("Confirm Password is required.")
    }),

    onSubmit: (values) => {
      console.log(values);
    }
  });
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Nice to meet you! Enter your details to register.
            </Typography>
            <form
              className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96"
              onSubmit={formik?.handleSubmit}
            >
              <div className="mb-1 flex flex-col gap-3">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Name
                </Typography>
                <div>
                  <Input
                    size="lg"
                    placeholder="username"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none"
                    }}
                    {...formik.getFieldProps("username")}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-800 mt-1">{formik.errors.username}</div>
                  ) : null}
                </div>
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
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Confirm Password
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
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="text-red-800 mt-1">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button className="mt-6 flex" color="blue" type="submit">
                  Sign up
                </Button>
              </div>
              <Typography color="gray" className="mt-4 text-center font-normal">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-gray-900">
                  Sign In
                </Link>
              </Typography>
            </form>
          </Card>
        </div>
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{ backgroundImage: 'url("/assets/registerImage.png")' }}
        />
      </div>
    </div>
  );
};

export default page;
