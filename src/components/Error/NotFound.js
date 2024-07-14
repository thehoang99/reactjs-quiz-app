import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div>
            <div className="mt-3 p-4 alert alert-danger">
                <h3>{t('notfound.title')}</h3>
                <p>{t('notfound.des')}</p>
                <button onClick={() => navigate('/')}> &lt;&lt;{t('notfound.home')}</button>
            </div>
        </div>
    )
}

export default NotFound;