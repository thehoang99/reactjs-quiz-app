import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlusCircle } from 'react-icons/fa';
import Select from 'react-select';
import _ from 'lodash';
import { putUpdateQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, data, setData, fetchQuiz } = props;
    const { t } = useTranslation();

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

    useEffect(() => {
        if (!_.isEmpty(data)) {
            setName(data.name);
            setDescription(data.description);
            setType(data.difficulty);
            if (data.image) {
                setPreviewImage(`data:image/jpeg;base64,${data.image}`);
            }
        }
    }, [data])

    const handleClose = () => {
        setName("");
        setDescription("");
        setType("");
        setImage(null);
        setPreviewImage(null);
        setData({});
        setShow(false);
    }

    const handleUploadImage = (event) => {
        if (event && event.target && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleClickUpdate = async () => {
        const res = await putUpdateQuiz(data.id, description, name, type, image);
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
                    <Modal.Title className="text-primary">{t('updateQuiz.title')}</Modal.Title>
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
                            <label>{t('updateQuiz.form.name')}</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                            <label>{t('updateQuiz.form.description')}</label>
                        </div>
                        <div className='my-3 select-type'>
                            <Select
                                value={options.find(option => option.value === type)}
                                onChange={(event) => setType(event.value)}
                                options={options}
                            />
                        </div>
                        <div className="mt-2">
                            <label className="form-label label-upload" htmlFor="lableUploadImg">
                                <FaPlusCircle className="text-primary" /> {t('updateQuiz.form.upload')}
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
                                <span>{t('updateQuiz.form.preview')}</span>
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleClickUpdate()}>
                        {t('updateQuiz.update')}
                    </Button>
                    <Button variant="secondary" onClick={() => handleClose()}>
                        {t('updateQuiz.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalUpdateQuiz;