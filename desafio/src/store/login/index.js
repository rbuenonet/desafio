// action
export function set_data(data) {
    return {
        type: 'SET_LOGIN_DATA',
        data: data
    }
}

// reducer
const INITIAL_STATE = {}

export default function reduce(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_LOGIN_DATA':
            return action.data;
        default:
            return state;
    }
}

// selectors
export function getLogin(state){
    return state.login;
}