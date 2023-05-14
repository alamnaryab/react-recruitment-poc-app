import React from 'react'
import { Link } from 'react-router-dom'
import {useTranslation } from "react-i18next"

const Navbar = () => {
    const [t,i18n] = useTranslation("global");
    const handleChangeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container-fluid">
            <Link to="/home" className='navbar-brand'>{t('main.app_name')}</Link>
             
            <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/home" className='nav-link'>profile</Link>
                </li>
                <li className="nav-item">
                    <Link to="/home" className='nav-link'>Candidates</Link> 
                </li>
                <li className="nav-item">
                    <Link to="/home" className='nav-link'>Access Requests</Link> 
                </li>

                <li className="nav-item mr-1">
                    <Link  onClick={() => handleChangeLanguage('en') } className='nav-link bg-primary text-white'>English</Link> 
                </li>
                <li className="nav-item">
                    <Link  onClick={() => handleChangeLanguage('ar') } className='nav-link bg-primary text-white'>Arabic</Link> 
                </li>
                
            </ul>
            </div>
        </div>
        </nav>
  )
}

export default Navbar