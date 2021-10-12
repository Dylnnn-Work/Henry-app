import { gql, useQuery } from '@apollo/client';
import { prototype } from 'node:stream';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { AppState } from '../../../Redux/Reducers/rootReducer';
import CardPerfil from './CardPerfil';
import Favorites from './Favorites';
import SectionJobOffer from './SectionJobOffer';

const GET_CARD_DETAIL = gql`
    query($id: ID) {
        empresa(_id: $id) {
            name
            picture
            email
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

const ROLE = gql`
    query role($token: String) {
        verificarLogueo(token: $token)
    }
`;

const PerfilReclutador: React.FC = () => {
    const token = localStorage.getItem('token');
    const { id } = useParams<any>();
    const { data } = useQuery(GET_CARD_DETAIL, {
        variables: {
            id: id
        }
    });
    console.log(data);

    const { data: role } = useQuery(ROLE, {
        variables: {
            token: token
        }
    });

    return (
        <div className="grid grid-cols-6 grid-rows-1 bg-gradient-to-br from-grayHenry to-gray-500 min-h-screen p-0 m-0">
            <div className="col-start-1 col-end-3 row-start-1 row-end-2 mt-5 ml-5 mb-5">
                <CardPerfil />
            </div>
            <div
                className={
                    role?.verificarLogueo === 'empresa'
                        ? 'col-start-3 col-end-6 row-start-1 row-end-2 ml-5'
                        : 'col-start-3 col-end-7 row-start-1 row-end-2 ml-5'
                }>
                <SectionJobOffer company={data?.empresa.name} idCompany={id} />
            </div>
            <div
                className={
                    role?.verificarLogueo === 'empresa'
                        ? 'col-start-6 col-end-7 row-start-1 row-end-2 ml-5 mr-5'
                        : 'hidden'
                }>
                <h5 className="mt-5 text-center text-lg font-bold uppercase text-grayHenry w-auto h-10 bg-yellow_henry rounded-lg pt-1.5">
                    My Favorites
                </h5>
                {data?.empresa.favorites.map((em: any, index: number) => {
                    return (
                        <div key={index}>
                            <Favorites
                                idE={id}
                                idF={em._id}
                                postulant={em.postulant}
                                postulantID={em.postulantID}
                                offer={em.offer}
                                offerID={em.offerID}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PerfilReclutador;
