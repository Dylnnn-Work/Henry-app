import React from 'react';
import PersolanInfo from './PersonalInfo';
import { Formik } from 'formik';
import { useQuery, gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { Alumn } from '../../../../types/Alumns';
import { toast } from 'react-toastify';

type editStudenProps = {
    alumnId: string;
    onClose: any;
};

const OBTENER_DATOS = gql`
    query obtenerAlumno($id: ID) {
        alumno(_id: $id) {
            name
            surname
            email
            Birthdate
            description
            country
            phone
            gender
            location
            _id
        }
    }
`;

const EDIT_ALUMNO = gql`
    mutation modificarAlumno($id: ID, $alumno: AlumnoInput) {
        modificarAlumno(_id: $id, alumno: $alumno) {
            name
            surname
            email
            Birthdate
            description
            country
            phone
            gender
            location
            _id
        }
    }
`;

const EditStudent: React.FC<editStudenProps> = (props) => {
    const id = props.alumnId;

    const { data, loading } = useQuery(OBTENER_DATOS, {
        variables: {
            id
        }
    });

    const [modificarAlumno] = useMutation(EDIT_ALUMNO);

    const schemaValidation = Yup.object({
        name: Yup.string().required('Empty name input'),
        surname: Yup.string().required('Empty surname input'),
        email: Yup.string().required('Empty email input'),
        Birthdate: Yup.string().required('select your birthdate')
    });

    if (loading) return <p>cargando</p>;

    const { alumno } = data;

    const updateInfoAlumn = async (valores: Alumn) => {
        console.log('updateInfo');
        const {
            name,
            surname,
            email,
            Birthdate,
            description,
            country,
            phone,
            gender,
            location
        } = valores;

        try {
            const { data } = await modificarAlumno({
                variables: {
                    id,
                    alumno: {
                        name,
                        surname,
                        email,
                        Birthdate,
                        description,
                        country,
                        phone,
                        gender,
                        location
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
                initialValues={alumno}
                onSubmit={(valores) => {
                    updateInfoAlumn(valores);
                }}>
                {(props) => {
                    console.group('Habilities props');

                    console.log(props.values);
                    console.groupEnd();
                    return (
                        <form onSubmit={props.handleSubmit}>
                            <div className="space-y-2">
                                <PersolanInfo
                                    name={props.values.name}
                                    surname={props.values.surname}
                                    email={props.values.email}
                                    country={props.values.country}
                                    birthdate={props.values.Birthdate}
                                    description={props.values.description}
                                    phone={props.values.phone}
                                    gender={props.values.gender}
                                    errors={props.errors}
                                    touched={props.touched}
                                    handleChange={props.handleChange}
                                    handleBlur={props.handleBlur}
                                    location={props.values.location}
                                />

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

export default EditStudent;
