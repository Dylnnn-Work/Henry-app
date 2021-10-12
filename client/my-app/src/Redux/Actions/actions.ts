import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Dispatch } from 'redux';
import gqlClient from '../../Config/apollo';
import {
    GET_FETCHALUMNOS,
    GET_FETCHALUMNOS_SUCCESS,
    GET_FETCHALUMNOS_ERROR
} from '../constants';

//Define el Rol del usuario
export const getRole = (token: any) => async (dispatch: Dispatch) => {
    return await gqlClient
        .query({
            query: gql`
                query role{
                    verificarLogueo(token: "${token}")
                }
            `
        })
        .then((res: any) => {
            dispatch({ type: 'ROLE', payload: res.data });
        });
};

//VER POSIBILIDAD DE JUNTAR LOS FETCH DE INFO, IDENTIFICAR CADA UNO SEGUN UN PAYLOAD
export const fetchAlumnos = () => async (dispatch: Dispatch) => {
    dispatch({
        type: GET_FETCHALUMNOS
    });
    return await gqlClient
        .query({
            query: gql`
                {
                    alumnos {
                        _id
                        name
                        Birthdate
                        surname
                        email
                        picture
                        country
                        position
                        abilities
                        languages
                        wayOfWork
                        gender
                        experienceLevel
                    }
                }
            `
        })
        .then((res: any) => {
            dispatch({
                type: GET_FETCHALUMNOS_SUCCESS,
                payload: res.data.alumnos
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_FETCHALUMNOS_ERROR,
                payload: err.response.message
            });
        });
};

export const fetchOfertas = () => async (dispatch: Dispatch) => {
    return await gqlClient
        .query({
            query: gql`
                {
                    ofertas {
                        email
                        title
                        company
                        description
                        postulants
                        _id
                        requirements
                        experienceLevel
                        wayOfWork
                        languages
                        jobType
                        position
                        location
                        companyId
                    }
                }
            `
        })
        .then((res: any) => {
            console.log('fetchOfertas', res.data.ofertas);
            dispatch({ type: 'FETCHOFERTAS', payload: res.data.ofertas });
        });
};

export const modifyAlumnosState = (string: string) => async (
    dispatch: Dispatch
) => {
    return await gqlClient
        .query({
            query: gql`
                query busquedaAlumnos {
                    busquedaAlumnos(search: "${string}") {
                        email
                        name
                        Birthdate
                        surname
                        email
                        abilities
                        languages
                        picture
                        country
                        _id
                    }
                }
            `
        })
        .then((res) => {
            dispatch({
                type: 'MODIFYALUMN',
                payload: res.data?.busquedaAlumnos
            });
        });
};

export const setFilteredStudents = (array: any[]) => (dispatch: Dispatch) => {
    dispatch({
        type: 'SET_FILTERED_STUDENTS',
        payload: { array: array }
    });
};
export const setFilteredOffers = (array: any[]) => (dispatch: Dispatch) => {
    dispatch({
        type: 'SET_FILTERED_OFFERS',
        payload: { array: array }
    });
};

export const loginCompany = (token: string) => async (dispatch: Dispatch) => {
    return await gqlClient
        .query({
            query: gql`
                query{
                    empresaLogueada(token: "${token}") {
                        _id
                        name
                        picture
                        description
                        email
                        favorites {
                            postulant
                            postulantID
                            offer
                            offerID
                            _id
                        }
                    }
                }
            `
        })
        .then(async (res: any) => {
            const company = res.data;
            return await gqlClient
                .query({
                    query: gql`
                query{
                    ofertasbycompany(company: "${company.empresaLogueada?.name}") {
                        email
                        title
                        _id
                    }
                 }
                `
                })
                .then((res) => {
                    console.log(res);
                    console.log(company);
                    dispatch({
                        type: 'LOGIN',
                        payload1: company,
                        payload2: res.data
                    });
                });
        });
};
export const searchOffer = (string: string) => async (dispatch: Dispatch) => {
    return await gqlClient
        .query({
            query: gql`
                query busquedaOfertas {
                    ofertasbycompany(company: "${string}") {
                        title
                        company
                        postulants
                        description
                        _id
                        requirements
                    }
                }
            `
        })
        .then((res) => {
            console.log('SEARCHOFFER', res.data?.ofertasbycompany);
            dispatch({
                type: 'SEARCHOFFER',
                payload: res.data?.ofertasbycompany
            });
        });
};

export const offer = (id: string) => async (dispatch: Dispatch) => {
    return await gqlClient
        .query({
            query: gql`
            query{
                oferta(_id: "${id}") {
                    title
                    company
                    postulants
                    description
                    requirements
                    experienceLevel
                    wayOfWork
                    languages
                    jobType
                    position
                    location
                }
            }
    `
        })
        .then((res) => {
            console.log(res);
            dispatch({
                type: 'OFFER_DETAIL',
                payload: res.data.oferta
            });
        });
};
