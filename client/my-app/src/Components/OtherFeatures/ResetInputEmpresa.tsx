import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ResetInputEmpresa: React.FC = () => {
    const history = useHistory();
    // const [email, setEmail] = useState<string>('');

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('The email is not valid')
                .required('The email is required')
        }),
        onSubmit: async (valores, { resetForm }) => {
            console.log('enviando');
            console.log(valores);
            const { email } = valores;

            try {
                const dataMail = { email };
                console.log('dataMail: ' + dataMail);
                axios.post('http://localhost:3001/sendResetEmpresa', dataMail);
                toast.info('Email enviado');
            } catch (err) {
                console.log(err);
            }
            resetForm();
            history.push('/login');
        }
    });
    /*const handleClick = () => {
        console.log(email);
        const dataMail = { email };
        axios.post('http://localhost:3001/sendReset', dataMail);
        toast.info('el Alumno ha sido contactado');
    };*/

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center bg-gradient-to-br from-grayHenry to-gray-500">
            <div className="flex flex-col shadow-xl">
                <div className="py-6 px-14 bg-yellow_henry rounded-tl-2xl rounded-tr-2xl text-center space-y-8">
                    <h2 className="text-gray-600 text-xs uppercase">
                        DO YOU WANT TO CHANGE YOUR PASSWORD?
                    </h2>
                    <h4 className="text-gray-600 text-center font-bold text-xl">
                        Please input your email
                        <br />
                        to start the preocess
                    </h4>
                </div>
                <div className="flex flex-col py-6 px-8 space-y-5 bg-yellow_henry rounded-b-lg shadow-lg overflow-hidden lg:max-w-2xl">
                    <form
                        className="flex flex-col py-6 px-8 space-y-5 bg-yellow_henry"
                        onSubmit={formik.handleSubmit}>
                        <input
                            id="studentEmail"
                            name="email"
                            className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <button className="bg-grayHenry text-white text-xl font-medium mr-2 py-1 px-4 w-full rounded-full hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                            Confirm
                        </button>
                    </form>

                    <div className="flex justify-between"></div>
                </div>
            </div>
        </div>
    );
};

export default ResetInputEmpresa;
