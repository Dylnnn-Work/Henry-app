import React, { useState, useRef, useEffect, Fragment } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import NavBar from '../Catalogue/NavBar';
import Sidebar from '../Admin/Sidebar';

type FormElement = React.FormEvent<HTMLFormElement>;

const AGREGAR_NOTICIA = gql`
    mutation agregarNews($description: String!) {
        agregarNews(news: { description: $description }) {
            description
        }
    }
`;

const ELIMINAR_NOTICIA = gql`
    mutation borrarNews($id: ID) {
        borrarNews(_id: $id) {
            description
        }
    }
`;
const MODIFICAR_NOTICIA = gql`
    mutation modoficarNews($id: ID, $description: String) {
        modificarNews(_id: $id, description: $description) {
            description
        }
    }
`;
const QUERY = gql`
    query news {
        description
    }
`;

const NewsPost = (): JSX.Element => {
    interface INews {
        description: string;
    }

    const [agregarNews, { data }] = useMutation(AGREGAR_NOTICIA);
    const [borrarNews] = useMutation(ELIMINAR_NOTICIA);
    const [modificarNews] = useMutation(MODIFICAR_NOTICIA);
    const [nuevaNoticia, setNuevaNoticia] = useState<string>('');
    const [noticia, setNoticia] = useState<INews[]>([]);
    const noticiaInput = useRef<HTMLInputElement>(null);

    //Se agregan Noticias
    const handleSubmit = async (e: FormElement) => {
        e.preventDefault();
        addNoticia(nuevaNoticia);

        const data = { nuevaNoticia };
        try {
            await agregarNews({
                variables: {
                    description: nuevaNoticia
                }
            });
        } catch {
            console.log('error');
            console.log(nuevaNoticia);
        }
        alert('You have posted successfully');
        setNuevaNoticia('');
    };

    const addNoticia = async (description: string) => {
        const nuevasNoticias = [...noticia, { description }];
        setNoticia(nuevasNoticias);
        console.log(noticia);
    };

    //Se eliminan Noticias
    const removeNew = (i: number): void => {
        const nuevasNoticias: INews[] = [...noticia];
        nuevasNoticias.splice(i, 1);
        setNoticia(nuevasNoticias);
        try {
            borrarNews();
        } catch {
            console.log('error2');
        }
    };

    return (
        <Fragment>
            <div className="px-4 py-3 border-b border-gray-200 flex justify-center font-bold text-white dark:text-white md:text-2xl">
                <h3>Let´s write something useful for them!!</h3>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-grayHenry to-gray-500 flex justify-center items-center">
                <div className="bg-yellow_henry container mx-auto mt-10">
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={(e) => setNuevaNoticia(e.target.value)}
                            value={nuevaNoticia}
                            placeholder="Discribe your announcement"
                            className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        />
                        <button className="bg-grayHenry text-white py-4 px-4 w-full tracking-wide rounded-tr-lg hover:bg-gray-600 focus:outline-none focus:bg-yellow_henry focus:text-black active:bg-yellow_henry">
                            P o s t
                        </button>
                    </form>
                </div>
            </div>
            {/*noticia.map((n: INews, i: number) => {
                return (
                    <div
                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        key={i}>
                        <h2>{n.description}</h2>
                        <div>
                            <button
                                className="btn btn-danger"
                                onClick={() => removeNew(i)}>
                                🗑
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => modificarNews()}>
                                🖉
                            </button>
                        </div>
                    </div>
                );
            })*/}
        </Fragment>
    );
};

export default NewsPost;
