import Roomies from '../imports/collections/Roomies'

Meteor.methods({
    saveRoomies(roomies){
        if(roomies && typeof roomies === 'object' && roomies.length){
            const roomieGUID = Roomies.insert({roomies});
            console.log(`Roomies inserted ${JSON.stringify(roomies)}, with key ${roomieGUID}`);

            return {
                serviceStatus: 'SUCCESS',
                serviceMessage: `Roomies inserted ${roomies}, with key ${roomieGUID}`,
                roomieId: roomieGUID
            }
        } else {

            return {
                serviceStatus: 'FAILURE',
                serviceMessage: `${roomies} failed to be created`
            }
        }
    }

});