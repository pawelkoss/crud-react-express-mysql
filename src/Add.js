import { useForm } from "react-hook-form";
import axios from "axios";
import { Form, Col } from 'react-bootstrap';

export default function Add(props) {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        addBook(data);
    };

    const addBook = (data) => {
        axios.post("http://localhost:3000/newbook", data).then(() => {
            props.setBooks([...props.books, {data}]);
            props.getBooks();
        });
    };

    return (
        <div>
        <h3>Add new book</h3>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" name="title" ref={register} />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" placeholder="Enter author" name="author" ref={register} />
            </Form.Group> 
            <Form.Row>
            <Form.Group as={Col} controlId="formPages">
                <Form.Label>Pages</Form.Label>
                <Form.Control type="number" name="pages" ref={register({ required: true, maxLength: 5 })} />
            </Form.Group>
            <Form.Group as={Col} controlId="formRating">
                <Form.Label>Rating</Form.Label>
                <Form.Control as="select" ref={register} name="rating">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Form.Control>
            </Form.Group>
            </Form.Row>   
               
                <input type="submit"  />
        </Form>
        </div>
    )
}