import React, { useState } from 'react';
import Select from 'react-select';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { gql, useMutation } from '@apollo/client';
import LogoJ from './Images/job.png';
import { toast } from 'react-toastify';

type FormElement = React.FormEvent<HTMLFormElement>;

const CREAR_FAV = gql`
    mutation($favorites: FavsStudentInput, $token: String) {
        createFavS(favorites: $favorites, token: $token) {
            favorites {
                _id
                offer
                offerID
            }
        }
    }
`;

const GET_FAV = gql`
    query($token: String) {
        alumnoLogueado(token: $token) {
            favorites {
                offer
                offerID
                _id
            }
            _id
        }
    }
`;

interface Props {
    company: string;
    title: string;
    description: string;
    picture: string;
    postulants: string[];
    id: any;
    requirements: string[];
    languages: string[];
    wayOfWork: string;
    jobType: string;
    experienceLevel: string;
    position: string;
    email: string;
    companyID: string;
}

export const OfertaCard: React.FC<Props> = ({
    company,
    title,
    description,
    picture,
    id,
    requirements,
    languages,
    wayOfWork,
    jobType,
    experienceLevel,
    position,
    email,
    companyID
}) => {
    const history = useHistory();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [apply, setApply] = useState<boolean>(false);
    const [fullName, setfullName] = useState<string>('');
    const [contact, setContact] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    console.log(email);
    const [createFavS] = useMutation(CREAR_FAV);

    const onClose = async (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const { data } = await createFavS({
                variables: {
                    token: token,
                    favorites: {
                        offer: title,
                        offerID: id
                    }
                },
                update: async (cache) => {
                    const cacheFavoritos: any = await cache.readQuery({
                        query: GET_FAV,
                        variables: { token: token }
                    });
                    await cache.writeQuery({
                        query: GET_FAV,
                        data: {
                            alumnoLogueado: {
                                favorites:
                                    cacheFavoritos?.alumnoLogueado.favorites
                            }
                        },
                        variables: { token: token }
                    });
                }
            });
            toast.success('Agregaste favoritos');
        } catch (error) {
            console.log(error);
            toast.error('Hubo un error');
        }
    };

    const handleSubmit = () => {
        setApply(false);
        const information = {
            fullName: fullName,
            contact: contact,
            email: email,
            phone: phone
        };
        axios.post('http://localhost:3001/apply-form', information);
        toast.info('Apply form sent');
        setContact('');
        setfullName('');
        setPhone('');
    };

    return (
        <>
            <div className="max-w-min h-full px-8 py-4 mx-auto bg-yellow_henry rounded-lg shadow-lg dark:bg-gray-800">
                <div>
                    <div className="flex justify-center -mt-16 md:justify-center relative overflow-hidden transition duration-300 transform rounded-full shadow-lg lg:hover:-translate-y-2 hover:shadow-2xl">
                        <div className="w-40 h-40 flex justify-center">
                            <img
                                className="object-cover w-auto h-auto md:h-auto xl:h-auto"
                                alt="Testimonial avatar"
                                src={picture ? picture : LogoJ}
                            />
                        </div>
                        <div
                            className="absolute inset-0 flex flex-col justify-center px-12 py-4 text-center transition-opacity duration-300 bg-black bg-opacity-75 opacity-0 hover:opacity-100 focus:overflow-none"
                            onClick={onClose}
                            onKeyPress={() => console.log('')}
                            role="button"
                            tabIndex={0}>
                            <svg
                                width="64"
                                height="76"
                                viewBox="0 0 28 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M17.208 33.9166H10.458C9.10801 33.9166 7.75463 32.0216 6.62063 29.3165L2.02051 33.9166L0.333008 32.2291V25.4791L4.35432 21.4578C3.94426 19.2776 3.70801 17.1378 3.70801 15.3541C3.70801 8.60413 8.77051 0.166626 13.833 0.166626C18.8955 0.166626 23.958 8.60413 23.958 15.3541C23.958 17.1395 23.7218 19.2776 23.3117 21.4578L27.333 25.4791V32.2291L25.6455 33.9166L21.0454 29.3165C19.9114 32.0216 18.5597 33.9166 17.208 33.9166ZM13.833 30.5416H11.1077C11.0002 30.4066 10.8994 30.2663 10.8056 30.1214C10.2201 29.2237 9.59063 27.818 9.01857 26.1001C7.85082 22.5935 7.08301 18.3157 7.08301 15.3541C7.08301 9.9575 11.2073 3.54163 13.833 3.54163C16.4588 3.54163 20.583 9.9575 20.583 15.3541C20.583 18.3157 19.8152 22.5952 18.6474 26.1001C18.0737 27.818 17.4459 29.222 16.8587 30.1214C16.7655 30.2663 16.6652 30.4065 16.5583 30.5416H13.833ZM13.833 17.0416C14.7281 17.0416 15.5866 16.686 16.2195 16.0531C16.8524 15.4202 17.208 14.5617 17.208 13.6666C17.208 12.7715 16.8524 11.9131 16.2195 11.2801C15.5866 10.6472 14.7281 10.2916 13.833 10.2916C12.9379 10.2916 12.0795 10.6472 11.4465 11.2801C10.8136 11.9131 10.458 12.7715 10.458 13.6666C10.458 14.5617 10.8136 15.4202 11.4465 16.0531C12.0795 16.686 12.9379 17.0416 13.833 17.0416Z"
                                    fill="#F7DF1E"
                                />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-center self-center items-center">
                    <div>
                        <h2 className="font-semibold text-center capitalize text-gray-800 dark:text-white md:text-lg mt-2">
                            {title}
                        </h2>
                    </div>
                    <div className="text-md font-medium capitalize text-gray-600 dark:text-indigo-300"></div>
                    <div className="grid grid-cols-3 gap-x-20 mt-2 text-gray-600 dark:text-gray-200">
                        <ul className="col-start-1 col-end-2">
                            {requirements?.slice(0, 2).map((req, key) => (
                                <div
                                    className="text-center whitespace-nowrap "
                                    key={key}>
                                    {req}
                                </div>
                            ))}
                        </ul>
                        <ul className="col-start-2 col-end-3 mr-2">
                            {requirements?.slice(2, 4).map((req, key) => (
                                <div
                                    className="text-center whitespace-nowrap"
                                    key={key}>
                                    {req}
                                </div>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center">
                        <button
                            className="px-4 py-2 mt-2 mb-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-grayHenry rounded-md dark:bg-gray-800 hover:bg-gray-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700"
                            onClick={() => setShowModal(true)}>
                            View more
                        </button>
                        <button
                            className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-grayHenry rounded-md dark:bg-gray-800 hover:bg-gray-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700"
                            onClick={() => setApply(true)}>
                            Apply
                        </button>
                    </div>
                </div>
            </div>
            {apply ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-2xl relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                                <div className="flex items-start justify-between items-center p-5 border-b border-solid border-yellow_henry rounded-t">
                                    <h3 className="text-xl font-semibold mr-10 text-white">
                                        Write the requested information to
                                        contact the recruiter
                                    </h3>
                                    <button
                                        className=" ml-auto text-white float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setApply(false)}>
                                        ×
                                    </button>
                                </div>
                                <div className="grid grid gap-x-5">
                                    <div className="col-start-1 grid">
                                        <div className="col-start-1 col flex flex-col justify-center items-center text-white text-lg">
                                            <div className="flex flex-col justify-center items-center self-center py-5">
                                                <label
                                                    htmlFor="studentEmail"
                                                    className="mb-3 text-left text-base text-white font-bold">
                                                    Contact mail:
                                                    <input
                                                        id="studentEmail"
                                                        name="email"
                                                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                        type="email"
                                                        value={contact}
                                                        onChange={(e) => {
                                                            setContact(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </label>

                                                <label
                                                    htmlFor="name"
                                                    className="mb-3 text-left text-base text-white font-bold">
                                                    Your Full Name:
                                                    <input
                                                        id="name"
                                                        name="email"
                                                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                        type="email"
                                                        value={fullName}
                                                        onChange={(e) => {
                                                            setfullName(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </label>

                                                <label
                                                    htmlFor="studentPhone"
                                                    className="mb-3 text-left text-base text-white font-bold">
                                                    Phone:
                                                    <input
                                                        id="studentPhone"
                                                        name="phone"
                                                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                        type="input"
                                                        placeholder="11 3142-8626"
                                                        value={phone}
                                                        onChange={(e) => {
                                                            setPhone(
                                                                e.target.value
                                                            );
                                                        }}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-4 border-t border-solid border-yellow_henry rounded-b">
                                    <button
                                        className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1"
                                        type="button"
                                        style={{
                                            transition: 'all .15s ease'
                                        }}
                                        onClick={() => handleSubmit()}>
                                        Send mail
                                    </button>
                                    <button
                                        className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{
                                            transition: 'all .15s ease'
                                        }}
                                        onClick={() => setApply(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-white"></div>
                </>
            ) : null}
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-2xl relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                                <div className="flex flex-col justify-center p-5">
                                    <h3 className="text-xl font-semibold text-white">
                                        {title.toUpperCase()}
                                    </h3>
                                    <h3 className="text-xl font-semibold text-white capitalize">
                                        <Link
                                            to={`/profileRecruiter/${companyID}`}>
                                            {company}
                                        </Link>
                                    </h3>
                                </div>
                                <div>
                                    <h4 className="text-base pl-5  text-white">
                                        Job type: {jobType}
                                    </h4>
                                    <h4 className="text-base pl-5  text-white">
                                        Experience level: {experienceLevel}
                                    </h4>
                                    <h4 className="text-base pl-5  text-white">
                                        Role: {position + ' Developer'}
                                    </h4>
                                </div>
                                <h4 className="text-base p-5  text-white">
                                    {description}
                                </h4>
                                <div className="relative p-6 flex-auto flex-col justify-center self-center ">
                                    <h4 className="text-center text-base font-semibold text-white">
                                        Technologies
                                    </h4>
                                    <div className="flex flex-row">
                                        {requirements.map((req, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="border-solid border rounded p-1 m-2 text-center border-yellow_henry text-white">
                                                    {req}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                {/* } */}
                                <div className="flex items-center justify-end p-4">
                                    <button
                                        className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{
                                            transition: 'all .15s ease'
                                        }}
                                        onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-white"></div>
                </>
            ) : null}
        </>
    );
};
