import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlusCircle } from 'react-icons/fa';
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ModalCreateQuiz = (props) => {
    const { show, setShow, fetchQuiz } = props;
    const { t, i18n } = useTranslation();

    const options = [
        { value: 'EASY', label: 'EASY' },
        { value: 'MEDIUM', label: 'MEDIUM' },
        { value: 'HARD', label: 'HARD' }
    ]

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleClose = () => {
        setName("");
        setDescription("");
        setType("");
        setImage(null);
        setPreviewImage(null);
        setShow(false);
    }

    const handleUploadImage = (event) => {
        if (event && event.target && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleClickSubmit = async () => {
        if (!description || !name || !type || !image) {
            toast.error("All field is requred");
            return;
        }

        const res = await postCreateNewQuiz(description, name, type, image);
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
                size="xl"
                onHide={() => handleClose()}
                backdrop="static"
                keyboard={false}
                className="modal-add-quiz"
            >
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">{t('addQuiz.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='add-new-quiz'>
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <label>{t('addQuiz.form.name')}</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <label>{t('addQuiz.form.description')}</label>
                        </div>
                        <div className='my-3 select-type'>
                            <Select
                                defaultValue={type}
                                onChange={(event) => setType(event.value)}
                                options={options}
                                placeholder={i18n.language === "en" ? "---Choice quiz type---" : "---Chọn độ khó---"}
                            />
                        </div>
                        <div className="mt-2">
                            <label className="form-label label-upload" htmlFor="lableUploadImg">
                                <FaPlusCircle className="text-primary" /> {t('addQuiz.form.upload')}
                            </label>
                            <input
                                type="file" hidden
                                id="lableUploadImg"
                                onChange={(event) => handleUploadImage(event)}
                            />
                        </div>
                        <div className="col-12 img-preview">
                            {previewImage ?
                                <img src={previewImage} alt="create quiz alter" />
                                :
                                <span>{t('addQuiz.form.preview')}</span>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleClickSubmit()}>
                        {t('addQuiz.save')}
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        {t('addQuiz.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalCreateQuiz;