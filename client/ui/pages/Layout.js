import React, { PropTypes } from 'react';
import { graphql, gql } from 'react-apollo';
const test = gql;

import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class Layout extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <MuiThemeProvider>
                {this.props.children}
            </MuiThemeProvider>
        );
    }
}
Layout.propTypes = { children: PropTypes.object };






// Initialize GraphQL queries or mutations with the `gql` tag
const query = gql`query {say {
    foo
    bar
  }}`;
//const MyMutation = gql`mutation MyMutation { addTodo(text: "Test 123") { id } }`;

// We then can use `graphql` to pass the query results returned by MyQuery
// to MyComponent as a prop (and update them as the results change)
//export default graphql(query)(Layout);

// Or, we can bind the execution of MyMutation to a prop
// export default graphql(MyMutation)(MyComponent);

export default Layout