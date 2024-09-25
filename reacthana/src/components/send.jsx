import { useEffect, useState } from "react";
function Send(){
    const [data, setData] = useState([]);
    const [upd , setUpd] = useState(false);
    const [setee , sete] = useState(0);
    const [detaill, setdetaill] = useState({
        ID: "",
        FirstName: "",
        LastName: "",
        Email: "",
        Phone: ""
    
      })

    useEffect(() => {
      const fetchData = async () => {
       
          const result = await fetch('http://localhost:4004/odata/v4/employee/Employees').then(r=>r.json())
          console.log(result)
          setData(result.value);
  
  
      
      };
  
      fetchData();
    }, []);

   async function deleted(paraid){
        const gg = await fetch(`/api/odata/v4/employee/Employees/${paraid}`, {
            method: "delete"
          })
          window.location.reload();
    }

   async function updated(id){
     setUpd(true);
     sete(id);
     const result = await fetch(`http://localhost:4004/odata/v4/employee/Employees/${id}`).then(r=>r.json())
     console.log(result)
     setdetaill( {
        ID : result.ID,
        FirstName : result.FirstName,
        LastName : result.LastName,
        Email : result.Email,
        Phone : result.Phone
     } );

    }
    function setgg(e) {
        setdetaill({ ...detaill, [e.target.name]: e.target.value });
      }

      async function senddetaill(e) {
        e.preventDefault();
        debugger;
        let dataload = {
          ID: detaill.ID,
          FirstName: detaill.FirstName,
          LastName: detaill.LastName,
          Email: detaill.Email,
          Phone: detaill.Phone
        }
        const gg = await fetch(`/api/odata/v4/employee/Employees/${setee}`, {
          method: 'PUT',
          headers:{
            "content-type":"application/json",
          },
          body: JSON.stringify(dataload)
        })
        console.log(gg);
        setUpd(false);
        window.location.reload();
      }
      
  
    return(
    <>
     <div>
        <h1>Employee List</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d,index) => (
              <tr key={index}>
                <td>{d.ID}</td>
                <td>{d.FirstName}</td>
                <td>{d.LastName}</td>
                <td>{d.Email}</td>
                <td>{d.Phone}</td>
                <td><button onClick={()=>updated(d.ID)}>Update</button></td>
                <td><button onClick={()=>deleted(d.ID)}>Delete</button></td>
              </tr>
            ))}
            
          </tbody>
        </table>
        {
                upd ? ( 
                    <div>
                   <form onSubmit={senddetaill}>
        <label htmlFor="id">ID:</label>
        <input type="text" id="id" name="ID" value={detaill.ID} onChange={setgg} required /><br /><br />

        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="FirstName" value={detaill.FirstName} onChange={setgg} required /><br /><br />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="LastName" value={detaill.LastName} onChange={setgg} required /><br /><br />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="Email" value={detaill.Email} onChange={setgg} required /><br /><br />

        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="Phone" value={detaill.Phone} onChange={setgg} required /><br /><br />

        <button type="submit" value="Submit">Send</button>
      </form>
                    </div>): (<div></div>)
            }
      </div>

    </>
    )
}

export default Send;