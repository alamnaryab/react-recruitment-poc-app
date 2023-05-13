import {useTranslation } from "react-i18next"
import Navbar from "../../common/navbar/Navbar";
import EidtRegister from "../../common/register/EditRegister";

const Home = () => {
    const [t,i18n] = useTranslation("global");
    const handleChangeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    }
    return (
        <>
            <Navbar />
            
            <div className="container">
                <EidtRegister />
            </div>
        </>
        
    )
}

export default Home