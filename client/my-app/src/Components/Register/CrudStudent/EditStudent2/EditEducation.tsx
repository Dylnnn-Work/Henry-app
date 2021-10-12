import React from 'react';
import { Formik } from 'formik';
import { useQuery, gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { Alumn, ProfessionalBackground } from '../../../../types/Alumns';
import { toast } from 'react-toastify';

type educationProps = {
    educationId: string;
    onClose: any;
    alumnId: string;
};

const OBTENER_DATOS = gql`
    query obtenerAlumno($id: ID) {
        alumno(_id: $id) {
            education {
                description
                timeLapse
                _id
            }
            _id
        }
    }
`;

const EDIT_ALUMNO = gql`
    mutation modificarAlumno($id: ID, $alumno: AlumnoInput) {
        modificarAlumno(_id: $id, alumno: $alumno) {
            education {
                description
                timeLapse
                _id
            }
            _id
        }
    }
`;

const EditEducation: React.FC<educationProps> = (props) => {
    const id = props.alumnId;
    const educationId = props.educationId;

    const { data, loading } = useQuery(OBTENER_DATOS, {
        variables: {
            id
        }
    });

    const [modificarAlumno] = useMutation(EDIT_ALUMNO);

    const schemaValidation = Yup.object({
        description: Yup.string().required('Empty description input'),
        timeLapse: Yup.string().required('Empty timelapse input')
    });

    if (loading) return <p>cargando</p>;

    const { alumno } = data;

    let educacionFiltrada = alumno.education.find(
        (education: any) => education._id === educationId
    );

    educacionFiltrada = {
        ...educacionFiltrada,
        education: alumno.education
    };

    const updateInfoAlumn = async (valores: Alumn) => {
        const { description, timeLapse, education, _id } = valores;

        try {
            const { data } = await modificarAlumno({
                variables: {
                    id,
                    alumno: {
                        education: education.map(
                            (edu: ProfessionalBackground) => {
                                const temp = Object.assign({}, edu);
                                if (temp._id === _id) {
                                    temp.description = description;
                                    temp.timeLapse = timeLapse;
                                }
                                return {
                                    description: temp.description,
                                    timeLapse: temp.timeLapse,
                                    _id: temp._id
                                };
                            }
                        )
                    }
                }
            });
            toast.success('alumn updated');
            props.onClose();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/**FORMULARIO */}
            <Formik
                validationSchema={schemaValidation}
                enableReinitialize
                initialValues={educacionFiltrada}
                onSubmit={(valores) => {
                    updateInfoAlumn(valores);
                }}>
                {(props) => {
                    return (
                        <form onSubmit={props.handleSubmit}>
                            <div className="space-y-6">
                                {/*FORMULARIO */}
                                <div className="mt-4">
                                    <label
                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                        htmlFor="description">
                                        Description*
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder={props.values.description}
                                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.description}
                                    />
                                    {props.errors.description &&
                                    props.touched.description ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.description}</p>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mt-4">
                                    <label
                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                        htmlFor="timeLapse">
                                        Timelapse*
                                    </label>
                                    <input
                                        id="timeLapse"
                                        placeholder={props.values.timeLapse}
                                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.timeLapse}
                                    />
                                    <span className="block text-red-700 sm:inline"></span>
                                </div>

                                {props.errors.timeLapse &&
                                props.touched.timeLapse ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.timeLapse}</p>
                                    </div>
                                ) : null}

                                <div className="mt-8">
                                    <button className="bg-grayHenry text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </>
    );
};

export default EditEducation;
