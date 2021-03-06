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
import { Navbar, Button,NavItem,Nav } from 'react-bootstrap';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import GetTodos from "components/GetTodos";
import GetCompletedTodos from "components/GetCompletedTodos";
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
        <Navbar inverse pullRight fluid>
          <Navbar.Header pullRight>
            <Navbar.Brand>
              <a href="#">Hasura Todo</a>
            </Navbar.Brand>
            </Navbar.Header>
            <Navbar.Collapse>
            <Nav pullRight>
            <NavItem eventKey={1}>
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
            </NavItem>
            <NavItem eventKey={2}>
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
            </NavItem>
            </Nav>
          </Navbar.Collapse>  
          
        </Navbar>
        <div className="container">
          {
            !isAuthenticated() && (
              <div>
              <h2 style={{textAlign:'center'}}>Please login to continue <Button
                    bsStyle="primary"
                    className="btn-margin center"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button></h2>
              
              </div>
            )
          }
          {
            isAuthenticated() && (
              <ApolloProvider client={client}>
              <h2 style={{textAlign:'center'}}>Incomplete Todos</h2>
                <GetTodos />
              </ApolloProvider>
            )
          }
        </div>
        <div className="container">
        
          {
            isAuthenticated() && (
              <ApolloProvider client={client}>
              <h2 style={{textAlign:'center'}}>Completed Todos</h2>
                <GetCompletedTodos />
              </ApolloProvider>
            )
          }
        </div>
      </div>
    );
  }
}
