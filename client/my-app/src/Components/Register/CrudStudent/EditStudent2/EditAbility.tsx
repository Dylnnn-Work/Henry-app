import React, { useState, useEffect } from 'react';
import Abilities from './Abilities';
import { Formik } from 'formik';
import { useQuery, gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { Alumn } from '../../../../types/Alumns';
import { toast } from 'react-toastify';

type abilityType = {
    id: string;
    value: string;
};

type PropsAbilities = {
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
            abilities
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
            abilities
            _id
        }
    }
`;

const EditStudent: React.FC<PropsAbilities> = (props) => {
    const id = props.alumnId;

    const [abilities2, setAbilities2] = useState([]);

    useEffect(() => {
        console.log('use effect');
        console.log(abilities2);
    }, [abilities2]);

    const selectAbility = (ability: any) => {
        setAbilities2(ability);
    };

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
    console.group('Loading');
    console.groupEnd();

    const options = alumno.abilities.map((ability: string, index: number) => {
        return {
            label: index.toString(),
            value: ability
        };
    });

    const updateInfoAlumn = async (valores: Alumn) => {
        console.log('updateInfo');
        const {
            name,
            surname,
            email,
            Birthdate,
            description,
            country
        } = valores;
        console.group('Value Changed');
        console.log(valores);
        console.groupEnd();
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
                        abilities:
                            abilities2.length > 0
                                ? abilities2.map((ability: any) => {
                                      return ability.value;
                                  })
                                : options.map((option: abilityType) => {
                                      return option.value;
                                  })
                    }
                }
            });
            console.log(data);
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
                onSubmit={(valores, funciones) => {
                    console.log('Edit Abilities');
                    console.log(valores);
                    console.log(funciones);
                    updateInfoAlumn(valores);
                }}>
                {(props) => {
                    console.group('Habilities props');

                    console.log(props.values.abilities);
                    console.groupEnd();
                    return (
                        <form onSubmit={props.handleSubmit}>
                            <div className="space-y-6">
                                {/*FORMULARIO */}
                                <Abilities
                                    options={options}
                                    selectAbility={selectAbility}
                                />

                                <div className="mt-8">
                                    <button
                                        className="bg-grayHenry text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                        type="submit">
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
