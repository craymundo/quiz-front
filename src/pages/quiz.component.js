import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import {
  createQuiz,
  getQuestionnaireById,
} from "./../redux/actions/notesActionCreators";

import Question from "../components/question/question";

const QuizPage = ({
  user,
  match,
  history,
  dispatchCreateQuizAction,
  dispatchGetNoteByIdAction,
}) => {
  const [questions, setQuestions] = useState([]);
  const [description, setDescription] = useState("");

  const [dataQuestions, setDataQuestions] = useState([]);

  useEffect(() => {
    const { noteId } = match.params;
    if (noteId) {
      dispatchGetNoteByIdAction(noteId, (data) => {
        setDescription(data.description);
        setQuestions(data.questions);
      });
    }
  }, [dispatchGetNoteByIdAction, match.params]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log('USER;;;;',user)
    const { noteId } = match.params;
    const data = {
      idUser: user.userId,
      idQuestionnaire: noteId,
      description: description,
      questions: dataQuestions,
    };

    console.log('data::::::', data)
    if (noteId) {
      dispatchCreateQuizAction(
        data,
        () => {
          toast.success("Se completo el cuestionario!");
          history.replace("/notes");
        },
        (message) => toast.error(`Error: ${message}`)
      );
    }
  };

  const onSendData = (id, text, isGood, idQuestion, desc) => {
    const data = dataQuestions;

    if (data.length > 0) {
      const dataCoppy = [...data];
      const idx = dataCoppy.findIndex((e) => e.idQuestion === idQuestion);
      if(idx > -1){
        dataCoppy[idx] = {
          idQuestion: idQuestion,
          description: desc,
          idAlternative: id,
          descriptionAlternative: text,
          isGood: isGood,
        };

      }else{
        const q = {
          idQuestion: idQuestion,
          description: desc,
          idAlternative: id,
          descriptionAlternative: text,
          isGood: isGood,
        };
        dataCoppy.push(q);
      }
      setDataQuestions(dataCoppy)
    } else {
      const q = {
        idQuestion: idQuestion,
        description: desc,
        idAlternative: id,
        descriptionAlternative: text,
        isGood: isGood,
      };
      data.push(q);
      setDataQuestions(data)
    }


  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col">
          <h2>{description}</h2>
        </div>
      </div>
      <div className="row align-items-center mt-4">
        <div className="col-12">
          <form noValidate onSubmit={handleOnSubmit}>
            {questions.length > 0 &&
              questions.map((a, idx) => (
                <Question
                  key={idx}
                  index={idx}
                  id={a._id}
                  description={a.description}
                  alternatives={a.alternatives}
                  onSendData={(id, text, isGood, idQuestion, desc) =>
                    onSendData(id, text, isGood, idQuestion, desc)
                  }
                ></Question>
              ))}

            <div className="row mb-6" style={{ marginTop: "20px" }}>
              <div className="col-2 ">
                <button type="submit" className="btn btn-primary mr-2  w-100">
                  Guardar | <i className="fas fa-save"></i>
                </button>
              </div>
              <div className="col-2">
                <button
                  type="button"
                  onClick={() => history.replace("/notes")}
                  className="btn btn-secondary  w-100"
                >
                  Regresar | <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ user: state.user });
const mapDispatchToProps = (dispatch) => ({
  dispatchCreateQuizAction: (data, onSuccess, onError) =>
    dispatch(createQuiz(data, onSuccess, onError)),
  dispatchGetNoteByIdAction: (noteId, onSuccess) =>
    dispatch(getQuestionnaireById(noteId, onSuccess)),
});
export default connect(mapStateToProps, mapDispatchToProps)(QuizPage);
