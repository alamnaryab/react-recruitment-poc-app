import '../../../assets/bootstrap.css';
import '../../../assets/bootstrap-mdb.css';

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
 

const Register = () => { 
    const [t,i18n] = useTranslation("global");
    const handleChangeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    }
  return (
 
        <section className="background-radial-gradient overflow-hidden mh-100 d-flex">
            <div className="container px-4 py-5 px-md-5 text-lg-start d-flex">
                <div className="row gx-lg-5 align-items-center mb-5 justify-content-center">
                <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                    <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                    {t('main.app_name')}
                    <br />
                    <span style={{ color: "hsl(218, 81%, 75%)" }}>{t('main.company_name')}</span>
                    </h1>
                    <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                    {t('register.register_message')}
                    </p>
                </div>
                <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                    <div className="card bg-glass">
                    <div className="card-body px-4 py-5 px-md-5">
                        <form>
                        
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example3"> {t('register.email')}</label>
                                    <input type="email" id="form3Example3" className="form-control" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example4"> {t('register.password')}</label>
                                    <input type="password" id="form3Example4" className="form-control" />
                                </div> 
                                
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form3Example4a"> {t('register.confirm_password')}</label>
                                    <input type="password" id="form3Example4a" className="form-control" />
                                </div> 
                                <button type="submit" className="btn btn-primary btn-block mb-4">
                                    {t('register.register')}
                                </button>
                         
                        </form>

                        <div className="no-account text-center">
                            <Link to="/">{t('register.have_account')}</Link>
                        </div>
                        <div className="lang text-center">
                            <button onClick={() => handleChangeLanguage('en') } className="btn btn-sm btn-info my-3"> EN</button>
                            <button onClick={() => handleChangeLanguage('ar') } className="btn btn-sm btn-info my-3"> AR</button>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</section>
        
  )
}

export default Register