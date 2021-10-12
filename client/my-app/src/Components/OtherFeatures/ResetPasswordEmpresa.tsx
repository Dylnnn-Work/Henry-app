import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { Alumn } from '../../types/Alumns';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const RESET_PASSWORD = gql`
    mutation($email: String!, $password: String!) {
        resetearPasswordEmpresa(email: $email, password: $password) {
            name
        }
    }
`;

const ResetPasswordEmpresa: React.FC<Alumn> = () => {
    const history = useHistory();
    const [resetPassword] = useMutation(RESET_PASSWORD);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('The email is not valid')
                .required('The email is required'),
            password: Yup.string()
                .required('The password cannot be empty')
                .min(6, 'The password must be at least 6 characters long')
        }),
        onSubmit: async (valores, { resetForm }) => {
            console.log('enviando');
            console.log(valores);
            const { email, password } = valores;
            try {
                const { data } = await resetPassword({
                    variables: {
                        email: email,
                        password: password
                    }
                });
                console.log(data);
                toast.info('Contraseña cambiada');
            } catch (err) {
                console.log(err);
            }
            resetForm();
            history.push('/login');
        }
    });
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-grayHenry to-gray-500">
            <div className="flex flex-col shadow-xl">
                <div className="py-6 px-14 bg-yellow_henry rounded-tl-2xl rounded-tr-2xl text-center space-y-8 rounded-b-lg shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
                        Recruiter
                    </h2>

                    <p className="text-xl text-gray-600 dark:text-gray-200 text-center">
                        Insert your new password
                    </p>

                    <form onSubmit={formik.handleSubmit}>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label
                                    className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                    htmlFor="company_password">
                                    Password
                                </label>
                            </div>
                            <input
                                id="company_password"
                                className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null}

                        <div className="flex flex-row justify-around self-center mt-10 mb-10">
                            <button
                                type="submit"
                                className="bg-grayHenry text-white text-xl font-medium mr-2 py-1 px-4 w-full rounded-full hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Confirm
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordEmpresa;
