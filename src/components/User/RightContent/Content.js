import CountDown from "./CountDown";
import { useRef } from "react";

const Content = (props) => {
    const { dataQuiz, handleClickFinish, changeQuestion, isFinishQuiz, duration, setDuration } = props;

    const refDiv = useRef([]);

    const getClassQuestion = (question) => {
        if (question && question.answers && question.answers.length > 0) {
            let isAnswered = question.answers.find(item => item.isSelected === true);
            if (isAnswered) {
                return "question-child selected";
            }
        }
        return "question-child";
    }

    const handleChangeQuestion = (question, index) => {
        changeQuestion(index);

        if (refDiv.current) {
            refDiv.current.forEach(item => {
                if (item && item.className === "question-child clicked") {
                    item.className = "question-child";
                }
            })
        }

        if (question && question.answers && question.answers.length > 0) {
            let isAnswered = question.answers.find(item => item.isSelected === true);
            if (isAnswered) {
                return;
            }
        }
        refDiv.current[index].className = "question-child clicked";
    }

    return (
        <>
            <div className="main-timer">
                <CountDown
                    timesUp={handleClickFinish}
                    finish={isFinishQuiz}
                    duration={duration}
                    setDuration={setDuration}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0 &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div
                                key={`q-child-${index}`}
                                className={getClassQuestion(item)}
                                onClick={() => handleChangeQuestion(item, index)}
                                ref={ele => refDiv.current[index] = ele}
                            >
                                {index + 1}
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Content;