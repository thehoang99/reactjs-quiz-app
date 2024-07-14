import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaQuestion, FaUser, FaFacebook } from 'react-icons/fa';
import sidebarBg from '../../assets/image/sidebar-bg.jpg';
import { DiReact } from "react-icons/di";
import { MdDashboard, MdQuiz } from "react-icons/md";
import "./Sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const Sidebar = (props) => {
    const { collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <div className='back-to-home' title='Go to home page' onClick={() => navigate('/')}>
                            <DiReact size={'3em'} color={'00bfff'} />
                            <span>Quizz App</span>
                        </div>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard className='text-info' />}
                        >
                            {t('adminSide.dashboard')}
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem className='text-info' />}
                            title={i18n.language === 'en' ? 'Features' : 'Chức năng'}
                        >
                            <MenuItem icon={<FaUser />}>
                                {t('adminSide.manage.user')}
                                <Link to="/admin/manage-users" />
                            </MenuItem>
                            <MenuItem icon={<MdQuiz />}>
                                {t('adminSide.manage.quiz')}
                                <Link to="/admin/manage-quizzes" />
                            </MenuItem>
                            <MenuItem icon={<FaQuestion />}>
                                {t('adminSide.manage.question')}
                                <Link to="/admin/manage-questions" />
                            </MenuItem>
                        </SubMenu>
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://www.facebook.com/thehoang1112/"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaFacebook className='text-info' />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {t('adminSide.fb')}
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default Sidebar;