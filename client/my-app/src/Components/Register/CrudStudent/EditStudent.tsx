import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import * as Yup from 'yup';
import { Formik, FieldArray, ErrorMessage } from 'formik';
import { Alumn, ProfessionalBackground } from '../../../types/Alumns';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Creatable from 'react-select/creatable';

type editAlumn = {
    id: string;
};

type abilityType = {
    id: string;
    value: string;
};

const OBTENER_DATOS = gql`
    query obtenerAlumno($id: ID) {
        alumno(_id: $id) {
            name
            surname
            email
            Birthdate
            description
            abilities
            ExtraAbilities
            country
            experience {
                description
                timeLapse
                _id
            }
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
            name
            surname
            email
            Birthdate
            description
            ExtraAbilities
            abilities
            country
            experience {
                description
                timeLapse
                _id
            }
            education {
                description
                timeLapse
                _id
            }
            _id
        }
    }
`;

/* const options = [
    { id: 'chocolate', value: 'Chocolate' },
    { id: 'vanilla', value: 'Vanilla' },
    { id: 'strawberry', value: 'Strawberry' }
]; */

const EditStudent: React.FC<editAlumn> = ({ id }) => {
    const [abilities, setAbilities] = useState([]);

    useEffect(() => {
        console.log('use effect');
        console.log(abilities);
    }, [abilities]);

    const selectAbility = (ability: any) => {
        setAbilities(ability);
    };

    const history = useHistory();
    const { data, loading } = useQuery(OBTENER_DATOS, {
        variables: {
            id
        }
    });

    const [modificarAlumno] = useMutation(EDIT_ALUMNO);

    const schemaValidation = Yup.object({
        name: Yup.string().required('Empty input'),
        surname: Yup.string().required('Empty input'),
        email: Yup.string().required('Empty input'),
        Birthdate: Yup.string().required('select your birthdate')
    });

    if (loading) return <p>cargando</p>;
    const { alumno } = data;

    const options = alumno.abilities.map((ability: string, index: number) => {
        return {
            id: index.toString(),
            value: ability
        };
    });

    //console.log(options);

    const updateInfoAlumn = async (valores: Alumn) => {
        const {
            name,
            surname,
            email,
            Birthdate,
            description,
            country,
            experience,
            education
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
                        abilities: abilities
                            ? abilities.map((ability: abilityType) => {
                                  return ability.value;
                              })
                            : options.map((option: abilityType) => {
                                  return option.value;
                              }),
                        experience: experience.map((experience) => {
                            return {
                                description: experience.description,
                                timeLapse: experience.timeLapse,
                                _id: experience._id
                            };
                        }),
                        education: education.map((education) => {
                            return {
                                description: education.description,
                                timeLapse: education.timeLapse,
                                _id: education._id
                            };
                        })
                    }
                }
            });
            console.log(data);
            toast.success('alumn updated');
            history.push('/admin/listAlumns');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            <div className="flex  bg-yellow_henry dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden sm:max-w-2xl lg:max-w-2xl  mt-5 mb-5">
                <div className=" py-8 px-6 md:px-8 ">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
                        Student Edit Component
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-200 text-center"></p>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b border-grayHenry dark:border-gray-400 w-1/5 lg:w-1/4"></span>

                        <span className="border-b border-grayHenry dark:border-gray-400 w-1/5 lg:w-1/4"></span>
                    </div>
                    {/**FORMULARIO */}
                    <Formik
                        validationSchema={schemaValidation}
                        enableReinitialize
                        initialValues={alumno}
                        onSubmit={(valores, funciones) => {
                            console.log(valores);
                            console.log(funciones);
                            updateInfoAlumn(valores);
                        }}>
                        {(props) => {
                            return (
                                <form
                                    style={{ width: '600px' }}
                                    onSubmit={props.handleSubmit}>
                                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                        <div className="mt-4">
                                            <label
                                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                htmlFor="name">
                                                Name*
                                            </label>
                                            <input
                                                id="name"
                                                placeholder="name"
                                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                type="text"
                                                value={props.values.name}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            {props.errors.name &&
                                            props.touched.name ? (
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                    <p className="font-bold">
                                                        Error
                                                    </p>
                                                    <p>{props.errors.name}</p>
                                                </div>
                                            ) : null}
                                        </div>

                                        <div className="mt-4">
                                            <label
                                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                htmlFor="surname">
                                                SurName*
                                            </label>
                                            <input
                                                id="surname"
                                                placeholder="surname"
                                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                type="text"
                                                value={props.values.surname}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            <span className="block text-red-700 sm:inline"></span>
                                        </div>

                                        {props.errors.surname &&
                                        props.touched.surname ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold">
                                                    Error
                                                </p>
                                                <p>{props.errors.surname}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                                        <div className="mt-4">
                                            <label
                                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                htmlFor="country">
                                                Country
                                            </label>
                                            <input
                                                id="country"
                                                placeholder="country"
                                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                type="Country"
                                                value={props.values.country}
                                                onChange={props.handleChange}
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label
                                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                htmlFor="Birthdate">
                                                Birthdate*
                                            </label>
                                            <input
                                                id="Birthdate"
                                                placeholder="Birthdate"
                                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                type="date"
                                                value={props.values.Birthdate}
                                                onChange={props.handleChange}
                                                onBlur={props.handleBlur}
                                            />
                                            <span className="block text-red-700 sm:inline"></span>
                                            {props.errors.Birthdate &&
                                            props.touched.Birthdate ? (
                                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                    <p className="font-bold">
                                                        Error
                                                    </p>
                                                    <p>
                                                        {props.errors.Birthdate}
                                                    </p>
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <label
                                            className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                            htmlFor="Email">
                                            Email*
                                        </label>
                                        <input
                                            id="email"
                                            placeholder="email"
                                            className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            type="Email"
                                            value={props.values.email}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>

                                    {props.errors.email &&
                                    props.touched.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
                                        </div>
                                    ) : null}

                                    <div className="mt-4">
                                        <label
                                            className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                            htmlFor="description">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            placeholder="description"
                                            className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            value={props.values.description}
                                            onChange={props.handleChange}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label
                                            className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                            htmlFor="Email">
                                            Abilities
                                        </label>
                                        <Creatable
                                            isClearable
                                            defaultValue={options}
                                            menuPosition="fixed"
                                            menuShouldScrollIntoView={true}
                                            components={{
                                                DropdownIndicator: null
                                            }}
                                            options={options}
                                            isMulti={true}
                                            onChange={(ability: any) =>
                                                selectAbility(ability)
                                            }
                                            getOptionValue={(options) =>
                                                options.id
                                            }
                                            getOptionLabel={(options) =>
                                                options.value
                                            }
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <div className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2">
                                            Experience :
                                        </div>
                                        {
                                            <FieldArray name="experience">
                                                {({ insert, remove, push }) => (
                                                    <div className="border border-grayHenry dark:border-gray-400 p-4 border-gray-300">
                                                        {props.values.experience
                                                            .length > 0 &&
                                                            props.values.experience.map(
                                                                (
                                                                    experience: ProfessionalBackground,
                                                                    index: number
                                                                ) => (
                                                                    <div
                                                                        className="mt-4 border-black grid grid-cols-1 gap-6 sm:grid-cols-2"
                                                                        key={
                                                                            index
                                                                        }>
                                                                        <div className=" border-black">
                                                                            <label
                                                                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                                                htmlFor={`experience.${index}.description`}>
                                                                                Description
                                                                            </label>
                                                                            <textarea
                                                                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                                placeholder={
                                                                                    experience.description ||
                                                                                    'description'
                                                                                }
                                                                                value={
                                                                                    experience.description
                                                                                }
                                                                                onChange={
                                                                                    props.handleChange
                                                                                }
                                                                                name={`experience.${index}.description`}
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`experience.${index}.name`}
                                                                                component="div"
                                                                                className="field-error"
                                                                            />
                                                                        </div>
                                                                        <div className="">
                                                                            <label
                                                                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                                                htmlFor={`experience.${index}.timeLapse`}>
                                                                                TimeLapse
                                                                            </label>
                                                                            <input
                                                                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                                placeholder={
                                                                                    experience.timeLapse ||
                                                                                    'timeLapse'
                                                                                }
                                                                                value={
                                                                                    experience.timeLapse
                                                                                }
                                                                                onChange={
                                                                                    props.handleChange
                                                                                }
                                                                                name={`experience.${index}.timeLapse`}
                                                                                type="text"
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`experience.${index}.name`}
                                                                                component="div"
                                                                                className="field-error"
                                                                            />
                                                                        </div>
                                                                        <div className="col">
                                                                            <button
                                                                                type="button"
                                                                                className="inline-flex items-center justify-center w-5 h-5 mr-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-full focus:shadow-outline hover:bg-red-800"
                                                                                onClick={() =>
                                                                                    remove(
                                                                                        index
                                                                                    )
                                                                                }>
                                                                                X
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        <button
                                                            type="button"
                                                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                            onClick={() =>
                                                                push({
                                                                    description:
                                                                        '',
                                                                    timeLapse:
                                                                        ''
                                                                })
                                                            }>
                                                            Add Experience
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        }
                                    </div>
                                    <div className="mt-4">
                                        <div className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2">
                                            Education :
                                        </div>
                                        {
                                            <FieldArray name="education">
                                                {({ remove, push }) => (
                                                    <div className="border border-grayHenry dark:border-gray-400 p-4 border-gray-300">
                                                        {props.values.education
                                                            .length > 0 &&
                                                            props.values.education.map(
                                                                (
                                                                    education: ProfessionalBackground,
                                                                    index: number
                                                                ) => (
                                                                    <div
                                                                        className="mt-4 border-black grid grid-cols-1 gap-6 sm:grid-cols-2"
                                                                        key={
                                                                            index
                                                                        }>
                                                                        <div className=" border-black">
                                                                            <label
                                                                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                                                htmlFor={`education.${index}.description`}>
                                                                                Description
                                                                            </label>
                                                                            <textarea
                                                                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                                placeholder={
                                                                                    education.description ||
                                                                                    'description'
                                                                                }
                                                                                value={
                                                                                    education.description
                                                                                }
                                                                                onChange={
                                                                                    props.handleChange
                                                                                }
                                                                                name={`education.${index}.description`}
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`education.${index}.name`}
                                                                                component="div"
                                                                                className="field-error"
                                                                            />
                                                                        </div>
                                                                        <div className="">
                                                                            <label
                                                                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                                                                htmlFor={`education.${index}.timeLapse`}>
                                                                                TimeLapse
                                                                            </label>
                                                                            <input
                                                                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                                                placeholder={
                                                                                    education.timeLapse ||
                                                                                    'timeLapse'
                                                                                }
                                                                                value={
                                                                                    education.timeLapse
                                                                                }
                                                                                onChange={
                                                                                    props.handleChange
                                                                                }
                                                                                name={`education.${index}.timeLapse`}
                                                                                type="text"
                                                                            />
                                                                            <ErrorMessage
                                                                                name={`education.${index}.name`}
                                                                                component="div"
                                                                                className="field-error"
                                                                            />
                                                                        </div>
                                                                        <div className="col">
                                                                            <button
                                                                                type="button"
                                                                                className=" inline-flex items-center justify-center w-5 h-5 mr-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-full focus:shadow-outline hover:bg-red-800"
                                                                                onClick={() =>
                                                                                    remove(
                                                                                        index
                                                                                    )
                                                                                }>
                                                                                X
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        <button
                                                            type="button"
                                                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                                                            onClick={() =>
                                                                push({
                                                                    description:
                                                                        '',
                                                                    timeLapse:
                                                                        ''
                                                                })
                                                            }>
                                                            Add Education
                                                        </button>
                                                    </div>
                                                )}
                                            </FieldArray>
                                        }
                                    </div>

                                    <div className="mt-8">
                                        <button className="bg-grayHenry text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                            Edit
                                        </button>
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};
export default EditStudent;
