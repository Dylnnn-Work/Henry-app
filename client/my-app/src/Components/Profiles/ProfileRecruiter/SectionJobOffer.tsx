import { gql, useQuery } from '@apollo/client';
import { configureStore } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import JobOffer from './JobOffer';
import NewOffer from './NewOffer';
import Pagination from '@material-ui/lab/Pagination';
interface PropsSection {
    company: string;
    idCompany: string;
}

/* const GET_OFFERS = gql`
    query offersByCompany($company: String) {
        ofertasbycompany(company: $company) {
            _id
            title
            position
            requirements
            description
            experienceLevel
            wayOfWork
            jobType
            languages
            location
            companyId
        }
    }
`; */

const GET_OFFERS = gql`
    query($id: String) {
        ofertasByCompanyId(_id: $id) {
            _id
            title
            position
            requirements
            description
            experienceLevel
            wayOfWork
            jobType
            languages
            location
            companyId
        }
    }
`;

const SectionJobOffer: React.FC<PropsSection> = ({ company, idCompany }) => {
    const { data, loading } = useQuery(GET_OFFERS, {
        variables: {
            id: idCompany
        }
    });
    const [add, setAdd] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    console.log('idcompany');

    console.log(idCompany);

    const indexOfLastOffer = currentPage * postsPerPage;
    const indexOfFirstOffer = indexOfLastOffer - postsPerPage;
    if (loading) return null;
    console.log('data company');
    console.log(data);
    /* const currentOffers = data?.ofertasbycompany?.slice(
        indexOfFirstOffer,
        indexOfLastOffer
    ); */
    const currentOffers = data?.ofertasByCompanyId?.slice(
        indexOfFirstOffer,
        indexOfLastOffer
    );
    console.log('currentOffers');

    console.log(currentOffers);

    const paginate = (event: any, value: any) => setCurrentPage(value);

    const handleAdd = () => {
        setAdd(!add);
    };

    return (
        <>
            <div className=" bg-yellow_henry sm:max-w-xl md:max-w-full lg:max-w-full px-5 lg:py-5 rounded-lg mt-5">
                <div className="border-b border-grayHenry mb-5 flex justify-center self-center items-center pb-3">
                    <h2 className="text-center max-w-lg font-sans uppercase text-lg font-bold leading-none tracking-tight text-grayHenry md:mx-auto">
                        {company} Job Offer
                    </h2>

                    <button onClick={handleAdd} className="focus:outline-none">
                        <svg
                            width="19"
                            height="18"
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M10 9H1M10 18V9V18ZM10 9V0V9ZM10 9H19H10Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
                <div className="grid gap-5 sm:grid-cols-1 lg:grid-cols-2">
                    {currentOffers?.map((oferta: any, key: any) => {
                        return (
                            <JobOffer
                                _id={oferta._id}
                                key={key}
                                idCompany={idCompany}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-row justify-center self-center mt-5">
                    <Pagination
                        variant="outlined"
                        shape="rounded"
                        count={Math.ceil(
                            data?.ofertasbycompany?.length / postsPerPage
                        )}
                        onChange={paginate}
                    />
                </div>
            </div>
            {add && (
                <NewOffer
                    company={company}
                    handleAdd={handleAdd}
                    idCompany={idCompany}
                />
            )}
        </>
    );
};

export default SectionJobOffer;

/*
<button className="bg-grayHenry text-white block rounded-md font-bold py-3 px-4 mr-2 flex items-center transform hover:scale-110 motion-reduce:transform-none">
                        <svg
                            className="mr-2 "
                            width="8"
                            height="12"
                            viewBox="0 0 8 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7.41 10.59L2.83 6L7.41 1.41L6 0L0 6L6 12L7.41 10.59Z"
                                fill="white"
                            />
                        </svg>
                        Prev
                    </button>
                    <button className="bg-grayHenry text-white block rounded-md font-bold py-3 px-4 ml-2 flex items-center transform hover:scale-110 motion-reduce:transform-none">
                        Next
                        <svg
                            className="ml-2 "
                            width="8"
                            height="12"
                            viewBox="0 0 8 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M0.589844 10.59L5.16984 6L0.589844 1.41L1.99984 0L7.99984 6L1.99984 12L0.589844 10.59Z"
                                fill="white"
                            />
                        </svg>
                    </button>
*/
