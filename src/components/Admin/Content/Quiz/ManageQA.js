import Select from 'react-select';
import './ManageQA.scss';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, getQuizWithQA, postUpsertQA } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const ManageQA = () => {
    const { t, i18n } = useTranslation();

    const initQuestion = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ];

    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [questions, setQuestions] = useState(initQuestion)

    const [isPreviewImage, setPreviewImage] = useState(false);
    const [dataPreviewImage, setDataPreviewImage] = useState({
        title: '',
        url: ''
    })

    useEffect(() => {
        fetchQuiz();
    }, [])

    useEffect(() => {
        if (selectedQuiz && selectedQuiz.value) {
            fetchQuizWithQA();
        }
    }, [selectedQuiz])

    const urltoFile = (url, filename, mimeType) => {
        return (fetch(url)
            .then(function (res) { return res.arrayBuffer(); })
            .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
        );
    }

    const fetchQuizWithQA = async () => {
        const res = await getQuizWithQA(selectedQuiz.value);
        if (res && res.EC === 0) {
            let newQA = [];
            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i];
                if (q.imageFile) {
                    q.imageName = `Question-${q.id}.png`;
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, q.imageName, 'image/png');
                }
                newQA.push(q);
            }
            setQuestions(newQA);
        }
    }

    const fetchQuiz = async () => {
        const res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newListQuiz = res.DT.map(quiz => {
                return {
                    value: quiz.id,
                    label: `${quiz.id} - ${quiz.description}`
                }
            })
            setListQuiz(newListQuiz);
        }
    }

    const handleAddDeleteQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion]);
        }

        if (type === "DELETE") {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }

    const handleAddDeleteAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions);

        if (type === "ADD") {
            const newAnswer = {
                id: uuidv4(),
                description: '',
                isCorrect: false
            }

            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }

        if (type === "DELETE") {
            let index = questionsClone.findIndex(item => item.id === questionId);
            questionsClone[index].answers =
                questionsClone[index].answers.filter(item => item.id !== answerId);
            setQuestions(questionsClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            if (type === "QUESTION") {
                questionsClone[index].description = value;

            }

            if (type === "FILE") {
                questionsClone[index].imageFile = value;
                questionsClone[index].imageName = value.name;
            }

            setQuestions(questionsClone);
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === answerId) {
                        if (type === "CHECKBOX") {
                            answer.isCorrect = value;
                        }
                        if (type === "TEXT") {
                            answer.description = value;
                        }
                    }
                    return answer;
                })
            setQuestions(questionsClone);
        }
    }

    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1) {
            setDataPreviewImage({
                title: questionsClone[index].imageName,
                url: URL.createObjectURL(questionsClone[index].imageFile)

            })
            setPreviewImage(true);
        }
    }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const handleSubmitQuestion = async () => {
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose the Quiz");
            return;
        }

        let isValidQuestion = true;
        let indexQues = 0;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                indexQues = i;
                isValidQuestion = false;
                break;
            }
        }
        if (!isValidQuestion) {
            toast.error(`Please type description for Question ${indexQues + 1}`);
            return;
        }

        let isValidAnswer = true;
        let indexQ, indexA = 0;
        for (let i = 0; i < questions.length; i++) {
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    indexA = j;
                    isValidAnswer = false;
                    break;
                }
            }
            indexQ = i;
            if (!isValidAnswer) {
                break;
            }

        }
        if (!isValidAnswer) {
            toast.error(`Please type Answer ${indexA + 1} of Question ${indexQ + 1}`);
            return;
        }

        let questionsClone = _.cloneDeep(questions);
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile);
            }

        }

        const res = await postUpsertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone
        })

        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <div className="manage-question-container">
            <div className="quiz-content my-4">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3 legend-title">{t('manageQA.title1')}</legend>
                    <Select className='col-6'
                        // value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        placeholder={i18n.language === "en" ? "---Choice the quiz---" : "---Chọn bộ đề---"}
                    />
                </fieldset>
            </div>
            <div>
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3 legend-title">{t('manageQA.title2')}</legend>
                    {questions && questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <div key={question.id} className='qna-content mb-5'>
                                    <div className='question-content'>
                                        <div className="form-floating description">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder=""
                                                value={question.description}
                                                onChange={(event) => handleOnChange("QUESTION", question.id, event.target.value)}
                                            />
                                            <label>{t('manageQA.question')} {index + 1}</label>
                                        </div>
                                        <div className='upload-image'>
                                            <label className="form-label label-upload me-2" htmlFor={`question-${question.id}`}>
                                                <RiImageAddFill />
                                            </label>
                                            <input
                                                type="file" hidden
                                                id={`question-${question.id}`}
                                                onChange={(event) => handleOnChange("FILE", question.id, event.target.files[0])}
                                            />
                                            <span>
                                                {question.imageName ?
                                                    <span className='title-image'
                                                        onClick={() => handlePreviewImage(question.id)}
                                                    >
                                                        {question.imageName}
                                                    </span>
                                                    :
                                                    "0 file is uploaded"
                                                }
                                            </span>
                                        </div>
                                        <div className='btn-question'>
                                            <span className='btn-add me-2' onClick={() => handleAddDeleteQuestion('ADD', '')}>
                                                <BsFillPatchPlusFill />
                                            </span>
                                            {questions.length > 1 &&
                                                <span className='btn-delete' onClick={() => handleAddDeleteQuestion('DELETE', question.id)}>
                                                    <BsFillPatchMinusFill />
                                                </span>
                                            }
                                        </div>
                                    </div>
                                    {question.answers && question.answers.length > 0 &&
                                        question.answers.map((answer, index) => {
                                            return (
                                                <div key={answer.id} className='answer-content mt-3 ms-4'>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={answer.isCorrect}
                                                        onChange={(event) => handleAnswerQuestion("CHECKBOX", question.id, answer.id, event.target.checked)}
                                                    />
                                                    <div className="form-floating answer">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            placeholder=""
                                                            value={answer.description}
                                                            onChange={(event) => handleAnswerQuestion("TEXT", question.id, answer.id, event.target.value)}

                                                        />
                                                        <label>{t('manageQA.answer')} {index + 1}</label>
                                                    </div>
                                                    <div className='btn-answer'>
                                                        <span className='icon-add me-2' onClick={() => handleAddDeleteAnswer("ADD", question.id)}>
                                                            <FaPlus />
                                                        </span>
                                                        {question.answers.length > 1 &&
                                                            <span className='icon-delete' onClick={() => handleAddDeleteAnswer("DELETE", question.id, answer.id)}>
                                                                <FaMinus />
                                                            </span>
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                    {questions && questions.length > 0 &&
                        <div className='d-flex justify-content-center'>
                            <button
                                className='btn btn-primary px-3'
                                onClick={() => handleSubmitQuestion()}
                            >
                                {t('manageQA.save')}
                            </button>
                        </div>
                    }
                </fieldset>
                {isPreviewImage &&
                    <Lightbox
                        image={dataPreviewImage.url}
                        title={dataPreviewImage.title}
                        onClose={() => setPreviewImage(false)}
                    >
                    </Lightbox>
                }
            </div>
        </div>
    )
}

export default ManageQA;