import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { getAllUsers, postAssignQuizToUser } from '../../../../services/apiService';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ModalAssignQuizToUser = (props) => {
    const { show, setShow, dataAssign } = props;
    const { t, i18n } = useTranslation();

    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});

    useEffect(() => {
        fetchListUser();
    }, [])

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newListUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.email}`
                }
            })
            setListUser(newListUser);
        }
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleClickAssignQuiz = async () => {
        if (!selectedUser.value) {
            toast.error("Please choose User before assign");
            return;
        }

        const res = await postAssignQuizToUser(dataAssign.id, selectedUser.value);
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
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
                className="modal-assign-quiz"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">{t('assignQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <p className='text-danger'>{t('assignQuiz.description')}</p>
                        <p className='ms-3'>{t('assignQuiz.name')}<b>{dataAssign.name}</b></p>
                        <p className='ms-3'>{t('assignQuiz.difficulty')}<b>{dataAssign.difficulty}</b></p>
                    </div>
                    <Select
                        // value={selectedQuiz}
                        onChange={setSelectedUser}
                        options={listUser}
                        placeholder={i18n.language === "en" ? "---Choice the user---" : "---Chọn người dùng---"}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleClickAssignQuiz()}>
                        {t('assignQuiz.assign')}
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        {t('assignQuiz.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAssignQuizToUser;