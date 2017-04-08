import Constants from '../lib/Constants'
import _ from 'lodash'

var initialState = {
    roomies: [{"name":"Your","daysInRoom":2,"amountOwed":"187.18"},{"name":"Names","daysInRoom":3,"amountOwed":"280.77"},{"name":"Here","daysInRoom":2,"amountOwed":"187.18"}]
}

export default function roomateReducer(state = initialState, action = {}) {
    switch (action.type) {
        case Constants.actionTypes.SAVE_ROOMIES+'_PASS':
            return _.assign({},state,{roomId: action.roomieId});
        default:
            return state;
    }
}