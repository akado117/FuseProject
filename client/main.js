/* globals document */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { meteorClientConfig } from 'meteor/apollo';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './ui/pages/Layout';
import RoomieCalc from './ui/components/roomieComps/RoommateCalc';
import Fuse from './ui/components/FuseTestContainer';
import store from './ui/store/store';


const client = new ApolloClient(meteorClientConfig());


Meteor.startup(() => {
  render(
    <ApolloProvider client={client} store={store} >
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} >
            <Route path="/" component={App} >
                <IndexRoute component={Fuse} />
                <Route path="room/:roomId" component={RoomieCalc} />
                <Route path="room" component={RoomieCalc} />
            </Route>
        </Router>
    </ApolloProvider>,
    document.getElementById('render-target'));
});
