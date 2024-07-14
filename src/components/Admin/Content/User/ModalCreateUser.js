import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlusCircle } from 'react-icons/fa';
import { toast } from "react-toastify";
import { postCreateNewUser } from '../../../../services/apiService';
import { useTranslation } from 'react-i18next';

const ModalCreateUser = (props) => {
    const { show, setShow, fetchListUser, setCurrentPage } = props;

    const { t, i18n } = useTranslation();

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setPassword("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleUploadImage = (event) => {
        if (event && event.target && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

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

    const handleSubmitCreateuser = async () => {
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

        let data = await postCreateNewUser(email, password, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            setCurrentPage(1);
            await fetchListUser(1);
        } else {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal
                show={show}
                size="xl"
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
                className="modal-add-user"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">{t('createUser.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">{t('createUser.form.email')}</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder={i18n.language === "en" ? "Enter the email" : "Vui lòng nhập email"}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">{t('createUser.form.password')}</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder={i18n.language === "en" ? "Enter the password" : "Vui lòng nhập mật khẩu"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">{t('createUser.form.username')}</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder={i18n.language === "en" ? "Enter the username" : "Vui lòng nhập tên thay thế"}
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">{t('createUser.form.role')}</label>
                            <select
                                className="form-select"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option value="USER" defaultValue>USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="form-label label-upload" htmlFor="lableUploadImg">
                                <FaPlusCircle className="text-primary" /> {t('createUser.form.upload')}
                            </label>
                            <input
                                type="file" hidden
                                id="lableUploadImg"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className="col-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} alt="creaet user alter" />
                                :
                                <span>{t('createUser.form.preview')}</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmitCreateuser()}>
                        {t('createUser.save')}
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        {t('createUser.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser;