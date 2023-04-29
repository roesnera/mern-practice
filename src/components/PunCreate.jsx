import { useState } from "react";
import PropTypes from "prop-types";


function PunCreate({ onCreate }) {
    const [inputValue, updateValue] = useState("");

    const handleChange = (event) => {
        updateValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate(inputValue);
        updateValue("");
    }


    return <div className="pun-create">
        <h3>Add a pun</h3>
        <form onSubmit={handleSubmit}>
            <label>Text of Pun</label>
            <input value={inputValue} onChange={handleChange}/>
        </form>
    </div>
}

PunCreate.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default PunCreate;