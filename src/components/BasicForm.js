import { React, useState, useEffect } from "react";
import basicSchema from "./schemas/index";
import { useFormik } from "formik";
import Axios from "axios";

const BasicForm = () => {
  const [listOfUsers, setListOfUsers] = useState([
    // {
    //   email: "test@gamil.com",
    //   age: "21",
    //   password: "test",
    //   confirmPassword: "test",
    // },
  ]);

  // useEffect(()=>{
  //   Axios.get('http://localhost:5001/getUsers')
  // .then(function (response) {
  //   // handle success
  //   console.log(response);
  // })
  // })

  useEffect (()=>{
    Axios.get("http://localhost:5001/getUsers").then((response)=>{
      setListOfUsers(response.data)
    });
  },[])

  const onSubmit = () => {
    console.log("submitted");
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        äge: "",
        password: "",
        confrimPassword: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  console.log(errors);
  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={values.email}
          onChange={handleChange}
          id="email"
          type="email"
          placeholder="Enter your email"
          onBlur={handleBlur}
          className={errors.email && touched.email ? "input-error" : ""}
        />
        {errors.email && touched.email && (
          <p className="error">{errors.email}</p>
        )}
        <label htmlFor="email">Age</label>
        <input
          value={values.age}
          onChange={handleChange}
          id="age"
          type="number"
          placeholder="Enter your age"
          onBlur={handleBlur}
          className={errors.age && touched.age ? "input-error" : ""}
        />
        {errors.age && touched.age && <p className="error">{errors.age}</p>}
        <label htmlFor="email">Password</label>
        <input
          value={values.password}
          onChange={handleChange}
          id="password"
          type="password"
          placeholder="Enter your password"
          onBlur={handleBlur}
          className={errors.password && touched.password ? "input-error" : ""}
        />
        {errors.password && touched.password && (
          <p className="error">{errors.password}</p>
        )}
        <label htmlFor="email">Confrim Password</label>
        <input
          value={values.confrimPassword}
          onChange={handleChange}
          id="ConfrimPassword"
          type="password"
          placeholder="Enter your confrim password"
          onBlur={handleBlur}
          className={
            errors.confrimPassword && touched.confrimPassword
              ? "input-error"
              : ""
          }
        />
        {errors.confrimPassword && touched.confrimPassword && (
          <p className="error">{errors.confrimPassword}</p>
        )}
      </form>
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h2>Name: {user.email}</h2>
              <h2>Age: {user.age}</h2>
              <h2>Password: {user.password}</h2>
              <h2> confirmPassword: {user.confirmPassword}</h2>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default BasicForm;
