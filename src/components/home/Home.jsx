import {useTranslation } from "react-i18next"

const Home = () => {
    const [t,i18n] = useTranslation("global");
    return (
        <div>{t("home.body")}</div>
    )
}

export default Home