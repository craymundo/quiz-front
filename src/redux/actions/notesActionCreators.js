import * as constants from './../constants';

export const fetchAllQuestionnaire = () => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: '/questionnaire',
        success: (response) => (setAllQuestionnaire(response))
    }
});

export const createQuestionnaire = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/questionnaire',
        data,
        success: (note) => (addQuestionnaire(note)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const getQuestionnaireById = (noteId, onSuccess) => ({
    type: constants.API,
    payload: {
        method: 'GET',
        url: `/questionnaire/find/${noteId}`,
        postProcessSuccess: onSuccess
    }
});

export const updateQuestionnaireById = (noteId, data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'PUT',
        url: `/questionnaire/${noteId}`,
        data,
        success: (noteId, data) => (updateremoveQuestionnaire(noteId, data)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const deleteQuestionnaireById = (noteId, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'DELETE',
        url: `/questionnaire/${noteId}`,
        success: () => (removeQuestionnaire(noteId)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

export const createQuiz = (data, onSuccess, onError) => ({
    type: constants.API,
    payload: {
        method: 'POST',
        url: '/quiz',
        data,
        success: (note) => (addQuiz(note)),
        postProcessSuccess: onSuccess,
        postProcessError: onError
    }
});

const addQuestionnaire = (note) => ({
    type: constants.ADD_QUESTIONNAIRE,
    payload: note
});

const setAllQuestionnaire = (data) => ({
    type: constants.SET_ALL_QUESTIONNAIRE,
    payload: data.data
});

const updateremoveQuestionnaire = (noteId, data) => ({
    type: constants.UPDATE_QUESTIONNAIRE,
    payload: { noteId, data }
});

const removeQuestionnaire = (noteId) => ({
    type: constants.REMOVE_QUESTIONNAIRE,
    payload: noteId
});

const addQuiz = (note) => ({
    type: constants.ADD_QUIZ,
    payload: note
});