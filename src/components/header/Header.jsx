import { useTranslation } from "react-i18next";

const Header = () => {
    const [t,i18n] = useTranslation("global");
    const handleChangeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    }
    return (
        <div>
            <div>{t("header.message")}</div>
            <button onClick={() => handleChangeLanguage('en') }> EN</button>
            <button onClick={() => handleChangeLanguage('ar') }> AR</button>
        </div> 
    )
}
export default Header