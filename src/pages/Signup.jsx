import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    cart: [],
    orders: [],
    status: "active",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "At least 6 characters").required("Password is required"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { confirmpassword, ...userData } = values;

    try {
      const { data: users } = await axios.get("http://localhost:5000/users");

      const emailExists = users.some((user) => user.email === userData.email);

      if (emailExists) {
        toast.error("Email is already taken!", { duration: 3000 });
        setSubmitting(false);
        return;
      }

      await axios.post("http://localhost:5000/users", userData);
      toast.success("Signup successful!", { duration: 3000 });
      resetForm();
      navigate("/login");
    } catch (error) {
      toast.error("Error signing up. Please try again.");
      console.error("Error signing up", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-950">
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/assets/shoe.jpg')" }}></div>
      
      <div className="flex-1 flex justify-center items-center p-6 bg-blue-950 shadow-lg rounded-lg w-full lg:w-1/2">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">Sign Up</h2>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label className="block text-white font-medium">Name</label>
                  <Field type="text" name="name" className="w-full border p-2 rounded text-white" />
                  <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-white font-medium">Email</label>
                  <Field type="email" name="email" className="w-full border p-2 rounded text-white" />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-white font-medium">Password</label>
                  <Field type="password" name="password" className="w-full border p-2 rounded text-white" />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>

                <div>
                  <label className="block text-white font-medium">Confirm Password</label>
                  <Field type="password" name="confirmpassword" className="w-full border p-2 rounded text-white" />
                  <ErrorMessage name="confirmpassword" component="div" className="text-red-500 text-sm" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  {isSubmitting ? "Signing Up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Signup;
