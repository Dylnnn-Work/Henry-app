import React from 'react';
import { Formik } from 'formik';
import { useQuery, gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import firebase from '../../../../firebase';

type experienceProps = {
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
            proyect {
                title
                description
                image
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
            education {
                description
                timeLapse
                _id
            }
            proyect {
                title
                description
                image
                link
                _id
            }
            _id
        }
    }
`;

const AddProyect: React.FC<experienceProps> = (props) => {
    const id = props.alumnId;
    const storage = firebase.storage();
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
    console.log(data);
    const initialValues = {
        description: '',
        title: '',
        link: '',
        image: ''
    };
    const proyectFiltrado = {
        ...initialValues,
        proyect: alumno.proyect
    };

    const changeImage = async (e: any, id: string) => {
        const file = e.target.files[0];
        const Ref = storage.ref().child(`/Fotos`);
        await Ref.put(file);
        const url = await Ref.getDownloadURL();
        console.log(url);
        return url;
    };

    const updateInfoAlumn = async (valores: any) => {
        const { description, title, link, proyect } = valores;
        // const file = e.target.files[0];
        // const Ref = storage.ref().child(`/Fotos`);
        // await Ref.put(file);
        // const url = await Ref.getDownloadURL();
        // console.log(url);
        try {
            const temp = {
                description: description,
                title: title,
                link: link,
                image:
                    'https://images.alphacoders.com/665/thumb-1920-665093.jpg'
            };
            const AddProyect = [...proyect, temp];
            const { data } = await modificarAlumno({
                variables: {
                    id,
                    alumno: {
                        proyect: AddProyect.map((proyect: any) => {
                            return {
                                description: proyect.description,
                                title: proyect.title,
                                image: proyect.image,
                                link: proyect.link,
                                _id: proyect._id
                            };
                        })
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
                initialValues={proyectFiltrado}
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
                                        placeholder={props.values.title}
                                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
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
                                        Add
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

export default AddProyect;
