import React from "react";

import "./question.css";

export const Question = (props) => {
  
  const handleChange = (e, text, isCorrect) => {
    props.onSendData(e.target.value,text, isCorrect, props.id, props.description);
  }
  return (
    <>
  <React.Fragment>
    <div className="container-question mt-sm-5 my-1">
      <div className="question ml-sm-5 pl-sm-5 pt-2">
        <div className="py-2 h5">
          <b>
            {props.index + 1}.{props.description}?
          </b>
        </div>
        <div className="ml-md-3 ml-sm-3 pl-md-5 pt-sm-0 pt-3" id="options">
          {props.alternatives.map((a, idx) => (
            <label key={idx} className="options">
              {a.text}
              <input type="radio" name={"radio" + props.id} value={a._id} onChange={
                (e) => handleChange(e,a.text, a.isCorrect )} />
              <span className="checkmark"></span>
            </label>
          ))}
        </div>
      </div>
    </div>
  </React.Fragment>
  </>)
}

export default Question;
