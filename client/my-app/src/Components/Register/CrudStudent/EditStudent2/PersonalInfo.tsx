import React from 'react';
import { formatDate } from '../../../../utils/date';
import { Field } from 'formik';
import countries from './countries.json';

type personalInfo = {
    name: string;
    surname: string;
    email: string;
    country: string;
    birthdate: string;
    description: string;
    errors: any;
    touched: any;
    handleChange: any;
    handleBlur: any;
    phone: string;
    gender: string;
    location: string;
};

const PersolanInfo: React.FC<personalInfo> = ({
    name,
    surname,
    email,
    country,
    birthdate,
    description,
    errors,
    touched,
    handleChange,
    handleBlur,
    phone,
    gender,
    location
}) => {
    const Birthdate = formatDate(birthdate);
    console.log('nueva fecha');
    console.log(Birthdate);
    return (
        <>
            <h2 className="max-w-sm mx-auto md:w-1/4 text-gray-600">
                Personal info
            </h2>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div className="mt-2">
                    <label
                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                        htmlFor="name">
                        Name*
                    </label>
                    <input
                        id="name"
                        placeholder="name"
                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        type="text"
                        value={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.name && touched.name ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{errors.name}</p>
                        </div>
                    ) : null}
                </div>

                <div className="mt-2">
                    <label
                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                        htmlFor="surname">
                        SurName*
                    </label>
                    <input
                        id="surname"
                        placeholder="surname"
                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        type="text"
                        value={surname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <span className="block text-red-700 sm:inline"></span>
                </div>

                {errors.surname && touched.surname ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{errors.surname}</p>
                    </div>
                ) : null}
            </div>

            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div className="mt-2">
                    <label
                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                        htmlFor="gender">
                        Gender
                    </label>
                    <Field
                        value={gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as="select"
                        name="gender"
                        className="capitalize bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        <option className="capitalize" value="male">
                            Male
                        </option>
                        <option className="capitalize" value="female">
                            Female
                        </option>
                        <option value="select" selected>
                            Select
                        </option>
                    </Field>
                    {/* {errors.name && touched.name ? (
                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                            <p className="font-bold">Error</p>
                            <p>{errors.name}</p>
                        </div>
                    ) : null} */}
                </div>

                <div className="mt-2">
                    <label
                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                        htmlFor="phone">
                        Phone*
                    </label>
                    <input
                        id="phone"
                        placeholder="phone"
                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        type="text"
                        value={phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <span className="block text-red-700 sm:inline"></span>
                </div>

                {/* {errors.surname && touched.surname ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{errors.surname}</p>
                    </div>
                ) : null} */}
            </div>

            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div className="mt-2">
                    <label
                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                        htmlFor="country">
                        Country
                    </label>
                    {/* <input
                        id="country"
                        placeholder="country"
                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring capitalize"
                        type="Country"
                        value={country}
                        onChange={handleChange}
                    /> */}
                    <Field
                        value={country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        as="select"
                        name="country"
                        className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
                        <option value="None">Select country</option>
                        <option value={countries[0].country}>
                            {countries[0].country}
                        </option>
                        <option value={countries[1].country}>
                            {countries[1].country}
                        </option>
                        <option value={countries[2].country}>
                            {countries[2].country}
                        </option>
                        <option value={countries[3].country}>
                            {countries[3].country}
                        </option>
                        <option value={countries[4].country}>
                            {countries[4].country}
                        </option>
                        <option value={countries[5].country}>
                            {countries[5].country}
                        </option>
                        <option value={countries[6].country}>
                            {countries[6].country}
                        </option>
                        <option value={countries[7].country}>
                            {countries[7].country}
                        </option>
                        <option value={countries[8].country}>
                            {countries[8].country}
                        </option>
                        {/* <option value={countries[9].country}>
                            {countries[9].country}
                        </option>
                        <option value={countries[10].country}>
                            {countries[10].country}
                        </option> */}
                        <option value={countries[11].country}>
                            {countries[11].country}
                        </option>
                        <option value={countries[12].country}>
                            {countries[12].country}
                        </option>
                        <option value={countries[13].country}>
                            {countries[13].country}
                        </option>
                        <option value={countries[14].country}>
                            {countries[14].country}
                        </option>
                        <option value={countries[15].country}>
                            {countries[15].country}
                        </option>
                        {/* <option value={countries[16].country}>
                            {countries[16].country}
                        </option> */}
                        ;
                    </Field>
                </div>
                <div className="mt-2">
                    <label
                        className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                        htmlFor="location">
                        Location
                    </label>
                    <input
                        id="location"
                        placeholder="location"
                        className="capitalize bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                        type="text"
                        value={location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <span className="block text-red-700 sm:inline"></span>
                </div>
            </div>
            <div className="mt-2">
                <label
                    className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                    htmlFor="Birthdate">
                    Birthdate*
                </label>
                <input
                    id="Birthdate"
                    placeholder="Birthdate"
                    className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    type="date"
                    value={formatDate(birthdate)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                <span className="block text-red-700 sm:inline"></span>
                {errors.Birthdate && touched.Birthdate ? (
                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                        <p className="font-bold">Error</p>
                        <p>{errors.Birthdate}</p>
                    </div>
                ) : null}
            </div>

            <div className="mt-4">
                <label
                    className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                    htmlFor="Email">
                    Email*
                </label>
                <input
                    id="email"
                    placeholder="email"
                    className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    type="Email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>

            {errors.email && touched.email ? (
                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                    <p className="font-bold">Error</p>
                    <p>{errors.email}</p>
                </div>
            ) : null}

            <div className="mt-4">
                <label
                    className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                    htmlFor="description">
                    Description
                </label>
                <textarea
                    id="description"
                    placeholder="description"
                    className="bg-white bg-opacity-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                    value={description}
                    onChange={handleChange}
                />
            </div>
        </>
    );
};

export default PersolanInfo;
