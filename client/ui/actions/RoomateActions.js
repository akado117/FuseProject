import { graphql, gql } from 'react-apollo';
import Constants from '../constants/Constants';


export default {
    saveRoom: (room, dispatch) => Meteor.call('saveRoomies',room,(error,result)=>{
        if(error){
            console.log(error);
            dispatch({
                type: `${Constants.actionTypes.SAVE_ROOMIES}_FAIL`,
                ...error,
            });
        } else {
            dispatch({
                type: `${Constants.actionTypes.SAVE_ROOMIES}_PASS`,
                ...result,
            });
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
        return graphql(query, <Helper callbackFunc={cb}/>)
    },
};