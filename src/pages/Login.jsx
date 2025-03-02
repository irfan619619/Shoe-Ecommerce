// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { toast } from "react-hot-toast";

// const Login = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null); // 🔥 State to track login status

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser)); // 🔥 Keep user state in sync
//     }
//   }, []);

//   const initialvalue = {
//     email: "",
//     password: "",
//   };

//   const loginvalid = Yup.object({
//     email: Yup.string().email("Enter valid email").required("Email required"),
//     password: Yup.string().required("Password required"),
//   });

//   const handleSubmit = async (values, { setSubmitting }) => {
//     try {
//       const { data: users } = await axios.get("http://localhost:5000/users");

//       if (values.email === "admin@gmail.com" && values.password === "admin") {
//         const adminUser = { email: "admin" };
//         localStorage.setItem("user", JSON.stringify(adminUser));
//         setUser(adminUser); // 🔥 Updates UI instantly
//         toast.success("Admin login successful", { duration: 3000 });
//         navigate("/adminhome");
//         return;
//       }

//       const foundUser = users.find(
//         (u) => u.email === values.email && u.password === values.password
//       );

//       if (!foundUser) {
//         toast.error("Invalid email or password", { duration: 3000 });
//         setSubmitting(false);
//         return;
//       }

//       localStorage.setItem("user", JSON.stringify(foundUser));
//       setUser(foundUser); // 🔥 Updates UI instantly
//       toast.success("Login successful!", { duration: 1000 });
//       navigate("/");
//     } catch (error) {
//       console.error("Login error:", error);
//       toast.error("Something went wrong! Try again.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null); // 🔥 Logout instantly updates UI
//     toast.success("Logged out successfully!");
//   };

//   return (
//     <div className="flex min-h-screen bg-blue-950">
//       <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/assets/shoe.jpg')" }}></div>
//       <div className="flex-1 flex justify-center items-center p-6 bg-blue-950 shadow-lg rounded-lg w-full lg:w-1/2">
//         <div className="w-full max-w-md">
//           <h2 className="text-2xl font-bold mb-4 text-white text-center">
//             {user ? `Welcome, ${user.email}` : "Login"}
//           </h2>

//           {!user ? (
//             <Formik initialValues={initialvalue} validationSchema={loginvalid} onSubmit={handleSubmit}>
//               {({ isSubmitting }) => (
//                 <Form className="space-y-4">
//                   <div>
//                     <label className="block text-white font-medium">Email</label>
//                     <Field type="email" name="email" className="w-full border p-2 rounded text-white" />
//                     <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
//                   </div>

//                   <div>
//                     <label className="block text-white font-medium">Password</label>
//                     <Field type="password" name="password" className="w-full border p-2 rounded text-white" />
//                     <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
//                   >
//                     {isSubmitting ? "Logging in..." : "Login"}
//                   </button>
//                 </Form>
//               )}
//             </Formik>
//           ) : (
//             <button
//               onClick={handleLogout}
//               className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
//             >
//               Logout
//             </button>
//           )}

//           {!user && (
//             <p className="mt-4 text-center text-white">
//               Don't have an account?{" "}
//               <span
//                 onClick={() => navigate("/signup")}
//                 className="text-blue-300 cursor-pointer hover:underline"
//               >
//                 Register here
//               </span>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;



import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { useAuth } from "../hooks/Useauth";

const Login = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth(); 

  const initialvalue = {
    email: "",
    password: "",
  };

  const loginvalid = Yup.object({
    email: Yup.string().email("Enter a valid email").required("Email required"),
    password: Yup.string().required("Password required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data: users } = await axios.get("http://localhost:5000/users");

      
      if (values.email === "admin@gmail.com" && values.password === "admin") {
        const adminUser = { email: "admin" };
        login(adminUser); 
        toast.success("Admin login successful", { duration: 3000 });
        navigate("/adminhome");
        return;
      }

      const foundUser = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (!foundUser) {
        toast.error("Invalid email or password", { duration: 3000 });
        setSubmitting(false);
        return;
      }

      if (foundUser.blocked) {
        toast.error("Your account has been blocked!", { duration: 3000 });
        setSubmitting(false);
        return;
      }

      
      login(foundUser); 
      toast.success("Login successful!", { duration: 1000 });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong! Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-blue-950">
      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/assets/shoe.jpg')" }}></div>
      <div className="flex-1 flex justify-center items-center p-6 bg-blue-950 shadow-lg rounded-lg w-full lg:w-1/2">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">
            {user ? `Welcome, ${user.email}` : "Login"}
          </h2>

          {!user ? (
            <Formik initialValues={initialvalue} validationSchema={loginvalid} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block text-white font-medium">Email</label>
                    <Field type="email" name="email" className="w-full border p-2 rounded text-white bg-gray-800" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-white font-medium">Password</label>
                    <Field type="password" name="password" className="w-full border p-2 rounded text-white bg-gray-800" />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          )}

          {!user && (
            <p className="mt-4 text-center text-white">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-300 cursor-pointer hover:underline"
              >
                Register here
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
