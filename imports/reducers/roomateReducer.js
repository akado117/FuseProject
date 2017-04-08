import Constants from '../lib/Constants'

var initialState = {
    roomies: [{"name":"Your","daysInRoom":2,"amountOwed":"187.18"},{"name":"Names","daysInRoom":3,"amountOwed":"280.77"},{"name":"Here","daysInRoom":2,"amountOwed":"187.18"}]
}

export default function roomateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case Constants.actionTypes.SAVE_ROOMIES+'PASS':
            return state;
        default:
            return state;
    }
}