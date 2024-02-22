import React,{useState,useEffect} from 'react'
import "../styles/dash.css";
import axios from 'axios';
import swal from 'sweetalert';
import downloadimage from "../assests/icons8-download-50.png";
import editImage from "../assests/edit.png";
import deleteImage from "../assests/trash.png";
import { PdfCreator } from './PdfCreator';



export const Dashboard = () => {

  const logout = () => {
    localStorage.removeItem('user');
    window.location.href = "/";
  }

  useEffect(() => {
    if(localStorage.getItem('user') === null){
      window.location.href = "/";
    }
  },[])

  const [data,setData] = useState([]);

  const getData = async () => {
    const res = await axios.get("http://localhost:8080/ots/all");
    console.log(res);
    setData(res.data);
  }

  useEffect(() => {
    getData();
  }

  ,[])
  

  const deleteRow = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios.delete(`http://localhost:8080/ots/delete/${id}`)
        .then((res) => {
          console.log(res);
          swal("Poof! Your Data has been deleted!", {
            icon: "success",
          });
          getData();
        })
        .catch((err) => {
          console.log(err);
        })
      } else {
        swal("Your Data is safe!");
      }
    }
    );
  }

   const [showform,setShowform] = useState(false);

   const showForm = () => {
      setShowform(!showform);
    }

    const [formdata,setFormdata] = useState({
      accounts:'',
      customerName:'',
      amount:'',
      sanctionDate:'',
      expiryDate:''
    })

    const handleChange = (e,field) => {
      setFormdata({...formdata,[field]:e.target.value});
    }

    const submitForm = (e) => {
      e.preventDefault();
      console.log(formdata);
      axios.post("http://localhost:8080/ots/add",formdata)
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          swal("Data Added Successfully","success");
          getData();
          setShowform(false);
          setFormdata({
            accounts:'',
            customerName:'',
            amount:'',
            sanctionDate:'',
            expiryDate:''
          })
        }
      })
      .catch((err) => {
        console.log(err);
        swal(err.response.data);
      })
    }

    const [showEditForm,setShowEditForm] = useState(false);

    const showEdit = () => {
      setShowEditForm(!showEditForm);
    }

    const editForm = (e) => {
      e.preventDefault();
      console.log(formdata);
      axios.put("http://localhost:8080/ots/update/"+formdata.otsId,formdata)
      .then((res) => {
        console.log(res);
        if(res.status === 200){
          swal("Data Updated Successfully","success");
          getData();
          setShowEditForm(false);
          setFormdata({
            accounts:'',
            customerName:'',
            amount:'',
            sanctionDate:'',
            expiryDate:''
          })
        }
      })
      .catch((err) => {
        console.log(err);
        swal(err.response.data);
        
      })
    }

    const [databyid,setDatabyid] = useState({});

    const getDatabyId = (id) => {
      axios.get(`http://localhost:8080/ots/get/${id}`)
      .then((res) => {
        console.log(res);
        setDatabyid(res.data);
        const pdfCreator = new PdfCreator();
        pdfCreator.create(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    





  return (
    <>
    
      <button className="logout" onClick={logout}>
        <p>Logout</p>
        </button>
    

    <h1 style={{textAlign:'center',marginTop:'20px'}}>
      Dashboard
    </h1>

    <div >
      <button className="btn btn-primary" style={{marginLeft:'20px',marginTop:'20px'}} onClick={showForm}>
        
          Add New
        
      </button>
      <div className="modal" style={{display: showform ? 'block' : 'none'}}>
        <div className="modal">
          <span className="close" onClick={showForm}>&times;</span>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label htmlFor="accounts">Accounts</label>
              <input type="text" className="form-control" id="accounts" onChange={(e) => handleChange(e,"accounts")} value={formdata.accounts} required/>
            </div>
            <div className="form-group">
              <label htmlFor="customerName">Customer Name</label>
              <input type="text" className="form-control" id="customerName" onChange={(e) => handleChange(e,"customerName")} value={formdata.customerName} required/>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input type="number" className="form-control" id="amount" onChange={(e) => handleChange(e,"amount")} value={formdata.amount} required/>
            </div>
            <div className="form-group">
              <label htmlFor="sanctionDate">Sanction Date</label>
              <input type="date" className="form-control" id="sanctionDate" onChange={(e) => handleChange(e,"sanctionDate")} value={formdata.sanctionDate} required/>
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input type="date" className="form-control" id="expiryDate" onChange={(e) => handleChange(e,"expiryDate")} value={formdata.expiryDate} required/>
            </div>
            <button type="submit" className="submit">Submit</button>
          </form>
        </div>


      </div>
    </div>
    <div className="limiter">
  <div className="container-table100">
    <div className="wrap-table100">
      <div className="table100 ver5 m-b-110">
        <div className="table100-head">
          <table>
            <thead>
              <tr className="row100 head">
                {/* <th className="cell100 column">Id </th> */}
                <th className="cell100 column1">Accounts </th>
                <th className="cell100 column2">Customer Name </th>
                <th className="cell100 column3">Amount</th>
                <th className="cell100 column4">Sanction Date </th>
                <th className="cell100 column5">Expiry Date </th>
                <th className="cell100 column6">Action </th>

                
              </tr>

             



            </thead>
          </table>
        </div>
        <div className="table100-body">
          <table>
            <tbody>

              {
                data.map((item) => {
                  return (
                    <tr className="row100 head">
                      {/* <td className="cell100 column">{item.otsId}</td> */}
                      <td className=" cell100 column1">{item.accounts}</td>
                      <td className="cell100 column2">{item.customerName}</td>
                      <td className="cell100 column3">{item.amount}</td>
                      <td className="cell100 column4">{item.sanctionDate.substring(0,10)}</td>
                      <td className="cell100 column5">{item.expiryDate.substring(0,10)}</td>
                      <td className="cell100 column6">
                        <div className="actionbtns">
                          <img src={downloadimage} alt="download" onClick={() => getDatabyId(item.otsId)}

                          height={20} width={20}/>
                          <img height={20} width={20} src={editImage
                          } alt="edit" onClick={() => {
                            showEdit();
                            setFormdata(item);
                          }}/>
                          <img height={20} width={20} src={deleteImage} alt="delete" onClick={() => deleteRow(item.otsId)}/>
                        </div>

                      </td>
                      
                    </tr>
                    
                  )
                })
              }

<div className="editshow" style={{display: showEditForm ? 'block' : 'none'}}>
        <div className="edit">
          <span className="close" onClick={showEdit}>&times;</span>
          <form onSubmit={editForm}>
            <div className="form-group">
              <label htmlFor="accounts">Accounts</label>
              <input type="text" className="form-control" id="accounts" onChange={(e) => handleChange(e,"accounts")} value={formdata.accounts} required/>
            </div>
            <div className="form-group">

              <label htmlFor="customerName">Customer Name</label>
              <input type="text" className="form-control" id="customerName" onChange={(e) => handleChange(e,"customerName")} value={formdata.customerName} required/>
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input type="number" className="form-control" id="amount" onChange={(e) => handleChange(e,"amount")} value={formdata.amount} required/>
            </div>
            <div className="form-group">
              <label htmlFor="sanctionDate">Sanction Date</label>
              <input type="date" className="form-control" id="sanctionDate" onChange={(e) => handleChange(e,"sanctionDate")} value={formdata.sanctionDate} required/>
            </div>
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date</label>
              <input type="date" className="form-control" id="expiryDate" onChange={(e) => handleChange(e,"expiryDate")} value={formdata.expiryDate} required/>
            </div>
            <button type="submit" className="submit">Submit</button>
          </form>
        </div>


      </div>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>


    </>
  )
}
