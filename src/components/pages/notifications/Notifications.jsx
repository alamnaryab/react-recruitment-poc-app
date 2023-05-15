import React from 'react'
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify'
import Navbar from '../../common/navbar/Navbar';

const Notifications = () => {
    const [t,i18n] = useTranslation("global");
    const handleChangeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    }
    
    const handleNotification=()=>{
        toast.info(t("A new candidate registered"));
    }
  return (
    <>
        <Navbar />
        <div className="container">
            <h2>This is simulation of alerts on new data</h2>
            <p>Although this point was not much clear but I will assume when new candidate registers, if admins or super admins are logged in they will get notification that a new candidate account is registered</p>
            <button className='btn btn-success' onClick={handleNotification}>Click to simulate notification</button>
        </div>
    </>
  )
}

export default Notifications