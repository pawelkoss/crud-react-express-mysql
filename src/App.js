import { useState, useEffect } from "react";
import { Container, Table, Row, Col, Form, Modal, Button  } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import axios from "axios";
import Add from "./Add";
import Update from "./Update";
import View from "./View";
import Delete from "./Delete";
import 'bootstrap/dist/css/bootstrap.min.css';

function ModalEdit(props) {
    // {...props} -> show={props.show} onHide={props.onHide} item={props.item}
    return (
    <Modal {...props} >
    <Modal.Header closeButton>
      <Modal.Title>Modal heading</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <p>tytuł: {props.item.title}</p>
        <p>autor: {props.item.author}</p>
        <p>stars: {props.item.rating}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.onHide}>
        Close
      </Button>
      <Button variant="primary" onClick={props.onHide}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal> 
    );
  }

function App() {
const [books, setBooks] = useState([]);
const [loading, setLoading] = useState([false]);
const [showEdit, setShowEdit] = useState(false);
const [modalShow, setModalShow] = useState(false);  // ModalEdit
const [modalData, setModalData] = useState({});

const handleCloseEdit = () => setShowEdit(false);
const handleShowEdit = () => setShowEdit(true);
const handleShowEdit2 = (item) => {
    setModalData(item);
    setShowEdit(true);
}


const modalShowData = (item) => {
    setModalData(item);
    setModalShow(true);
}

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
            <td><Icon.PencilSquare color="royalblue" onClick={() => handleShowEdit2(item)} /> <ModalEdit item={modalData} show={modalShow} onHide={() => setModalShow(false)} />  <Delete id={item.id} books={books} setBooks={setBooks} getBooks={getBooks} /> <button onClick={() => delBook(item.id)} >X</button></td>
            </tr>);
        })
        //  onClick={() => modalShowData(item)} onClick={handleShowEdit} onClick={() => handleShowEdit2()}
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
    
  <Modal show={showEdit} onHide={handleCloseEdit} >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!....... {modalData.title}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>  
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
