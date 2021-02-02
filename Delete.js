import axios from "axios";
import * as Icon from 'react-bootstrap-icons';

export default function Delete(props) {
    const deleteBook = () => {
        axios.delete(`http://localhost:3000/mybooks/${props.id}`).then((res) => {
            props.setBooks(props.books.filter((item) => {
                return item.id !== props.id;
            }));
            
        });
        props.getBooks();
    };

    return (
        <Icon.Trash color="royalblue" onClick={deleteBook} />    
    );
}