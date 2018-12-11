import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { addTodo, getIncompleteTodos, getAllTodos } from './query';
import { FormGroup, FormControl, Button, InputGroup, Form } from 'react-bootstrap';
class AddTodo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todo_text: "",
            todo_user: ""
        }
    }

    addtodo(insert_todos) {
        var todo_user = localStorage.getItem('sub');
        this.setState({ todo_user: todo_user }, function () {
            insert_todos({ variables: this.state, refetchQueries: [{ query: getIncompleteTodos }, { query: getAllTodos }] });
        });
    }

    render() {
        return (
            <Mutation mutation={addTodo}>
                {(insert_todos, { data }) => (
                    <Form
                        onSubmit={e => {
                            e.preventDefault();
                            this.addtodo(insert_todos);
                        }}
                    >
                        <FormGroup controlId="Createtodo" style={{ 'marginBottom': '0px' }}>
                            <InputGroup>
                                <FormControl
                                    type="text"
                                    value={this.state.todo_text}
                                    placeholder="Create a todo task."
                                    onChange={e => this.setState({ todo_text: e.target.value })}
                                />
                                <InputGroup.Button>
                                    <Button type="submit">Add</Button>
                                </InputGroup.Button>
                            </InputGroup>
                        </FormGroup>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export default AddTodo;