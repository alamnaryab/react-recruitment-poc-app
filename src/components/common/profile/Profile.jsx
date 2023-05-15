import '../../../assets/bootstrap.css';
import '../../../assets/bootstrap-mdb.css';

import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "react-router-dom"; 
import {useFormik} from 'formik';
import * as Yup from 'yup';
 
import { users } from '../../../data/users'; 
import { useEffect, useState } from 'react';
import Navbar from '../navbar/Navbar';
import { toast } from 'react-toastify';

import useAuth from '../../../hooks/useAuth';


const Profile = () => {
  const navigate = useNavigate();
  const {auth} = useAuth();
  let { id = -1} = useParams();
  
  const [dbValues, setDbValues] = useState({  
    "id":"",
    "firstName":"",
    "lastName":"",
    "email":"",
    "mobile":"",
    "address": "",
    "educationLevel": "",
    "workExperience": "",
    "technicalKnowledge": "" 
  });

   

  const [t, i18n] = useTranslation("global");
  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  // fetch user data by ID and set state
  useEffect(() => { 
    id = id>-1?id:auth.id; 
    const dbUser = users.find(user => user.id.toString() === id);
    if (dbUser) {
        setDbValues ({  
          "id":dbUser.id,
          "firstName":dbUser.firstName,
          "lastName":dbUser.lastName,
          "email":dbUser.contactInfo[0],
          "mobile":dbUser.contactInfo[1],
          "address": dbUser.address,
          "educationLevel": dbUser.educationLevel,
          "workExperience": dbUser.workExperience,
          "technicalKnowledge": dbUser.technicalKnowledge?.join(", ")
        });
    }
  }, [id]);
 

  const formik = useFormik({
      //values to be shown on form load (default values)
      initialValues: dbValues ,
      enableReinitialze: true,
      //handle submit event of registration form
      onSubmit: (theUser)=>{ 
        var updatedUser = theUser;
        const index = users.findIndex((user) => user.id === updatedUser.id);

        updatedUser.contactInfo= [
          updatedUser.email,
          updatedUser.mobile
        ];

        updatedUser.technicalKnowledge =  theUser.technicalKnowledge.split(",").map(item => item.trim());
        //remove these properties as these are added in contactInfo property 
        // delete updatedUser?.email;
        // delete updatedUser?.mobile;

        var newObj = {...users[index],...updatedUser};
        users[index] = newObj;
        toast.success("User profile updated successfully");
      },

      //define validation rules for form fields
      validationSchema : Yup.object({
        "firstName": Yup.string().max(20,t("Max 20 chars")).required(t("This field value is required")),
        "lastName": Yup.string().max(20,t("Max 20 chars")).required(t("This field value is required")),
        "email": Yup.string().email(t("Invalid email address")).required("Email is required")
                    .test('unique-email', 'This email is already registered', function(value) {
                      return new Promise(resolve => {
                        setTimeout(() => {
                          const isEmailDuplicate = users.some(user => user.contactInfo[0].toLowerCase() === value.toLowerCase()
                                                                   && user.contactInfo[0].toLowerCase() !== value.toLowerCase()
                                                                   );
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
        
      })//end validationSchema

    });//end formik

    useEffect(() => {
      formik.setValues(dbValues);
    }, [dbValues]);

  
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
    <>
    
    <Navbar />
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">

        <div className="col-xs-12 col-md-6 form-outline mb-4 d-none">
              <label className="form-label" htmlFor="id"> {t('profile.id')}</label>
              <input type="text" 
                name = "id"
                value={formik.values.id} 
                onChange={formik.handleChange} 
                onBlur={formik.handleBlur}
                id="id" 
                className="form-control" />
                {formik.touched.firstName && formik.errors.firstName ? <p className='inputError'>{formik.errors.firstName}</p>:null}
          </div>

          <div className="col-xs-12 col-md-6 form-outline mb-4">
              <label className="form-label" htmlFor="firstName"> {t('profile.first_name')}</label>
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
              <label className="form-label" htmlFor="txt_lastName"> {t('profile.last_name')}</label>
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
              <label className="form-label" htmlFor="txt_email"> {t('profile.email')}</label>
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
              <label className="form-label" htmlFor="txt_mobile"> {t('profile.mobile')}</label>
              <input name="mobile" 
                type="text" 
                value={formik.values.mobile} 
                onChange={formik.handleChange} 
                id="txt_mobile" className="form-control" />
                {formik.touched.mobile && formik.errors.mobile ? <p className='inputError'>{formik.errors.mobile}</p>:null}
          </div>
          <div className="col-xs-12 col-lg-12 form-outline mb-4">
              <label className="form-label" htmlFor="txt_address"> {t('profile.address')}</label>
              <input name="address"  type="text" value={formik.values.address} onChange={formik.handleChange} id="txt_address" className="form-control" />
              {formik.touched.address && formik.errors.address ? <p className='inputError'>{formik.errors.address}</p>:null}
          </div>
          <div className="col-xs-12 col-md-6 form-outline mb-4">
              <label className="form-label" htmlFor="txt_education_level"> {t('profile.education_level')}</label>
              <select name="educationLevel" value={formik.values.educationLevel} onChange={formik.handleChange} id="txt_education_level" className="form-control browser-default custom-select">
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
              <label className="form-label" htmlFor="txt_work_experience"> {t('profile.work_experience')}</label>
              <select name="workExperience" value={formik.values.workExperience} onChange={formik.handleChange} id="txt_work_experience" className="form-control browser-default custom-select">
                <option value="">Select a work experience range</option>
                {workExperienceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
              {formik.touched.workExperience && formik.errors.workExperience ? <p className='inputError'>{formik.errors.workExperience}</p>:null}
          </div>
          <div className="col-xs-12 col-lg-12 form-outline mb-4">
              <label className="form-label" htmlFor="txt_technical_knowledge"> {t('profile.technical_knowledge')}</label>
              <textarea name="technicalKnowledge" value={formik.values.technicalKnowledge} onChange={formik.handleChange} id="txt_technical_knowledge" className="form-control"></textarea>
              {formik.touched.technicalKnowledge && formik.errors.technicalKnowledge ? <p className='inputError'>{formik.errors.technicalKnowledge}</p>:null}
          </div>
 

          </div>
          {/* .row */}
          <button type="submit"  className="btn btn-primary btn-block mb-4">
              {t('profile.Update_account')}
          </button>
    
  </form>
    </div>
    </>
  )
}

export default Profile