import React from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Recruiter } from '../../../types/Recruiters';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

type EditRecruiterProps = {
    id: string;
};

const GET_RECRUITER = gql`
    query empresa($id: ID) {
        empresa(_id: $id) {
            name
            email
            description
            picture
            _id
        }
    }
`;

const MODIFY_RECRUITER = gql`
    mutation modificarEmpresa($id: ID, $input: EmpresaInput) {
        modificarEmpresa(_id: $id, empresa: $input) {
            name
            description
            email
            _id
        }
    }
`;

const EditRecruiter: React.FC<EditRecruiterProps> = ({ id }) => {
    const history = useHistory();
    console.log(id);

    const { data, loading } = useQuery(GET_RECRUITER, {
        variables: {
            id
        }
    });

    const [modificarEmpresa] = useMutation(MODIFY_RECRUITER);

    const schemaValidation = Yup.object({
        name: Yup.string().required('The name is required'),
        description: Yup.string().required('The description is required'),
        email: Yup.string()
            .email('The email is not valid')
            .required('The email is required')
    });

    if (loading) return <p>Cargando</p>;
    //console.log(data.empresa);

    const { empresa } = data;

    const updateInfoRecruiter = async (valores: Recruiter) => {
        const { name, description, email } = valores;
        try {
            const { data } = await modificarEmpresa({
                variables: {
                    id,
                    input: {
                        name,
                        description,
                        email
                    }
                }
            });
            console.log(data);
            //TODO: Toast
            toast.success('Recruiter edited');
            //refetch();
            //TODO: redireccionar
            history.push('/admin/listRecruiters');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex max-w-sm mx-auto bg-yellow_henry dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden sm:max-w-2xl lg:max-w-2xl mt-5">
                <div className="w-full py-8 px-6 md:px-8 ">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
                        Company
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-200 text-center">
                        Edit!
                    </p>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b border-grayHenry dark:border-gray-400 w-1/5 lg:w-1/4"></span>

                        <a className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase hover:underline">
                            Edit a Company
                        </a>

                        <span className="border-b border-grayHenry dark:border-gray-400 w-1/5 lg:w-1/4"></span>
                    </div>
                    {/**FORMULARIO */}
                    {/*onSubmit={formik.handleSubmit} */}
                    <Formik
                        validationSchema={schemaValidation}
                        enableReinitialize
                        initialValues={empresa}
                        onSubmit={(valores, funciones) => {
                            console.log(valores);
                            console.log(funciones);
                            updateInfoRecruiter(valores);
                        }}>
                        {(props) => {
                            //console.log(props);
                            //style={{ width: '600px' }}
                            return (
                                <form
                                    style={{ width: '600px' }}
                                    onSubmit={props.handleSubmit}>
                                    <div className="mt-4">
                                        <label
                                            className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                            htmlFor="company_name">
                                            Name
                                        </label>
                                        <input
                                            id="company_name"
                                            name="name"
                                            className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            type="text"
                                            value={props.values.name}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>
                                    {props.touched.name && props.errors.name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.name}</p>
                                        </div>
                                    ) : null}
                                    <div className="mt-4">
                                        <label
                                            className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                            htmlFor="company_description">
                                            Description
                                        </label>
                                        <input
                                            id="company_description"
                                            name="description"
                                            className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            type="text"
                                            value={props.values.description}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>
                                    {props.touched.description &&
                                    props.errors.description ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.description}</p>
                                        </div>
                                    ) : null}
                                    <div className="mt-4">
                                        <label
                                            className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                            htmlFor="company_email">
                                            Email Address
                                        </label>
                                        <input
                                            id="company_email"
                                            name="email"
                                            className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                            type="email"
                                            value={props.values.email}
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                        />
                                    </div>
                                    {props.touched.email &&
                                    props.errors.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
                                        </div>
                                    ) : null}

                                    <div className="mt-8">
                                        <input
                                            type="submit"
                                            className="bg-grayHenry text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                            value=" Edit"
                                        />
                                    </div>
                                </form>
                            );
                        }}
                    </Formik>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b border-grayHenry dark:border-gray-400 w-1/5 lg:w-1/4"></span>

                        <a className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">
                            or sign in
                        </a>

                        <span className="border-b border-grayHenry dark:border-gray-400 w-1/5 lg:w-1/4"></span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditRecruiter;
