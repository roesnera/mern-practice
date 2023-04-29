import { useState } from "react";

function PunEdit({ pun, id, handleEdit}) {

    const [inpValue, setInpValue] = useState(pun);

    const handleChange = (e) => {
        setInpValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEdit({ pun: inpValue, id});
    }

    return <form onSubmit={handleSubmit} className="pun-edit">
            <input className="input" onChange={handleChange} value={inpValue}/>
        </form>
}

export default PunEdit;