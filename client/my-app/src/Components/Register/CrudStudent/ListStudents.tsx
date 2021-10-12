import React from 'react';
import { Alumn, Alumns } from '../../../types/Alumns';
import Swal from 'sweetalert2';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import LogoF from '../../Catalogue/Images/avatarF.png';
import LogoM from '../../Catalogue/Images/avatarM.png';

type StudentProps = {
    key: string;
    alumno: Alumn;
};

const ELIMINAR_ALUMNO = gql`
    mutation alumnodelete($id: ID) {
        borrarAlumno(_id: $id) {
            name
            surname
        }
    }
`;
const QUERY = gql`
    query obtenerAlumnos {
        alumnos {
            name
            surname
            picture
            email
            gender
            _id
        }
    }
`;

const ListStudents: React.FC<StudentProps> = ({ alumno }) => {
    const { _id, name, surname, picture, email, gender } = alumno;
    const [borrarAlumno] = useMutation(ELIMINAR_ALUMNO, {
        update(cache) {
            const alumnos = cache.readQuery<Alumns>({
                query: QUERY
            })!.alumnos;
            console.log(alumnos);
            console.log(cache);
            cache.writeQuery({
                query: QUERY,
                data: {
                    // alumnos tiene que ser parte del cache de apollo
                    alumnos: alumnos.filter(
                        (alumno1: Alumn) => alumno1._id !== _id
                    )
                }
            });
        }
    });
    const confirmarEliminarAlumno = () => {
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
                    const { data } = await borrarAlumno({
                        variables: {
                            id: _id
                        }
                    });
                    console.log(data);
                    Swal.fire('Deleted!', data.borrarAlumno.name, 'success');
                } catch (error) {
                    console.log(error);
                }
            }
        });
    };
    return (
        <tr key={_id}>
            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        <a className="block relative">
                            {picture ? (
                                <img
                                    alt="profil"
                                    src={picture}
                                    className="mx-auto object-cover rounded-full h-10 w-10 "
                                />
                            ) : (
                                <img
                                    className="mx-auto object-cover rounded-full h-10 w-10 "
                                    alt="Testimonial avatar"
                                    src={gender === 'femenino' ? LogoF : LogoM}
                                />
                            )}
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {name} {surname}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{email}</p>
            </td>

            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">N/A</p>
            </td>
            <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                    <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                    <span className="relative">N/A</span>
                </span>
            </td>
            {/* <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
                <Link to={`/admin/editStudent/${_id}`}>
                    <svg
                        className="w-6 h-6 items-center text-indigo-600 hover:text-indigo-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                </Link>
            </td> */}
            <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
                <button
                    onClick={() => confirmarEliminarAlumno()}
                    className="text-indigo-600 hover:text-indigo-900">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </td>
        </tr>
    );
};
export default ListStudents;
