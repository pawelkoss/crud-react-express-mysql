import { useState, useEffect } from "react";
import axios from "axios";
import Add from "./Add";
import Update from "./Update";
import View from "./View";
import './App.css';


function App() {
const [books, setBooks] = useState([]);

const getBooks = () => {
    axios.get("http://localhost:3000/myBooks").then((res) => {
        setBooks(res.data);
    });
};

useEffect(() => {
    getBooks();


}, [books]);

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

}

export default App;
