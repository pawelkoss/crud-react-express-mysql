import { useState, useEffect } from "react";
import { Container, Table, Row, Col, Form  } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import Add from "./Add";
import Update from "./Update";
import View from "./View";
import Delete from "./Delete";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState([false]);

const getBooks = () => {
    setLoading(true);
    axios.get("http://localhost:3000/myBooks").then((res) => {
        setBooks(res.data);
        setLoading(false);
    });
    console.log("getBooks call");
};

const delBook = (id) => {
    axios.delete(`http://localhost:3000/mybooks/${id}`).then((res) => {
        setBooks(books.filter((item) => {
            return item.id !== id;      
        }));
    }); 
    console.log(`delete ${id}`);
    getBooks();
};

useEffect(() => {
    getBooks();
}, []);

const elementView = () => {
    return books.map((item) => {
        console.log(item.id);
        return (
            <tr key={item.id}>
            <View item={item} /> 
            <td><Icon.PencilSquare color="royalblue" />  <Delete id={item.id} books={books} setBooks={setBooks} getBooks={getBooks} /> <button onClick={() => delBook(item.id)} >X</button></td>
            </tr>);
        })
}
const elementLoad = () => {
    return(<tr><td>Loading ...</td></tr>)
}

return(
<Container fluid>
    <Row>
        <Col md="auto">
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Pages</th>
                    <th>Rating</th>
                    <th>Edit / Del</th>
                    </tr>
                </thead>
                <tbody>
                {  elementView() }
                </tbody>
            </Table>
        </Col>
        <Col lg="6"><Add books={books} setBooks={setBooks} getBooks={getBooks} /></Col>
    </Row>
    
    
</Container>
);


/*
return (
<div className="books">
    <Add books={books} setBooks={setBooks} />
    {books.map((item) => {
        return (
            <div className="book">
                <View item={item} />
                <Update id={item.id} books={books} setBooks={setBooks} item={item} />
            </div>

        );
    })}

    
</div>

);
*/
}

export default App;
