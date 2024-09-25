import { useEffect, useState } from "react";
import Send from "./components/send";

function App() {
  const [detail, setDetail] = useState({
    ID: "",
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: ""

  })
  async function senddetail(e) {
    e.preventDefault();
    debugger;
    let dataload = {
      ID: detail.ID,
      FirstName: detail.FirstName,
      LastName: detail.LastName,
      Email: detail.Email,
      Phone: detail.Phone
    }
    const gg = await fetch('/api/odata/v4/employee/Employees', {
      method: "post",
      headers:{
        "content-type":"application/json",
      },
      body: JSON.stringify(dataload)
    })
    console.log(gg);
    setDetail({
      ID: "",
      FirstName: "",
      LastName: "",
      Email: "",
      Phone: ""
    })
    window.location.reload();
  }

  function setg(e) {
    setDetail({ ...detail, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Send />
      <h2>User Information Form</h2>
      <form onSubmit={senddetail}>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="ID" value={detail.ID} onChange={setg} required /><br /><br />

        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="FirstName" value={detail.FirstName} onChange={setg} required /><br /><br />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="LastName" value={detail.LastName} onChange={setg} required /><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="Email" value={detail.Email} onChange={setg} required /><br /><br />

        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="Phone" value={detail.Phone} onChange={setg} required /><br /><br />

        <button type="submit" value="Submit">Send</button>
      </form>
    </>
  );
}

export default App;
