import {useTranslation } from "react-i18next"
import Navbar from "../../common/navbar/Navbar";
import { users } from '../../../data/users'; 
import './candidate.css'

import { toast } from 'react-toastify';

import DataTable from 'react-data-table-component';
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import * as XLSX from "xlsx";
import useAuth from "../../../hooks/useAuth";
 

const Candidates = () => {
  const inputRef = useRef();
  const [t,i18n] = useTranslation("global");
  const handleChangeLanguage = (lang) =>{
      i18n.changeLanguage(lang);
  }

  const [textValue, setTextValue] = useState('');

  const {auth} = useAuth();
 

  const columns = [
    {
        name: 'ID',
        sortable:true,
        selector: row => row.id,
    },
    {
        name: 'Name',
        sortable:true,
        selector: row => row?.firstName +' '+ row?.lastName,
    },
    {
      name: 'email',
      sortable:true,
      selector: row => row?.contactInfo[0],
    },
    {
      name: 'Roles',
      sortable:true,
      selector: row => row?.role?.map((r,ri)=> (
        <span key={ri} className="badge badge-info mx-1 mb-1">{r}</span>) 
        ),
    },
    {
      name: 'Skills',
      sortable:true,
      selector: row => row?.technicalKnowledge?.map((t,ti)=> (
        <span key={ti} className="badge badge-success mx-1 mb-1">{t}</span>) 
        ),
      style: { overflowWrap: "break-word" },
    },
    {
      name: 'Education',
      sortable:true,
      selector: row => row?.educationLevel,
    },  
    {
      name: 'Action', 
      selector: row => (<Link to={{ pathname: `/profile/${row.id}`}}  className='nav-link'>View</Link>),
    },  
];

  if(auth.role.includes("super_admin") || auth.role.includes("admin")){
    columns.push({
      name: 'Request Access', 
      selector: row => (
                !row?.role?.includes('super_admin')
                ?
                  row.requst_access
                  ? auth.role.includes("super_admin")
                    ?<div><button className="btn btn-sm btn-success p-1" onClick={()=>handleAccessApprove(row.id)}>Approve</button> <button onClick={()=>handleAccessReject(row.id)} className="btn btn-sm btn-danger p-1">Reject</button></div>
                    :<div>request pending</div>
                  :<button onClick={()=> handleAccessRequest(row.id)}  className="btn btn-sm btn-warning btn-sm p-1">Request access</button>
                :<div>sa</div>
              ),
    });
  }

   
  const handleAccessApprove = (user_id) => {
    const index = users.findIndex((user) => user.id === user_id);
    users[index].role.push('super_admin');
    users[index].requst_access = false;
    setTextValue(textValue + ' ');
    toast.success("Access granted");
  }

  const handleAccessReject = (user_id) => {
    const index = users.findIndex((user) => user.id === user_id);
    users[index].requst_access = false;
    setTextValue(textValue + ' ');
    toast.success("Access denied");
  }
  

  const [records,setRecords] = useState(users);
  const handleFilter = (e)=>{
    setTextValue(e.target.value);
    const searchTerm = e.target.value.toLowerCase().trim();
    const filteredData = users.filter(row =>{
        return row?.firstName.toLowerCase().includes(searchTerm)
              || row?.lastName.toLowerCase().includes(searchTerm)
              || row?.contactInfo[0].toLowerCase().includes(searchTerm)
              || row?.contactInfo[1].toLowerCase().includes(searchTerm)
              || row?.address.toLowerCase().includes(searchTerm)
              || row?.educationLevel.toLowerCase().includes(searchTerm)
              || row?.workExperience.toLowerCase().includes(searchTerm)
              || row?.technicalKnowledge?.join(", ").toLowerCase().includes(searchTerm)
              || row?.role?.join(", ").toLowerCase() .includes(searchTerm)
              ;
    });
    setRecords(filteredData);
  }

  const handleAccessRequest = (user_id) => {
    const index = users.findIndex((user) => user.id === user_id);
    users[index].requst_access = true;
    setTextValue(textValue + ' ');
     
  }

   

  const handleExport=()=>{
    var wb = XLSX.utils.book_new();
    
    var preparedData = records.map(record => ({
      ...record,
      roles: record.role ? record.role.join(', '):'',
      technicalKnowledge: record.technicalKnowledge ? record.technicalKnowledge.join(', '):'',
      email: record?.contactInfo[0],
      mobile: record?.contactInfo[1],
    }));
     
    preparedData.forEach(record => {
      delete record.role; 
      delete record.contactInfo; 
      delete record.password; 
    });
     
    var ws = XLSX.utils.json_to_sheet(preparedData);
    XLSX.utils.book_append_sheet(wb,ws,"Candadates");
    XLSX.writeFile(wb,"Candidates.xlsx");
    toast.success(t("Excel file exported successfully"));
  }

  

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="card mb-3">
          <div className="card-body py-2">
            <h3 className='text-info m-0 p-0'>{t('Candidates')}</h3>
          </div>
        </div>
            <div className=" alert alert-info text-center">{t('You can filter the data, and Export option will export the filtered data to an excel file')}</div>

        <div className="card mb-3">
            <div className="card-body">
            
              <div className="table-responsive">
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                  
                      <button className="btn btn-success" onClick={handleExport}>Export data</button>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <div className="text-right">
                        <input  ref={inputRef} type="text" className="form-control d-inline" onChange={handleFilter} placeholder="Filter data" style={{ width:'150px' }} />
                      </div>
                    </div>
                  </div>
                  
                  <DataTable
                    columns={columns}
                    data={records}
                    pagination
                    dense
                  />

              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default Candidates