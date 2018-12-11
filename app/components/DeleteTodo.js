import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { deleteTodo, getIncompleteTodos, getAllTodos } from './query';
import { Button } from 'react-bootstrap';

class DeleteTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    deletetodo(delete_todos) {
        delete_todos({ variables: this.props, refetchQueries: [{ query: getIncompleteTodos }, { query: getAllTodos }] });
    }

    render() {
        return (
            <Mutation mutation={deleteTodo}>
                {(delete_todos, { data }) => (
                    <Button onClick={e => {
                        e.preventDefault();
                        this.deletetodo(delete_todos);
                    }}  >Delete</Button>
                )}
            </Mutation>
        );
    }
}

export default DeleteTodo;