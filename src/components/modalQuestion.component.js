import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export const BotModalQuestion = (props) => {
  const [description, setDescription] = useState("");
  const [isModalOpen, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState({
    description: false,
    alternatives: false,
    message: false,
  });

  useEffect(() => {
    if (props.open) {
      setModal(true);
    }
  }, []);

  const [formFields, setFormFields] = useState([
    { text: "", isCorrect: false },
  ]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] =  event.target.value;
    setFormFields(data);
  };

  const handleFormCheckChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] =  event.target.checked;
    setFormFields(data);
  };

  const addFields = () => {
    let object = {
      text: "",
      isCorrect: false,
    };

    const idx = formFields.length - 1;
    if (formFields[idx]["text"].trim().length === 0) {
      setMessage("Ingresar el texto de la alternativa");
      setError({
        message: true,
      });
      return;
    }

    if (formFields.length === 10) {
      setMessage("Máximo se pueden agregar 10 opciones");
      setError({
        message: true,
      });
      return;
    }

    setError({
      message: false,
    });
    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  const handleSubmit = () => {
    console.log("description.trim().length:::", formFields);
    if (description.trim().length < 1) {
      setError({
        description: true,
      });
      return;
    }

    if (formFields.length < 2) {
      setMessage("Mínimo debe ingresar 2 alternativas");
      setError({
        message: true,
      });
      return;
    }
    let cont = 0;
    formFields.forEach((element) => {
      if (element.isCorrect) {
        cont++;
      }
    });

    if (cont < 1) {
      setMessage("Debe marcar una alternativa como correcta");
      setError({
        message: true,
      });
      return;
    }

    if (cont > 1) {
      setMessage("Solo puede existir una alternativa correcta");
      setError({
        message: true,
      });
      return;
    }

    props.onSendData(description, formFields);
  };

  return (
    <>
      <Modal show={isModalOpen} size="lg">
        <Modal.Header closeButton onClick={props.onClosed}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row mb-3">
              <label htmlFor="pregunta" className="col-sm-2 col-form-label">
                Pregunta:
              </label>
              <div className="col-sm-10">
                <input
                  noValidate
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`form-control ${
                    error.description ? "is-invalid" : ""
                  }`}
                  placeholder="Ingresa la pregunta"
                />
                <p className="invalid-feedback">Required</p>
              </div>
            </div>
            {formFields.map((form, index) => {
              return (
                <div className="row" key={index}>
                  <div className="col-md-8">
                    <div className="row mb-3">
                      <label htmlFor="text" className="col-sm-3 col-form-label">
                        Alternativa:
                      </label>
                      <div className="col-sm-9">
                        <input
                          type="text"
                          name="text"
                          className="form-control"
                          id="inputEmail3"
                          onChange={(event) => handleFormChange(event, index)}
                          value={form.text}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="isCorrect"
                        onChange={(event) => handleFormCheckChange(event, index)}
                        defaultChecked={form.isCorrect}
                      />
                      <label className="form-check-label" htmlFor="gridCheck">
                        Respuesta Correcta
                      </label>
                    </div>
                  </div>
                  <div className="col-md-1">
                    <button onClick={() => removeFields(index)}>
                      <i className="fas fa-trash-alt text-danger"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </form>

          <button
            onClick={addFields}
            className="btn btn-outline-secondary btn-block"
          >
            Otra Alternativa..
          </button>

          {error.message && (
            <div className="row mb-3">
              <span className="text-danger">{message}</span>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onClosed}>
            {props.buttonTextOne}
          </Button>
          <Button variant="dark" onClick={() => handleSubmit()}>
            {props.buttonTextTwo}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
