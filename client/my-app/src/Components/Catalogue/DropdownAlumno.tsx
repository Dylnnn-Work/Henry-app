import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../Redux/Reducers/rootReducer';
import { gql, useMutation, useQuery } from '@apollo/client';
import { offer } from '../../Redux/Actions/actions';

const DELETE_FAV = gql`
    mutation($id: ID, $token: String) {
        deleteFavS(_id: $id, token: $token) {
            favorites {
                _id
                offer
                offerID
            }
            _id
        }
    }
`;

const GET_FAV = gql`
    query($token: String) {
        alumnoLogueado(token: $token) {
            _id
            isAdmin
            favorites {
                offer
                offerID
                _id
            }
        }
    }
`;

const DropdownPerfil: React.FC = () => {
    const history = useHistory();
    const [dropDown, setDropdown] = useState('');
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();
    const { oferta } = useSelector((state: AppState) => state.students);
    console.log(oferta);
    const token = localStorage.getItem('token');
    const [deleteFavS] = useMutation(DELETE_FAV);
    const { data } = useQuery(GET_FAV, {
        variables: {
            token: token
        }
    });

    // console.log(data);
    // const favorites = data?.alumnoLogueado.favorites.slice(0, 6);

    // const handleDelete = async (id: string) => {
    //     try {
    //         const { data } = await deleteFavS({
    //             variables: {
    //                 token: token,
    //                 id: id
    //             },
    //             update: async (cache) => {
    //                 const favorites: any = await cache.readQuery({
    //                     query: GET_FAV,
    //                     variables: { token: token }
    //                 });
    //                 cache.writeQuery({
    //                     query: GET_FAV,
    //                     data: {
    //                         alumnoLogueado: {
    //                             favorites: favorites?.alumnoLogueado?.favorites?.filter(
    //                                 (fav: any) => fav._id !== id
    //                             )
    //                         }
    //                     },
    //                     variables: { token: token }
    //                 });
    //             }
    //         });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleDropdown = (e: any) => {
        if (dropDown === 'Profile' || dropDown === 'Fav') {
            setDropdown('');
        } else {
            setDropdown(e);
        }
    };

    const exitLogout = () => {
        localStorage.clear();
        history.push('/');
    };

    return (
        <div className="flex flex-row justify-center self-center">
            <div
                className={
                    dropDown === 'News'
                        ? 'flex justify-center self-center bg-grayHenry rounded-full h-12 w-12 mr-2 z-50 '
                        : 'flex justify-center self-center bg-grayHenry rounded-full h-12 w-12 mr-2 '
                }>
                <button
                    type="button"
                    className="text-white focus:outline-none"
                    data-value="News"
                    onClick={(e: any) => {
                        if (dropDown === 'News') {
                            setDropdown('');
                            history.push('/catalogue');
                        } else {
                            setDropdown(
                                e.currentTarget.getAttribute('data-value')
                            );
                            history.push('/news-view');
                        }
                    }}>
                    <svg
                        width="27"
                        height="25"
                        viewBox="0 0 27 25"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M23.7375 0.5H3.2625C1.61532 0.5 0.25 1.76397 0.25 3.35V21.55C0.25 23.136 1.61532 24.4 3.2625 24.4H23.7375C25.3847 24.4 26.75 23.136 26.75 21.55V3.35C26.75 1.76397 25.3847 0.5 23.7375 0.5ZM23.6502 3.6L23.6654 21.3H3.34979L3.33456 3.6H23.6502Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.5"
                        />
                        <path
                            d="M5.5 5.75H13.5V13.75H5.5V5.75ZM14.8333 16.4167H5.5V19.0833H21.5V16.4167H16.1667H14.8333ZM16.1667 11.0833H21.5V13.75H16.1667V11.0833ZM16.1667 5.75H21.5V8.41667H16.1667V5.75Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
            <div
                className={
                    dropDown === 'Fav'
                        ? 'flex justify-center self-center bg-grayHenry rounded-full h-12 w-12 mr-2 z-50 '
                        : 'flex justify-center self-center bg-grayHenry rounded-full h-12 w-12 mr-2 '
                }>
                <button
                    type="button"
                    className="text-white focus:outline-none"
                    data-value="Fav"
                    onClick={(e) =>
                        handleDropdown(
                            e.currentTarget.getAttribute('data-value')
                        )
                    }>
                    <svg
                        width="24"
                        height="32"
                        viewBox="0 0 24 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M15 31.1539H9C7.8 31.1539 6.597 29.4046 5.589 26.9076L1.5 31.1539L0 29.5962L0 23.3654L3.5745 19.6534C3.21 17.6409 3 15.6657 3 14.0192C3 7.78846 7.5 0 12 0C16.5 0 21 7.78846 21 14.0192C21 15.6673 20.79 17.6409 20.4255 19.6534L24 23.3654V29.5962L22.5 31.1539L18.411 26.9076C17.403 29.4046 16.2015 31.1539 15 31.1539ZM12 28.0385H9.5775C9.48196 27.9138 9.39236 27.7844 9.309 27.6506C8.7885 26.8219 8.229 25.5244 7.7205 23.9386C6.6825 20.7017 6 16.753 6 14.0192C6 9.03773 9.666 3.11539 12 3.11539C14.334 3.11539 18 9.03773 18 14.0192C18 16.753 17.3175 20.7033 16.2795 23.9386C15.7695 25.5244 15.2115 26.8204 14.6895 27.6506C14.6066 27.7843 14.5175 27.9138 14.4225 28.0385H12ZM12 15.5769C12.7956 15.5769 13.5587 15.2487 14.1213 14.6645C14.6839 14.0802 15 13.2878 15 12.4615C15 11.6353 14.6839 10.8429 14.1213 10.2586C13.5587 9.67438 12.7956 9.34616 12 9.34616C11.2044 9.34616 10.4413 9.67438 9.87868 10.2586C9.31607 10.8429 9 11.6353 9 12.4615C9 13.2878 9.31607 14.0802 9.87868 14.6645C10.4413 15.2487 11.2044 15.5769 12 15.5769Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
            <div
                className={
                    dropDown === 'Profile'
                        ? 'flex justify-center self-center bg-grayHenry rounded-full w-12 h-12 z-50 overflow-hidden'
                        : 'flex justify-center self-center bg-grayHenry rounded-full w-12 h-12'
                }>
                <button
                    type="button"
                    className="text-white focus:outline-none"
                    data-value="Profile"
                    onClick={(e) =>
                        handleDropdown(
                            e.currentTarget.getAttribute('data-value')
                        )
                    }>
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 35 35"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17.5003 2.91675C9.45033 2.91675 2.91699 9.45008 2.91699 17.5001C2.91699 25.5501 9.45033 32.0834 17.5003 32.0834C25.5503 32.0834 32.0837 25.5501 32.0837 17.5001C32.0837 9.45008 25.5503 2.91675 17.5003 2.91675ZM17.5003 7.29175C19.9212 7.29175 21.8753 9.24591 21.8753 11.6667C21.8753 14.0876 19.9212 16.0417 17.5003 16.0417C15.0795 16.0417 13.1253 14.0876 13.1253 11.6667C13.1253 9.24591 15.0795 7.29175 17.5003 7.29175ZM17.5003 28.0001C13.8545 28.0001 10.6316 26.1334 8.75033 23.3042C8.79408 20.4022 14.5837 18.8126 17.5003 18.8126C20.4024 18.8126 26.2066 20.4022 26.2503 23.3042C24.3691 26.1334 21.1462 28.0001 17.5003 28.0001Z"
                            fill="currentColor"
                        />
                    </svg>
                </button>
            </div>
            {dropDown === 'Profile' ? (
                <>
                    <div className="items-center flex fixed right-7 top-16 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-xl">
                            <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none">
                                <div className="flex flex-col items-center justify-center p-5 rounded-t">
                                    <button
                                        className="text-md text-white font-semibold w-36 h-10 rounded-full hover:bg-yellow_henry focus:outline-none focus:ring-2 focus:ring-yellow-henry focus:ring-opacity-50 hover:text-grayHenry"
                                        onClick={() => {
                                            history.push(
                                                `/profileAlumn/${data?.alumnoLogueado._id}`
                                            );
                                        }}>
                                        My profile
                                    </button>
                                    {data?.alumnoLogueado.isAdmin ? (
                                        <button
                                            onClick={() => {
                                                history.push(
                                                    `/admin/dashboard`
                                                );
                                            }}
                                            className="text-md text-white font-semibold mt-3 w-36 h-10 rounded-full hover:bg-yellow_henry focus:outline-none focus:ring-2 focus:ring-yellow-henry focus:ring-opacity-50 hover:text-grayHenry">
                                            Admin Panel
                                        </button>
                                    ) : null}

                                    <button
                                        className="text-md text-white font-semibold mt-3 w-36 h-10 rounded-full hover:bg-yellow_henry focus:outline-none focus:ring-2 focus:ring-yellow-henry focus:ring-opacity-50 hover:text-grayHenry"
                                        onClick={exitLogout}>
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="opacity-50 fixed inset-0 z-40 bg-white"
                        onClick={() => setDropdown('')}
                        onKeyPress={() => console.log('')}
                        role="button"
                        tabIndex={0}></div>
                </>
            ) : null}
            {/* {dropDown === 'Fav' ? (
                <>
                    <div className="items-center flex overflow-x-hidden overflow-y-auto fixed right-24 top-16 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-xl">
                            <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none">
                                <div className="flex flex-col items-center justify-center p-5 rounded-t h-auto w-auto">
                                    {data?.alumnoLogueado.favorites.length ===
                                    0 ? (
                                        <p className="text-white text-lg uppercase">{`You don't have any favorite`}</p>
                                    ) : (
                                    //     favorites.map(
                                    //         (favorite: any, index: number) => {
                                    //             return (
                                    //                 <div
                                    //                     key={index}
                                    //                     className="flex flex-row justify-between items-center min-w-full text-white">
                                    //                     <div
                                    //                         className="hover:bg-yellow_henry hover:text-grayHenry px-3 py-1.5 rounded-full"
                                    //                         onClick={() => {
                                    //                             setShowModal(
                                    //                                 true
                                    //                             );
                                    //                             dispatch(
                                    //                                 offer(
                                    //                                     favorite.offerID
                                    //                                 )
                                    //                             );
                                    //                         }}
                                    //                         onKeyPress={() =>
                                    //                             console.log('')
                                    //                         }
                                    //                         role="button"
                                    //                         tabIndex={0}>
                                    //                         {favorite.offer}
                                    //                     </div>
                                    //                     <div
                                    //                         onClick={() =>
                                    //                             console.log(
                                    //                                 `nope`
                                    //                             )
                                    //                         }
                                    //                         onKeyPress={() =>
                                    //                             console.log('')
                                    //                         }
                                    //                         role="button"
                                    //                         tabIndex={0}
                                    //                         className="focus:outline-none">
                                    //                         <svg
                                    //                             width="35"
                                    //                             height="35"
                                    //                             viewBox="0 0 30 30"
                                    //                             fill="none"
                                    //                             xmlns="http://www.w3.org/2000/svg">
                                    //                             <path
                                    //                                 d="M18.2375 10L15 13.2375L11.7625 10L10 11.7625L13.2375 15L10 18.2375L11.7625 20L15 16.7625L18.2375 20L20 18.2375L16.7625 15L20 11.7625L18.2375 10Z"
                                    //                                 fill="currentColor"
                                    //                             />
                                    //                         </svg>
                                    //                     </div>
                                    //                 </div>
                                    //             );
                                    //         }
                                    //     )
                                    // )}
                                    // {data &&
                                    // data.alumnoLogueado?.favorites.length >=
                                    //     6 ? (
                                    //     <button
                                    //         className="mt-3 text-white focus:outline-none"
                                    //         onClick={() =>
                                    //             history.push(
                                    //                 `/profileAlumn/${data.alumnoLogueado._id}`
                                    //             )
                                    //         }>
                                    //         Ver mas..
                                    //     </button>
                                    // ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        className="opacity-50 fixed inset-0 z-40 bg-white"
                        onClick={() => setDropdown('')}
                        onKeyPress={() => console.log('')}
                        role="button"
                        tabIndex={0}></div>
                </>
            ) : null} */}
            {showModal && oferta ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-2xl relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                                <div className="text-center p-5 ">
                                    <h3 className="text-xl font-semibold text-white">
                                        {oferta?.title?.toUpperCase()}
                                    </h3>
                                    <h3 className="text-xl font-semibold capitalize text-white">
                                        {oferta?.company}
                                    </h3>
                                </div>
                                <div>
                                    <h4 className="text-base pt-3 pl-5  text-white">
                                        Job type: {oferta?.jobType}
                                    </h4>
                                    <h4 className="text-base pl-5  text-white">
                                        Experience level:{' '}
                                        {oferta?.experienceLevel}
                                    </h4>
                                    <h4 className="text-base pl-5  text-white">
                                        Role: {oferta?.position + ' Developer'}
                                    </h4>
                                </div>
                                <h4 className="text-base p-5  text-white">
                                    {oferta?.description}
                                </h4>
                                <div className="relative p-6 flex-auto flex-col justify-center self-center ">
                                    <h4 className="text-center text-base font-semibold text-white">
                                        Technologies
                                    </h4>
                                    <div className="flex flex-row">
                                        {oferta?.requirements.map(
                                            (req: any, index: number) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="border-solid border rounded p-1 m-2 text-center border-yellow_henry text-white">
                                                        {req}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-end p-4">
                                    <button
                                        className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{
                                            transition: 'all .15s ease'
                                        }}
                                        onClick={() => setShowModal(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-white"></div>
                </>
            ) : null}
        </div>
    );
};

export default DropdownPerfil;
