import React from 'react';
import { Recruiter, Company } from '../../../types/Recruiters';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import ShowMore from 'react-show-more';

type RecruiterProps = {
    key: string;
    recruiter: Recruiter;
};

const QUERY = gql`
    query empresas {
        empresas {
            name
            email
            description
            picture
            _id
        }
    }
`;

const DELETE_RECRUITER = gql`
    mutation empresa($id: ID) {
        borrarEmpresa(_id: $id) {
            name
            email
            description
            picture
            _id
        }
    }
`;

const RecruiterC: React.FC<RecruiterProps> = ({ recruiter }) => {
    const { name, email, description, _id } = recruiter;

    const [borrarEmpresa] = useMutation(DELETE_RECRUITER, {
        update(cache) {
            const empresas = cache.readQuery<Company>({
                query: QUERY
            })!.empresas;
            cache.writeQuery({
                query: QUERY,
                data: {
                    empresas: empresas.filter(
                        (recruiter: Recruiter) => recruiter._id !== _id
                    )
                }
            });
        }
    });

    const deleRecruiter = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, Cancel'
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const { data } = await borrarEmpresa({
                        variables: {
                            id
                        }
                    });
                    console.log('data desde eliminar');
                    console.log(data);
                    Swal.fire(
                        'Deleted!',
                        'Recruiter has been deleted.',
                        'success'
                    );
                }
            } catch (error) {
                console.log(error);
            }
        });
    };

    return (
        <tr>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <div className="flex items-center">
                    <div className="ml-3">
                        <p className="text-gray-900 whitespace-no-wrap">
                            {name}
                        </p>
                    </div>
                </div>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{email}</p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">
                    <ShowMore
                        lines={3}
                        more="Show more"
                        less="Show less"
                        anchorClass="text-blue-600">
                        {description}
                    </ShowMore>
                </p>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                    onClick={() => deleRecruiter(_id)}
                    className="relative inline-block px-3 py-1 font-semibold   text-black-900 leading-tight hover:bg-green-100 hover:text-green-900  border-gray-200 rounded-full">
                    <span className="relative inline-block px-3 py-1 font-semibold text-black-900 leading-tight">
                        <span
                            aria-hidden="true"
                            className="absolute inset-0  opacity-50 rounded-full"></span>
                        <span className="relative">
                            <i className="fas fa-trash"></i>
                        </span>
                    </span>
                </button>
            </td>
            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <Link
                    className="text-indigo-600 hover:text-indigo-900"
                    to={`/admin/editRecruiter/${_id}`}>
                    Edit
                </Link>
            </td> */}
        </tr>
    );
};

export default RecruiterC;
