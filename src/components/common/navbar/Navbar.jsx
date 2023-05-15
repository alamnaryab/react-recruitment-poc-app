import React from 'react'
import { Link } from 'react-router-dom'
import {useTranslation } from "react-i18next"
import useAuth from '../../../hooks/useAuth'

const Navbar = () => {
    const {auth} = useAuth();
    const [t,i18n] = useTranslation("global");
    const handleChangeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
        <div className="container-fluid">
            <Link to={{ pathname: `/profile/${auth.id}`}} className='navbar-brand'>{t('main.app_name')}</Link>
             
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
                    <Link to={{ pathname: `/profile/${auth.id}`}} className='nav-link'>{t('Profile')}</Link>
                </li>
                <li className="nav-item">
                    <Link to="/candidates" className='nav-link'>{t('Candidates')}</Link> 
                </li>
                <li className="nav-item">
                    <Link to="/notifications" className='nav-link'>{t('Notifications')} </Link> 
                </li>
                <li className="nav-item mr-1">
                    <Link  onClick={() => handleChangeLanguage('en') } className='nav-link bg-default text-white'>English</Link> 
                </li>
                <li className="nav-item">
                    <Link  onClick={() => handleChangeLanguage('ar') } className='nav-link bg-default text-white'>عربي</Link> 
                </li>
                
            </ul>
            </div>
        </div>
        <div className='text-center white'>
            Logged in user <strong>{auth.firstName} </strong> 
             has roles: {auth.role.map((r)=> <span className='badge badge-info'>{r}</span> )}
        </div>
        </nav>
        
        </>
  )
}

export default Navbar