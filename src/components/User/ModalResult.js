import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const ModalResult = (props) => {
    const { show, setShow, dataModalResult, showAnswer } = props;

    const { t } = useTranslation();

    const handleClose = () => setShow(false);

    const handleShowAnswer = () => {
        showAnswer();
        handleClose();
    }

    return (
        <>
            <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                keyboard={false}
                backdrop="static"
                className='modal-view-detail-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>{t('resultQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{t('resultQuiz.total.question')}<b>{dataModalResult.countTotal}</b></div>
                    <div>{t('resultQuiz.total.answer')}<b>{dataModalResult.countCorrect}</b></div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleShowAnswer()}>
                        {t('resultQuiz.result')}
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('resultQuiz.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalResult;