import Urls from '../collections/urls';
import { HTTP } from 'meteor/http';
import GraphQLToolsTypes from "graphql-tools-types"
import _ from "lodash"

const httpConstansts = {
  httpOptions: {
    auth: "Briantaylorwendys@gmail.com:Wendysdevtech1",
    content: "application/json"
  },
  baseURL: 'https://wentrack.atlassian.net',
  getAllProjects: '/rest/api/2/project'
};


export default {

  RootQuery: {
    //Date:     GraphQLToolsTypes.Date({ name: "MyDate" }),
    //UUID:     GraphQLToolsTypes.UUID({ name: "MyUUID" }),
    //JSON: GraphQLToolsTypes.JSON({ name: "JSON" }),
    //Coord:    GraphQLToolsTypes.JSON({ name: "Coord", struct: "{ x: number, y: number }" }),
    say(/* root, args, context */) {
      return { foo: 'sdadas', bar: 'asdasdasd' };
    },
    says() {
      return [{ foo: 'sdadas', bar: 'asdasdasd' }, { foo: 'sdadas', bar: 'asdasdasd' }];
    },
    urls(/* root, args, context */) {
      return Urls.find().fetch();
    },
    getAllProjects: (/* root, args, context */)=>{
      const response = HTTP.get(httpConstansts.baseURL+httpConstansts.getAllProjects,httpConstansts.httpOptions)
      //console.log(JSON.parse(JSON.stringify({'data': response.data})))
      response.data.forEach((project)=> {
        const projectKeys = _.keys(project.avatarUrls)
        const tempIcons = {
          i48x48: '',
          i24x24: '',
          i16x16: '',
          i32x32: ''
        };

        projectKeys.forEach((key)=> {
          tempIcons[`i${key}`] = project.avatarUrls[key]
        });
        project.avatarUrls = tempIcons
      });

      return response.data
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
