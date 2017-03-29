// schema.js
import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLInterfaceType,
} from 'graphql';

import Urls from '../collections/urls';

const Author = new GraphQLObjectType({
    name: "Author",
    description: "This represent an author",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        name: {type: GraphQLString}
    })
});

const Post = new GraphQLObjectType({
    name: "Post",
    description: "This represent a Post",
    fields: () => ({
        _id: {type: new GraphQLNonNull(GraphQLString)},
        title: {
            type: new GraphQLNonNull(GraphQLString),
            resolve: function(post) {
                return post.title || "Does not exists";
            }
        },
        content: {type: GraphQLString},
        author: {
            type: Author,
            resolve: function(post) {
                //return _.find(AuthorsList, a => a._id == post.author);
            }
        }
    })
});


const Url = new GraphQLObjectType({
    name: 'Url',
    fields: ()=> ({
        url: {type: new GraphQLNonNull(GraphQLString)}
    })
})

const Test = new GraphQLObjectType({
    name: 'Test',
    description: 'test dataType',
    fields:() => ({
        foo: { type: GraphQLString},
        bar: { type: GraphQLString}
    })
});



const RootQuery = new GraphQLObjectType({
    name: 'TrackerQueries',
    description: 'root query',
    fields: ()=> ({
        say: {
            type: Test,
            resolve: function(){
                return { foo: 'sdadas', bar: 'asdasdasd' }
            }
        },
        says: {
            type: new GraphQLList(Test),
            resolve: function(){
                return [{ foo: 'sdadas', bar: 'asdasdasd' }, { foo: 'sdadas', bar: 'asdasdasd' }]
            }
        },
        urls: {
            type: new GraphQLList(Url),
            resolve: function(){
                return Urls.find().fetch();
            }
        }
    })
});

const RootMutation = new GraphQLObjectType({
    name: 'TrackerMutations',
    description: 'root mutations',
    fields: ()=> ({
        createUrl: {
        type: Url,
        args: {
            url: {type: new GraphQLNonNull(GraphQLString)}
            },
        resolve: function(source, {url}/*args*/) {
            const newUrl = { url };
            // Generate the _id
            url._id = `${Date.now()}::${Math.ceil(Math.random() * 9999999)}`;

            // Add the Post to the data store
            PostsList.push(post);


            Urls.insert(newUrl);
            return newUrl;
            }
        }
    })
});



const schema = {
    query: RootQuery,
    mutation: RootMutation
}

console.log(typeof schema.query)
export default new GraphQLSchema(schema)