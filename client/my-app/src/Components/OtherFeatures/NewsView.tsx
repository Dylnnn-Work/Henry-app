import React, { Fragment, useEffect } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { getRole } from '../../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'node:https';
import { AppState } from '../../Redux/Reducers/rootReducer';
import { INew, INews } from '../../types/Alumns';
import NavBar from '../Catalogue/NavBar';

type NewsProp = {
    _id: string;
    description: string;
};

const ELIMINAR_NOTICIA = gql`
    mutation borrarNews($id: ID) {
        borrarNews(_id: $id) {
            description
        }
    }
`;
const QUERY = gql`
    query news {
        news {
            _id
            description
        }
    }
`;

const NewsView: React.FC<NewsProp> = (props) => {
    const { description, _id } = props;
    const { data, loading } = useQuery(QUERY);
    if (loading) return null;
    console.log(data);

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-gradient-to-br from-grayHenry to-gray-500 flex flex-col justify-start items-center">
                <div className="mt-10 ">
                    <h5 className="text-3xl text-center uppercase text-yellow_henry font-light">
                        Keep in sight the News!
                    </h5>
                </div>
                <div className="max-w-2xl tracking-wide shadow-lg mt-5">
                    {data.news.map((n: INew, _id: string) => {
                        return (
                            <div
                                id="header"
                                className="flex mb-5 bg-grayHenry border-2 border-yellow_henry rounded-lg"
                                key={_id}>
                                <img
                                    alt="mountain"
                                    className="object-cover rounded-lg m-5"
                                    src="https://media-exp1.licdn.com/dms/image/C4E0BAQGy6GZmHb_SXA/company-logo_200_200/0/1603651276024?e=2159024400&v=beta&t=ViXcu-TnrneSIy7d9SSO7DnGp4OCMmmJ-UhC9ifKHu4"
                                />
                                <div
                                    id="body"
                                    className="flex flex-col justify-between items-end mr-5 mt-5">
                                    <h4
                                        id="name"
                                        className="text-xl font-semibold mb-2 text-white">
                                        {n.description}
                                    </h4>

                                    <div className="flex justify-end self-between m-5 text-white">
                                        <svg
                                            width="21"
                                            height="21"
                                            viewBox="0 0 21 21"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.917 0.916748C5.39699 0.916748 0.916992 5.39675 0.916992 10.9167C0.916992 16.4367 5.39699 20.9167 10.917 20.9167C16.437 20.9167 20.917 16.4367 20.917 10.9167C20.917 5.39675 16.437 0.916748 10.917 0.916748ZM10.917 3.91675C12.577 3.91675 13.917 5.25675 13.917 6.91675C13.917 8.57675 12.577 9.91675 10.917 9.91675C9.25699 9.91675 7.91699 8.57675 7.91699 6.91675C7.91699 5.25675 9.25699 3.91675 10.917 3.91675ZM10.917 18.1167C8.41699 18.1167 6.20699 16.8367 4.91699 14.8967C4.94699 12.9067 8.91699 11.8167 10.917 11.8167C12.907 11.8167 16.887 12.9067 16.917 14.8967C15.627 16.8367 13.417 18.1167 10.917 18.1167Z"
                                                fill="currentColor"
                                            />
                                        </svg>

                                        <p className="ml-3 text-white">
                                            Staff de Admin
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default NewsView;
