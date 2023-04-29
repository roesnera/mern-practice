import { useState } from "react";
import PunEdit from "./PunEdit";

function PunShow({ pun, id, handleEdit, handleDelete }) {

    const [showEdit, setShowEdit] = useState(false);

    const handleClick = () => {
        handleDelete(id);
    }

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    }

    let content = <h3>{pun}</h3>;

    const passbackEdit = (pun) => {
        setShowEdit(!showEdit);
        handleEdit(pun);
    }

    if(showEdit) {
        content = <PunEdit handleEdit={passbackEdit} id={id} pun={pun}/>
    }

    return <div className="pun-show">
        <img src={`https://picsum.photos/seed/${id}/300/200`} alt="puns" />
        {content}
        <div className="actions">
            <button className="edit" onClick={handleEditClick}>Edit</button>
            <button className="delete" onClick={handleClick}>Delete</button>
        </div>
        </div>
}

export default PunShow;