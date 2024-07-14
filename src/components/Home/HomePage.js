import { useSelector } from "react-redux";
import videoHomePage from "../../assets/video/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className="title text-warning">
                    {t('homepage.title')}
                </div>
                <div className="description">
                    {t('homepage.description')}
                </div>
                {isAuthenticated ?
                    <button className="started" onClick={() => navigate("/users")}>
                        {t('homepage.started.logined')}
                    </button>
                    :
                    <button className="started" onClick={() => navigate("/login")}>
                        {t('homepage.started.noLogin')}
                    </button>
                }
            </div>
        </div>
    )
}

export default HomePage;