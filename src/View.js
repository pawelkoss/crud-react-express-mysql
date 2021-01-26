export default function View(props) {
    return (
        <>
            <td>{props.item.id}</td>
            <td>{props.item.title}</td>
            <td>{props.item.author}</td>
            <td>{props.item.pages}</td>
            <td>{props.item.rating}</td>
         </>   
        

    );
}