import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { postLogout } from "../../services/apiService";
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import ModalChangePass from './ModalChangePass';

const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const account = useSelector(state => state.user.account);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const [isShowModalChangePass, setShowModalChangePass] = useState(false);

    const handleClickLogin = () => {
        navigate("/login");
    }

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
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container fluid>
                    <NavLink to="/" className='navbar-brand text-danger'>Quizz App</NavLink>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavLink to="/" className='nav-link'>
                                {t('header.page.home')}
                            </NavLink>
                            <NavLink to="/users" className='nav-link'>
                                {t('header.page.user')}
                            </NavLink>
                            {account && account.role && account.role === "ADMIN" &&
                                <NavLink to="/admin" className='nav-link'>
                                    {t('header.page.admin')}
                                </NavLink>
                            }
                        </Nav>
                        <Nav>
                            {!isAuthenticated ?
                                <>
                                    <button className='btn btn-login' onClick={() => handleClickLogin()}>
                                        {t('header.auth.login')}
                                    </button>
                                    <button className='btn-signup' onClick={() => navigate("/register")}>
                                        {t('header.auth.register')}
                                    </button>
                                </>
                                :
                                <NavDropdown className='me-2' title={i18n.language === 'en' ? 'Setting' : 'Cài đặt'} id="basic-nav-dropdown">
                                    <div className='text-primary p-2'>
                                        {account && account.email}
                                    </div>
                                    <NavDropdown.Item onClick={() => setShowModalChangePass(true)}>
                                        {t('header.setting.change')}
                                    </NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => handleClickLogout()}>
                                        {t('header.setting.logout')}
                                    </NavDropdown.Item>
                                </NavDropdown>
                            }
                            <Language />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <ModalChangePass
                show={isShowModalChangePass}
                setShow={setShowModalChangePass}
            />
        </>
    );
}

export default Header;