import { FaPlusCircle } from 'react-icons/fa';
import './ManageQuiz.scss';
import { useEffect, useState } from 'react';
import ModalCreateQuiz from './ModalCreateQuiz';
import TableQuiz from './TableQuiz';
import { getAllQuizForAdmin } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import ManageQA from './ManageQA';
import { Tab, Tabs } from 'react-bootstrap';
import ModalAssignQuizToUser from './ModalAssignQuizToUser';
import { useTranslation } from 'react-i18next';

const ManageQuiz = () => {
    const { t, i18n } = useTranslation();

    const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalAssignQuiz, setShowModalAssignQuiz] = useState(false);

    const [dataDelete, setDataDelete] = useState({});
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataAssign, setDataAssign] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, [])

    const fetchQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        } else {
            toast.error(res.EM);
        }
    }

    const handleClickDeleteIcon = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    }

    const handleClickUpdateIcon = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz);
    }

    const handleClickAssignIcon = (quiz) => {
        setShowModalAssignQuiz(true);
        setDataAssign(quiz);
    }

    return (
        <div className='manage-quiz-container'>
            <div className="title text-primary text-center">
                {t('manageQuiz.title')}
            </div>
            <div className="quiz-content">
                <div className="btn-add-new">
                    <button
                        className="btn btn-success d-flex align-items-center"
                        onClick={() => setShowModalCreateQuiz(true)}
                    >
                        <FaPlusCircle className="text-warning me-2" /> {t('manageQuiz.add')}
                    </button>
                </div>
                <div className="quiz-table">
                    <Tabs
                        defaultActiveKey="profile"
                        id="uncontrolled-tab-example"
                        className="my-4"
                    >
                        <Tab eventKey="home" title={i18n.language === "en" ? "List Quiz" : "Danh sách đề thi"}>
                            <TableQuiz
                                listQuiz={listQuiz}
                                handleClickDeleteIcon={handleClickDeleteIcon}
                                handleClickUpdateIcon={handleClickUpdateIcon}
                                handleClickAssignIcon={handleClickAssignIcon}
                            />
                        </Tab>
                        <Tab eventKey="profile" title={i18n.language === "en" ? "Update Question and Answer" : "Cập nhật câu hỏi và câu trả lời"}>
                            <ManageQA dataQuiz={listQuiz} />
                        </Tab>
                    </Tabs>
                </div>
            </div>

            <ModalCreateQuiz
                show={showModalCreateQuiz}
                setShow={setShowModalCreateQuiz}
                fetchQuiz={fetchQuiz}
            />

            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                fetchQuiz={fetchQuiz}
                data={dataDelete}
            />

            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                fetchQuiz={fetchQuiz}
                data={dataUpdate}
                setData={setDataUpdate}
            />

            <ModalAssignQuizToUser
                show={showModalAssignQuiz}
                setShow={setShowModalAssignQuiz}
                dataAssign={dataAssign}
            />
        </div>
    )
}

export default ManageQuiz;