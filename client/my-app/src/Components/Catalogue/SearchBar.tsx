import { connect, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { modifyAlumnosState, searchOffer } from '../../Redux/Actions/actions';
import Logo from './Images/logo_Henry.png';
import { Link } from 'react-router-dom';

const SearchBar: React.FC = (props: any) => {
    const [style, setStyle] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (style) {
            const search = (document.getElementById(
                'search'
            ) as HTMLInputElement).value;
            dispatch(modifyAlumnosState(search));
            dispatch(searchOffer(search));
        } else {
            setStyle(true);
        }
    };

    return (
        <div className="flex flex-row justify-center items-center">
            {style ? (
                <img
                    className="w-10 h-10 mr-3 transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55) mb-1"
                    src={Logo}
                    alt="henry"
                />
            ) : (
                <h5 className="transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55) pb-1.5 text-2xl font-bold text-grayHenry dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300">
                    <Link to="/catalogue">Find Your Henry</Link>
                </h5>
            )}
            <div
                className={
                    style
                        ? 'h-12 w-80 relative grid place-items-center transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                        : 'ml-3 h-12 w-12 relative grid place-items-center transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55)'
                }>
                <input
                    id="search"
                    type="text"
                    placeholder="Search"
                    className={
                        style
                            ? 'opacity-50 h-full w-full bg-white rounded-full pr-14 pl-5 outline-none'
                            : 'opacity-0 h-full w-full bg-white rounded-full pr-14 pl-5 outline-none'
                    }
                />
                <button
                    className={
                        style
                            ? 'text-grayHenry bg-yellow_henry absolute top-6 right-1.5 transform -translate-y-2/4 h-10 w-10 leading-10 text-center rounded-full focus:outline-none'
                            : 'text-white bg-grayHenry absolute top-6 right-1.5 transform -translate-y-2/4 h-10 w-10 leading-10 text-center rounded-full focus:outline-none'
                    }
                    onClick={handleSubmit}>
                    <svg
                        className="ml-1.5 mb-0.5"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.0833 19.1667C12.8532 19.1667 14.4969 18.5932 15.8333 17.619V18.0833V18.2907L15.9801 18.4372L21.8135 24.2589L22.167 24.6118L22.5202 24.2586L24.2586 22.5202L24.6118 22.167L24.2589 21.8135L18.4372 15.9801L18.0833 16.3333V15.8333H17.619C18.5932 14.4969 19.1667 12.8532 19.1667 11.0833C19.1667 6.61886 15.5478 3 11.0833 3C6.61886 3 3 6.61886 3 11.0833C3 15.5478 6.61886 19.1667 11.0833 19.1667ZM11.0833 15.8333C8.45448 15.8333 6.33333 13.7122 6.33333 11.0833C6.33333 8.45448 8.45448 6.33333 11.0833 6.33333C13.7122 6.33333 15.8333 8.45448 15.8333 11.0833C15.8333 13.7122 13.7122 15.8333 11.0833 15.8333Z"
                            fill="currentColor"
                            stroke="currentColor"
                        />
                    </svg>
                </button>
                <button
                    className={
                        style
                            ? 'absolute top-6 -right-10 transform -translate-y-2/4 outline-none text-grayHenry transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55) focus:outline-none'
                            : 'absolute top-6 -right-10 transform -translate-y-2/4 outline-none text-grayHenry transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55) hidden focus:outline-none'
                    }
                    onClick={() => setStyle(false)}>
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
    );
};

export default SearchBar;
