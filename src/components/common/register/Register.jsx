import '../../../assets/bootstrap.css';
import '../../../assets/bootstrap-mdb.css';

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom"; 
import {useFormik} from 'formik';
import * as Yup from 'yup';
 
import { users } from '../../../data/users'; 

const Register = () => { 
    const navigate = useNavigate();

    const [t,i18n] = useTranslation("global");
    const handleChangeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    };

    const formik = useFormik({

      //values to be shown on form load (default values)
      initialValues:{ 
        "password": "",
        "confirm_password": "",
        "firstName": "",
        "lastName": "",
        "email":"",
        "mobile":"",
        "address": "",
        "educationLevel": "",
        "workExperience": "",
        "technicalKnowledge": "",
        "cvAttachment": ""
      },
      enableReinitialze: true,
      //handle submit event of registration form
      onSubmit: (values)=>{
        var newUser = values;
        console.log(newUser);
        //find max id from existing users and add new user with maxId+1
        const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
        newUser.id = maxId + 1;

        //move mobile and email properties inside contactInfo
        newUser.contactInfo= [
          newUser.email,
          newUser.mobile
        ];
        //remove these properties as these are added in contactInfo property 
        delete newUser.email;
        delete newUser.mobile;

        //
        newUser.technicalKnowledge =  values.technicalKnowledge.split(",").map(item => item.trim());

        //save user to database simuated
        users.push(newUser);

        //redirect to login page
        navigate('/');
         
      },

      //define validation rules for form fields
      validationSchema : Yup.object({
        "firstName": Yup.string().max(20,t("Max 20 chars")).required(t("This field value is required")),
        "lastName": Yup.string().max(20,t("Max 20 chars")).required(t("This field value is required")),
        "email": Yup.string().email(t("Invalid email address")).required("Email is required")
                    .test('unique-email', 'This email is already registered', function(value) {
                      return new Promise(resolve => {
                        setTimeout(() => {
                          const isEmailDuplicate = users.some(user => user.contactInfo[0].toLowerCase() === value.toLowerCase());
                          resolve(!isEmailDuplicate);
                        }, 1000); // simulate server latency
                      });
                    }),
        "mobile":Yup.string().required("Mobile is required"),
        "address": Yup.string().required("Address is required"),
        "educationLevel": Yup.string().required(t("This field value is required")),
        "workExperience":  Yup.string().required(t("This field value is required")),
        "technicalKnowledge":  Yup.string().required(t("This field value is required")),
        // "cvAttachment": Yup.mixed()
        // .required(t('A file is required'))
        // //.test('fileSize', t('File size too large'), (value) => value && value.size <= 2000000)
        // .test('fileType', t('Only pdf and jpg files are allowed'), (value) => {
        //   return value && ['application/pdf', 'image/jpeg'].includes(value.type);
        // }),
        "password": Yup.string()
          .min(8, t('Password must be at least 8 characters'))
          .required(t('Password is required')),
        "confirm_password": Yup.string()
          .oneOf([Yup.ref('password'), null], t('Passwords must match'))
          .required(t('Confirm Password is required')),
      })//end validationSchema

    });//end formik
 

  
    //dropdown options for education level
    const educationLevels = [
      "Less than high school",
      "High school Diploma",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctorate",
    ];

    //dropdown options for workexperience
    const workExperienceOptions = [
      '0 years',
      '1 year',
      '2 years',
      '3 years',
      '4 years',
      '5 years',
      '6 years',
      '7 years',
      '8 years',
      '9 years',
      '10 years',
      '10+ years'
    ];

  
  return (
 
        <section className="background-radial-gradient overflow-hidden mh-100 d-flex">
            <div className="container px-4 py-5 px-md-5 text-lg-start d-flex">
                <div className="row gx-lg-5 align-items-center mb-5 justify-content-center">
                <div className="col-lg-5 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                    <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                    {t('main.app_name')}
                    <br />
                    <span style={{ color: "hsl(218, 81%, 75%)" }}>{t('main.company_name')}</span>
                    </h1>
                    <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                    {t('register.register_message')}
                    </p>
                </div>
                <div className="col-lg-7 mb-5 mb-lg-0 position-relative">
                    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
                    
                    <div class="nav nav-tabs md-tabs aqua-gradient" id="myTabMD2" role="tablist">        
                        <h3 class="text-white mx-auto">{t('Register')}</h3>                            
                    </div>
                    <div className="card bg-glass">
                    <div className="card-body px-4 py-5 px-md-5">
                        <form onSubmit={formik.handleSubmit}>
                              <div className="row">

                              
                                <div className="col-xs-12 col-md-6 form-outline mb-4">
                                    <label className="form-label" htmlFor="firstName"> {t('register.first_name')}</label>
                                    <input type="text" 
                                      name = "firstName"
                                      value={formik.values.firstName} 
                                      onChange={formik.handleChange} 
                                      onBlur={formik.handleBlur}
                                      id="firstName" 
                                      className="form-control" />
                                      {formik.touched.firstName && formik.errors.firstName ? <p className='inputError'>{formik.errors.firstName}</p>:null}
                                </div>
                                <div className="col-xs-12 col-md-6 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_lastName"> {t('register.last_name')}</label>
                                    <input type="text" 
                                      name = "lastName"
                                      value={formik.values.lastName} 
                                      onChange={formik.handleChange} 
                                      onBlur={formik.handleBlur}
                                      id="txt_lastName" 
                                      className="form-control" />
                                      {formik.touched.lastName && formik.errors.lastName ? <p className='inputError'>{formik.errors.lastName}</p>:null}
                                </div>
                                <div className="col-xs-12 col-md-6 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_email"> {t('register.email')}</label>
                                    <input name="email" 
                                        type="email" 
                                        value={formik.values.email} 
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        id="txt_email" 
                                        className="form-control" />
                                        {formik.touched.email && formik.errors.email ? <p className='inputError'>{formik.errors.email}</p>:null}
                                </div>
                                <div className="col-xs-12 col-md-6 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_mobile"> {t('register.mobile')}</label>
                                    <input name="mobile" 
                                      type="text" 
                                      value={formik.values.mobile} 
                                      onChange={formik.handleChange} 
                                      id="txt_mobile" className="form-control" />
                                      {formik.touched.mobile && formik.errors.mobile ? <p className='inputError'>{formik.errors.mobile}</p>:null}
                                </div>
                                <div className="col-xs-12 col-lg-12 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_address"> {t('register.address')}</label>
                                    <input name="address"  type="text" value={formik.values.address} onChange={formik.handleChange} id="txt_address" className="form-control" />
                                    {formik.touched.address && formik.errors.address ? <p className='inputError'>{formik.errors.address}</p>:null}
                                </div>
                                <div className="col-xs-12 col-md-6 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_education_level"> {t('register.education_level')}</label>
                                    <select name="educationLevel" value={formik.values.education_level} onChange={formik.handleChange} id="txt_education_level" className="form-control browser-default custom-select">
                                      <option >Select an education level</option>
                                      {educationLevels.map((level) => (
                                        <option value={level} key={level}>
                                          {level}
                                        </option>
                                      ))}
                                    </select>
                                    {formik.touched.educationLevel && formik.errors.educationLevel ? <p className='inputError'>{formik.errors.educationLevel}</p>:null}
                                </div>
                                <div className="col-xs-12 col-md-6 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_work_experience"> {t('register.work_experience')}</label>
                                    <select name="workExperience" value={formik.values.work_experience} onChange={formik.handleChange} id="txt_work_experience" className="form-control browser-default custom-select">
                                      <option value="">Select a work experience range</option>
                                      {workExperienceOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                      ))}
                                    </select>
                                    {formik.touched.workExperience && formik.errors.workExperience ? <p className='inputError'>{formik.errors.workExperience}</p>:null}
                                </div>
                                <div className="col-xs-12 col-lg-12 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_technical_knowledge"> {t('register.technical_knowledge')}</label>
                                    <textarea name="technicalKnowledge" value={formik.values.technical_knowledge} onChange={formik.handleChange} id="txt_technical_knowledge" className="form-control"></textarea>
                                    {formik.touched.technicalKnowledge && formik.errors.technicalKnowledge ? <p className='inputError'>{formik.errors.technicalKnowledge}</p>:null}
                                </div>

                                
                                <div className="col-xs-12 col-md-6 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_password"> {t('register.password')}</label>
                                    <input name="password" type="password" value={formik.values.password} onChange={formik.handleChange} id="txt_password" className="form-control" />
                                    {formik.touched.password && formik.errors.password ? <p className='inputError'>{formik.errors.password}</p>:null}
                                </div> 
                                
                                <div className="col-xs-12 col-md-6 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_confirm_password"> {t('register.confirm_password')}</label>
                                    <input name="confirm_password" type="password" value={formik.values.confirm_password} onChange={formik.handleChange} id="txt_confirm_password" className="form-control" />
                                    {formik.touched.confirm_password && formik.errors.confirm_password ? <p className='inputError'>{formik.errors.confirm_password}</p>:null}
                                </div> 
                                
                                <div className="col-xs-12 col-md-6 form-outline mb-4">
                                    <label className="form-label" htmlFor="txt_cvAttachment"> {t('register.cvAttachment')}</label>
                                    <input name="cvAttachment" type="file" value={formik.values.cvAttachment} onChange={formik.handleChange} id="txt_cvAttachment" className="form-control" />
                                    {formik.touched.cvAttachment && formik.errors.cvAttachment ? <p className='inputError'>{formik.errors.cvAttachment}</p>:null}
                                </div> 

                                </div>
                                {/* .row */}
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