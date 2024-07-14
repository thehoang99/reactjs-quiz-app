import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../services/apiService';
import { useTranslation } from 'react-i18next';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, data, fetchQuiz } = props;
    const { t } = useTranslation();

    const handleClose = () => {
        setShow(false);
    }

    const handleConfirmDelete = async () => {
        const res = await deleteQuiz(data.id);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
            await fetchQuiz();
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <Modal
                show={show}
                size="lg"
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
                className="modal-add-quiz"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">{t('deleteQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t('deleteQuiz.description')}</p>
                    {data && data.name &&
                        <p>{t('deleteQuiz.name')}<b>{data.name}</b></p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleConfirmDelete()}>
                        {t('deleteQuiz.confirm')}
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        {t('deleteQuiz.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteQuiz;