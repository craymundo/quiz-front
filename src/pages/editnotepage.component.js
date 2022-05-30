import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import {
  createQuestionnaire,
  getQuestionnaireById,
  updateQuestionnaireById,
} from "./../redux/actions/notesActionCreators";

import { BotModalQuestion } from "../components/modalQuestion.component";

import {TableQuestion} from "../components/tableQuestion.component";

const EditNotePage = ({
  match,
  history,
  dispatchCreateNoteAction,
  dispatchGetNoteByIdAction,
  dispatchUpdateNoteAction,
}) => {
  const [title, setTitle] = useState("Crear Cuestionario");
  const [questions, setQuestions] = useState([]);

  const [description, setDescription] = useState("");

  const [error, setError] = useState({
    description: false,
    questions: false,
  });

  useEffect(() => {
    const { noteId } = match.params;
    if (noteId) {
      setTitle("Editar Cuestionario")
      dispatchGetNoteByIdAction(noteId, ({ description, questions }) => {
        setDescription(description);
        setQuestions(questions);
      });
    }
  }, [dispatchGetNoteByIdAction, match.params]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (isFormInvalid()) updateErrorFlags();
    else {
      const { noteId } = match.params;
      const data = { description, questions };
      if (noteId) {
        dispatchUpdateNoteAction(
          noteId,
          data,
          () => {
            toast.success("Se actualizo el cuestionario!");
            history.replace("/notes");
          },
          (message) => toast.error(`Error: ${message}`)
        );
      } else {
        dispatchCreateNoteAction(
          data,
          () => {
            toast.success("Cuestionario creado correctamente!");
            history.replace("/notes");
          },
          (message) => toast.error(`Error: ${message}`)
        );
      }
    }
  };

  const isFormInvalid = () => !questions.length || !description.trim();

  const updateErrorFlags = () => {
    const errObj = {
      description: false,
      question: false,
    };
    if (!description.trim()) errObj.description = true;
    if (!questions.length) errObj.questions = true;
    setError(errObj);
  };

  const [openModal, setOpenModal] = useState(false);

  const showConfirmationModal = (event, noteId) => {
    event.preventDefault();
    setOpenModal(true);
  };

  const onClosed = () => {
    setOpenModal(false);
  };

  const onSendData = (description, answers) => {
    setOpenModal(false);
    console.log(description, answers);
    const data = questions;
    const question = {
      description: description,
      alternatives: answers,
    };
    data.push(question);
    setQuestions(data);
  };

  const handleDeleteQuestion = (index) => {

    let data = [...questions];
    data.splice(index, 1);
    setQuestions(data);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="row align-items-center mt-4">
        <div className="col-12">
          <form noValidate onSubmit={handleOnSubmit}>
            <div className="row mb-3">
              <label htmlFor="description" className="col-sm-2 col-form-label">
                Description
              </label>
              <div className="col-sm-10">
                <input
                  noValidate
                  id="description"
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`form-control ${
                    error.description ? "is-invalid" : ""
                  }`}
                />
                <p className="invalid-feedback">Required</p>
              </div>
            </div>

            <div className="row mb-3 d-flex justify-content-end">
              <div className="col-6">
                <button
                  onClick={showConfirmationModal}
                  className="btn btn-outline-secondary btn-block w-100"
                >
                  Agregar Preguntas | <i className="fas fa-plus"></i>
                </button>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-12">
                {questions.length > 0 ? (
                  <TableQuestion
                    data={questions}
                    handleDelete={(index) =>handleDeleteQuestion(index)}
                  />
                ) : (
                  <div className="text-center mt-5">
                    <h2>
                      <i className="far fa-file-circle-question fa-3x"></i>
                    </h2>
                    <h1 className="text-center">Debes registrar preguntas</h1>
                  </div>
                )}
              </div>
            </div>
              {  error.questions && (
            <div className="row mb-3">
                  <span className="text-danger">Debes agregar por lo menos una pregunta</span>
            </div>)}

            <div className="row mb-3 ">
              <div className="col-6 ">
                <button type="submit" className="btn btn-primary mr-2  w-100">
                  Guardar | <i className="fas fa-save"></i>
                </button>
              </div>
              <div className="col-6">
                <button
                  type="button"
                  onClick={() => history.replace("/notes")}
                  className="btn btn-secondary  w-100"
                >
                  Cancelar | <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {openModal && (
        <BotModalQuestion
          open={openModal}
          onClosed={onClosed}
          onSendData={(description, answers) =>
            onSendData(description, answers)
          }
          title={"Registrar Pregunta"}
          buttonTextOne={"Cancelar"}
          buttonTextTwo={"Agregar"}
        />
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateNoteAction: (data, onSuccess, onError) =>
    dispatch(createQuestionnaire(data, onSuccess, onError)),
  dispatchUpdateNoteAction: (noteId, data, onSuccess, onError) =>
    dispatch(updateQuestionnaireById(noteId, data, onSuccess, onError)),
  dispatchGetNoteByIdAction: (noteId, onSuccess) =>
    dispatch(getQuestionnaireById(noteId, onSuccess)),
});
export default connect(null, mapDispatchToProps)(EditNotePage);
