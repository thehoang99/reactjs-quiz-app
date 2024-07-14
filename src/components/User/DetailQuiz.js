import { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { getDataQuiz, postSubmitAnswer } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import Content from "./RightContent/Content";
import { Breadcrumb } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const { t } = useTranslation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isFinishQuiz, setFinishQuiz] = useState(false);
    const [isShowAnswer, setShowAnswer] = useState(false);
    const [duration, setDuration] = useState(300);
    const [showModalResult, setShowModalResult] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        let res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            const raw = res.DT;
            const data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        item.answers.isCorrect = false;
                        answers.push(item.answers);
                    })
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data);
        }
    }

    const handleClickPrev = () => {
        if (index - 1 < 0) return;
        setIndex(index - 1);
    }

    const handleClickNext = () => {
        if (dataQuiz && dataQuiz.length > index + 1) {
            setIndex(index + 1);
        }
    }

    const handleCheckbox = (questionId, answerId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId);
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (+item.id === answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    }

    const handleClickFinish = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        }
        let answers = [];

        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(item => {
                let questionId = item.questionId;
                let userAnswerId = [];

                item.answers.forEach(a => {
                    if (a.isSelected) {
                        userAnswerId.push(a.id);
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
        }
        payload.answers = answers;
        const res = await postSubmitAnswer(payload);
        if (res && res.EC === 0) {
            setFinishQuiz(true);
            setDuration(0);
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setShowModalResult(true);

            if (res.DT && res.DT.quizData) {
                let questions = res.DT.quizData;
                let dataQuizClone = _.cloneDeep(dataQuiz);
                for (let q of questions) {
                    for (let i = 0; i < dataQuizClone.length; i++) {
                        if (+q.questionId === +dataQuizClone[i].questionId) {
                            let newAnswers = [];
                            for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                let correct = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id);
                                if (correct) {
                                    dataQuizClone[i].answers[j].isCorrect = true;
                                }
                                newAnswers.push(dataQuizClone[i].answers[j]);
                            }
                            dataQuizClone[i].answers = newAnswers;
                        }
                    }
                }
                setDataQuiz(dataQuizClone);
            }
        } else {
            alert("something wrongs...");
        }
    }

    const handleShowAnswer = () => {
        if (!isFinishQuiz) {
            return;
        }
        setShowAnswer(true);
    }

    return (
        <>
            <Breadcrumb className="detail-quiz-header">
                <NavLink to='/' className='breadcrumb-item'>{t('detailquiz.header.home')}</NavLink>
                <NavLink to='/users' className='breadcrumb-item'>{t('detailquiz.header.users')}</NavLink>
                <Breadcrumb.Item active>{t('detailquiz.header.quiz')}</Breadcrumb.Item>
            </Breadcrumb>
            <div className="detail-quiz-container d-flex">
                <div className="left-content">
                    <div className="q-title">
                        <p>{t('detailquiz.title')} {quizId}: {location.state.quizTitle}</p>
                    </div>
                    <div className="q-content mt-4">
                        <Question
                            currentQuestion={index}
                            handleCheckbox={handleCheckbox}
                            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
                            isFinishQuiz={isFinishQuiz}
                            isShowAnswer={isShowAnswer}
                        />
                    </div>
                    <div className="footer d-flex justify-content-center mt-4 gap-2">
                        {index > 0 &&
                            <button className="btn btn-info" onClick={() => handleClickPrev()}>
                                {t('detailquiz.footer.prev')}
                            </button>
                        }
                        {index + 1 < dataQuiz.length &&
                            <button className="btn btn-info" onClick={() => handleClickNext()}>
                                {t('detailquiz.footer.next')}
                            </button>
                        }
                        {dataQuiz.length > 0 &&
                            <button
                                className="btn btn-warning"
                                onClick={() => handleClickFinish()}
                                disabled={isFinishQuiz}
                            >
                                {t('detailquiz.footer.submit')}
                            </button>
                        }
                    </div>

                </div>
                <div className="right-content">
                    <Content
                        dataQuiz={dataQuiz}
                        handleClickFinish={handleClickFinish}
                        changeQuestion={setIndex}
                        isFinishQuiz={isFinishQuiz}
                        duration={duration}
                        setDuration={setDuration}
                    />
                </div>

                <ModalResult
                    show={showModalResult}
                    setShow={setShowModalResult}
                    dataModalResult={dataModalResult}
                    showAnswer={handleShowAnswer}
                />
            </div>
        </>

    )
}

export default DetailQuiz;