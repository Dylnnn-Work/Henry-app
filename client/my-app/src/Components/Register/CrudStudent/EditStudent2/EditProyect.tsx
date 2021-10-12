import React from 'react';
import { Formik } from 'formik';
import { useQuery, gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import firebase from '../../../../firebase';
import { ProyectInterface } from '../../../../types/Alumns';

type proyectProps = {
    onClose: any;
    proyectId: string;
    alumnId: string;
};

const OBTENER_DATOS = gql`
    query obtenerAlumno($id: ID) {
        alumno(_id: $id) {
            proyect {
                title
                description

                link
                _id
            }
            _id
        }
    }
`;

const EDIT_ALUMNO = gql`
    mutation modificarAlumno($id: ID, $alumno: AlumnoInput) {
        modificarAlumno(_id: $id, alumno: $alumno) {
            proyect {
                title
                description

                link
                _id
            }
            _id
        }
    }
`;

const EditProyect: React.FC<proyectProps> = (props) => {
    const id = props.alumnId;
    const proyectId = props.proyectId;

    const { data, loading } = useQuery(OBTENER_DATOS, {
        variables: {
            id
        }
    });

    const [modificarAlumno] = useMutation(EDIT_ALUMNO);

    const schemaValidation = Yup.object({
        description: Yup.string().required('Empty description input'),
        title: Yup.string().required('Empty title input'),
        link: Yup.string().required('Empty link input')
    });

    if (loading) return <p>cargando</p>;

    const { alumno } = data;

    let proyectFiltrado = alumno.proyect.find(
        (proyect: any) => proyect._id === proyectId
    );
    proyectFiltrado = {
        ...proyectFiltrado,
        proyect: alumno.proyect
    };

    console.log(proyectFiltrado);

    const updateInfoAlumn = async (valores: any) => {
        const { description, title, link, proyect, _id } = valores;

        try {
            const { data } = await modificarAlumno({
                variables: {
                    id,
                    alumno: {
                        proyect: proyect.map((proyect: ProyectInterface) => {
                            const temp = Object.assign({}, proyect);
                            if (temp._id === _id) {
                                temp.description = description;
                                temp.title = title;

                                temp.link = link;
                            }
                            return {
                                description: temp.description,
                                title: temp.title,

                                link: temp.link,
                                _id: temp._id
                            };
                        })
                    }
                }
            });
            toast.success('proyect updated');
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
                initialValues={proyectFiltrado}
                onSubmit={(valores) => {
                    updateInfoAlumn(valores);
                }}>
                {(props) => {
                    return (
                        <form onSubmit={props.handleSubmit}>
                            <div className="space-y-6">
                                <div className="mt-4">
                                    <label
                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                        htmlFor="title">
                                        Title*
                                    </label>
                                    <input
                                        id="title"
                                        placeholder={props.values.title}
                                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.title}
                                    />
                                    {props.errors.title &&
                                    props.touched.title ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.title}</p>
                                        </div>
                                    ) : null}
                                </div>

                                <div className="mt-4">
                                    <label
                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                        htmlFor="description">
                                        description*
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

                                {props.errors.image && props.touched.image ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.image}</p>
                                    </div>
                                ) : null}
                                <div className="mt-4">
                                    <label
                                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                        htmlFor="link">
                                        Link*
                                    </label>
                                    <input
                                        id="link"
                                        placeholder={props.values.link}
                                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values.link}
                                    />
                                    <span className="block text-red-700 sm:inline"></span>
                                </div>

                                {props.errors.link && props.touched.link ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.link}</p>
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

export default EditProyect;
