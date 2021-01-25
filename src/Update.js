import { useForm } from "react-hook-form";
import axios from "axios";

export default function Update(props) {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        data["id"] = props.id;
        updateBook(data);
        console.log(data);  // book data json with id
    }

    const updateBook = (data) => {
        axios.put("http://localhost:3000/mybooks", data).then((res) => {
            props.setBooks(props.books.map((item) => {
                return item.id === props.id? {
                    id: item.id,
                    title: item.title,
                    author: item.author,
                    pages: item.pages,
                    rating: item.rating,
                } : item;
            }));
        });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Title: <input type="text" name="title" ref={register} value={props.item.title} /></label>
            <label>Author: <input type="text" name="author" ref={register} value={props.item.author} /></label>
            <label>Pages: <input type="number" name="pages" ref={register({ required: true, maxLength: 5 })} value={props.item.pages} /></label>
            <label>Rating: <input type="number" name="rating" ref={register({ min:0, max:5 })} value={props.item.rating} /></label>
            <input type="submit"  />
        </form>
    )

};