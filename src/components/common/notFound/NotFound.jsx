import React from 'react'
import Navbar from '../navbar/Navbar'
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const [t,i18n] = useTranslation("global");
  const handleChangeLanguage = (lang) =>{
      i18n.changeLanguage(lang);
  }
  return (
    <>
       
      <div className="container pt-5">
      <div className="card mb-3">
          <div className="card-body py-2">
            <h3 className='text-info m-0 p-0'>{t('Page not found')}</h3>
          </div>
        </div>

      <div className="card mb-3">
            <div className="card-body">
        <div className="mt-5 text-center">

          <h1 className="">{t('Page not found')}</h1>
          <p className="mt-5">You got to a page which is not found <br />Please make check your URL and try again</p>
        </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default NotFound