import React, { useState, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import {
    ProfessionalBackground,
    ProyectInterface
} from '../../../types/Alumns';
import { useHistory } from 'react-router-dom';
import Modal from '../../Register/CrudStudent/EditStudent2/Modal';
import firebase from '../../../firebase';
import { ShowDate } from '../../../utils/date';
import { toast } from 'react-toastify';
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { count } from 'node:console';
import './ProfileAlumn.css';
import AddReview from './addReview';
import Review from './Review';
import './ProfileAlumn.css';
import LogoF from '../../Catalogue/Images/avatarF.png';
import LogoM from '../../Catalogue/Images/avatarM.png';
import Favorites from '../ProfileHenry/Favorites';
import jwt_decode from 'jwt-decode';
import ShowMore from 'react-show-more';

type ProfileAlumnProps = {
    id: string;
};

const ALUMNOLOGUEADO = gql`
    query alumnoLogueado($token: String) {
        alumnoLogueado(token: $token) {
            name
            picture
            surname
        }
    }
`;

const QUERY = gql`
    query alumno($id: ID) {
        alumno(_id: $id) {
            _id
            name
            surname
            picture
            email
            Birthdate
            description
            ExtraAbilities
            languages
            abilities
            country
            location
            phone
            gender
            experience {
                _id
                description
                timeLapse
            }
            education {
                _id
                description
                timeLapse
            }
            favorites {
                _id
                offer
                offerID
            }
            proyect {
                _id
                title
                description
                link
                image
            }
        }
    }
`;

const EDIT_ALUMNO = gql`
    mutation modificarAlumno($id: ID, $alumno: AlumnoInput) {
        modificarAlumno(_id: $id, alumno: $alumno) {
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
            proyect {
                description
                title
                _id
                link
                image
            }
            _id
            picture
        }
    }
`;

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
];
const GET_ALUMN = gql`
    query($token: String) {
        alumnoLogueado(token: $token) {
            _id
            isAdmin
            name
        }
    }
`;

