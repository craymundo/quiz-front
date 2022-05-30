import * as constants from './../constants';

export default function notesReducer(state = [], action) {
    switch (action.type) {
        case constants.SET_ALL_QUESTIONNAIRE:
            return action.payload;
        case constants.ADD_QUESTIONNAIRE:
            return state.concat(action.payload);
        case constants.REMOVE_QUESTIONNAIRE:
            return state.filter(item => item._id !== action.payload);
        case constants.UPDATE_QUESTIONNAIRE:
            return state.map(item => {
                if (item._id === action.payload.noteId)
                    return { ...item, ...action.payload.data };
                else
                    return item;
            });
        case constants.ADD_QUIZ:
                return state.concat(action.payload);
        case constants.RESET_USER_INFO:
            return [];
        default:
            return state;
    }
}