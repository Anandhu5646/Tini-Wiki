import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        const { data } = await axios.post("/admin/login", {
          email: values.email,
          password: values.password,
        });
       
        setSubmitting(false);

        if (data.error) {
          setErrors({ email: data.message1, password: data.message2 });
        } else { 
          navigate("/admin/");
          dispatch({ type: "refresh" });
        }
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="admin-outer">
        <form onSubmit={formik.handleSubmit}>
            <div
              className="bg-white my-5 mx-auto"
              style={{ borderRadius: "1rem", maxWidth: "500px" }}
            >
              <div className="p-5 w-100 inner-div">
                <h2 className="fw-bold mb-5 text-center">Admin Login</h2>

                <div className="text-danger">{formik.errors.email}</div>
                <input
                  type="email"
                  className="mb-4 w-100 form-control form-control-lg"
                  placeholder="Email address"
                  id="email"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  required
                />

                <div className="text-danger">{formik.errors.password}</div>
                <input
                  type="password"
                  className="mb-4 w-100 form-control form-control-lg"
                  placeholder="Password"
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  required
                />

                <button
                  type="submit"
                  className="btn btn-lg"
                  disabled={formik.isSubmitting}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
    </div>
  );
}

export default Login;
