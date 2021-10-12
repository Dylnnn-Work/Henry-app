import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../Redux/Reducers/rootReducer';
import { getRole } from '../../../Redux/Actions/actions';
import Select from 'react-select';
import { gql, useMutation, useQuery } from '@apollo/client';

interface PropsJob {
    _id: any;
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

const OFFER = gql`
    query($id: ID) {
        oferta(_id: $id) {
            _id
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
`;

const EDIT_OFFER = gql`
    mutation editOffer($id: ID, $oferta: OfertaInput) {
        modificarOferta(_id: $id, oferta: $oferta) {
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
        }
    }
`;

const DELETE_OFFER = gql`
    mutation deleteOffer($id: ID) {
        borrarOferta(_id: $id) {
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
        }
    }
`;

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

const JobOffer: React.FC<PropsJob> = ({ _id, idCompany }) => {
    const { data, loading } = useQuery(OFFER, { variables: { id: _id } });
    const [editOffer] = useMutation(EDIT_OFFER);
    const [deleteOffer] = useMutation(DELETE_OFFER);
    const dispatch = useDispatch();
    const { role } = useSelector((state: AppState) => state.students);
    const token = localStorage.getItem('token');

    const [showMore, setShowMore] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [title2, setTitle] = useState<any>();
    const [position2, setPosition] = useState<any>();
    const [requirements2, setRequirements] = useState<any>();
    const [description2, setDescription] = useState<any>();
    const [experienceLevel2, setExperienceLevel] = useState<any>();
    const [jobType2, setJobType] = useState<any>();
    const [wayOfWork2, setWayOfWork] = useState<any>();
    const [languages2, setLanguages] = useState<any>([]);
    const [location2, setLocation] = useState<any>();
    /*  const {
        title,
        position,
        requirements,
        description,
        experienceLevel,
        wayOfWork,
        jobType,
        languages,
        location
    } = data || []; */
    useEffect(() => {
        dispatch(getRole(token));
    }, []);

    if (loading) return null;
    const { oferta } = data;
    let defaultTechs: any[] = [];
    let defaultLanguages: any[] = [];

    oferta?.requirements === undefined
        ? (defaultTechs = [])
        : (defaultTechs = oferta?.requirements?.map((req: any) => ({
              label: req,
              value: req
          })));

    oferta?.languages === undefined
        ? (defaultLanguages = [])
        : (defaultLanguages = oferta?.languages?.map((req: any) => ({
              label: req,
              value: req
          })));

    const handleEdit = async () => {
        try {
            const { data } = await editOffer({
                variables: {
                    id: _id,
                    oferta: {
                        title: title2,
                        position: position2,
                        requirements: requirements2,
                        description: description2,
                        experienceLevel: experienceLevel2,
                        wayOfWork: wayOfWork2,
                        jobType: jobType2,
                        languages: languages2,
                        location: location2
                    }
                },
                update: async (cache) => {
                    const cacheEdit: any = await cache.readQuery({
                        query: OFFER,
                        variables: { id: _id }
                    });
                    await cache.writeQuery({
                        query: OFFER,
                        data: cacheEdit,
                        variables: { id: _id }
                    });
                }
            });
            setShowEdit(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = async () => {
        try {
            const { data } = await deleteOffer({
                variables: {
                    id: _id
                },
                update: async (cache) => {
                    const cacheEdit: any = await cache.readQuery({
                        query: GET_OFFERS,
                        variables: { id: idCompany }
                    });
                    const { ofertasByCompanyId } = cacheEdit;
                    const temp = ofertasByCompanyId.filter(
                        (oferta: any) => oferta._id !== _id
                    );

                    await cache.writeQuery({
                        query: GET_OFFERS,
                        data: {
                            ofertasByCompanyId: temp
                        },
                        variables: { id: idCompany }
                    });
                }
            });
            setShowEdit(false);
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
        <div>
            <div className="object-cover bg-grayHenry w-full h-auto md:h-48 xl:h-48 rounded-lg">
                <p className="pt-6 text-center text-lg capitalize font-bold text-white">
                    {oferta?.title}
                </p>
                <div className="grid grid-cols-2 gap-1 mr-2 ml-2">
                    {oferta?.requirements
                        .slice(0, 4)
                        .map((req: string, index: number) => {
                            return (
                                <div
                                    key={index}
                                    className="border-solid border rounded px-2 py-1 mt-2 text-center border-yellow_henry text-white whitespace-nowrap w-auto">
                                    {req}
                                </div>
                            );
                        })}
                </div>

                <div className="relative flex flex-row justify-center self-center items-center mt-2">
                    <button
                        className="text-center pl-2.5 h-10 w-10 mr-1 font-medium tracking-wide text-yellow_henry capitalize transition-colors duration-200 transform rounded-full dark:bg-gray-800 hover:bg-gray-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700 hover:text-white"
                        onClick={() => setShowMore(true)}>
                        <svg
                            width="19"
                            height="14"
                            viewBox="0 0 19 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M17.0913 5.96179C17.4858 6.47778 17.4858 7.17436 17.0913 7.68952C15.8488 9.31155 12.8677 12.6513 9.38733 12.6513C5.90692 12.6513 2.92585 9.31155 1.68332 7.68952C1.49139 7.44245 1.38721 7.13851 1.38721 6.82566C1.38721 6.5128 1.49139 6.20886 1.68332 5.96179C2.92585 4.33977 5.90692 1 9.38733 1C12.8677 1 15.8488 4.33977 17.0913 5.96179V5.96179Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9.38733 9.32228C10.7662 9.32228 11.884 8.20446 11.884 6.82557C11.884 5.44667 10.7662 4.32886 9.38733 4.32886C8.00844 4.32886 6.89062 5.44667 6.89062 6.82557C6.89062 8.20446 8.00844 9.32228 9.38733 9.32228Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    {role?.verificarLogueo === 'alumno' ? (
                        <button className="text-center pl-3 h-10 w-10 font-medium tracking-wide text-yellow_henry capitalize transition-colors duration-200 transform rounded-full dark:bg-gray-800 hover:bg-gray-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700 hover:text-white">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 0C3.58173 0 0 3.58173 0 8C0 12.4183 3.58173 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58173 12.4183 0 8 0ZM8 1.73828C11.4583 1.73828 14.2607 4.54261 14.2607 8C14.2607 11.4574 11.4583 14.2607 8 14.2607C4.54173 14.2607 1.73925 11.4574 1.73925 8C1.73927 4.54261 4.54173 1.73828 8 1.73828ZM11.0654 4.20117L6.42871 8.83887L4.9248 7.33496L3.44921 8.80957L4.95312 10.3135L6.43847 11.7988L7.91309 10.3232L12.5508 5.68652L11.0654 4.20117V4.20117Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    ) : role?.verificarLogueo === 'empresa' ? (
                        <>
                            <button
                                className="text-center pl-3 h-10 w-10 ml-1 mr-1 font-medium tracking-wide text-yellow_henry capitalize transition-colors duration-200 transform rounded-full dark:bg-gray-800 hover:bg-gray-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700 hover:text-white"
                                onClick={() => setShowEdit(true)}>
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M0 12.6671V16H3.33287L13.1626 6.17025L9.82975 2.83738L0 12.6671ZM15.74 3.59283C16.0867 3.24622 16.0867 2.68629 15.74 2.33968L13.6603 0.259964C13.3137 -0.0866546 12.7538 -0.0866546 12.4072 0.259964L10.7807 1.8864L14.1136 5.21928L15.74 3.59283V3.59283Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                            <button
                                className="text-center pl-3 h-10 w-10 ml-1 font-medium tracking-wide text-yellow_henry capitalize transition-colors duration-200 transform rounded-full dark:bg-gray-800 hover:bg-gray-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-gray-500 dark:focus:bg-gray-700 hover:text-white"
                                onClick={handleDelete}>
                                <svg
                                    width="16"
                                    height="20"
                                    viewBox="0 0 16 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M5.3335 7.16675H6.66683V15.1667H5.3335V7.16675Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M9.3335 7.16675H10.6668V15.1667H9.3335V7.16675Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M0 3.16675V4.50008H1.33333V17.8334C1.33333 18.187 1.47381 18.5262 1.72386 18.7762C1.97391 19.0263 2.31304 19.1667 2.66667 19.1667H13.3333C13.687 19.1667 14.0261 19.0263 14.2761 18.7762C14.5262 18.5262 14.6667 18.187 14.6667 17.8334V4.50008H16V3.16675H0ZM2.66667 17.8334V4.50008H13.3333V17.8334H2.66667Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M5.3335 0.5H10.6668V1.83333H5.3335V0.5Z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </button>
                        </>
                    ) : null}
                </div>
            </div>

            {showMore ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="rounded-lg shadow-2xl relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                                <div className="text-center p-5 ">
                                    <h3 className="text-xl font-semibold text-white">
                                        {oferta?.title}
                                    </h3>
                                    {/* <h3 className="text-xl font-semibold text-white">
                                        {company.charAt(0).toUpperCase() +
                                            company.slice(1)}
                                    </h3> */}
                                </div>
                                <div className="grid gap-1 lg:grid-cols-1 xl:grid-cols-2 ">
                                    <div className="">
                                        <p className="text-base  pl-5  text-white">
                                            Job type: {oferta?.jobType}
                                        </p>
                                        <p className="text-base pl-5  text-white">
                                            Experience level:{' '}
                                            {oferta?.experienceLevel}
                                        </p>
                                        <p className="text-base pl-5 m-0  text-white">
                                            Role:{' '}
                                            {oferta?.position + ' Developer'}
                                        </p>{' '}
                                    </div>
                                    {oferta?.languages.length > 0 ? (
                                        <p className="text-base pl-5 m-0  text-white">
                                            Languages:
                                            {oferta?.languages?.map(
                                                (lang: any, key: number) => (
                                                    <li key={key}>{lang}</li>
                                                )
                                            )}
                                        </p>
                                    ) : null}
                                </div>
                                <h4 className="text-base p-5  text-white">
                                    Description: {oferta?.description}
                                </h4>
                                {oferta.location ? (
                                    <h4 className="text-base p-5 pt-0  text-white">
                                        Location: {oferta?.location}
                                    </h4>
                                ) : null}
                                <div className="relative flex-auto flex-col justify-center self-center ">
                                    <h4 className="text-center text-base font-semibold text-white">
                                        Technologies
                                    </h4>
                                    <div className="flex flex-row">
                                        {oferta?.requirements?.map(
                                            (req: any, index: any) => {
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
                                        onClick={() => setShowMore(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            {/* {showEdit ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-4xl ">
                            <div className="rounded-lg shadow-2xl p-8 relative flex flex-col w-full bg-grayHenry outline-none focus:outline-none ">
                                <div className="text-center ">
                                    <h4 className=" text-base font-semibold text-white p-1">
                                        Title
                                    </h4>
                                    <textarea
                                        className="text-lg font-semibold w-96 h-10 text-black border rounded text-center"
                                        defaultValue={oferta?.title}
                                        onChange={(e) => handleTitle(e)}
                                    />
                                </div>
                                <div className="flex flex-row justify-center mb-5">
                                    <div className="w-1/2 m-2">
                                        <h4 className=" text-base font-semibold text-white text-center p-1">
                                            Experience level
                                        </h4>
                                        <Select
                                            options={experience}
                                            defaultValue={{
                                                value: 'default',
                                                label: oferta?.experienceLevel
                                            }}
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
                                            defaultValue={{
                                                value: 'default',
                                                label: oferta?.position
                                            }}
                                            onChange={handlePosition}
                                            className="roleSelect"
                                        />
                                    </div>
                                </div>

                                <div className="relative flex-auto flex-col justify-center self-center ">
                                    <h4 className="text-center text-base font-semibold text-white p-1">
                                        Technologies
                                    </h4>
                                    <div
                                        style={{ width: 500 }}
                                        className="self-center">
                                        <Select
                                            isMulti
                                            options={technologies}
                                            defaultValue={defaultTechs}
                                            onChange={handleTechs}
                                            className="roleSelect"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-row justify-center mt-5 ">
                                    <div className="w-1/3 m-2">
                                        <h4 className=" text-base font-semibold text-white text-center p-1">
                                            Working modality
                                        </h4>
                                        <Select
                                            options={modalidad}
                                            defaultValue={{
                                                value: 'default',
                                                label: oferta?.wayOfWork
                                            }}
                                            onChange={handleWayOfWork}
                                        />
                                    </div>
                                    <div className="w-1/3 m-2">
                                        <h4 className=" text-base font-semibold text-white text-center p-1">
                                            Job Type
                                        </h4>
                                        <Select
                                            name="jobType"
                                            options={jobTypes}
                                            defaultValue={{
                                                value: 'default',
                                                label: oferta?.jobType
                                            }}
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
                                            defaultValue={defaultLanguages}
                                            onChange={handleLanguages}
                                        />
                                    </div>
                                </div>
                                <h4 className="text-center text-base font-semibold text-white p-1">
                                    Description
                                </h4>
                                <textarea
                                    className="text-sm h-32 font-semibold text-black border rounded w-11/12 self-center overflow-y-auto"
                                    defaultValue={oferta?.description}
                                    onChange={(e) => handleDescription(e)}
                                />

                                <h4 className="text-center text-base font-semibold text-white p-1">
                                    Location
                                </h4>
                                <textarea
                                    className="text-sm font-semibold text-black border rounded w-11/12 self-center overflow-y-auto"
                                    defaultValue={oferta?.location}
                                    onChange={(e) => handleLocation(e)}
                                />

                                <div className="flex items-center justify-end p-4">
                                    <button
                                        className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{
                                            transition: 'all .15s ease'
                                        }}
                                        onClick={handleEdit}>
                                        Save
                                    </button>
                                    <button
                                        className="bg-yellow_henry text-grayHenry active:bg-white font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{
                                            transition: 'all .15s ease'
                                        }}
                                        onClick={() => setShowEdit(false)}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-50 fixed inset-0 z-40 bg-white"></div>
                </>
            ) : null} */}
        </div>
    );
};

export default JobOffer;
