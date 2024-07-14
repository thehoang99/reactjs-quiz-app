
import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ListQuiz = () => {
    const [arrQuiz, setArrQuiz] = useState([]);

    const navigate = useNavigate();
    const { t } = useTranslation();

    useEffect(() => {
        getQuizData();
    }, [])

    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    }

    return (
        <div className="list-quiz-container container mt-4">
            {arrQuiz && arrQuiz.length > 0 ?
                arrQuiz.map((quiz, index) => {
                    return (
                        <div key={`quiz ${index + 1}`} className="card" style={{ width: "18rem" }}>
                            <img src={`data:image/jpeg;base64, ${quiz.image}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title text-danger"> {t('listquiz.title')} {index + 1}</h5>
                                <p className="card-text">{quiz.description}</p>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/quiz/${quiz.id}`,
                                        { state: { quizTitle: quiz.description } }
                                    )}
                                >
                                    {t('listquiz.start')}
                                </button>
                            </div>
                        </div>
                    )
                })
                :
                <p className="text-danger info-no-question">{t('listquiz.invalid')}</p>
            }
        </div>
    )
}

export default ListQuiz;