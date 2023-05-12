import {useTranslation } from "react-i18next"

const Home = () => {
    const [t,i18n] = useTranslation("global");
    const handleChangeLanguage = (lang) =>{
        i18n.changeLanguage(lang);
    }
    return (
        <>
            <div>{t("home.body")}</div>
            <div className="lang text-center">
                <button onClick={() => handleChangeLanguage('en') } className="btn btn-sm btn-info my-3"> EN</button>
                <button onClick={() => handleChangeLanguage('ar') } className="btn btn-sm btn-info my-3"> AR</button>
            </div>
        </>
        
    )
}

export default Home