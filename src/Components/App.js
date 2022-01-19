import React, { useState } from "react";
import Form from "./Form";
function App() {
  const [state, setState] = useState({
    mobile: "",
    fullname: "",
    emailaddress: "",
    options: "",
    errors: {
      mobile: undefined,
      fullname: undefined,
      emailaddress: undefined,
      options: "",
    },
  });
  const [data, setData] = useState(null);

  function handleInput({ target }) {
    let { name, value } = target;
    let errors = state.errors;
    switch (name) {
      case "mobile":
        let mobileError;
        var pattern = /^(0|[+91]{3})?[7-9][0-9]{9}$/;
        if (value.length < 10) {
          mobileError = "mobile number must be 10 charecters";
        }
        if (!pattern.test(value)) {
          mobileError = "Please Enter valid mobile number";
        }
        errors.mobile = mobileError;
        break;
      case "fullname":
        let fullnameError;
        var fullname = /^([\w]{3,})+\s+([\w\s]{3,})+$/i;
        if (!fullname.test(value)) {
          fullnameError = "Please enter valid name";
        }
        errors.fullname = fullnameError;
        break;
      case "emailaddress":
        let emailerror;
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (value.indexOf("@") === -1) {
          emailerror = "Email does not contain @";
        } else if (!re.test(value)) {
          emailerror = "Please enter valid email address";
        }
        errors.emailaddress = emailerror;
        break;
      default:
        break;
    }
    setState({ ...state, errors, [name]: value });
  }
  function handleSubmit(event) {
    event.preventDefault();
    const { mobile, fullname, emailaddress, options } = state;
    setState({
      mobile: "",
      fullname: "",
      emailaddress: "",
      options: "",
    });
    fetch("https://ufaber-backend.herokuapp.com/form/create", {
      method: "POST",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        Accept: "*",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        form: {
          mobile,
          fullname,
          emailaddress,
          options,
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        } else {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data, "dattttttttttttt");
        setData({
          data,
        });
      });
  }
  let { errors } = state;
  return (
    <>
      <section className="container">
        <div className="flex justify-between column-1">
          <div className="flex-45 column-1">
            <h2>
              <strong className="font-bold">UPSC</strong> PATHSHALA
            </h2>
            <h3 className="text-online">
              Best Online Coaching <br /> for UPSC Preparation
            </h3>
            <img
              className="prose-gray"
              src="/uploads/upsc-preparation.jpg"
              alt="upsc-prepare"
            />
            <h3 className="para">
              Thousands of students from all over india
              <br /> trust UPSC Pathshala for IAS preparation.
              <br /> Now, its <strong>your</strong> chance to clear UPSC!
            </h3>
          </div>
          <form
            className="container form-control flex-40 column-1"
            onSubmit={handleSubmit}
          >
            <div className="flex-80 flex-100 form-control-padding">
              <div className="">
                <h3 className="text-center">Book a free Demo Class</h3>
                <h4 className="text-center text-form">Limited Seats Only!</h4>
              </div>
              <input
                className={`${
                  errors && errors.mobile !== undefined
                    ? "flex-49 width-full input flex-100 border"
                    : "flex-49 width-full input flex-100"
                }`}
                onChange={handleInput}
                value={state.mobile}
                placeholder="Mobile Number"
                name="mobile"
              />
              {state.mobile && (
                <span className="email-error">{errors.mobile}</span>
              )}
              <input
                className={`${
                  errors && errors.fullname !== undefined
                    ? "flex-49 width-full input flex-100 border"
                    : "flex-49 width-full input flex-100"
                }`}
                onChange={handleInput}
                value={state.fullname}
                placeholder="Full Name"
                name="fullname"
              />
              {state.fullname && (
                <span className="email-error">{errors.fullname}</span>
              )}
              <input
                className={`${
                  errors && errors.emailaddress !== undefined
                    ? "flex-49 width-full input flex-100 border"
                    : "flex-49 width-full input flex-100"
                }`}
                onChange={handleInput}
                value={state.email}
                placeholder="Email Id"
                name="emailaddress"
              />
              {state.emailaddress && (
                <span className="email-error">{errors.emailaddress}</span>
              )}
              <label>What describes you best?</label>
              <select
                className="input select"
                onChange={handleInput}
                value={state.options}
                name="options"
                placeholder="Select Option"
              >
                <option>Select Options</option>
                <option name="options" onChange={handleInput}>
                  College Student
                </option>
                <option name="options" onChange={handleInput}>
                  Working Proffesional
                </option>
                <option name="options" onChange={handleInput}>
                  Full time aspirants
                </option>
                <option name="options" onChange={handleInput}>
                  Other
                </option>
              </select>
              <input type="submit" placeholder="Submit" className="btn" />
              <p>
                By clicking button you explicitly solicit a call & email from
                ufaber
              </p>
            </div>
          </form>
        </div>
      </section>
      {data ? <Form handleData={data} /> : ""}
    </>
  );
}
export default App;
