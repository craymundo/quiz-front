import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { BotModal } from "../components/modal.component";
import { deleteQuestionnaireById } from "./../redux/actions/notesActionCreators";

const NotesCollection = ({ notes, dispatchDeleteAction }) => {
  const [selectedNote, setSelectedNote] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const showConfirmationModal = (event, noteId) => {
    event.preventDefault();
    setSelectedNote(noteId);
    setOpenModal(true);
  };

  const onClosed = () => {
    setOpenModal(false);
  };

  const onClik = () => {
    dispatchDeleteAction(
      selectedNote,
      () => {
        setOpenModal(false);
        toast.success("Se elimino el cuestionario correctamente!");
      },
      (message) => {
        setOpenModal(false);
        toast.error(`Error: ${message}`);
      }
    );
  };

  return (
    <React.Fragment>
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Description</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {notes.map((item) => (
            <tr key={item._id}>
              <td>
                <Link to={`/edit-note/${item._id}`}>{item._id}</Link>
              </td>
              <td>{item.description}</td>
              <td>
                <i
                  className="fas fa-trash-alt fa-2x text-danger"
                  onClick={(e) => showConfirmationModal(e, item._id)}
                ></i>
                <Link to={`/edit-note/${item._id}`}>
                  <i className="fas fa-solid  fa-2x fa-pencil text-warning"></i>
                </Link>

                <Link to={`/quiz/${item._id}`}>
                  <i className="fas fa-solid fa-play fa-2x text-success"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {openModal && (
        <BotModal
          open={openModal}
          onClosed={onClosed}
          onClik={onClik}
          title={"Eliminar cuestionario"}
          body={"Desea eliminar el cuestionario seleccionado?"}
          buttonTextOne={"Cancelar"}
          buttonTextTwo={"Eliminar"}
        />
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchDeleteAction: (noteId, onSuccess, onError) =>
    dispatch(deleteQuestionnaireById(noteId, onSuccess, onError)),
});
export default connect(null, mapDispatchToProps)(NotesCollection);
