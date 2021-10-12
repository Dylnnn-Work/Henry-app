import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Favs {
    offer: string;
    offerID: string;
    idF: string;
    idA: string;
}

const OFERTA = gql`
    query($id: ID) {
        oferta(_id: $id) {
            _id
            title
            company
            postulants
            description
            requirements
            experienceLevel
            wayOfWork
            languages
            jobType
            position
            location
        }
    }
`;

const DELETE_FAV = gql`
    mutation($id: ID, $token: String) {
        deleteFavS(_id: $id, token: $token) {
            favorites {
                _id
                offer
                offerID
            }
            _id
        }
    }
`;

const QUERY = gql`
    query alumno($id: ID) {
        alumno(_id: $id) {
            _id
            favorites {
                _id
                offer
                offerID
            }
        }
    }
`;
const Favorites: React.FC<Favs> = ({ offer, offerID, idF, idA }) => {
    console.log(idF);
    const token = localStorage.getItem('token');
    const [showModal, setShowModal] = useState(false);
    const [deleteFavS] = useMutation(DELETE_FAV);
    const { data } = useQuery(OFERTA, {
        variables: {
            id: offerID
        }
    });

    const handleDelete = async (id: string) => {
        try {
            const { data } = await deleteFavS({
                variables: {
                    token: token,
                    id: id
                },
                update: async (cache) => {
                    const favorites: any = await cache.readQuery({
                        query: QUERY,
                        variables: { id: idA }
                    });
                    cache.writeQuery({
                        query: QUERY,
                        data: {
                            alumno: {
                                favorites: favorites?.alumno.favorites.filter(
                                    (fav: any) => fav._id !== id
                                )
                            }
                        },
                        variables: { id: idA }
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto max-w-sm h-auto flex flex-col justify-center items-center mt-5">
            <div className="bg-grayHenry border-yellow_henry border-4 w-full flex flex-row justify-center self-center items-center p-2 rounded-lg shadow border">
                <button
                    className="text-white focus:outline-none"
                    onClick={() => setShowModal(true)}>
                    {offer}
                </button>
                <button
                    className="text-white focus:outline-none"
                    onClick={() => handleDelete(idF)}>
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M18.2375 10L15 13.2375L11.7625 10L10 11.7625L13.2375 15L10 18.2375L11.7625 20L15 16.7625L18.2375 20L20 18.2375L16.7625 15L20 11.7625L18.2375 10Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-2xl relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                                <div className="text-center p-5 ">
                                    <h3 className="text-xl font-semibold text-white">
                                        {data?.title.toUpperCase()}
                                    </h3>
                                    <h3 className="text-xl font-semibold text-white">
                                        {data?.company.charAt(0).toUpperCase() +
                                            data?.company.slice(1)}
                                    </h3>
                                </div>
                                <div>
                                    <h4 className="text-base pt-3 pl-5  text-white">
                                        Job type: {data.jobType}
                                    </h4>
                                    <h4 className="text-base pl-5  text-white">
                                        Experience level: {data.experienceLevel}
                                    </h4>
                                    <h4 className="text-base pl-5  text-white">
                                        Role: {data.position + ' Developer'}
                                    </h4>
                                </div>
                                <h4 className="text-base p-5  text-white">
                                    {data.description}
                                </h4>
                                <div className="relative p-6 flex-auto flex-col justify-center self-center ">
                                    <h4 className="text-center text-base font-semibold text-white">
                                        Technologies
                                    </h4>
                                    <div className="flex flex-row">
                                        {data.requirements.map(
                                            (req: any, index: number) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="border-solid border rounded p-1 m-2 text-center border-yellow_henry text-white">
                                                        {req}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
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
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    );
};

export default Favorites;
