import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ModalDeleteUser = (props) => {
    const { show, setShow, dataDelete, fetchListUser, setCurrentPage } = props;

    const { t } = useTranslation();

    const handleClose = () => setShow(false);

    const handleConfirmDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            setCurrentPage(1)
            await fetchListUser(1);
        } else {
            toast.error(data.EM);
        }

        handleClose();
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>{t('deleteUser.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('deleteUser.description')}</p>
                    {dataDelete && dataDelete.email &&
                        <p>{t('deleteUser.email')}<b>{dataDelete.email}</b></p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleConfirmDeleteUser()}>
                        {t('deleteUser.ok')}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('deleteUser.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteUser;