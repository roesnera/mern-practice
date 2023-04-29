
// import PropTypes from "prop-types";
import PunShow from "./PunShow";
import "./PunList.css";

function PunList({ puns, handleEdit, handleDelete }) {

    const renderedPuns = puns.map(({ pun, id }) => <PunShow pun={pun} key={id} id={id} handleDelete={handleDelete} handleEdit={handleEdit} />)
    
    return <div className="puns-list puns-list-flex">
        {renderedPuns}
    </div>
}

// PunList.propTypes = { puns: PropTypes.array.isRequired }

export default PunList;