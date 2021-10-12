import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { INew, INews } from '../../types/Alumns';
import NavBar from '../Catalogue/NavBar';
import { useMutation, gql, useQuery } from '@apollo/client';
import Swal from 'sweetalert2';

// type NewsProp = {
//     _id: string;
//     description: string;
// };

const ELIMINAR_NOTICIA = gql`
    mutation borrarNews($id: ID) {
        borrarNews(_id: $id) {
            description
            _id
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

const NewsViewDelete: React.FC = () => {
    // const { description, _id } = props;
    const { data, loading } = useQuery(QUERY);
    const history = useHistory();
    const [borrarNews] = useMutation(ELIMINAR_NOTICIA);
    if (loading) return null;
    console.log(data);
    /*
    const [borrarNews] = useMutation(ELIMINAR_NOTICIA, {
        update(cache) {
            const news = cache.readQuery<INews>({
                query: QUERY
            })!.INew;
            console.log(news);
            console.log(cache);
            cache.writeQuery({
                query: QUERY,
                data: {
                    news: news.filter((news1: INew) => news1._id !== _id)
                }
            });
        }
    });*/
    const confirmarEliminarNew = (_id: any) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const data = await borrarNews({
                        variables: {
                            id: _id
                        }
                    });
                    console.log(data);
                    Swal.fire('Deleted!', 'success');
                } catch (error) {
                    console.log(error);
                }
            }
            window.history.go();
        });
    };
    return (
        <Fragment>
            <div className="px-4 py-3 border-b border-gray-200 flex justify-center font-bold text-white dark:text-white md:text-2xl">
                <h3>Set the announcement correctly</h3>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-grayHenry to-gray-500 flex justify-center items-center">
                <div className="max-w-2xl bg-white border-2 border-gray-300 p-5 rounded-md tracking-wide shadow-lg">
                    {data.news.map((n: INew, _id: string) => {
                        return (
                            <div id="header" className="flex" key={n._id}>
                                <img
                                    alt="mountain"
                                    className="w-45 rounded-md border-2 border-gray-300"
                                    src="https://media-exp1.licdn.com/dms/image/C4E0BAQGy6GZmHb_SXA/company-logo_200_200/0/1603651276024?e=2159024400&v=beta&t=ViXcu-TnrneSIy7d9SSO7DnGp4OCMmmJ-UhC9ifKHu4"
                                />
                                <div id="body" className="flex flex-col ml-5">
                                    <h4
                                        id="name"
                                        className="text-xl font-semibold mb-2">
                                        {n.description}
                                    </h4>

                                    <div className="flex mt-5">
                                        <img
                                            alt="avatar"
                                            className="w-6 rounded-full border-2 border-gray-300"
                                            src="https://image.freepik.com/vector-gratis/ilustracion-palabras-inicio_53876-26069.jpg"
                                        />
                                        <p className="ml-3">Staff de Admin</p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() =>
                                            confirmarEliminarNew(n._id)
                                        }>
                                        🗑
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default NewsViewDelete;
