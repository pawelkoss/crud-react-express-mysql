export default function View(props) {
    return (
        <>
            <h5>Title: {props.item.title}</h5>
            <h5>Author: {props.item.author}</h5>
            <h5>Pages: {props.item.pages}</h5>
            <h5>Rating: {props.item.rating}</h5>
        </>

    );
}