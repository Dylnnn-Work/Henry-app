import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';

interface Favs {
    postulant: string;
    postulantID: string;
    offer: string;
    offerID: string;
    idE: string;
    idF: string;
}

const DELETE_FAV = gql`
    mutation($id: ID, $token: String) {
        deleteFav(_id: $id, token: $token) {
            favorites {
                _id
                offer
                offerID
                postulantID
                postulant
            }
            _id
        }
    }
`;

const GET_FAVS = gql`
    query($id: ID) {
        empresa(_id: $id) {
            favorites {
                _id
                postulant
                postulantID
                offer
                offerID
            }
            _id
        }
    }
`;

const Favorites: React.FC<Favs> = ({
    postulant,
    postulantID,
    offer,
    offerID,
    idE,
    idF
}) => {
    const token = localStorage.getItem('token');
    const [deleteFav] = useMutation(DELETE_FAV);
    const handleDelete = async (id: string) => {
        console.log('entre');
        try {
            console.log('entrealtry');
            const { data } = await deleteFav({
                variables: {
                    token: token,
                    id: id
                },
                update: async (cache) => {
                    const favorites: any = await cache.readQuery({
                        query: GET_FAVS,
                        variables: { id: idE }
                    });
                    cache.writeQuery({
                        query: GET_FAVS,
                        data: {
                            empresa: {
                                favorites: favorites?.empresa.favorites.filter(
                                    (fav: any) => fav._id !== id
                                )
                            }
                        },
                        variables: { id: idE }
                    });
                }
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mx-auto max-w-sm h-auto flex flex-col justify-center items-center mt-5">
            <div className="bg-grayHenry border-yellow_henry border-4 w-full flex items-center p-2 rounded-lg shadow border">
                <div className="flex flex-row justify-center self-center items-center">
                    <button className="pl-2 text-white text-sm">
                        <Link to={`/profileAlumn/${postulantID}`}>
                            {postulant}
                        </Link>
                        - {offer}
                    </button>
                    <button
                        className="text-white focus:outline-none text-sm"
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
            </div>
        </div>
    );
};

export default Favorites;
