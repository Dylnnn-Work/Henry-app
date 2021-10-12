import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { Alumn } from '../../../types/Alumns';
import ListStudents from './ListStudents';

const QUERY = gql`
    query obtenerAlumnos {
        alumnos {
            name
            surname
            picture
            email
            _id
        }
    }
`;
const CrudStudents: React.FC = () => {
    const { data, loading } = useQuery(QUERY);
    console.log(data);
    return (
        <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
            {loading ? (
                <div>loading...</div>
            ) : (
                <div className="py-8">
                    <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                        <h2 className="text-2xl leading-tight">Users</h2>
                        {/*  <div className="text-end">
                        <form className="flex w-full max-w-sm space-x-3">
                            <div className=" relative ">
                                <input
                                    type="text"
                                    id='"form-subscribe-Filter'
                                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                    placeholder="name"
                                />
                            </div>
                            <button
                                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200"
                                type="submit">
                                Filter
                            </button>
                        </form>
                    </div> */}
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className=" min-w-full leading-normal">
                                <thead className="bg-yellow_henry">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-3 py-3  border-b border-gray-200 text-black  text-center text-sm uppercase font-normal">
                                            User
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3   border-b border-gray-200 text-black  text-center text-sm uppercase font-normal">
                                            email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3  border-b border-gray-200 text-black   text-center text-sm uppercase font-normal">
                                            Cohorte
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3   border-b border-gray-200 text-black   text-center text-sm uppercase font-normal">
                                            Status
                                        </th>
                                        {/* <th
                                            scope="col"
                                            className="px-3 py-3   border-b border-gray-200 text-black   text-left text-sm uppercase font-normal">
                                            {' '}
                                            Edit
                                        </th> */}
                                        <th
                                            scope="col"
                                            className="px-3 py-3    border-b border-gray-200 text-black  text-left text-sm uppercase font-normal">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!data
                                        ? null
                                        : data.alumnos.map((alumno: Alumn) => (
                                              <ListStudents
                                                  key={alumno._id}
                                                  alumno={alumno}
                                              />
                                          ))}
                                </tbody>
                            </table>
                            {/*  <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
                            <div className="flex items-center">
                                <button
                                    type="button"
                                    className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg
                                        width="9"
                                        fill="currentColor"
                                        height="8"
                                        className=""
                                        viewBox="0 0 1792 1792"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 ">
                                    1
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    2
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100">
                                    3
                                </button>
                                <button
                                    type="button"
                                    className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100">
                                    4
                                </button>
                                <button
                                    type="button"
                                    className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100">
                                    <svg
                                        width="9"
                                        fill="currentColor"
                                        height="8"
                                        className=""
                                        viewBox="0 0 1792 1792"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                                    </svg>
                                </button>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CrudStudents;
