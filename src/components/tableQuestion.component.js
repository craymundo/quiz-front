import React from "react";
import {  Button } from "react-bootstrap";

export const TableQuestion = ({ data, ...props }) => {
  return (
    <React.Fragment>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Pregunta</th>
            <th scope="col">Alternativas</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.description}</td>
              <td>
                <ol className="list-group list-group-numbered">
                  {item.alternatives.map((a, idx) => (
                    <li key={idx} className="list-group-item">
                      <b>{a.text} </b>
                      {a.isCorrect ? (
                        <i className="fa-solid fa-check text-success"></i>
                      ) : (
                        <i className="fa-solid fa-xmark text-danger"></i>
                      )}
                    </li>
                  ))}
                </ol>
              </td>
              <td>
                <Button onClick={() => props.handleDelete(index)}>
                  <i className="fas fa-trash-alt fa-2x text-write"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};
