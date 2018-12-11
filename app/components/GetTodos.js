import React from 'react';
import { Query } from 'react-apollo';
import { getIncompleteTodos } from './query';
import MarkTodo from './MarkTodo';
import DeleteTodo from './DeleteTodo';
import AddTodo from './AddTodo';
import { ListGroup, ListGroupItem, ButtonGroup, Grid, Row, Col } from 'react-bootstrap';

const GetTodos = () => (
    <Query query={getIncompleteTodos}>
        {({ loading, error, data }) => {
            if (loading) return (<h2>Loading...</h2>);
            if (error) return (`Error! fetching todos.`);
            if (data.todos.length === 0) return (
                <div>
                    <h3>No Todos Created Yet</h3>
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
                                                <MarkTodo todo_id={todo.todo_id} />
                                                <DeleteTodo todo_id={todo.todo_id} />
                                            </ButtonGroup>
                                            <h4>{count = count + 1}. {todo.todo_text}</h4>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                                <ListGroup>
                                    <ListGroupItem>
                                        <AddTodo />
                                    </ListGroupItem>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            );
        }}
    </Query>
);

export default GetTodos;