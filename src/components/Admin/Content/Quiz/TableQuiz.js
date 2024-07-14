import { useTranslation } from "react-i18next";
import { FaEdit, FaTrash, FaShare } from "react-icons/fa";

const TableQuiz = (props) => {
    const { listQuiz, handleClickDeleteIcon, handleClickUpdateIcon, handleClickAssignIcon } = props;
    const { t } = useTranslation();

    return (
        <>
            {listQuiz && listQuiz.length > 0 ?
                <table className="table table-bordered table-hover mt-2">
                    <thead>
                        <tr className="bg-info">
                            <th>#</th>
                            <th>{t('tableQuiz.name')}</th>
                            <th>{t('tableQuiz.description')}</th>
                            <th>{t('tableQuiz.difficulty')}</th>
                            <th>{t('tableQuiz.action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listQuiz.map((quiz, index) => {
                                return (
                                    <tr key={`list-quiz-${index}`}>
                                        <td>{index + 1}</td>
                                        <td>{quiz.name}</td>
                                        <td>{quiz.description}</td>
                                        <td>{quiz.difficulty}</td>
                                        <td>
                                            <button
                                                className="btn"
                                                onClick={() => handleClickUpdateIcon(quiz)}
                                            >
                                                <FaEdit className="text-warning" />
                                            </button>
                                            <button
                                                className="btn"
                                                onClick={() => handleClickDeleteIcon(quiz)}
                                            >
                                                <FaTrash className="text-danger" />
                                            </button>
                                            <button
                                                className="btn"
                                                onClick={() => handleClickAssignIcon(quiz)}
                                            >
                                                <FaShare className="text-success" />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                :
                <p className="text-danger mt-4">{t('tableQuiz.invalid')}</p>
            }
        </>
    )
}

export default TableQuiz;