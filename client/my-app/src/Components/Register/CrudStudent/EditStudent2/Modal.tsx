import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';
import EditStudent from './EditStudent';
import EditAbility from './EditAbility';
import ExperiencePlus from './ExperiencePlus';
import EditExperience from './EditExperience';
import EditEducation from './EditEducation';
import AddEducation from './AddEducation';
import AddProyect from './AddProyect';
import EditProyect from './EditProyect';

type PropsModal = {
    title: string;
    onClose: any;
    show: boolean;
    experienceId: string;
    educationId: string;
    proyectId: string;
    formName: string;
    alumnId: string;
};

const Modal: React.FC<PropsModal> = (props) => {
    const closeOnEscapeKeyDown = (e: any) => {
        if ((e.charCode || e.keyCode) === 27) {
            props.onClose();
        }
    };

    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEscapeKeyDown);
        return function cleanup() {
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
        };
    }, []);

    return ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            unmountOnExit
            timeout={{ enter: 0, exit: 300 }}>
            <div
                className=" modal  rounded-lg shadow-lg"
                onClick={props.onClose}
                onKeyPress={() => console.log('')}
                role="button"
                tabIndex={0}>
                <div
                    className="modal-content bg-yellow_henry  border-b border-gray-100 px-5 py-4 mt-5 sm:w-6/12"
                    onClick={(e) => e.stopPropagation()}
                    onKeyPress={() => console.log('')}
                    role="button"
                    tabIndex={0}>
                    <div className="flex justify-between">
                        <div>
                            <i className="fas fa-exclamation-circle text-blue-500"></i>
                            <span className="ml-3 font-bold text-gray-700 text-lg capitalize">
                                Edit {props.formName.replace('_edit', '')}
                            </span>
                        </div>
                        <div>
                            <button onClick={props.onClose}>
                                <i className="fa fa-times-circle text-red-500 hover:text-red-600 transition duration-150"></i>
                            </button>
                        </div>
                    </div>

                    {props.formName === 'profile' ? (
                        <EditStudent
                            alumnId={props.alumnId}
                            onClose={props.onClose}
                        />
                    ) : props.formName === 'experience_edit' ? (
                        <EditExperience
                            alumnId={props.alumnId}
                            experienceId={props.experienceId}
                            onClose={props.onClose}
                        />
                    ) : props.formName === 'abilities' ? (
                        <EditAbility
                            alumnId={props.alumnId}
                            onClose={props.onClose}
                        />
                    ) : props.formName === 'experience_add' ? (
                        <ExperiencePlus
                            alumnId={props.alumnId}
                            experienceId={props.experienceId}
                            onClose={props.onClose}
                        />
                    ) : props.formName === 'education_edit' ? (
                        <EditEducation
                            alumnId={props.alumnId}
                            educationId={props.educationId}
                            onClose={props.onClose}
                        />
                    ) : props.formName === 'education_add' ? (
                        <AddEducation
                            alumnId={props.alumnId}
                            onClose={props.onClose}
                        />
                    ) : props.formName === 'proyect_add' ? (
                        <AddProyect
                            alumnId={props.alumnId}
                            onClose={props.onClose}
                        />
                    ) : props.formName === 'proyect_edit' ? (
                        <EditProyect
                            alumnId={props.alumnId}
                            proyectId={props.proyectId}
                            onClose={props.onClose}
                        />
                    ) : null}

                    <div className="px-5 py-4 flex justify-end"></div>
                </div>
            </div>
        </CSSTransition>,
        document.getElementById('root')!
    );
};

export default Modal;
