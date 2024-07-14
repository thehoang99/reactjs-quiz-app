import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlusCircle } from 'react-icons/fa';
import { toast } from "react-toastify";
import { putUpdateUser } from '../../../../services/apiService';
import _ from "lodash";
import { useTranslation } from 'react-i18next';

const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate, fetchListUser, currentPage } = props;

    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
        setEmail("");
        setUsername("");
        setRole("USER");
        setImage("");
        setPreviewImage("");
        setDataUpdate({});
    }

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username);
            setRole(dataUpdate.role);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        }

    }, [dataUpdate])

    const handleUploadImage = (event) => {
        if (event && event.target && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitUpdateUser = async () => {
        let data = await putUpdateUser(dataUpdate.id, username, role, image);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await fetchListUser(currentPage);
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
                    <Modal.Title className="text-primary">{t('updateUser.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-12">
                            <label className="form-label">{t('updateUser.form.email')}</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">{t('updateUser.form.username')}</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter the username"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label">{t('updateUser.form.role')}</label>
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
                                <FaPlusCircle className="text-primary" /> {t('updateUser.form.upload')}
                            </label>
                            <input
                                type="file" hidden
                                id="lableUploadImg"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className="col-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} alt="update user alter" />
                                :
                                <span>{t('updateUser.form.preview')}</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
                        {t('updateUser.save')}
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        {t('updateUser.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser;