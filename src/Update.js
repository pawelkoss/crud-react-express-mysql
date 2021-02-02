import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";
import { Form, Col, Button, Alert } from 'react-bootstrap';

export default function Update(props) {

    const { register, handleSubmit } = useForm();
    const [updateStatus, setUpdateStatus] = useState([false, ""]);

    const onSubmit = (data) => {
        data["id"] = props.item.id;
        updateBook(data);
        // console.log(data);  // book data json with id
    }

    const updateBook = (data) => {
        axios.put("http://localhost:3000/mybooks", data).then((res) => {
           
            //console.log(res.status);
            setUpdateStatus([true, res.status]);
            props.getBooks();
            return res.data;
            })
            .then(data => {
                console.log(data.message);
            })
            .catch(error => {
                console.log("db error");
                console.log(error.response);
            });
    }

    const elementError = () => {

        if (updateStatus[1] == 200) {
            return (
                <Alert variant="success">Saved succesfully</Alert>
            )
        } else {
            return (
                <Alert variant="danger">Something went wrong...</Alert>
            )
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="title" ref={register} defaultValue={props.item.title} />
            </Form.Group>
            <Form.Group controlId="formTitle">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter author" name="author" ref={register} defaultValue={props.item.author} />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="formPages">
                    <Form.Label>Pages</Form.Label>
                    <Form.Control type="number" name="pages" ref={register({ required: true, maxLength: 5 })} defaultValue={props.item.pages} />
                </Form.Group>
                <Form.Group as={Col} controlId="formRating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as="select" ref={register} name="rating" defaultValue={props.item.rating} >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} >
                    {updateStatus[0] && elementError()}
                </Form.Group>

                <Form.Group as={Col} ><Button variant="primary" type="submit">Save Changes</Button> <Button variant="secondary" onClick={props.onClickHide}>Close</Button>
                </Form.Group>
            </Form.Row>

        </Form>

    )

};