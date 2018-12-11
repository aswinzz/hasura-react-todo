/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { Navbar, Button } from 'react-bootstrap';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import GetTodos from "components/GetTodos";
import { onError } from "apollo-link-error";
export var client;

/* eslint-disable react/prefer-stateless-function */
export default class HomePage extends React.PureComponent {
  constructor(props) {
    super(props);
    const ACCESS_TOKEN = localStorage.getItem('access_token');
    const errorLink = onError(({ graphQLErrors }) => {
      if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
    })
    
    client = new ApolloClient({
      uri: "https://my-react-hasura-app.herokuapp.com/v1alpha1/graphql",
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
      },
      onError: ({ networkError, graphQLErrors }) => {
        console.log('graphQLErrors', graphQLErrors)
        console.log('networkError', networkError)
      }
    });
  }


  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Auth0 - React</a>
            </Navbar.Brand>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                  <Button
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </Button>
                )
            }
          </Navbar.Header>
        </Navbar>
        <div className="container">
          {
            isAuthenticated() && (
              <ApolloProvider client={client}>
                <GetTodos />
              </ApolloProvider>
            )
          }
        </div>
      </div>
    );
  }
}
