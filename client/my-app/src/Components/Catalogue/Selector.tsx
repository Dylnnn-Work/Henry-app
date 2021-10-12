import React, { useEffect, useState, ChangeEventHandler } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setFilteredStudents,
    setFilteredOffers
} from '../../Redux/Actions/actions';
import { AppState } from '../../Redux/Reducers/rootReducer';
import Chip from './Chip';
interface Props {
    roleUser: any;
}

const Selector: React.FC<Props> = ({ roleUser }) => {
    // console.log(roleUser);
    const [open, setOpen] = useState<any>({
        position: false,
        techs: false,
        gender: false,
        languages: false,
        modalidad: false,
        experience: false,
        jobType: false,
        country: false
    });
    const [filters, setFilters] = useState<any>({
        position: [],
        techs: [],
        gender: [],
        languages: [],
        modalidad: [],
        experience: [],
        jobType: [],
        country: []
    });
    const arr: string[] = [];
    const [chips, setChips] = useState(arr);
    const [method, setMethod] = useState('');
    const { array, alumnos, ofertas } = useSelector(
        (state: AppState) => state.students
    );
    const dispatch = useDispatch();
    const position = ['Frontend', 'Backend', 'Full Stack'];
    const technologies = [
        'Angular',
        'CSS',
        'Express js',
        'HTML',
        'Javascript',
        'Node js',
        'MongoDB',
        'Redux',
        'React',
        'SQL',
        'Typescript'
    ];
    const languages = [
        'English',
        'Spanish',
        'Portuguese',
        'Chinese',
        'Italian'
    ];
    const modalidad = ['On-site', 'Remote', 'Relocation'];
    const gender = ['Female', 'Male'];
    const experience = ['Trainee', 'Junior', 'Middle', 'Senior'];
    const jobType = ['Contract', 'Full-time', 'Intership', 'Part-time'];
    const country = ['Argentina', 'Chile', 'Colombia', 'Uruguay', 'Venezuela'];

    const handleClose = (value: any, filter: any) => {
        setFilters({
            ...filters,
            [filter]: filters[filter].filter((el: string) => el !== value)
        });
        const aux = chips.filter((el) => el !== value);
        setChips(aux);
    };

    const handleCategory = (e: any) => {
        setOpen({
            ...open,
            [(e.target as HTMLInputElement)?.name]: !open[
                (e.target as HTMLInputElement)?.name
            ]
        });
    };

    //nuevo
    const handleOption = async (option: string, e: any) => {
        !chips.includes(option) && (await setChips([...chips, option]));
        if (
            !filters[(e.target as HTMLInputElement)?.name].includes(option) //nuevo
        ) {
            await setFilters({
                ...filters,
                [(e.target as HTMLInputElement)?.name]: [
                    ...filters[(e.target as HTMLInputElement)?.name],
                    option
                ]
            });
        }
    };

    useEffect(() => {
        let aux: any[] = [];
        if (array === 'alumnos') {
            if (chips.length === 0) {
                dispatch(setFilteredStudents(['reset']));
            } else {
                aux = alumnos.filter((student: any) => {
                    return chips.every((filter) => {
                        return [
                            ...(student.position
                                ? student.position.split()
                                : []),
                            ...(student.abilities ? student.abilities : []),
                            ...(student.languages ? student.languages : []),
                            ...(student.wayOfWork ? student.wayOfWork : []),
                            ...(student.gender ? student.gender.split() : []),
                            ...(student.experienceLevel
                                ? student.experienceLevel.split()
                                : []),
                            ...(student.country ? student.country.split() : [])
                        ].includes(filter);
                    });
                });
                dispatch(setFilteredStudents(aux));
            }
        }
        if (array === 'ofertas') {
            if (chips.length === 0) {
                dispatch(setFilteredOffers(['reset']));
            } else {
                aux = ofertas.filter((oferta: any) => {
                    return chips.every((filter) => {
                        return [
                            ...(oferta.position ? oferta.position.split() : []),
                            ...(oferta.requirements ? oferta.requirements : []),
                            ...(oferta.wayOfWork ? oferta.wayOfWork : []),
                            ...(oferta.languages ? oferta.languages : []),
                            ...(oferta.jobType ? oferta.jobType.split() : []),
                            ...(oferta.location ? oferta.location.split() : []),
                            ...(oferta.experienceLevel
                                ? oferta.experienceLevel.split()
                                : [])
                        ].includes(filter);
                    });
                });
                dispatch(setFilteredOffers(aux));
            }
        }
    }, [chips, method, filters]);

    //hasta aca

    return (
        <div className="bg-yellow_henry flex flex-col justify-center self-center rounded-lg p-5">
            {filters.position.map((el: string, key: any) => (
                <Chip
                    el={el}
                    handleClose={handleClose}
                    key={key}
                    filter="position"
                />
            ))}
            <div className="flex flex-col justify-center mb-5">
                <button
                    className={
                        open.position
                            ? 'text-lg text-white bg-grayHenry h-10 rounded-t-md min-w-full focus:outline-none'
                            : 'text-lg text-grayHenry bg-none h-10 rounded-md min-w-full focus:outline-none border-2 border-grayHenry hover:border hover:border-grayHenry hover:shadow-lg'
                    }
                    onClick={handleCategory}
                    name="position">
                    Role
                </button>
                <div
                    className={
                        open.position
                            ? 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 focus:outline-none'
                            : 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 hidden'
                    }>
                    {position.map((el, key) => (
                        <button
                            key={key}
                            name="position"
                            className="h-10"
                            onClick={(e) => handleOption(el, e)}>
                            {el}
                        </button>
                    ))}
                </div>
            </div>

            {filters.techs.map((el: string, key: any) => (
                <Chip
                    el={el}
                    handleClose={handleClose}
                    key={key}
                    filter="techs"
                />
            ))}
            <div className="flex flex-col justify-center mb-5">
                <button
                    className={
                        open.techs
                            ? 'text-lg text-white bg-grayHenry h-10 rounded-t-md min-w-full focus:outline-none'
                            : 'text-lg text-grayHenry bg-none h-10 rounded-md min-w-full focus:outline-none border-2 border-grayHenry hover:border hover:border-grayHenry hover:shadow-lg'
                    }
                    onClick={handleCategory}
                    name="techs">
                    Technologies
                </button>
                <div
                    className={
                        open.techs
                            ? 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 focus:outline-none'
                            : 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 hidden'
                    }>
                    {technologies.map((el, key) => (
                        <button
                            key={key}
                            name="techs"
                            className="h-10"
                            onClick={(e) => handleOption(el, e)}>
                            {el}
                        </button>
                    ))}
                </div>
            </div>

            {filters.languages.map((el: string, key: any) => (
                <Chip
                    el={el}
                    handleClose={handleClose}
                    key={key}
                    filter="languages"
                />
            ))}
            <div className="flex flex-col justify-center mb-5">
                <button
                    className={
                        open.languages
                            ? 'text-lg text-white bg-grayHenry h-10 rounded-t-md min-w-full focus:outline-none'
                            : 'text-lg text-grayHenry bg-none h-10 rounded-md min-w-full focus:outline-none border-2 border-grayHenry hover:border hover:border-grayHenry hover:shadow-lg'
                    }
                    onClick={handleCategory}
                    name="languages">
                    Languages
                </button>
                <div
                    className={
                        open.languages
                            ? 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 focus:outline-none'
                            : 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 hidden'
                    }>
                    {languages.map((el, key) => (
                        <button
                            key={key}
                            name="languages"
                            className="h-10"
                            onClick={(e) => handleOption(el, e)}>
                            {el}
                        </button>
                    ))}
                </div>
            </div>

            {filters.modalidad.map((el: string, key: any) => (
                <Chip
                    el={el}
                    handleClose={handleClose}
                    key={key}
                    filter="modalidad"
                />
            ))}
            <div className="flex flex-col justify-center mb-5">
                <button
                    className={
                        open.modalidad
                            ? 'text-lg text-white bg-grayHenry h-10 rounded-t-md min-w-full focus:outline-none'
                            : 'text-lg text-grayHenry bg-none h-10 rounded-md min-w-full focus:outline-none border-2 border-grayHenry hover:border hover:border-grayHenry hover:shadow-lg'
                    }
                    onClick={handleCategory}
                    name="modalidad">
                    Working Modality
                </button>
                <div
                    className={
                        open.modalidad
                            ? 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 focus:outline-none'
                            : 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 hidden'
                    }>
                    {modalidad.map((el, key) => (
                        <button
                            key={key}
                            className="h-10"
                            name="modalidad"
                            onClick={(e) => handleOption(el, e)}>
                            {el}
                        </button>
                    ))}
                </div>
            </div>

            {roleUser === 'empresa' ? (
                <>
                    {' '}
                    {filters.gender.map((el: string, key: any) => (
                        <Chip
                            el={el}
                            handleClose={handleClose}
                            key={key}
                            filter="gender"
                        />
                    ))}
                    <div className="flex flex-col justify-center mb-5">
                        <button
                            className={
                                open.gender
                                    ? 'text-lg text-white bg-grayHenry h-10 rounded-t-md min-w-full focus:outline-none'
                                    : 'text-lg text-grayHenry bg-none h-10 rounded-md min-w-full focus:outline-none border-2 border-grayHenry hover:border hover:border-grayHenry hover:shadow-lg'
                            }
                            onClick={handleCategory}
                            name="gender">
                            Gender
                        </button>
                        <div
                            className={
                                open.gender
                                    ? 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 focus:outline-none'
                                    : 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 hidden'
                            }>
                            {gender.map((el, key) => (
                                <button
                                    key={key}
                                    className="h-10"
                                    name="gender"
                                    onClick={(e) => handleOption(el, e)}>
                                    {el}
                                </button>
                            ))}
                        </div>
                    </div>{' '}
                </>
            ) : null}

            {roleUser === 'alumno' ? (
                <>
                    {' '}
                    {filters.jobType.map((el: string, key: any) => (
                        <Chip
                            el={el}
                            handleClose={handleClose}
                            key={key}
                            filter="jobType"
                        />
                    ))}
                    <div className="flex flex-col justify-center mb-5">
                        <button
                            className={
                                open.jobType
                                    ? 'text-lg text-white bg-grayHenry h-10 rounded-t-md min-w-full focus:outline-none'
                                    : 'text-lg text-grayHenry bg-none h-10 rounded-md min-w-full focus:outline-none border-2 border-grayHenry hover:border hover:border-grayHenry hover:shadow-lg'
                            }
                            onClick={handleCategory}
                            name="jobType">
                            Job Type
                        </button>
                        <div
                            className={
                                open.jobType
                                    ? 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 focus:outline-none'
                                    : 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 hidden'
                            }>
                            {jobType.map((el, key) => (
                                <button
                                    key={key}
                                    className="h-10"
                                    name="jobType"
                                    onClick={(e) => handleOption(el, e)}>
                                    {el}
                                </button>
                            ))}
                        </div>
                    </div>{' '}
                </>
            ) : null}
            {roleUser === 'alumno' ? (
                <>
                    {filters.experience.map((el: string, key: any) => (
                        <Chip
                            el={el}
                            handleClose={handleClose}
                            key={key}
                            filter="experience"
                        />
                    ))}

                    <div className="flex flex-col justify-center">
                        <button
                            className={
                                open.experience
                                    ? 'text-lg text-white bg-grayHenry h-10 rounded-t-md min-w-full focus:outline-none '
                                    : 'text-lg text-grayHenry bg-none h-10 rounded-md min-w-full focus:outline-none border-2 border-grayHenry hover:border hover:border-grayHenry hover:shadow-lg'
                            }
                            onClick={handleCategory}
                            name="experience">
                            Experience Level
                        </button>
                        <div
                            className={
                                open.experience
                                    ? 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 focus:outline-none'
                                    : 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 hidden'
                            }>
                            {experience.map((el, key) => (
                                <button
                                    key={key}
                                    className="h-10"
                                    name="experience"
                                    onClick={(e) => handleOption(el, e)}>
                                    {el}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            ) : null}

            {roleUser === 'empresa' ? (
                <>
                    {' '}
                    {filters.country.map((el: string, key: any) => (
                        <Chip
                            el={el}
                            handleClose={handleClose}
                            key={key}
                            filter="country"
                        />
                    ))}
                    <div className="flex flex-col justify-center">
                        <button
                            className={
                                open.country
                                    ? 'text-lg text-white bg-grayHenry h-10 rounded-t-md min-w-full focus:outline-none'
                                    : 'text-lg text-grayHenry bg-none h-10 rounded-md min-w-full focus:outline-none border-2 border-grayHenry hover:border hover:border-grayHenry hover:shadow-lg'
                            }
                            onClick={handleCategory}
                            name="country">
                            Location
                        </button>
                        <div
                            className={
                                open.country
                                    ? 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 focus:outline-none'
                                    : 'flex flex-col bg-gray-300 text-center rounded-b-md bg-opacity-50 hidden'
                            }>
                            {country.map((el, key) => (
                                <button
                                    key={key}
                                    className="h-10"
                                    name="country"
                                    onClick={(e) => handleOption(el, e)}>
                                    {el}
                                </button>
                            ))}
                        </div>
                    </div>{' '}
                </>
            ) : null}
        </div>
    );
};

export default Selector;
