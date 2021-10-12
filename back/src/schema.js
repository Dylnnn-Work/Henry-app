const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar JSON
  scalar JSONObject
  type Query {
    alumnos(limit: Int, offset: Int, where: JSON, order: JSON): [Alumno]
    alumno(_id: ID): Alumno
    empresa(_id: ID): Empresa
    empresas: [Empresa]
    ofertas: [Oferta]
    ofertasbycompany(company: String): [Oferta]
    oferta(_id: ID): Oferta
    busqueda(name: String): [Alumno]
    review: [Review]
    news: [News]
    alumnoLogueado(token: String): Alumno
    empresaLogueada(token: String): Empresa
    busquedaAlumnos(search: String): [Alumno]
    alumnoPorMail(email: String): Alumno
    empresaPorMail(email: String): Empresa
    verificarLogueo(token: String): String
    reviewsPorAlumno(_id: ID): [Review]

    studentsByCountry: [AlumnsByCountry]
    numberOfStudents: [NumberOfStudent]
    numberOfCompanies: [NumberOfCompanies]
    ofertasByCompanyId(_id: String): [Oferta]
  }
  type Education {
    _id: ID
    description: String
    timeLapse: String
  }
  type Experiencie {
    _id: ID
    description: String
    timeLapse: String
  }
  input FavsStudentInput {
    offer: String
    offerID: ID
    _id: ID
  }
  type FavsStudent {
    offer: String
    offerID: ID
    _id: ID
  }
  type Proyect {
    _id: ID
    image: String
    title: String
    description: String
    link: String
  }
  type Alumno {
    name: String
    surname: String
    Birthdate: String
    position: String #job role
    abilities: [String]
    languages: [String]
    wayOfWork: [String]
    gender: String
    experienceLevel: String
    experience: [Experiencie]
    ExtraAbilities: [String]
    picture: String
    proyect: [Proyect]
    description: String
    country: String
    email: String
    password: String
    _id: ID
    phone: String
    location: String
    education: [Education]
    isAvailable: Boolean
    isAdmin: Boolean
    review: [Review]
    favorites: [FavsStudent]
    googleId: String
  }
  input EducationInput {
    _id: ID
    description: String
    timeLapse: String
  }
  input ExperienceInput {
    _id: ID
    description: String
    timeLapse: String
  }
  input ProyectInput {
    _id: ID
    image: String
    title: String
    description: String
    link: String
  }
  input AlumnoInput {
    name: String
    surname: String
    Birthdate: String
    position: String #job role
    abilities: [String]
    languages: [String]
    wayOfWork: [String]
    gender: String
    experienceLevel: String
    ExtraAbilities: [String]
    picture: String
    description: String
    country: String
    email: String
    password: String
    _id: ID
    phone: String
    proyect: [ProyectInput]
    location: String
    education: [EducationInput]
    experience: [ExperienceInput]
    isAvailable: Boolean
    isAdmin: Boolean
    review: [ReviewInput]
    googleId: String
    favorites: [FavsStudentInput]
  }
  input EmpresaInput {
    name: String
    linkPage: String
    picture: String
    description: String
    email: String
    password: String
    _id: ID
  }
  type FavoritesC {
    postulant: String
    postulantID: ID
    offer: String
    offerID: ID
    _id: ID
  }
  input FavoritesCompany {
    postulant: String
    postulantID: ID
    offer: String
    offerID: ID
    _id: ID
  }
  type Empresa {
    name: String
    linkPage: String
    picture: String
    description: String
    email: String
    password: String
    favorites: [FavoritesC]
    _id: ID
  }
  type Mutation {
    agregarAlumno(
      name: String
      surname: String
      email: String!
      password: String
      googleId: String
    ): AuthPayload!
    agregarEmpresa(
      name: String
      email: String!
      password: String
      googleId: String
      linkPage: String
    ): AuthPayload!
    borrarAlumno(_id: ID): Alumno
    borrarEmpresa(_id: ID): Empresa
    modificarAlumno(_id: ID, alumno: AlumnoInput): Alumno
    modificarEmpresa(_id: ID, empresa: EmpresaInput): Empresa
    agregarOferta(oferta: OfertaInput): Oferta
    borrarOferta(_id: ID): Oferta
    modificarOferta(_id: ID, oferta: OfertaInput): Oferta
    loginAlumno(email: String!, password: String): AuthPayload!
    loginEmpresa(email: String!, password: String): AuthPayload!
    agregarAlumnoFavs(_id: ID): Alumno
    agregarReview(_id: ID, review: ReviewInput): Alumno
    borrarReviews(_id: ID): Alumno
    modificarReview(_id: ID, input: ReviewInput): Review
    agregarNews(news: NewsInput): News
    borrarNews(_id: ID): News
    modificarNews(_id: ID, input: NewsInput): News
    createFav(favorites: FavoritesCompany, token: String): Empresa
    deleteFav(_id: ID, token: String): Empresa
    loginGoogleAlumno(email: String!, googleId: String): AuthPayload!
    loginGoogleEmpresa(email: String!, googleId: String): AuthPayload!
    vincularGoogle(email: String!, googleId: String): AuthPayload
    resetearPasswordAlumno(token: String!, password: String!): Alumno
    resetearPasswordEmpresa(token: String!, password: String!): Empresa
    createFavS(favorites: FavsStudentInput, token: String): Alumno
    deleteFavS(_id: ID, token: String): Alumno
    promoverAdmin(email: String): Alumno
    bajarAdmin(email: String): Alumno
  }
  input OfertaInput {
    companyId: String
    email: String
    title: String
    company: String
    postulants: [String]
    description: String
    _id: ID
    position: String
    requirements: [String]
    experienceLevel: String
    wayOfWork: [String]
    jobType: String
    languages: [String]
    location: String
  }
  type Oferta {
    companyId: String
    email: String
    title: String
    company: String
    postulants: [String]
    description: String
    _id: ID
    requirements: [String]
    experienceLevel: String
    wayOfWork: [String]
    languages: [String]
    jobType: String
    position: String
    location: String
  }
  type AuthPayload {
    token: String
    user: Alumno
  }
  type Review {
    _id: String
    name: String
    surname: String
    picture: String
    description: String!
  }

  type autor {
    _id: String
  }
  input ReviewInput {
    _id: String!
    name: String!
    surname: String!
    picture: String
    description: String!
  }
  type News {
    _id: ID
    description: String
  }
  input NewsInput {
    _id: ID
    description: String
  }

  type AlumnsByCountry {
    argentina: Float
    bolivia: Float
    chile: Float
    colombia: Float
    ecuador: Float
    paraguay: Float
    peru: Float
    uruguay: Float
    venezuela: Float
    guatemala: Float
    honduras: Float
    nicaragua: Float
    panama: Float
    mexico: Float
  }

  type NumberOfStudent {
    _id: String
    total: Float
  }

  type NumberOfCompanies {
    _id: String
    total: Float
  }
`;
module.exports = { typeDefs };
