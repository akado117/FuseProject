import Roomies from '../imports/collections/Roomies'

Meteor.methods({
    saveRoomies(room){
        if(room && typeof room === 'object' && room.roomies){
            delete room._id
            const roomieGUID = Roomies.insert(room);
            console.log(`Roomies inserted ${JSON.stringify(room)}, with key ${roomieGUID}`);

            return {
                serviceStatus: 'SUCCESS',
                serviceMessage: `Roomies inserted ${room}, with key ${roomieGUID}`,
                roomieId: roomieGUID
            }
        } else {

            return {
                serviceStatus: 'FAILURE',
                serviceMessage: `${JSON.stringify(room)} failed to be created`
            }
        }
    }

});