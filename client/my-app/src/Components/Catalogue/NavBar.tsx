import React from 'react';
import DropdownEmpresa from './DropdownEmpresa';
import DropdownAlumno from './DropdownAlumno';
import SearchBar from './SearchBar';
import { gql, useQuery } from '@apollo/client';

const ROLE = gql`
    query role($token: String) {
        verificarLogueo(token: $token)
    }
`;

const NavBar: React.FC = () => {
    const token = localStorage.getItem('token');
    const { data, loading, error } = useQuery(ROLE, {
        variables: {
            token: token
        }
    });
    console.log(data);
    return (
        <nav className="bg-yellow_henry shadow dark:bg-gray-800">
            <div className="flex flex-row self-center justify-start px-5 py-5 md:flex md:items-center md:justify-between">
                <SearchBar />
                <div className="flex flex-row self-center justify-end md:mt-0">
                    {data?.verificarLogueo === 'empresa' ? (
                        <DropdownEmpresa />
                    ) : (
                        <DropdownAlumno />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
