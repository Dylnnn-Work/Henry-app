import { gql, useMutation, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import firebase from '../../../firebase';
import LogoJ from '../../Catalogue/Images/job.png';

const EDIT_CARD = gql`
    mutation($id: ID, $empresa: EmpresaInput) {
        modificarEmpresa(_id: $id, empresa: $empresa) {
            name
            picture
            linkPage
            description
            _id
        }
    }
`;

const GET_CARD_DETAIL = gql`
    query($id: ID) {
        empresa(_id: $id) {
            name
            picture
            linkPage
            description
            _id
        }
    }
`;

const CardPerfil: React.FC = () => {
    const history = useHistory();
    const [showModal, setShowModal] = useState<boolean>(false);
    const storage = firebase.storage();
    const { id } = useParams<any>();
    const [modificarEmpresa] = useMutation(EDIT_CARD);
    const { data, loading, error } = useQuery(GET_CARD_DETAIL, {
        variables: {
            id: id
        }
    });
    const changeImage = async (e: any, id: string) => {
        const file = e.target.files[0];
        const Ref = storage.ref().child(`/Fotos/${file.name}`);
        await Ref.put(file);
        const url = await Ref.getDownloadURL();
        try {
            const { data } = await modificarEmpresa({
                variables: {
                    id,
                    empresa: {
                        picture: url
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: data?.empresa.name,
            linkPage: data?.empresa.linkPage,
            description: data?.empresa.description
        },
        onSubmit: async (valores, { resetForm }) => {
            try {
                const { data } = await modificarEmpresa({
                    variables: {
                        id: id,
                        empresa: {
                            name: valores.name,
                            linkPage: valores.linkPage,
                            description: valores.description
                        }
                    },
                    update: async (cache) => {
                        const cacheEdit: any = await cache.readQuery({
                            query: GET_CARD_DETAIL,
                            variables: { id: id }
                        });
                        await cache.writeQuery({
                            query: GET_CARD_DETAIL,
                            data: cacheEdit,
                            variables: { id: id }
                        });
                    }
                });
                setShowModal(false);
            } catch (error) {
                console.log(error);
            }
            resetForm();
        }
    });

    return (
        <div>
            <div className="relative bg-yellow_henry w-auto h-full flex flex-col justify-center items-center rounded-lg">
                <div className="flex flex-row justify-center uppercase font-bold text-grayHenry border-b border-grayHenry py-3">
                    <p>{data?.empresa.name}</p>
                </div>
                <div className="p-3 text-grayHenry text-center flex flex-col items-center">
                    <div className="relative h-52 w-52 mb-5">
                        <img
                            src={
                                data?.empresa.picture
                                    ? data?.empresa.picture
                                    : LogoJ
                            }
                            alt="Some"
                            className="w-full h-full object-cover flex self-center rounded-full shadow-lg mb-6"
                        />
                        <label
                            htmlFor="uploadImage"
                            className="absolute top-2 right-2 text-yellow_henry rounded-full bg-grayHenry w-8 h-8">
                            <svg
                                className="absolute left-1 bottom-1.5"
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
                    </div>
                    <a
                        className="font-bold text-sm uppercase mb-2 text-blue-darker"
                        href={data?.empresa.linkPage}>
                        {data?.empresa.linkPage}
                    </a>
                    <div className="flex flex-row justify-center uppercase font-bold text-blue-dark border-b border-grayHenry py-2">
                        <h5>ABOUT US</h5>
                    </div>
                    <p className="text-grayHenry break-words text-justify px-3 pt-3 pb-6 text-base font-light">
                        {data?.empresa.description}
                    </p>
                </div>
                <button className="absolute top-80 right-32 text-yellow_henry rounded-full bg-grayHenry w-8 h-8">
                    <svg
                        onClick={() => setShowModal(true)}
                        className="absolute top-1.5 left-2 text-yellow_henry "
                        width="18"
                        height="18"
                        viewBox="0 0 24 25"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0 19.9983V24.9976H4.99931L19.7439 10.2529L14.7446 5.25363L0 19.9983ZM23.6101 6.38681C24.13 5.86688 24.13 5.027 23.6101 4.50707L20.4905 1.3875C19.9706 0.867577 19.1307 0.867577 18.6107 1.3875L16.1711 3.82717L21.1704 8.82647L23.6101 6.38681V6.38681Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
                <button
                    className="absolute top-2 left-2 text-yellow_henry rounded-full bg-grayHenry w-8 h-8"
                    onClick={() => {
                        history.push('/catalogue');
                    }}>
                    <svg
                        className="absolute top-1.5 left-1.5 text-yellow_henry "
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
            </div>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-2xl relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                                <div className="relative p-6 flex-auto flex-col justify-center self-center ">
                                    <form
                                        onSubmit={formik.handleSubmit}
                                        className="flex flex-col justify-center">
                                        <h3 className="mb-5 text-2xl text-white font-bold border-b border-yellow_henry pb-5">
                                            Edit the info of your profile
                                        </h3>
                                        <div className="flex flex-col">
                                            <label
                                                htmlFor="name"
                                                className="mb-3 text-lg text-white font-bold">
                                                Name of Company
                                            </label>
                                            <input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                className="h-10 rounded-full pl-5 focus:outline-none opacity-50"
                                            />
                                        </div>
                                        <div className="mt-5 flex flex-col">
                                            <label
                                                htmlFor="linkPage"
                                                className="mb-3 text-lg text-white font-bold">
                                                Add the link of your page
                                            </label>
                                            <input
                                                id="linkPage"
                                                type="text"
                                                name="linkPage"
                                                value={formik.values.linkPage}
                                                onChange={formik.handleChange}
                                                className="h-10 rounded-full pl-5 focus:outline-none opacity-50"
                                            />
                                        </div>
                                        <div className="mt-5 flex flex-col">
                                            <label
                                                htmlFor="description"
                                                className="mb-3 text-lg text-white font-bold">
                                                Add a description of your
                                                company
                                            </label>
                                            <textarea
                                                id="description"
                                                name="description"
                                                value={
                                                    formik.values.description
                                                }
                                                onChange={formik.handleChange}
                                                className="h-48 rounded-lg p-5 focus:outline-none opacity-50"
                                            />
                                        </div>
                                        <div className="flex items-center justify-end border-solid border-yellow_henry rounded-b mt-5">
                                            <button
                                                className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-4 mb-1"
                                                type="submit"
                                                style={{
                                                    transition: 'all .15s ease'
                                                }}>
                                                SAVE CHANGE
                                            </button>
                                            <button
                                                className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                type="button"
                                                style={{
                                                    transition: 'all .15s ease'
                                                }}
                                                onClick={() =>
                                                    setShowModal(false)
                                                }>
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
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

export default CardPerfil;
