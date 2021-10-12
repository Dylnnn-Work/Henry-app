import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';
import EditRecruiter from '../Register/CrudRecruiter/EditRecruiter';
import ListRecruiter from '../Register/CrudRecruiter/ListRecruiter';
import CrudStudents from '../Register/CrudStudent/CrudStudents';
import EditStudent from '../Register/CrudStudent/EditStudent';
import { useHistory } from 'react-router-dom';
import DashBoard from './DashBoard';
import NewsPost from '../OtherFeatures/NewsPost';
import NewsViewDelete from '../OtherFeatures/NewsViewDelete';

const Sidebar: React.FC = () => {
    const history = useHistory();
    const onClick = () => {
        history.push('/catalogue');
    };
    return (
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
            />

            <div className="min-h-screen flex flex-row bg-gradient-to-br from-grayHenry to-gray-500">
                <div className="flex flex-col w-56 bg-yellow_henry rounded-r-3xl overflow-hidden">
                    <div className="flex items-center justify-center h-20 shadow-md">
                        <button
                            onClick={onClick}
                            className="hidden mx-4 text-gray-600 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                            aria-label="show notifications">
                            <svg
                                width="28"
                                height="34"
                                viewBox="0 0 28 34"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M17.208 33.9166H10.458C9.10801 33.9166 7.75463 32.0216 6.62063 29.3165L2.02051 33.9166L0.333008 32.2291V25.4791L4.35432 21.4578C3.94426 19.2776 3.70801 17.1378 3.70801 15.3541C3.70801 8.60413 8.77051 0.166626 13.833 0.166626C18.8955 0.166626 23.958 8.60413 23.958 15.3541C23.958 17.1395 23.7218 19.2776 23.3117 21.4578L27.333 25.4791V32.2291L25.6455 33.9166L21.0454 29.3165C19.9114 32.0216 18.5597 33.9166 17.208 33.9166ZM13.833 30.5416H11.1077C11.0002 30.4066 10.8994 30.2663 10.8056 30.1214C10.2201 29.2237 9.59063 27.818 9.01857 26.1001C7.85082 22.5935 7.08301 18.3157 7.08301 15.3541C7.08301 9.9575 11.2073 3.54163 13.833 3.54163C16.4588 3.54163 20.583 9.9575 20.583 15.3541C20.583 18.3157 19.8152 22.5952 18.6474 26.1001C18.0737 27.818 17.4459 29.222 16.8587 30.1214C16.7655 30.2663 16.6652 30.4065 16.5583 30.5416H13.833ZM13.833 17.0416C14.7281 17.0416 15.5866 16.686 16.2195 16.0531C16.8524 15.4202 17.208 14.5617 17.208 13.6666C17.208 12.7715 16.8524 11.9131 16.2195 11.2801C15.5866 10.6472 14.7281 10.2916 13.833 10.2916C12.9379 10.2916 12.0795 10.6472 11.4465 11.2801C10.8136 11.9131 10.458 12.7715 10.458 13.6666C10.458 14.5617 10.8136 15.4202 11.4465 16.0531C12.0795 16.686 12.9379 17.0416 13.833 17.0416Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </div>
                    <ul className="flex flex-col py-4">
                        <li>
                            <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-700">
                                    <i className="bx bx-home"></i>
                                </span>
                                <Link to="/admin/dashboard">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-white text-center">
                                        Dashboard
                                    </span>
                                </Link>
                            </a>
                        </li>
                        <li>
                            <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-700">
                                    <i className="bx bx-user"></i>
                                </span>
                                <Link to="/admin/listAlumns">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-white text-center">
                                        Alumns
                                    </span>
                                </Link>
                            </a>
                        </li>
                        <li>
                            <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-700">
                                    <i className="bx bx-buildings"></i>
                                </span>
                                <Link to="/admin/listRecruiters">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-white text-center">
                                        Companies
                                    </span>
                                </Link>
                            </a>
                        </li>

                        <li>
                            <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-700">
                                    <i className="far fa-newspaper"></i>
                                </span>
                                <Link to="/admin/news-post">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-white text-center">
                                        News
                                    </span>
                                </Link>
                            </a>
                        </li>
                        <li>
                            <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-700">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                    </svg>
                                </span>
                                <Link to="/admin/deleted-news">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-white text-center">
                                        D-News
                                    </span>
                                </Link>
                            </a>
                        </li>
                        {/* <li>
                            <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                    <i className="bx bx-user"></i>
                                </span>
                                <span className="text-sm font-medium">
                                    Profile
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                    <i className="bx bx-bell"></i>
                                </span>
                                <span className="text-sm font-medium">
                                    Notifications
                                </span>
                                <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                                    5
                                </span>
                            </a>
                        </li>
                        <li>
                            <a className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
                                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                                    <i className="bx bx-log-out"></i>
                                </span>
                                <span className="text-sm font-medium">
                                    Logout
                                </span>
                            </a>
                        </li> */}
                    </ul>
                </div>
                <div className="container w-full bg-gradient-to-br from-grayHenry to-gray-500">
                    <Route
                        exact
                        path="/admin/dashboard"
                        render={() => <DashBoard />}
                    />
                    <Route
                        exact
                        path="/admin/listAlumns"
                        render={() => <CrudStudents />}
                    />
                    <Route
                        exact
                        path="/admin/editStudent/:id"
                        render={({ match }) => (
                            <EditStudent id={match.params.id} />
                        )}
                    />
                    <Route
                        exact
                        path="/admin/listRecruiters"
                        render={() => <ListRecruiter />}
                    />
                    <Route
                        path="/admin/editRecruiter/:id"
                        render={({ match }) => (
                            <EditRecruiter id={match.params.id} />
                        )}
                    />
                    <Route
                        exact
                        path="/admin/news-post"
                        render={() => <NewsPost />}
                    />
                    <Route
                        exact
                        path="/admin/deleted-news/"
                        render={() => <NewsViewDelete />}
                    />
                </div>
            </div>
        </>
    );
};

export default Sidebar;
