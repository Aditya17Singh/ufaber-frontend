import React, { useState } from "react";

function Form({ handleData }) {
  console.log(handleData.data.form, "handledatttttttttttttttt");
  const [show, setShow] = useState(true);
  const { emailaddress, fullname, mobile, options } = handleData.data.form;
  const handleChange = () => {
    setShow(!true);
  };
  return (
    <>
      {show ? (
        <div className="modal-bg">
          <button onClick={handleChange}>
            <i class="fas fa-times"></i>
          </button>
          <ul>
            <li>Mobile Number -{mobile}</li>
            <li>Full Name -{fullname}</li>
            <li>Email -{emailaddress}</li>
            <li>Desecribe you best -{options}</li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default Form;