const ProfileAlumn: React.FC<ProfileAlumnProps> = ({ id }) => {
    const [items, setItems] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [proyectId, setProyectId] = useState('');
    const [imageProyectId, setImageProyectId] = useState({
        id: '',
        title: '',
        description: '',
        link: ''
    });

    const [experienceId, setExperienceId] = useState('');
    const [educationId, setEducationId] = useState('');
    const [formName, SetFormName] = useState('');
    const [showDescription, setShowDescription] = useState(10);
    const storage = firebase.storage();
    const token = localStorage.getItem('token');
    const [edit, setEdit] = useState(false);
    const decode: any = jwt_decode(token!);
    const [propose, setPropose] = useState<boolean>(false);
    const [fullName, setfullName] = useState('');
    const [contact, setContact] = useState('');

    useEffect(() => {
        if (decode._id === id) {
            setEdit(true);
        }
    }, []);

    const { data, loading, error } = useQuery(QUERY, {
        variables: {
            id
        }
    });

    const { data: dataA, loading: LoadingA, error: errorA } = useQuery(
        GET_ALUMN,
        {
            variables: {
                token
            }
        }
    );
    console.log(dataA);

    const [modificarAlumno, { loading: loading2 }] = useMutation(EDIT_ALUMNO);

    if (loading)
        return (
            <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );

    const { alumno } = data;
    const email = alumno.email;
    const dataMail = { email };

    if (LoadingA) return <p>cargando....</p>;
    const { alumnoLogueado } = dataA;

    const handleClick = () => {
        axios.post('http://localhost:3001/contact', dataMail);
        alert('el Alumno ha sido contactado');
    };

    const onCLick = () => {
        history.push('/catalogue');
        //history.go(0);
    };

    const count = () => {
        if (alumno.proyect.length > 0 && alumno.proyect.length <= 3) {
            return alumno.proyect.length;
        } else {
            return 3;
        }
    };
    const deleteExperience = async (id: string, index: number) => {
        const result = [
            ...alumno.experience.slice(0, index),
            ...alumno.experience.slice(index + 1)
        ];
        try {
            const { data } = await modificarAlumno({
                variables: {
                    id,
                    alumno: {
                        experience: result.map(
                            (experience: ProfessionalBackground) => {
                                return {
                                    description: experience.description,
                                    timeLapse: experience.timeLapse,
                                    _id: experience._id
                                };
                            }
                        )
                    }
                }
            });
            toast.success('experience deleted');
        } catch (error) {
            console.log(error);
        }
    };

    const deleteEducation = async (id: string, index: number) => {
        const result = [
            ...alumno.education.slice(0, index),
            ...alumno.education.slice(index + 1)
        ];
        try {
            const { data } = await modificarAlumno({
                variables: {
                    id,
                    alumno: {
                        education: result.map(
                            (education: ProfessionalBackground) => {
                                return {
                                    description: education.description,
                                    timeLapse: education.timeLapse,
                                    _id: education._id
                                };
                            }
                        )
                    }
                }
            });
            toast.success('education deleted');
        } catch (error) {
            console.log(error);
        }
    };
    const changeImage = async (e: any, id: string) => {
        const file = e.target.files[0];
        const Ref = storage.ref().child(`/Fotos/${file.name}`);
        await Ref.put(file);
        const url = await Ref.getDownloadURL();
        try {
            const { data } = await modificarAlumno({
                variables: {
                    id,
                    alumno: {
                        picture: url
                    }
                }
            });
        } catch (error) {
            console.log(error);
            window.history.go();
            toast.error('Select a photo');
        }
    };

    const changeImageProyect = async (e: any, id: string) => {
        const file = e.target.files[0];
        const Ref = storage.ref().child(`/Fotos/${file.name}`);
        await Ref.put(file);
        const url = await Ref.getDownloadURL();
        console.log(data.alumno.proyect);
        console.log(id);
        console.log(e.target.name);
        try {
            await modificarAlumno({
                variables: {
                    id,
                    alumno: {
                        proyect: data.alumno.proyect.map(
                            (proyect: ProyectInterface) => {
                                const temp = Object.assign({}, proyect);
                                console.log(temp._id);
                                console.log(e.target.name);
                                if (temp._id === imageProyectId.id) {
                                    temp.description =
                                        imageProyectId.description;
                                    temp.title = imageProyectId.title;
                                    temp.image = url;
                                    temp.link = imageProyectId.link;
                                }
                                return {
                                    description: temp.description,
                                    title: temp.title,
                                    link: temp.link,
                                    image: temp.image,
                                    _id: temp._id
                                };
                            }
                        )
                    }
                }
            });
        } catch (error) {
            console.log(error);
            window.history.go();
            toast.error('Select a photo');
        }
    };

    const deleteProyect = async (id: string, index: number) => {
        const result = [
            ...alumno.proyect.slice(0, index),
            ...alumno.proyect.slice(index + 1)
        ];
        try {
            const { data } = await modificarAlumno({
                variables: {
                    id,
                    alumno: {
                        proyect: result.map((proyect: ProyectInterface) => {
                            return {
                                description: proyect.description,
                                title: proyect.title,
                                link: proyect.link,
                                image: proyect.image,
                                _id: proyect._id
                            };
                        })
                    }
                }
            });
            toast.success('proyect deleted');
        } catch (error) {
            console.log(error);
        }
    };

    const mostrarSpinner = () => {
        if (loading)
            return (
                <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                </div>
            );
    };
    const handleClick1 = () => {
        //debe recibir ademas del mail, el fullName del reclutador y el email a traves del form-modal
        setPropose(true);
    };
    const handleSubmit = () => {
        setPropose(false);
        const information = {
            fullName: fullName,
            contact: contact,
            email: email
        };
        axios.post('http://localhost:3001/contact', information);
        alert('el Alumno ha sido contactado');
        setContact('');
        setfullName('');
    };
    console.log(decode);
    return (
        <div
            className="bg-gradient-to-br from-grayHenry to-gray-500 min-h-screen p-0 m-0"
            id="profileAlumn">
            <div className="p-5 grid grid-cols-6 grid-rows-2 gap-5">
                {/* Perfil */}
                <div className="relative bg-yellow_henry w-auto h-full rounded-lg col-start-1 col-end-3 row-start-1 row-end-2 flex flex-col justify-start self-center items-center pt-5">
                    <button
                        onClick={() => {
                            history.push('/catalogue');
                        }}
                        className="focus:outline-none absolute top-1.5 left-1.5 text-yellow_henry bg-grayHenry w-10 h-10 rounded-full">
                        <svg
                            className="absolute top-2.5 left-2.5"
                            width="20"
                            height="18"
                            viewBox="0 0 20 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.875 1L1 8.875L8.875 16.75"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M1 8.875H19"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <div className="image overflow-hidden w-52 h-52 rounded-full flex justify-center">
                        {alumno.picture ? (
                            loading2 === true ? (
                                <div className="flex justify-center items-center">
                                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                                </div>
                            ) : (
                                <img
                                    className="h-auto w-auto"
                                    src={alumno.picture}
                                    alt=""
                                />
                            )
                        ) : alumno.gender === 'female' ? (
                            <img
                                src={LogoF}
                                alt="f"
                                className="h-auto w-auto"
                            />
                        ) : (
                            <img
                                src={LogoM}
                                alt="m"
                                className="h-auto w-auto"
                            />
                        )}
                    </div>
                    {edit ? (
                        <>
                            <label
                                htmlFor="uploadImage"
                                className="absolute top-12 right-24 text-yellow_henry bg-grayHenry w-10 h-10 rounded-full">
                                <svg
                                    className="absolute top-2.5 right-2"
                                    width="25"
                                    height="21"
                                    viewBox="0 0 18 14"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M16.9286 2.57143H13.7143C12.8884 2.57143 12.858 1.80129 12.8571 1.71429V1.28571C12.8571 0.746571 12.2614 0 11.1429 0H6.87043C5.61257 0 5.15614 0.768857 5.15614 1.28571V1.71171C5.15571 1.74686 5.13557 2.57143 4.28571 2.57143H1.07143C0.787373 2.57177 0.515048 2.68476 0.31419 2.88562C0.113332 3.08648 0.000340255 3.3588 0 3.64286L0 11.3571C0 11.9477 0.480429 12.4286 1.07143 12.4286H3.64286C3.69969 12.4286 3.75419 12.406 3.79438 12.3658C3.83457 12.3256 3.85714 12.2711 3.85714 12.2143C3.85714 12.1575 3.83457 12.1029 3.79438 12.0628C3.75419 12.0226 3.69969 12 3.64286 12H1.07143C0.717 12 0.428571 11.7116 0.428571 11.3571V6H3.85714C3.57346 6.67876 3.42777 7.40721 3.42857 8.14286C3.42857 11.2149 5.928 13.7143 9 13.7143C12.072 13.7143 14.5714 11.2149 14.5714 8.14286C14.5714 7.38386 14.4176 6.66 14.1416 6H17.5714V11.3571C17.5714 11.7116 17.283 12 16.9286 12H13.9286C13.8717 12 13.8172 12.0226 13.777 12.0628C13.7369 12.1029 13.7143 12.1575 13.7143 12.2143C13.7143 12.2711 13.7369 12.3256 13.777 12.3658C13.8172 12.406 13.8717 12.4286 13.9286 12.4286H16.9286C17.5196 12.4286 18 11.9477 18 11.3571V3.64286C18 3.05229 17.5196 2.57143 16.9286 2.57143ZM9 13.2857C6.16414 13.2857 3.85714 10.9787 3.85714 8.14286C3.85714 5.307 6.16414 3 9 3C11.8359 3 14.1429 5.307 14.1429 8.14286C14.1429 10.9787 11.8359 13.2857 9 13.2857ZM14.0357 5.57143C14.0052 5.57164 13.975 5.57852 13.9474 5.59157C13.02 3.80057 11.1523 2.57143 9 2.57143C6.84771 2.57143 4.98 3.80057 4.05257 5.59157C4.02496 5.57852 3.99483 5.57164 3.96429 5.57143H0.428571V3.64286C0.428571 3.28843 0.717 3 1.07143 3H4.28571C5.30057 3 5.57957 2.16086 5.58471 1.71429V1.28571C5.58471 0.941143 5.92714 0.428571 6.87043 0.428571H11.1429C12.0403 0.428571 12.4286 0.996 12.4286 1.28571V1.71429C12.4286 2.15914 12.6973 3 13.7143 3H16.9286C17.283 3 17.5714 3.28843 17.5714 3.64286V5.57143H14.0357Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M4.07185 2.14289C4.12868 2.14289 4.18318 2.12032 4.22337 2.08013C4.26356 2.03994 4.28613 1.98544 4.28613 1.92861V1.50003C4.28613 1.14561 3.9977 0.857178 3.64328 0.857178H1.92899C1.57456 0.857178 1.28613 1.14561 1.28613 1.50003V1.92861C1.28613 1.98544 1.30871 2.03994 1.3489 2.08013C1.38908 2.12032 1.44359 2.14289 1.50042 2.14289C1.55725 2.14289 1.61176 2.12032 1.65194 2.08013C1.69213 2.03994 1.7147 1.98544 1.7147 1.92861V1.50003C1.7147 1.4432 1.73728 1.3887 1.77747 1.34851C1.81765 1.30833 1.87216 1.28575 1.92899 1.28575H3.64328C3.70011 1.28575 3.75461 1.30833 3.7948 1.34851C3.83499 1.3887 3.85756 1.4432 3.85756 1.50003V1.92861C3.85756 1.98544 3.88014 2.03994 3.92032 2.08013C3.96051 2.12032 4.01502 2.14289 4.07185 2.14289Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M8.99972 4.28564C6.87272 4.28564 5.14258 6.01622 5.14258 8.14279C5.14258 10.2694 6.87272 11.9999 8.99972 11.9999C11.1267 11.9999 12.8569 10.2694 12.8569 8.14279C12.8569 6.01622 11.1267 4.28564 8.99972 4.28564ZM8.99972 11.5714C7.10929 11.5714 5.57115 10.0332 5.57115 8.14279C5.57115 6.25236 7.10929 4.71422 8.99972 4.71422C10.8901 4.71422 12.4283 6.25236 12.4283 8.14279C12.4283 10.0332 10.8901 11.5714 8.99972 11.5714Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </label>
                            <input
                                id="uploadImage"
                                type="file"
                                onChange={(e) => {
                                    changeImage(e, id);
                                }}
                                style={{ display: 'none' }}
                            />
                        </>
                    ) : null}
                    <div className="flex flex-col items-center w-full my-5">
                        <div className="px-3">
                            <h3 className="py-3 text-grayHenry text-semibold text-lg uppercase text-center">
                                About Me
                            </h3>
                            <p className="w-auto h-auto text-base text-light text-grayHenry text-justify">
                                {alumno.description}
                            </p>
                        </div>

                        <div className="w-full px-3">
                            <div className="flex text-left items-center text-2xl font-bold my-5 text-grayHenry leading-8">
                                Abilities
                                {edit ? (
                                    <button
                                        onClick={() => {
                                            SetFormName('abilities');
                                            setShow(true);
                                        }}
                                        className="relative ml-2 text-yellow_henry bg-grayHenry w-10 h-10 rounded-full focus:outline-none">
                                        <svg
                                            className="absolute top-2.5 right-2.5"
                                            width="19"
                                            height="18"
                                            viewBox="0 0 19 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10 9H1M10 18V9V18ZM10 9V0V9ZM10 9H19H10Z"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </button>
                                ) : null}
                            </div>
                            <div className="flex flex-wrap">
                                {alumno &&
                                    alumno.abilities.map(
                                        (
                                            ability: Array<string>,
                                            index: number
                                        ) => (
                                            <h3
                                                key={index}
                                                className="h-8 w-auto align-middle px-1 border-2 border-grayHenry rounded-lg text-grayHenry mr-3">
                                                {ability}
                                            </h3>
                                        )
                                    )}
                            </div>
                        </div>
                        <div className="flex flex-row justify-around items-center mt-5">
                            {decode.role === 'alumno' ? null : (
                                <button
                                    className="w-28 h-10 font-medium text-white transition-colors duration-200 transform bg-grayHenry rounded-md dark:bg-gray-800 hover:bg-gray-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700"
                                    onClick={() => handleClick1()}>
                                    Propose
                                </button>
                            )}
                        </div>
                    </div>
                </div>
                {/* Info Personal */}
                <div
                    className={
                        edit
                            ? 'w-full h-auto col-start-3 col-end-6 row-start-1 row-end-2 grid grid-rows-2 mb-5'
                            : 'w-full h-auto col-start-3 col-end-7 row-start-1 row-end-2 grid grid-rows-2 mb-5'
                    }>
                    <div className="flex flex-col justify-center bg-yellow_henry p-5 rounded-lg row-start-1 row-end-2">
                        <div className="flex flex-col font-semibold text-grayHenry">
                            <div className="flex flex-row items-center text-2xl font-bold mb-7 border-b border-grayHenry pb-3">
                                Personal Info
                                {edit ? (
                                    <button
                                        onClick={() => {
                                            SetFormName('profile');
                                            setShow(true);
                                        }}
                                        className="relative bg-grayHenry rounded-full w-10 h-10 ml-2 text-yellow_henry focus:outline-none">
                                        <svg
                                            className="absolute right-2.5 top-2.5 "
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M0 14.2505V18H3.74948L14.8079 6.94154L11.0585 3.19206L0 14.2505ZM17.7075 4.04194C18.0975 3.65199 18.0975 3.02208 17.7075 2.63213L15.3679 0.292459C14.9779 -0.0974865 14.348 -0.0974865 13.9581 0.292459L12.1283 2.12221L15.8778 5.87168L17.7075 4.04194V4.04194Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    </button>
                                ) : null}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5">
                            <div className="col-start-1 col-end-2 flex flex-col text-white text-base">
                                <h3 className="h-10 w-full pl-5 pt-1.5 rounded-full bg-grayHenry bg-opacity-50 mb-2 capitalize">
                                    First Name: <b>{alumno.name}</b>
                                </h3>
                                <h3 className="h-10 w-full pl-5 pt-1.5 rounded-full bg-grayHenry bg-opacity-50 mb-2 capitalize">
                                    Last Name: <b>{alumno.surname}</b>
                                </h3>
                                <h3 className="h-10 w-full pl-5 pt-1.5 rounded-full bg-grayHenry bg-opacity-50 mb-2 capitalize">
                                    Gender: <b>{alumno.gender}</b>
                                </h3>
                                <h3 className="h-10 w-full pl-5 pt-1.5 rounded-full bg-grayHenry bg-opacity-50 capitalize">
                                    Phone: <b>{alumno.phone}</b>
                                </h3>
                            </div>

                            <div className="col-start-2 col-end-3 flex flex-col text-white text-base">
                                <h3 className="h-10 w-full pl-5 pt-1.5 rounded-full bg-grayHenry bg-opacity-50 mb-2 capitalize">
                                    Country: <b>{alumno.country}</b>
                                </h3>
                                <h3 className="h-10 w-full pl-5 pt-1.5 rounded-full bg-grayHenry bg-opacity-50 mb-2 capitalize">
                                    Location: <b>{alumno.location}</b>
                                </h3>
                                <h3 className="h-10 w-full pl-5 pt-1.5 rounded-full bg-grayHenry bg-opacity-50 mb-2">
                                    Email: <b>{alumno.email}</b>
                                </h3>
                                <h3 className="h-10 w-full pl-5 pt-1.5 rounded-full bg-grayHenry bg-opacity-50  ">
                                    Birthday: <b>{alumno.Birthdate}</b>
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Experiencia y Educacion */}
                    <div className="bg-yellow_henry p-5 h-full rounded-lg mt-5 row-start-2 row-end-3">
                        <div className="grid grid-rows-2">
                            <div className="row-start-1 row-end-2">
                                <div className="flex items-center space-x-2 font-semibold text-grayHenry text-2xl font-bold leading-8 text-2xl font-bold mb-3">
                                    Experience
                                    {edit ? (
                                        <button
                                            onClick={() => {
                                                SetFormName('experience_add');
                                                setShow(true);
                                            }}
                                            className="relative bg-grayHenry rounded-full w-10 h-10 ml-2 text-yellow_henry focus:outline-none">
                                            <svg
                                                className="absolute right-2.5 top-2.5 "
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0 14.2505V18H3.74948L14.8079 6.94154L11.0585 3.19206L0 14.2505ZM17.7075 4.04194C18.0975 3.65199 18.0975 3.02208 17.7075 2.63213L15.3679 0.292459C14.9779 -0.0974865 14.348 -0.0974865 13.9581 0.292459L12.1283 2.12221L15.8778 5.87168L17.7075 4.04194V4.04194Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </button>
                                    ) : null}
                                </div>
                                <div className="flex flex-col">
                                    {alumno?.experience.map(
                                        (
                                            experience: ProfessionalBackground,
                                            index: number
                                        ) => (
                                            <div
                                                key={index}
                                                className="flex flex-row ">
                                                <div className="relative flex flex-col rounded-full bg-grayHenry bg-opacity-50 mb-3 w-full mr-3 text-white text-lg">
                                                    <h3 className="h-8 w-full pl-5 pt-1 mb-2 align-middle">
                                                        {experience.description}{' '}
                                                        - {experience.timeLapse}
                                                    </h3>
                                                    {edit ? (
                                                        <>
                                                            <svg
                                                                onClick={() => {
                                                                    setShow(
                                                                        true
                                                                    );
                                                                    setExperienceId(
                                                                        experience._id
                                                                    );
                                                                    SetFormName(
                                                                        'experience_edit'
                                                                    );
                                                                }}
                                                                className="absolute top-3 right-4"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21928L15.74 3.59283V3.59283Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                            <svg
                                                                onClick={() => {
                                                                    deleteExperience(
                                                                        id,
                                                                        index
                                                                    );
                                                                }}
                                                                className="absolute top-2.5 right-12"
                                                                width="16"
                                                                height="20"
                                                                viewBox="0 0 16 20"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg">
                                                                <path
                                                                    d="M5.3335 7.16675H6.66683V15.1667H5.3335V7.16675Z"
                                                                    fill="currentColor"
                                                                />
                                                                <path
                                                                    d="M9.3335 7.16675H10.6668V15.1667H9.3335V7.16675Z"
                                                                    fill="currentColor"
                                                                />
                                                                <path
                                                                    d="M0 3.16675V4.50008H1.33333V17.8334C1.33333 18.187 1.47381 18.5262 1.72386 18.7762C1.97391 19.0263 2.31304 19.1667 2.66667 19.1667H13.3333C13.687 19.1667 14.0261 19.0263 14.2761 18.7762C14.5262 18.5262 14.6667 18.187 14.6667 17.8334V4.50008H16V3.16675H0ZM2.66667 17.8334V4.50008H13.3333V17.8334H2.66667Z"
                                                                    fill="currentColor"
                                                                />
                                                                <path
                                                                    d="M5.3335 0.5H10.6668V1.83333H5.3335V0.5Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>{' '}
                                                        </>
                                                    ) : null}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                            <div className="row-start-2 row-end-3">
                                <div className="flex items-center space-x-2 font-semibold text-grayHenry text-2xl font-bold leading-8 text-2xl font-bold mb-3 ">
                                    Education
                                    {edit ? (
                                        <button
                                            onClick={() => {
                                                setShow(true);
                                                SetFormName('education_add');
                                            }}
                                            className="relative bg-grayHenry rounded-full w-10 h-10 ml-2 text-yellow_henry focus:outline-none">
                                            <svg
                                                className="absolute right-2.5 top-2.5 "
                                                width="18"
                                                height="18"
                                                viewBox="0 0 18 18"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M0 14.2505V18H3.74948L14.8079 6.94154L11.0585 3.19206L0 14.2505ZM17.7075 4.04194C18.0975 3.65199 18.0975 3.02208 17.7075 2.63213L15.3679 0.292459C14.9779 -0.0974865 14.348 -0.0974865 13.9581 0.292459L12.1283 2.12221L15.8778 5.87168L17.7075 4.04194V4.04194Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </button>
                                    ) : null}
                                </div>
                                <div className="flex flex-col">
                                    {alumno &&
                                        alumno.education.map(
                                            (
                                                education: ProfessionalBackground,
                                                index: number
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-row ">
                                                    <div className="relative flex flex-col rounded-full bg-grayHenry bg-opacity-50 mb-3 w-full mr-3 text-white text-lg">
                                                        <h3 className="h-8 w-full pl-5 pt-1 mb-2 align-middle">
                                                            {
                                                                education.description
                                                            }{' '}
                                                            -{' '}
                                                            {
                                                                education.timeLapse
                                                            }
                                                        </h3>
                                                        {edit ? (
                                                            <>
                                                                <svg
                                                                    onClick={() => {
                                                                        setShow(
                                                                            true
                                                                        );
                                                                        setExperienceId(
                                                                            education._id
                                                                        );
                                                                        SetFormName(
                                                                            'experience_edit'
                                                                        );
                                                                    }}
                                                                    className="absolute top-3 right-4"
                                                                    width="16"
                                                                    height="16"
                                                                    viewBox="0 0 16 16"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21928L15.74 3.59283V3.59283Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                                <svg
                                                                    onClick={() => {
                                                                        deleteExperience(
                                                                            id,
                                                                            index
                                                                        );
                                                                    }}
                                                                    className="absolute top-2.5 right-12"
                                                                    width="16"
                                                                    height="20"
                                                                    viewBox="0 0 16 20"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M5.3335 7.16675H6.66683V15.1667H5.3335V7.16675Z"
                                                                        fill="currentColor"
                                                                    />
                                                                    <path
                                                                        d="M9.3335 7.16675H10.6668V15.1667H9.3335V7.16675Z"
                                                                        fill="currentColor"
                                                                    />
                                                                    <path
                                                                        d="M0 3.16675V4.50008H1.33333V17.8334C1.33333 18.187 1.47381 18.5262 1.72386 18.7762C1.97391 19.0263 2.31304 19.1667 2.66667 19.1667H13.3333C13.687 19.1667 14.0261 19.0263 14.2761 18.7762C14.5262 18.5262 14.6667 18.187 14.6667 17.8334V4.50008H16V3.16675H0ZM2.66667 17.8334V4.50008H13.3333V17.8334H2.66667Z"
                                                                        fill="currentColor"
                                                                    />
                                                                    <path
                                                                        d="M5.3335 0.5H10.6668V1.83333H5.3335V0.5Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>{' '}
                                                            </>
                                                        ) : null}
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                            {/* <AddReview id={alumno._id} /> */}
                        </div>
                        {/* <Review id={alumno._id} /> */}
                    </div>
                </div>

                {/* Favoritos */}
                <div
                    className={
                        edit
                            ? 'w-full h-full col-start-6 col-end-7 row-start-1 row-end-2'
                            : 'hidden'
                    }>
                    <h5 className="text-center text-lg font-bold uppercase text-grayHenry w-auto h-10 bg-yellow_henry rounded-lg pt-1.5">
                        My Favorites
                    </h5>
                    {alumno.favorites.length === 0 ? (
                        <p className="text-center uppercase text-white pt-5">{`You don't have any favorite`}</p>
                    ) : (
                        alumno?.favorites.map(
                            (favorite: any, index: number) => {
                                return (
                                    <div key={index}>
                                        <Favorites
                                            idA={alumno._id}
                                            idF={favorite._id}
                                            offer={favorite.offer}
                                            offerID={favorite.offerID}
                                        />
                                    </div>
                                );
                            }
                        )
                    )}
                </div>

                {/* Portfolio */}
                <div className="bg-yellow_henry w-full h-auto p-5 rounded-lg col-start-1 col-end-7 row-start-2 row-end-3">
                    <div className="carousel-wrapper">
                        <div className="flex text-left items-center text-2xl font-bold my-5 text-grayHenry leading-8 ">
                            Proyect
                            {edit ? (
                                <button
                                    onClick={() => {
                                        setShow(true);
                                        SetFormName('proyect_add');
                                    }}
                                    className="relative ml-2 text-yellow_henry bg-grayHenry w-10 h-10 rounded-full focus:outline-none">
                                    <svg
                                        className="absolute top-2.5 right-2.5"
                                        width="19"
                                        height="18"
                                        viewBox="0 0 19 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M10 9H1M10 18V9V18ZM10 9V0V9ZM10 9H19H10Z"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            ) : null}
                        </div>
                        <Carousel
                            isRTL={false}
                            itemsToShow={count()}
                            itemPadding={[5, 10]}>
                            {alumno &&
                                alumno.proyect.map(
                                    (
                                        proyect: ProyectInterface,
                                        index: number
                                    ) => (
                                        <div
                                            key={index}
                                            className="bg-grayHenry rounded-lg text-white w-96 h-auto">
                                            <div className="flex items-center justify-between uppercase font-semibold text-shadow mx-3 my-3">
                                                {proyect.title}
                                                {edit ? (
                                                    <div className="flex flex-row ">
                                                        <svg
                                                            onClick={() => {
                                                                setShow(true);
                                                                setProyectId(
                                                                    proyect._id
                                                                );
                                                                console.log(
                                                                    proyect._id
                                                                );
                                                                SetFormName(
                                                                    'proyect_edit'
                                                                );
                                                            }}
                                                            className="ml-2 text-white focus:outline-none"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 18 18"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M0 14.2505V18H3.74948L14.8079 6.94154L11.0585 3.19206L0 14.2505ZM17.7075 4.04194C18.0975 3.65199 18.0975 3.02208 17.7075 2.63213L15.3679 0.292459C14.9779 -0.0974865 14.348 -0.0974865 13.9581 0.292459L12.1283 2.12221L15.8778 5.87168L17.7075 4.04194V4.04194Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                        <svg
                                                            onClick={() => {
                                                                deleteProyect(
                                                                    id,
                                                                    index
                                                                );
                                                            }}
                                                            className="ml-2 text-white focus:outline-none"
                                                            width="16"
                                                            height="20"
                                                            viewBox="0 0 16 20"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                                d="M5.3335 7.16675H6.66683V15.1667H5.3335V7.16675Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M9.3335 7.16675H10.6668V15.1667H9.3335V7.16675Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M0 3.16675V4.50008H1.33333V17.8334C1.33333 18.187 1.47381 18.5262 1.72386 18.7762C1.97391 19.0263 2.31304 19.1667 2.66667 19.1667H13.3333C13.687 19.1667 14.0261 19.0263 14.2761 18.7762C14.5262 18.5262 14.6667 18.187 14.6667 17.8334V4.50008H16V3.16675H0ZM2.66667 17.8334V4.50008H13.3333V17.8334H2.66667Z"
                                                                fill="currentColor"
                                                            />
                                                            <path
                                                                d="M5.3335 0.5H10.6668V1.83333H5.3335V0.5Z"
                                                                fill="currentColor"
                                                            />
                                                        </svg>
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div className="flex flex-col justify-center items-center">
                                                <div className="relative w-80 h-52 overflow-hidden image flex justify-center rounded-lg">
                                                    {loading2 === true ? (
                                                        <div className="flex justify-center items-center">
                                                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                                                        </div>
                                                    ) : (
                                                        <img
                                                            src={proyect.image}
                                                            alt="image1"
                                                            className="h-ful w-full object-cover"
                                                        />
                                                    )}
                                                    {edit ? (
                                                        <>
                                                            <label
                                                                htmlFor="uploadImageProyect"
                                                                className="absolute bottom-2 left-2 text-yellow_henry bg-grayHenry w-10 h-10 rounded-full">
                                                                <svg
                                                                    onClick={() =>
                                                                        setImageProyectId(
                                                                            {
                                                                                id:
                                                                                    proyect._id,
                                                                                link:
                                                                                    proyect.link,
                                                                                description:
                                                                                    proyect.description,
                                                                                title:
                                                                                    proyect.title
                                                                            }
                                                                        )
                                                                    }
                                                                    className="absolute top-2.5 right-2"
                                                                    width="25"
                                                                    height="21"
                                                                    viewBox="0 0 18 14"
                                                                    fill="none"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path
                                                                        d="M16.9286 2.57143H13.7143C12.8884 2.57143 12.858 1.80129 12.8571 1.71429V1.28571C12.8571 0.746571 12.2614 0 11.1429 0H6.87043C5.61257 0 5.15614 0.768857 5.15614 1.28571V1.71171C5.15571 1.74686 5.13557 2.57143 4.28571 2.57143H1.07143C0.787373 2.57177 0.515048 2.68476 0.31419 2.88562C0.113332 3.08648 0.000340255 3.3588 0 3.64286L0 11.3571C0 11.9477 0.480429 12.4286 1.07143 12.4286H3.64286C3.69969 12.4286 3.75419 12.406 3.79438 12.3658C3.83457 12.3256 3.85714 12.2711 3.85714 12.2143C3.85714 12.1575 3.83457 12.1029 3.79438 12.0628C3.75419 12.0226 3.69969 12 3.64286 12H1.07143C0.717 12 0.428571 11.7116 0.428571 11.3571V6H3.85714C3.57346 6.67876 3.42777 7.40721 3.42857 8.14286C3.42857 11.2149 5.928 13.7143 9 13.7143C12.072 13.7143 14.5714 11.2149 14.5714 8.14286C14.5714 7.38386 14.4176 6.66 14.1416 6H17.5714V11.3571C17.5714 11.7116 17.283 12 16.9286 12H13.9286C13.8717 12 13.8172 12.0226 13.777 12.0628C13.7369 12.1029 13.7143 12.1575 13.7143 12.2143C13.7143 12.2711 13.7369 12.3256 13.777 12.3658C13.8172 12.406 13.8717 12.4286 13.9286 12.4286H16.9286C17.5196 12.4286 18 11.9477 18 11.3571V3.64286C18 3.05229 17.5196 2.57143 16.9286 2.57143ZM9 13.2857C6.16414 13.2857 3.85714 10.9787 3.85714 8.14286C3.85714 5.307 6.16414 3 9 3C11.8359 3 14.1429 5.307 14.1429 8.14286C14.1429 10.9787 11.8359 13.2857 9 13.2857ZM14.0357 5.57143C14.0052 5.57164 13.975 5.57852 13.9474 5.59157C13.02 3.80057 11.1523 2.57143 9 2.57143C6.84771 2.57143 4.98 3.80057 4.05257 5.59157C4.02496 5.57852 3.99483 5.57164 3.96429 5.57143H0.428571V3.64286C0.428571 3.28843 0.717 3 1.07143 3H4.28571C5.30057 3 5.57957 2.16086 5.58471 1.71429V1.28571C5.58471 0.941143 5.92714 0.428571 6.87043 0.428571H11.1429C12.0403 0.428571 12.4286 0.996 12.4286 1.28571V1.71429C12.4286 2.15914 12.6973 3 13.7143 3H16.9286C17.283 3 17.5714 3.28843 17.5714 3.64286V5.57143H14.0357Z"
                                                                        fill="currentColor"
                                                                    />
                                                                    <path
                                                                        d="M4.07185 2.14289C4.12868 2.14289 4.18318 2.12032 4.22337 2.08013C4.26356 2.03994 4.28613 1.98544 4.28613 1.92861V1.50003C4.28613 1.14561 3.9977 0.857178 3.64328 0.857178H1.92899C1.57456 0.857178 1.28613 1.14561 1.28613 1.50003V1.92861C1.28613 1.98544 1.30871 2.03994 1.3489 2.08013C1.38908 2.12032 1.44359 2.14289 1.50042 2.14289C1.55725 2.14289 1.61176 2.12032 1.65194 2.08013C1.69213 2.03994 1.7147 1.98544 1.7147 1.92861V1.50003C1.7147 1.4432 1.73728 1.3887 1.77747 1.34851C1.81765 1.30833 1.87216 1.28575 1.92899 1.28575H3.64328C3.70011 1.28575 3.75461 1.30833 3.7948 1.34851C3.83499 1.3887 3.85756 1.4432 3.85756 1.50003V1.92861C3.85756 1.98544 3.88014 2.03994 3.92032 2.08013C3.96051 2.12032 4.01502 2.14289 4.07185 2.14289Z"
                                                                        fill="currentColor"
                                                                    />
                                                                    <path
                                                                        d="M8.99972 4.28564C6.87272 4.28564 5.14258 6.01622 5.14258 8.14279C5.14258 10.2694 6.87272 11.9999 8.99972 11.9999C11.1267 11.9999 12.8569 10.2694 12.8569 8.14279C12.8569 6.01622 11.1267 4.28564 8.99972 4.28564ZM8.99972 11.5714C7.10929 11.5714 5.57115 10.0332 5.57115 8.14279C5.57115 6.25236 7.10929 4.71422 8.99972 4.71422C10.8901 4.71422 12.4283 6.25236 12.4283 8.14279C12.4283 10.0332 10.8901 11.5714 8.99972 11.5714Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                            </label>
                                                            <input
                                                                id="uploadImageProyect"
                                                                type="file"
                                                                name={
                                                                    proyect._id
                                                                }
                                                                onChange={(
                                                                    e
                                                                ) => {
                                                                    changeImageProyect(
                                                                        e,
                                                                        id
                                                                    );
                                                                }}
                                                                style={{
                                                                    display:
                                                                        'none'
                                                                }}
                                                            />
                                                        </>
                                                    ) : null}
                                                </div>

                                                <div className="font-light capitalize w-full text-sm px-3 my-3">
                                                    <ShowMore
                                                        lines={1}
                                                        more="Show more"
                                                        less="Show less"
                                                        anchorClass="text-white ml-2">
                                                        {proyect.description}
                                                    </ShowMore>
                                                </div>

                                                <div className="w-40 flex justify-end self-end mb-5 mr-5">
                                                    <button className="bg-yellow_henry text-grayHenry w-full h-10 px-1.5 py-0.1 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-40 hover:bg-opacity-10 text-lg ">
                                                        <a
                                                            href={proyect.link}
                                                            target="_blank"
                                                            rel="noreferrer">
                                                            Go to project
                                                        </a>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                        </Carousel>
                    </div>
                </div>
            </div>
            <Modal
                alumnId={alumno._id}
                formName={formName}
                experienceId={experienceId}
                educationId={educationId}
                proyectId={proyectId}
                title="My Modal"
                onClose={() => setShow(false)}
                show={show}></Modal>
            {propose ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-2xl relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                                <div className="flex items-start justify-between items-center p-5 border-b border-solid border-yellow_henry rounded-t">
                                    <h3 className="text-xl font-semibold mr-10 text-white">
                                        Write the requested information to
                                        contact Henry
                                    </h3>
                                    <button
                                        className=" ml-auto text-white float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setPropose(false)}>
                                        ×
                                    </button>
                                </div>
                                <div className="grid grid gap-x-5">
                                    <div className="col-start-1 grid">
                                        <div className="col-start-1 col flex flex-col justify-center items-center text-white text-lg">
                                            <div className="flex flex-col justify-center items-center self-center">
                                                <label
                                                    htmlFor="name"
                                                    className="mb-3 text-lg text-white font-bold">
                                                    Email contact
                                                </label>
                                                <input
                                                    id="studentEmail"
                                                    name="email"
                                                    className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                    type="email"
                                                    value={contact}
                                                    onChange={(e) => {
                                                        setContact(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <label
                                                    htmlFor="name"
                                                    className="mb-3 text-lg text-white font-bold">
                                                    Company name
                                                </label>
                                                <input
                                                    id="studentEmail"
                                                    name="email"
                                                    className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                                    type="email"
                                                    value={fullName}
                                                    onChange={(e) => {
                                                        setfullName(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative p-6 flex-auto flex-col justify-center self-center "></div>
                                <div className="flex items-center justify-end p-4 border-t border-solid border-yellow_henry rounded-b">
                                    <button
                                        className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1"
                                        type="button"
                                        style={{
                                            transition: 'all .15s ease'
                                        }}
                                        onClick={handleSubmit}>
                                        Send mail
                                    </button>
                                    <button
                                        className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{
                                            transition: 'all .15s ease'
                                        }}
                                        onClick={() => setPropose(false)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-white"></div>
                </>
            ) : null}
        </div>
    );
};

export default ProfileAlumn;
