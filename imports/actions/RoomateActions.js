import Constants from '../lib/Constants'
import { graphql, gql } from 'react-apollo';


export default {
    saveRoomies : (roomies, dispatch) => Meteor.call('saveRoomies',roomies,(error,result)=>{
        if(error){
            console.log(error);
            dispatch({
                type: Constants.actionTypes.SAVE_ROOMIES + '_FAIL',
                ...error
            })
        } else {
            debugger;
            dispatch({
                type: Constants.actionTypes.SAVE_ROOMIES + '_PASS',
                ...result
            })
        }
    }),
    getRoomById: (id, cb) => {
        const query =  gql`{
          getSavedRoom(Id:"${id}") {
            _id
            roomies {
              name
              daysInRoom
              amountOwed
            }
          }
        }`;
       debugger;
        return graphql(query, <Helper callbackFunc={cb}/>)
    }
}