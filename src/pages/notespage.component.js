import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import NotesCollection from '../components/notescollection.component';
import { fetchAllQuestionnaire } from './../redux/actions/notesActionCreators';

const NotesPage = ({ loading, notes, dispatchFetchAllNotesAction }) => {

    useEffect(() => dispatchFetchAllNotesAction(), [dispatchFetchAllNotesAction]);

    return (
        <React.Fragment>
            <div className='container'>
            <div className="row my-5">
                <div className="col-10">
                    <h2>Listado de Cuestionarios</h2>
                </div>
                <div className="col-2">
                    <Link to="/edit-note" className="btn btn-primary">
                        Crear cuestionario | <i className="fas fa-plus"></i>
                    </Link>
                </div>
            </div>

            <div className="row mt-5">
                <div className="col-12">
                    {
                        notes.length > 0 ? <NotesCollection notes={notes} /> :
                            <div className="text-center mt-5">
                                <h2><i className="far fa-file-circle-question fa-3x"></i></h2>
                                <h1 className="text-center">No existe ningún cuestionario</h1>
                            </div>
                    }
                </div>
            </div>
            </div>
       </React.Fragment>
    );
};

const mapStateToProps = state => ({
    loading: state.loading,
    notes: state.notes
});
const mapDispatchToProps = dispatch => ({
    dispatchFetchAllNotesAction: () => dispatch(fetchAllQuestionnaire())
});
export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);
