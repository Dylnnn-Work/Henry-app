export interface Recruiter {
    name: string;
    description: string;
    email: string;
    password: string;
    confirm_password: string;
    picture: string;
    _id: string;
}

export interface RecruiterState {
    recruiters: Recruiter[];
    loading: boolean;
    error: string;
}

export interface Company {
    empresas: Recruiter[];
}

export interface Oferta {
    title: string;
    company: string;
    postulants: [string];
    description: string;
    _id: string;
    position: string;
    requirements: [string];
    experienceLevel: string;
    wayOfWork: [string];
    jobType: string;
    languages: [string];
    location: string;
}
