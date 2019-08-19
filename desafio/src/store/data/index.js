// action
export function set_data(data) {
    return {
        type: 'SET_DATA_DATA',
        data: data
    }
}
export function set_search(data) {
    return {
        type: 'SET_DATA_SEARCH',
        data: data
    }
}

// reducer
const INITIAL_STATE = {}

export default function reduce(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_DATA_DATA':
            return action.data;
        case 'SET_DATA_SEARCH':
            return {...state, search: action.data};
        default:
            return state;
    }
}

// selectors
export function getData(state){
    return state.data;
}