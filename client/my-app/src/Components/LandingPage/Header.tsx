import React from 'react';
import img5 from './Images/img5.png';
import { useHistory } from 'react-router-dom';

const Header: React.FC = () => {
    const history = useHistory();
    return (
        <div className="dark:bg-gray-800">
            <div className="container px-6 py-16 mx-auto">
                <div className="items-center md:flex">
                    <div className="w-full md:w-1/2 items-center md:flex justify-center">
                        <div className="max-w-2xl">
                            <h1 className="text-5xl font-roboto text-white uppercase dark:text-white md:text-7xl">
                                Find Your Henry
                            </h1>
                            <p className="mt-5 text-white dark:text-gray-400 text-2xl">
                                You can search for Henry students or graduates
                                and find your perfect candidate
                            </p>
                            <button
                                onClick={() => {
                                    const logged = localStorage.getItem(
                                        'token'
                                    );
                                    console.log(logged);
                                    if (logged !== null) {
                                        history.push('/catalogue');
                                    } else {
                                        history.push('/register');
                                    }
                                }}
                                className="px-8 py-4 mt-5 text-2xl font-medium text-yellow uppercase bg-yellow_henry rounded-md hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500 ">
                                Start Now
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-end w-full md:mt-0 md:w-1/2">
                        <img
                            className="w-full h-full max-w-sm"
                            src={img5}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
