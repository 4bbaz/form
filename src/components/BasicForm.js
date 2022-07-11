import { React, useState, useEffect } from "react";
import basicSchema from "./schemas/index";
import { useFormik } from "formik";
import Axios from "axios";

const BasicForm = () => {
  const [listOfUsers, setListOfUsers] = useState([]);

  // const [email, setEmail] = useState("");
  // const [age, setAge] = useState(0);
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");



  useEffect(() => {
    Axios.get("http://localhost:5001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    Axios.post("http://localhost:5001/createUsers", {
      email:values.email,
      age:values.age,
      password:values.password,
      confirmPassword:values.confirmPassword,
    }).then((response) => {
      setListOfUsers([...listOfUsers, this.email, this.age, this.password, this.confirmPassword]);
    });
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        age: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: basicSchema,
      onSubmit: () => {
        createUser();
      },
    });

  console.log(errors);
  return (
    <>
      <form autoComplete="off" onSubmit={createUser}>
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
          value={values.confirmPassword}
          onChange={handleChange}
          id="confirmPassword"
          type="password"
          placeholder="Enter your confrim password"
          onBlur={handleBlur}
          className={
            errors.confirmPassword && touched.confirmPassword
              ? "input-error"
              : ""
          }
        />
        {errors.confirmPassword && touched.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}

        <button type="submit">
          Submit
        </button>
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
