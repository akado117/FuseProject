import Constants from '../lib/Constants'

export default {
    saveRoomies : (roomies, dispatch) => Meteor.call('saveRoomies',roomies,(error,result)=>{
        if(error){
            console.log(error);
            dispatch({
                type: Constants.actionTypes.SAVE_ROOMIES + '_FAIL',
                ...error
            })
        } else {

            dispatch({
                type: Constants.actionTypes.SAVE_ROOMIES + '_PASS',
                ...result
            })
        }
    })

}