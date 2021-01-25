import { useForm } from "react-hook-form";
import axios from "axios";

export default function Add(props) {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        addBook(data);
    };

    const addBook = (data) => {
        axios.post("http://localhost:3000/newbook", data).then(() => {
            props.setBooks([...props.books, {data}]);
        });
    };

    return (
        <div>
        <h3>Add new book</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title: <input type="text" name="title" ref={register}/></label>
            <label>Author: <input type="text" name="author" ref={register} /></label>
            <label>Pages: <input type="number" name="pages" ref={register({ required: true, maxLength: 5 })} /></label>
            <label>Rating: <input type="number" name="rating" ref={register({ min:0, max:5 })} /></label>
            <input type="submit"  />
        </form>
        </div>
    )
}