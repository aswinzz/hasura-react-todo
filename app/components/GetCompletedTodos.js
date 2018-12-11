import React from 'react';
import { Query } from 'react-apollo';
import { getCompleteTodos } from './query';
import MarkTodo from './MarkTodo';
import DeleteTodo from './DeleteTodo';
import AddTodo from './AddTodo';
import { ListGroup, ListGroupItem, ButtonGroup, Grid, Row, Col } from 'react-bootstrap';

const GetCompletedTodos = () => (
    <Query query={getCompleteTodos}>
        {({ loading, error, data }) => {
            if (loading) return (<h2></h2>);
            // if (error) return (`Error! fetching todos.`);
            if (data.todos.length === 0) return (
                <div>
                    <h3>No completed todos</h3>
                    <AddTodo />
                </div>
            );
            let count = 0;
            return (
                <div>
                    <Grid>
                        <Row>
                            <Col md={8} mdPush={2}>
                                <ListGroup>
                                    {data.todos.map((todo) => (

                                        <ListGroupItem>
                                            <ButtonGroup className="pull-right">
                                                <DeleteTodo todo_id={todo.todo_id} />
                                            </ButtonGroup>
                                            <h4>{count = count + 1}. {todo.todo_text}</h4>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }}
    </Query>
);

export default GetCompletedTodos;