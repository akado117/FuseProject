import Urls from '../collections/urls';
import Roomies from '../collections/Roomies';

export default {
  RootQuery: {
    say(/* root, args, context */) {
      return { foo: 'sdadas', bar: 'asdasdasd' };
    },
    says() {
      return [{ foo: 'sdadas', bar: 'asdasdasd' }, { foo: 'sdadas', bar: 'asdasdasd' }];
    },
    urls(/* root, args, context */) {
      return Urls.find().fetch();
    },
    getSavedRooms(/* root, args, context */) {
      return Roomies.find().fetch();
    },
    getSavedRoom(root, {Id}){
      console.log(JSON.stringify(Roomies.findOne({_id:Id})))
      return Roomies.findOne({_id:Id});
    }
  },
  RootMutation: {
    insertUrl(root, { url }) {
      const newUrl = { url };
      Urls.insert(newUrl);
      return newUrl;
    },
  },
};
