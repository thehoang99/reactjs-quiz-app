import { useState } from "react";
import Sidebar from "./Sidebar";
import { FaBars } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'
import "./Admin.scss";
import Language from '../Header/Language';
import { NavDropdown } from "react-bootstrap";
import { postLogout } from "../../services/apiService";
import { doLogout } from "../../redux/action/userAction";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import ModalChangePass from "../Header/ModalChangePass";

const Admin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const account = useSelector(state => state.user.account);

    const [collapsed, setCollapsed] = useState(false);
    const [isShowModalChangePass, setShowModalChangePass] = useState(false);

    const handleClickLogout = async () => {
        const res = await postLogout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            dispatch(doLogout());
            navigate("/login");
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    <div className="rightside">
                        <Language />
                        <NavDropdown className='me-2' title={i18n.language === 'en' ? 'Setting' : 'Cài đặt'} id="basic-nav-dropdown">
                            <NavDropdown.Item onClick={() => setShowModalChangePass(true)}>
                                {t('header.setting.change')}
                            </NavDropdown.Item>
                            <NavDropdown.Item onClick={() => handleClickLogout()}>
                                {t('header.setting.logout')}
                            </NavDropdown.Item>
                        </NavDropdown>
                    </div>
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
            <ModalChangePass
                show={isShowModalChangePass}
                setShow={setShowModalChangePass}
            />
        </div>
    )
}

export default Admin;