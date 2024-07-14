import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { postChangePassword } from '../../services/apiService';
import { toast } from "react-toastify";
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const ModalChangePass = (props) => {
    const { show, setShow } = props;
    const { t } = useTranslation();

    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleClose = () => {
        setCurrentPass('');
        setNewPass('');
        setConfirmPass('');
        setShow(false);
    }

    const handleChangePassword = async () => {
        if (_.isEmpty(currentPass) || _.isEmpty(newPass)) {
            toast.error("Invalid Current/New Password");
            return;
        }

        if (newPass === currentPass) {
            toast.error("New password and current password must be different");
            return;
        }

        if (newPass !== confirmPass) {
            toast.error("Confirm new password not match");
            return;
        }

        const res = await postChangePassword(currentPass, newPass);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <Modal
                show={show}
                size="lg"
                backdrop="static"
                onHide={handleClose}
                keyboard={false}
                className='modal-view-detail-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>{t('chagePass.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={currentPass}
                            onChange={(event) => setCurrentPass(event.target.value)}
                        />
                        <label>{t('chagePass.current')}</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={newPass}
                            onChange={(event) => setNewPass(event.target.value)}
                        />
                        <label>{t('chagePass.new')}</label>
                    </div> <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder=""
                            value={confirmPass}
                            onChange={(event) => setConfirmPass(event.target.value)}
                        />
                        <label>{t('chagePass.confirm')}</label>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleChangePassword()}>
                        {t('chagePass.save')}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('chagePass.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalChangePass;