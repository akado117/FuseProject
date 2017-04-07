/* globals document */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/Layout.jsx';
import RoomieCalc from '../imports/ui/components/RoommateCalc.jsx'
import store from '../imports/store/store'

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { meteorClientConfig } from 'meteor/apollo';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const client = new ApolloClient(meteorClientConfig());


Meteor.startup(() => {
  render(
    <ApolloProvider client={client} store={store}>
        <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
            <Route path="/" component={App}>
                <IndexRoute component={RoomieCalc}/>
            </Route>
        </Router>
    </ApolloProvider>,
    document.getElementById('render-target'));
});
