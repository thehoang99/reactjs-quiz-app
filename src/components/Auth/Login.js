import { useState } from "react";
import "./Login.scss"
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";
import { toast } from "react-toastify";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { ImSpinner3 } from "react-icons/im";
import Language from '../Header/Language';
import { useTranslation } from 'react-i18next';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);

    const navigate = new useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    const handleClickLogin = async () => {
        let isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid Email");
            return;
        }

        if (_.isEmpty(password)) {
            toast.error("Invalid Password");
            return;
        }

        setLoading(true);
        let data = await postLogin(email, password);
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setLoading(false);
            navigate("/");
        } else {
            toast.error(data.EM);
            setLoading(false);
        }
    }

    const handleKeyDown = (event) => {
        if (event && event.key === "Enter") {
            handleClickLogin();
        }
    }

    return (
        <div className="login-container">
            <div className="login-header d-flex justify-content-end align-items-center gap-1">
                <span className="text-secondary">
                    <u>{t('login.header.question')}</u>
                </span>
                <button className="btn-sign-up ms-1 me-3" onClick={() => navigate("/register")}>
                    {t('login.header.register')}
                </button>
                <Language />
            </div>
            <div className="login-content d-flex flex-column align-items-center mt-5 gap-4">
                <div className="title">
                    Quizz App
                </div>
                <div className="description">
                    {t('login.description')}
                </div>
                <div className="form-content col-4">
                    <div>
                        <div className="d-flex align-items-center mb-1 text-info">
                            <FaUser className="me-1" />
                            <label>
                                {t('login.form.email')}
                            </label>
                        </div>
                        <input
                            className="form-control"
                            type="email" value={email}
                            placeholder={i18n.language === 'en' ? "Please enter your email" : "Nhập email của bạn"}
                            onChange={(event) => setEmail(event.target.value)}
                            onKeyDown={(event) => handleKeyDown(event)}
                        />
                    </div>
                    <div className="mt-4 pass-container">
                        <div className="d-flex align-items-center mb-1 text-info">
                            <FaLock className="me-1" />
                            <label>
                                {t('login.form.password')}
                            </label>
                        </div>
                        <input
                            className="form-control"
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            placeholder={i18n.language === 'en' ? "Please enter your password" : "Nhập password của bạn"}
                            onChange={(event) => setPassword(event.target.value)}
                            onKeyDown={(event) => handleKeyDown(event)}
                        />
                        {isShowPassword ?
                            <span className="icon-eye text-secondary" onClick={() => setShowPassword(false)}>
                                <FaEye />
                            </span>
                            :
                            <span className="icon-eye text-secondary" onClick={() => setShowPassword(true)}>
                                <FaEyeSlash />
                            </span>
                        }
                    </div>
                    <span className="forgot-password">
                        <u>{t('login.form.forgot')}</u>
                    </span>
                    <div>
                        <button
                            className="btn-submit-form"
                            onClick={() => handleClickLogin()}
                            disabled={isLoading}
                        >
                            {isLoading ?
                                <>
                                    < ImSpinner3 className="loader-icon" />&nbsp;
                                    <span>{t('login.form.logged')}</span>
                                </>
                                :
                                <span>{t('login.form.login')}</span>
                            }
                        </button>
                    </div>
                </div>
            </div>
            <div
                className="redirect-home-page d-flex justify-content-center mt-3"
                onClick={() => navigate("/")}
            >
                &lt;&lt; {t('login.home')}
            </div>
        </div>
    )
}

export default Login;