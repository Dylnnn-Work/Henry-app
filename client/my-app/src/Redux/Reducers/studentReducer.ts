import {
    GET_FETCHALUMNOS,
    GET_FETCHALUMNOS_SUCCESS,
    GET_FETCHALUMNOS_ERROR
} from '../constants';
type State = {
    alumnos: any[];
    ofertas: any[];
    alumnosFiltrados: any[];
    ofertasFiltradas: any[];
    company: any;
    offersByCompany: any[];
    role: string;
    array: string;
    oferta: any;
    fetching: boolean;
    filtering: boolean;
};
const initialState: State = {
    alumnos: [],
    ofertas: [],
    alumnosFiltrados: [],
    ofertasFiltradas: [],
    company: {},
    offersByCompany: [],
    role: '',
    array: '',
    oferta: {},
    fetching: false,
    filtering: false
};

const studentReducer = (state: State = initialState, action: any) => {
    switch (action.type) {
        case GET_FETCHALUMNOS:
            return { ...state, fetching: true };
        case GET_FETCHALUMNOS_ERROR:
            return { ...state, fetching: false, error: action.payload };
        case GET_FETCHALUMNOS_SUCCESS:
            return {
                ...state,
                array: 'alumnos',
                alumnos: action.payload,
                fetching: false
            };
        case 'FETCHOFERTAS':
            return {
                ...state,
                array: 'ofertas',
                ofertas: action.payload
            };

        case 'SET_FILTERED_STUDENTS':
            if (action.payload.array[0] == 'reset') {
                return {
                    ...state,
                    alumnosFiltrados: state.alumnos
                };
            }

            if (action.payload.array.length === 0) {
                return {
                    ...state,
                    alumnosFiltrados: ['No results']
                };
            }
            return {
                ...state,
                alumnosFiltrados: action.payload.array
            };

        case 'SET_FILTERED_OFFERS':
            if (action.payload.array[0] == 'reset') {
                return {
                    ...state,
                    ofertasFiltradas: state.ofertas
                };
            }
            if (action.payload.array.length === 0) {
                return {
                    ...state,
                    ofertasFiltradas: ['No results']
                };
            }
            return {
                ...state,
                ofertasFiltradas: action.payload.array
            };

        case 'MODIFYALUMN':
            console.log('reducer', state.alumnos);
            return {
                ...state,
                alumnos: action.payload
            };
        case 'SEARCHOFFER':
            return {
                ...state,
                ofertas: action.payload
            };
        case 'LOGIN':
            return {
                ...state,
                company: action.payload1,
                offersByCompany: action.payload2
            };
        case 'ROLE':
            return {
                ...state,
                role: action.payload
            };
        case 'OFFER_DETAIL':
            return {
                ...state,
                oferta: action.payload
            };
        default:
            return state;
    }
};

export default studentReducer;
