import React from 'react';
import { graphql, gql } from 'react-apollo';
import RoommateCalc from './components/RoommateCalc.jsx'

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


// Or a stateless functional component:
const App = ({/*data*/}) => (
    <MuiThemeProvider>
        <div>
          {/*data.say*/}
            <RoommateCalc />
        </div>
    </MuiThemeProvider>
  );

// Initialize GraphQL queries or mutations with the `gql` tag
//const query = gql`query { say{} }`;
//const MyMutation = gql`mutation MyMutation { addTodo(text: "Test 123") { id } }`;

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
export default App//graphql(query)(App);

// Or, we can bind the execution of MyMutation to a prop
// export default graphql(MyMutation)(MyComponent);
