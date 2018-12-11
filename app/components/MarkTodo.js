import React, { Component } from 'react';
import { markTodo, getIncompleteTodos, getAllTodos } from './query';
import { Mutation } from 'react-apollo';
import { Button } from 'react-bootstrap';

class MarkTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    marktodo_completed(update_todos) {
        update_todos({ variables: this.props, refetchQueries: [{ query: getIncompleteTodos }, { query: getAllTodos }] })
    }

    render() {
        return (
            <Mutation mutation={markTodo}>
                {(update_todos, { data }) => (
                    <Button onClick={e => {
                        e.preventDefault();
                        this.marktodo_completed(update_todos);
                    }} >Done</Button>

                )}
            </Mutation>
        );
    }
}

export default MarkTodo;