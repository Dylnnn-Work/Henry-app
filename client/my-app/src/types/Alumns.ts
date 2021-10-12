export interface Alumn {
    name: string;
    surname: string;
    description: string;
    timeLapse: string;
    picture: string;
    habilities: string[];
    ExtraHabilities: string[];
    Birthdate: string;
    email: string;
    country: string;
    password: string;
    _id: string;
    experience: ProfessionalBackground[];
    education: ProfessionalBackground[];
    phone: string;
    gender: string;
    location: string;
}

export interface AlumnState {
    Alumns: Alumn[];
    loading: boolean;
    error: string;
}

export interface Alumns {
    alumnos: Alumn[];
}

export interface ProfessionalBackground {
    _id: string;
    description: string;
    timeLapse: string;
}
export interface ProyectInterface {
    _id: string;
    description: string;
    link: string;
    image: string;
    title: string;
}
export interface Options {
    label: string;
    value: string;
}

export interface INews {
    INew: INew[];
}

export interface INew {
    _id: string;
    description: string;
}
