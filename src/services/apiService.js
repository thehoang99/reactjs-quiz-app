import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data);
}

const getAllUsers = () => {
    return axios.get('api/v1/participant/all');
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data);
}

const deleteUser = (id) => {
    return axios.delete('api/v1/participant', { data: { id } });
}

const getUsers = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay: 3000 });
}

const postRegister = (email, username, password) => {
    return axios.post('api/v1/register', { email, username, password });
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant');
}

const getDataQuiz = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
}

const postSubmitAnswer = (data) => {
    return axios.post('api/v1/quiz-submit', { ...data });
}

const postCreateNewQuiz = (description, name, type, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', type);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data);
}

const getAllQuizForAdmin = () => {
    return axios.get('api/v1/quiz/all');
}

const deleteQuiz = (id) => {
    return axios.delete(`api/v1/quiz/${id}`);
}

const putUpdateQuiz = (id, description, name, type, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', type);
    data.append('quizImage', image);
    return axios.put('api/v1/quiz', data);
}

const postCreateNewQuestion = (id, description, image) => {
    const data = new FormData();
    data.append('quiz_id', id);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data);
}

const postCreateNewAnswer = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', { description, correct_answer, question_id })
}

const postAssignQuizToUser = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`);
}

const postUpsertQA = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data });
}

const postLogout = (email, refresh_token) => {
    return axios.post('api/v1/logout', { email, refresh_token });
}

const getOverviewDashboard = () => {
    return axios.get('api/v1/overview');
}

const postChangePassword = (current_password, new_password) => {
    return axios.post('api/v1/change-password', { current_password, new_password })
}

export {
    postCreateNewUser, getAllUsers, putUpdateUser, deleteUser, getUsers,
    postLogin, postRegister, getQuizByUser, getDataQuiz, postSubmitAnswer,
    postCreateNewQuiz, getAllQuizForAdmin, deleteQuiz, putUpdateQuiz,
    postCreateNewQuestion, postCreateNewAnswer, postAssignQuizToUser,
    getQuizWithQA, postUpsertQA, postLogout, getOverviewDashboard,
    postChangePassword
}