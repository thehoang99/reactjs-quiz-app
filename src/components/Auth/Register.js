import { useState } from "react";
import "./Login.scss"
import { FaUser, FaLock, FaBlogger, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postRegister } from "../../services/apiService";
import Language from '../Header/Language';
import { useTranslation } from "react-i18next";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isShowPassword, setShowPassword] = useState(false);

    const navigate = new useNavigate();
    const { t, i18n } = useTranslation();

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    const validatePassword = (password) => {
        return String(password)
            .match(
                /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/
            );
    }

    const handleCreateAccount = async () => {
        let isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Email is not match format");
            return;
        }

        let isValidPassword = validatePassword(password);
        if (!isValidPassword) {
            toast.error("Password is not match format");
            return;
        }

        let data = await postRegister(email, username, password);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate("/login");
        } else {
            toast.error(data.EM);
        }
    }

    return (
        <div className="login-container">
            <div className="login-header d-flex justify-content-end align-items-center gap-1">
                <span className="text-secondary">
                    <u>{t('register.header.question')}</u>
                </span>
                <button className="btn-sign-up ms-1 me-3" onClick={() => navigate("/login")}>
                    {t('register.header.login')}
                </button>
                <Language />
            </div>
            <div className="login-content d-flex flex-column align-items-center mt-5 gap-4">
                <div className="title">
                    Quizz App
                </div>
                <div className="description">
                    {t('register.description')}
                </div>
                <div className="form-content col-4">
                    <div>
                        <div className="d-flex align-items-center mb-1 text-info">
                            <FaUser className="me-1" />
                            <label>{t('register.form.email')}<span className="text-danger">*</span></label>
                        </div>
                        <input
                            className="form-control"
                            type="email" value={email}
                            placeholder={i18n.language === 'en' ? "Please enter your email" : "Vui lòng nhập eamil"}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <div className="d-flex align-items-center mb-1 text-info">
                            <FaBlogger className="me-1" />
                            <label>{t('register.form.username')}</label>
                        </div>
                        <input
                            className="form-control"
                            type="text" value={username}
                            placeholder={i18n.language === 'en' ? "Please enter your username" : "Vui lòng nhập tên thay thế"}
                            onChange={(event) => setUsername(event.target.value)}
                        />
                    </div>
                    <div className="mt-4 pass-container">
                        <div className="d-flex align-items-center mb-1 text-info">
                            <FaLock className="me-1" />
                            <label>{t('register.form.password')}<span className="text-danger">*</span></label>
                        </div>
                        <input
                            className="form-control"
                            type={isShowPassword ? "text" : "password"}
                            value={password}
                            placeholder={i18n.language === 'en' ? "Please enter your password" : "Vui lòng nhập mật khẩu"}
                            onChange={(event) => setPassword(event.target.value)}
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
                    <div>
                        <button className="btn-submit-form" onClick={() => handleCreateAccount()}>
                            {t('register.form.submit')}
                        </button>
                    </div>

                </div>
            </div>
            <div
                className="redirect-home-page d-flex justify-content-center mt-3"
                onClick={() => navigate("/")}
            >
                &lt;&lt; {t('register.home')}
            </div>
        </div>
    )
}

export default Register;