import { useTranslation } from "react-i18next";

const Header = () => {
    const [t,i18n] = useTranslation("global");
    const handleChangeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    }
    return (
        <div>
            <div>{t("header.message")}</div>
            <button onClick={() => handleChangeLanguage('en') } className="btn btn-sm btn-info my-3"> EN</button>
            <button onClick={() => handleChangeLanguage('ar') } className="btn btn-sm btn-info my-3"> AR</button>
        </div> 
    )
}
export default Header