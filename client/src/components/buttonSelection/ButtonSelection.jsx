/* eslint-disable react/prop-types */
import "./styles.css"

function ButtonSelection({ handleSubmit, handleClear }) {
  return (
    <div className="button-container">
      <button className="submit" onClick={handleSubmit}>SUBMIT</button>
      <button className="clear" onClick={handleClear}>CLEAR</button>
    </div>
  )
}

export default ButtonSelection;