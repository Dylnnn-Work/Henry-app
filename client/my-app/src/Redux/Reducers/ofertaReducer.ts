//COMPLETAR DESPUES DE LA DEMO!!!

import { fetchOfertas } from '../Actions/actions';

type State = {
    ofertas: any[];
    ofertasFiltradas: any[];
};
const initialState: State = {
    ofertas: [],
    ofertasFiltradas: []
};

const ofertaReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case 'FETCHOFERTAS':
            return {
                ...state,
                ofertas: action.payload
            };
        // case 'FILTERTECNOLOGIES': {
        //     let aux: any[] = [];
        //     action.payload.array.length > 0
        //         ? action.payload.array.forEach((filter: any) => {
        //               action.payload.method === 'add'
        //                   ? (aux = state.alumnosFiltrados?.filter(
        //                         (student: any) => {
        //                             return [
        //                                 ...student.abilities,
        //                                 ...student.languages
        //                             ].includes(filter);
        //                         }
        //                     ))
        //                   : (aux = state.alumnos?.filter((student: any) => {
        //                         return [
        //                             ...student.abilities,
        //                             ...student.languages
        //                         ].includes(filter);
        //                     }));
        //           })
        //         : (aux = state.alumnos);
        //     return {
        //         ...state,
        //         alumnosFiltrados: aux
        //     };
        // }
        default:
            return state;
    }
};

export default ofertaReducer;
