import _ from "lodash";
import { useState } from "react";
import Lightbox from "react-awesome-lightbox";
import { useTranslation } from "react-i18next";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const Question = (props) => {
    const { data, currentQuestion, handleCheckbox, isFinishQuiz, isShowAnswer } = props;

    const { t } = useTranslation();

    const [isPreviewImage, setPreviewImage] = useState(false);

    const handleChoiceAnswer = (event, questionId, answerId) => {
        handleCheckbox(questionId, answerId);
    }

    if (_.isEmpty(data)) {
        return (<></>);
    }

    return (
        <>
            {data.image ?
                <div className="q-image mb-3">
                    <img src={`data:image/jpeg;base64, ${data.image}`}
                        alt="question-des"
                        onClick={() => setPreviewImage(true)}
                    />
                    {isPreviewImage &&
                        <Lightbox
                            image={`data:image/jpeg;base64, ${data.image}`}
                            title={"Preview Image"}
                            onClose={() => setPreviewImage(false)}
                        >
                        </Lightbox>
                    }
                </div>
                :
                <div className="q-image mb-3"></div>
            }

            <div className="question text-center">
                {t('question.title')} {currentQuestion + 1}: {data.questionDescription}?
            </div>
            <div className="answers ms-5">
                {data.answers && data.answers.length > 0 &&
                    data.answers.map((answer, index) => {
                        return (
                            <div key={`anwer-${index}`}>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={answer.isSelected}
                                        disabled={isFinishQuiz}
                                        onChange={(event) => handleChoiceAnswer(event, data.questionId, answer.id)}
                                    />
                                    <label className="form-check-label">
                                        <div>{answer.description}</div>
                                    </label>
                                    {isShowAnswer &&
                                        <>
                                            {answer.isSelected && !answer.isCorrect &&
                                                <IoIosClose className="incorrect" />
                                            }
                                            {answer.isCorrect &&
                                                <IoIosCheckmark className="correct" />
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question;