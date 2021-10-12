import React, { useState } from 'react';
import { HenryCard } from './HenryCard';
import NavBar from './NavBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchAlumnos,
    fetchOfertas,
    loginCompany,
    getRole
} from '../../Redux/Actions/actions';
import Selector from './Selector';
import { AppState } from '../../Redux/Reducers/rootReducer';
import { OfertaCard } from './OfertaCard';
import { gql, useQuery } from '@apollo/client';
// import ReactPaginate from 'react-paginate';
import './Paginate.css';
import jwt_decode from 'jwt-decode';
import Footer from '../LandingPage/Footer';
import Pagination from '@material-ui/lab/Pagination';
import ReactPaginate from 'react-paginate';

const ROLE = gql`
    query role($token: String) {
        verificarLogueo(token: $token)
    }
`;

export const CatalogueHenrys: React.FC = () => {
    const [pageNumber, setPagenumber] = useState(0);
    const [currentInfo, setCurrentInfo] = useState<any[]>([]);
    const token = localStorage.getItem('token')?.toString();
    const decode: any = jwt_decode(token!);
    const { data, loading, error } = useQuery(ROLE, {
        variables: {
            token: token
        }
    });

    const dispatch = useDispatch();
    const {
        alumnos,
        alumnosFiltrados,
        offersByCompany,
        ofertas,
        ofertasFiltradas,
        fetching,
        filtering,
        // role
        company
    } = useSelector((state: AppState) => state.students);
    console.log(company);
    /*Paginador Walter */
    const cardsPerPage2 = 10;
    const pagesVisited = pageNumber * cardsPerPage2;
    /*********************************************** */

    /*Paginador Lean */

    const [currentPage, setCurrentPage] = useState(1);
    const [cardsPerPage, setCardsPerPage] = useState(10);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = currentInfo?.slice(indexOfFirstCard, indexOfLastCard);

    const paginate = (event: any, value: any) => setCurrentPage(value);
    /*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

    useEffect(() => {
        if (data?.verificarLogueo === 'empresa') {
            dispatch(fetchAlumnos());
            token && dispatch(loginCompany(token));
        }
        if (data?.verificarLogueo === 'alumno') {
            dispatch(fetchOfertas());
        }
    }, [data]);

    useEffect(() => {
        decode.role === 'empresa' && !fetching
            ? setCurrentInfo(alumnos)
            : setCurrentInfo(ofertas);
    }, [alumnos, ofertas]);

    useEffect(() => {
        if (alumnosFiltrados.length > 0 || ofertasFiltradas.length > 0) {
            decode.role === 'empresa'
                ? setCurrentInfo(alumnosFiltrados)
                : setCurrentInfo(ofertasFiltradas);
        }
    }, [alumnosFiltrados, ofertasFiltradas]);

    const currentCards2 = currentInfo?.slice(
        pagesVisited,
        pagesVisited + cardsPerPage2
    );
    const pageCount = Math.ceil(currentInfo.length / cardsPerPage2);

    const changePage = ({ selected }: { selected: any }) => {
        setPagenumber(selected);
        window.scrollTo(0, 0);
    };

    return (
        <div className="bg-gradient-to-br from-grayHenry to-gray-500 min-h-screen p-0 m-0">
            <NavBar />
            <div className="grid grid-cols-5 grid-rows-1 mt-20 ml-7 ">
                <div className="col-start-1 col-end-2 grid-row-start-1 grid-row-end-2 h-auto">
                    <Selector roleUser={data?.verificarLogueo} />
                </div>
                <div
                    className="col-start-2 col-end-6 row-start-1 row-end-2 gap-y-20 text-center text-white"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto auto auto auto',
                        gridTemplateRows: '1fr'
                    }}>
                    {currentCards2[0] !== 'No results' &&
                    currentCards2.length === 0 ? (
                        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    ) : null}

                    {currentCards2[0] === 'No results' ? (
                        <h2>There is no results with that filters!</h2>
                    ) : null}

                    {/* <ReactPaginate
                        previousLabel={'Previous'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        nextLabel={'Next'}
                        containerClassName={'paginationBttns'}
                        previousLinkClassName={'previousBttn'}
                        nextLinkClassName={'nextBttn'}
                        disabledClassName={'paginationDisabled'}
                        activeClassName={'paginationActive'}
                        pageRangeDisplayed={10}
                        marginPagesDisplayed={2} */}
                    {currentCards2[0] !== 'No results' &&
                    currentCards2.length > 0
                        ? data?.verificarLogueo === 'empresa'
                            ? currentCards2?.map(
                                  (alumno: any, index: number) => {
                                      return (
                                          <div key={index}>
                                              <HenryCard
                                                  name={alumno.name}
                                                  surname={alumno.surname}
                                                  abilities={alumno.abilities}
                                                  picture={alumno.picture}
                                                  id={alumno._id}
                                                  email={alumno.email}
                                                  gender={alumno.gender}
                                                  offersOfTheCompany={
                                                      offersByCompany.ofertasbycompany
                                                  }
                                                  favorites={
                                                      company?.empresaLogueada
                                                          ?.favorites
                                                  }
                                                  position={alumno.position}
                                              />
                                          </div>
                                      );
                                  }
                              )
                            : currentCards2?.map(
                                  (oferta: any, index: number) => {
                                      return (
                                          <div key={index}>
                                              <OfertaCard
                                                  email={oferta.email}
                                                  company={oferta.company}
                                                  title={oferta.title}
                                                  description={
                                                      oferta.description
                                                  }
                                                  picture={oferta.picture}
                                                  id={oferta._id}
                                                  postulants={oferta.postulant}
                                                  requirements={
                                                      oferta.requirements
                                                  }
                                                  languages={oferta.languages}
                                                  wayOfWork={oferta.wayOfWork}
                                                  jobType={oferta.jobType}
                                                  experienceLevel={
                                                      oferta.experienceLevel
                                                  }
                                                  position={oferta.position}
                                                  companyID={oferta.companyID}
                                              />
                                          </div>
                                      );
                                  }
                              )
                        : null}
                </div>
                <div className="col-start-2 col-end-6 mt-20 ml-40 mb-20">
                    {/* <Pagination
                        size="large"
                        variant="outlined"
                        shape="rounded"
                        count={Math.ceil(currentInfo?.length / cardsPerPage)}
                        onChange={paginate}
                    /> */}
                    <ReactPaginate
                        previousLabel={'Previous'}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        nextLabel={'Next'}
                        containerClassName={'paginationBttns'}
                        previousLinkClassName={'previousBttn'}
                        nextLinkClassName={'nextBttn'}
                        disabledClassName={'paginationDisabled'}
                        activeClassName={'paginationActive'}
                        pageRangeDisplayed={10}
                        marginPagesDisplayed={2}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CatalogueHenrys;

/*  SPINNER
    if (loading)
        return (
            <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
*/
