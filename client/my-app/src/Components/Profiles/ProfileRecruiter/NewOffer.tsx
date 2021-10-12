import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../Redux/Reducers/rootReducer';
import { getRole } from '../../../Redux/Actions/actions';
import Select from 'react-select';
import { gql, useMutation, useQuery } from '@apollo/client';

interface Props {
    company: any;
    handleAdd: any;
    idCompany: string;
}

const langOptions = [
    { value: 'English', label: 'English' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Portuguese', label: 'Portuguese' },
    { value: 'Chinese', label: 'Chinese' },
    { value: 'German', label: 'German' },
    { value: 'Italian', label: 'Italian' }
];
const jobRole = [
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Backend', label: 'Backend' },
    { value: 'Full Stack', label: 'Full Stack' }
];
const technologies = [
    { value: 'Angular', label: 'Angular' },
    { value: 'CSS', label: 'CSS' },
    { value: 'Express js', label: 'Express js' },
    { value: 'HTML', label: 'HTML' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'Node js', label: 'Node js' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'Redux', label: 'Redux' },
    { value: 'React', label: 'React' },
    { value: 'SQL', label: 'SQL' },
    { value: 'Typescript', label: 'Typescript' }
];
const jobTypes = [
    { value: 'Contract', label: 'Contract' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Intership', label: 'Intership' },
    { value: 'Part-time', label: 'Part-time' }
];
const modalidad = [
    { value: 'On-site', label: 'On-site' },
    { value: 'Remote', label: 'Remote' },
    { value: 'Relocation', label: 'Relocation' }
];
const experience = [
    { value: 'Trainee', label: 'Trainee' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Middle', label: 'Middle' },
    { value: 'Senior', label: 'Senior' }
];

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

const CREATE_OFFER = gql`
    mutation addOffer($oferta: OfertaInput) {
        agregarOferta(oferta: $oferta) {
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

const JobOffer: React.FC<Props> = ({ company, handleAdd, idCompany }) => {
    // const { data, loading } = useQuery(OFFER, { variables: { id: _id } });
    const [createOffer] = useMutation(CREATE_OFFER);
    const { data, loading } = useQuery(GET_OFFERS, {
        variables: { id: idCompany }
    });
    const dispatch = useDispatch();
    const { role } = useSelector((state: AppState) => state.students);
    const token = localStorage.getItem('token');

    const [title2, setTitle] = useState<any>();
    const [position2, setPosition] = useState<any>();
    const [requirements2, setRequirements] = useState<any>();
    const [description2, setDescription] = useState<any>();
    const [experienceLevel2, setExperienceLevel] = useState<any>();
    const [jobType2, setJobType] = useState<any>();
    const [wayOfWork2, setWayOfWork] = useState<any>();
    const [languages2, setLanguages] = useState<any>([]);
    const [location2, setLocation] = useState<any>();

    useEffect(() => {
        dispatch(getRole(token));
    }, []);

    if (loading) return <p>Cargando... </p>;
    console.log('data JobOffer');
    console.log(data);

    const handleEdit = async () => {
        try {
            const { data } = await createOffer({
                variables: {
                    oferta: {
                        title: title2,
                        position: position2,
                        requirements: requirements2,
                        description: description2,
                        experienceLevel: experienceLevel2,
                        wayOfWork: wayOfWork2,
                        jobType: jobType2,
                        languages: languages2,
                        location: location2,
                        company: company,
                        companyId: idCompany
                    }
                },
                update: async (cache, { data: dataCache }) => {
                    const cacheEdit: any = await cache.readQuery({
                        query: GET_OFFERS,
                        variables: { id: idCompany }
                    });
                    const { agregarOferta } = dataCache;
                    const { ofertasByCompanyId } = cacheEdit;
                    const temp = [...ofertasByCompanyId, agregarOferta];

                    cache.writeQuery({
                        query: GET_OFFERS,
                        data: {
                            ofertasByCompanyId: temp
                        },
                        variables: { id: idCompany }
                    });
                }
            });

            handleAdd();
        } catch (error) {
            console.log(error);
        }
    };

    const handleTitle = (e: any) => {
        setTitle((e.target as HTMLInputElement)?.value);
    };
    const handlePosition = (selectedOption: any) => {
        setPosition(selectedOption.value);
    };
    const handleTechs = (selectedOption: any) => {
        setRequirements(selectedOption.map((tech: any) => tech.value));
    };
    const handleDescription = (e: any) => {
        setDescription((e.target as HTMLInputElement)?.value);
    };
    const handleExpLevel = (selectedOption: any) => {
        setExperienceLevel(selectedOption.value);
    };
    const handleWayOfWork = (selectedOption: any) => {
        setWayOfWork(selectedOption.value);
    };
    const handleJobType = (selectedOption: any) => {
        setJobType(selectedOption.value);
    };
    const handleLanguages = (selectedOption: any) => {
        setLanguages(selectedOption.map((lang: any) => lang.value));
    };
    const handleLocation = (e: any) => {
        setLocation((e.target as HTMLInputElement)?.value);
    };

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none pt-10 pb-10">
                <div className="relative w-auto mx-auto max-w-3xl ">
                    <div className="rounded-lg shadow-2xl px-5 relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                        <div className="text-center ">
                            <h4 className=" text-base font-semibold text-white p-1">
                                Title
                            </h4>
                            <textarea
                                className=" text-lg font-semibold w-96 h-10 text-black border rounded text-center"
                                onChange={(e) => handleTitle(e)}
                            />
                        </div>
                        <div className="flex flex-row justify-center mb-3">
                            <div className="w-1/2 m-2">
                                <h4 className=" text-base font-semibold text-white text-center p-1">
                                    Experience level
                                </h4>
                                <Select
                                    options={experience}
                                    onChange={handleExpLevel}
                                    className="roleSelect"
                                />
                            </div>
                            <div className="w-1/2 m-2">
                                <h4 className=" text-base font-semibold text-white text-center p-1">
                                    Role
                                </h4>
                                <Select
                                    options={jobRole}
                                    onChange={handlePosition}
                                    className="roleSelect"
                                />
                            </div>
                        </div>

                        <div className="relative flex-auto flex-col justify-center self-center ">
                            <h4 className="text-center text-base font-semibold text-white p-1">
                                Technologies
                            </h4>
                            <div style={{ width: 500 }} className="self-center">
                                <Select
                                    isMulti
                                    options={technologies}
                                    onChange={handleTechs}
                                    className="roleSelect"
                                />
                            </div>
                        </div>

                        <div className="flex flex-row justify-center mt-3 ">
                            <div className="w-1/3 m-2">
                                <h4 className=" text-base font-semibold text-white text-center p-1">
                                    Working modality
                                </h4>
                                <Select
                                    options={modalidad}
                                    onChange={handleWayOfWork}
                                    className="roleSelect"
                                />
                            </div>
                            <div className="w-1/3 m-2">
                                <h4 className=" text-base font-semibold text-white text-center p-1">
                                    Job Type
                                </h4>
                                <Select
                                    name="jobType"
                                    options={jobTypes}
                                    onChange={handleJobType}
                                    className="roleSelect"
                                />
                            </div>
                            <div className="w-1/3 m-2">
                                <h4 className=" text-base font-semibold text-white text-center p-1">
                                    Languages
                                </h4>
                                <Select
                                    isMulti
                                    options={langOptions}
                                    onChange={handleLanguages}
                                    className="roleSelect"
                                />
                            </div>
                        </div>
                        <h4 className="text-center text-base font-semibold text-white p-1">
                            Description
                        </h4>
                        <textarea
                            className=" text-sm h-32 font-semibold text-black border rounded w-11/12 self-center overflow-y-auto"
                            onChange={(e) => handleDescription(e)}
                        />

                        <h4 className="text-center text-base font-semibold text-white p-1">
                            Location
                        </h4>
                        <textarea
                            className=" text-sm font-semibold text-black border rounded w-11/12 self-center overflow-y-auto"
                            onChange={(e) => handleLocation(e)}
                        />

                        <div className="flex items-center justify-end p-5">
                            <button
                                className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-5 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-2"
                                type="button"
                                style={{
                                    transition: 'all .15s ease'
                                }}
                                onClick={handleEdit}>
                                Save
                            </button>
                            <button
                                className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-3 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-2"
                                type="button"
                                style={{
                                    transition: 'all .15s ease'
                                }}
                                onClick={handleAdd}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-50 fixed inset-0 z-40 bg-white"></div>
        </>
    );
};

export default JobOffer;
