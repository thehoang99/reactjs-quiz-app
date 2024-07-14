import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const ModalDetailUser = (props) => {
    const { show, setShow, dataDetail } = props;

    const { t } = useTranslation();

    const handleClose = () => setShow(false);

    return (
        <>
            <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                keyboard={false}
                className='modal-view-detail-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title className='text-primary'>{t('detailUser.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {dataDetail &&
                        <table className='table table-striped ms-2'>
                            <tbody className='d-flex flex-column '>
                                <tr className='row'>
                                    <th className='col-md-3'>{t('detailUser.table.id')}</th>
                                    <td className='col-md-9'>{dataDetail.id}</td>
                                </tr>
                                <tr className='row'>
                                    <th className='col-md-3'>{t('detailUser.table.username')}</th>
                                    {dataDetail.username ?
                                        <td className='col-md-9'>{dataDetail.username}</td>
                                        :
                                        <td className='col-md-9'>
                                            <i className='text-secondary'>{t('detailUser.table.notName')}</i>
                                        </td>
                                    }
                                </tr>
                                <tr className='row'>
                                    <th className='col-md-3'>{t('detailUser.table.email')}</th>
                                    <td className='col-md-9'>{dataDetail.email}</td>
                                </tr>
                                <tr className='row'>
                                    <th className='col-md-3'>{t('detailUser.table.role')}</th>
                                    <td className='col-md-9'>{dataDetail.role}</td>
                                </tr>
                                <tr className='row'>
                                    <th className='col-md-3'>{t('detailUser.table.image')}</th>
                                    {dataDetail.image ?
                                        <td className="col-md-9 user-detail-img">
                                            <img src={`data:image/jpeg;base64,${dataDetail.image}`} alt="view detail user alter" />
                                        </td>
                                        :
                                        <td className='col-md-9'>
                                            <i className='text-secondary'>{t('detailUser.table.notImage')}</i>
                                        </td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('detailUser.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDetailUser;