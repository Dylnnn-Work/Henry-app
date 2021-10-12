import React, { useState } from 'react';
import RecruiterRegister from './CrudRecruiter/RecruiterRegister';
import StudentsRegister from './CrudStudent/StudentsRegister';

const CrudRegister: React.FC = () => {
    const [form, setForm] = useState('recruiter');

    return (
        <div className="bg-gradient-to-br from-grayHenry to-gray-500 min-h-screen p-0 m-0">
            <div className="py-16">
                <div className="flex flex-row justify-center max-w-sm mr-auto ml-auto dark:bg-gray-800 overflow-hidden lg:max-w-2xl">
                    <button
                        className={
                            form === 'recruiter'
                                ? 'bg-yellow_henry text-grayHenry py-4 px-4 w-full tracking-wide rounded-tl-lg focus:outline-none'
                                : 'bg-grayHenry text-white py-4 px-4 w-full tracking-wide rounded-tl-lg hover:bg-gray-600 focus:outline-none'
                        }
                        name="recruiter"
                        onClick={(e) => {
                            setForm((e.target as HTMLInputElement).name);
                        }}>
                        Recruiter
                    </button>
                    <button
                        className="bg-grayHenry text-white py-4 px-4 w-full tracking-wide rounded-tr-lg hover:bg-gray-600 focus:outline-none focus:bg-yellow_henry focus:text-black active:bg-yellow_henry"
                        name="student"
                        onClick={(e) => {
                            setForm((e.target as HTMLInputElement).name);
                        }}>
                        {`Henry's`}
                    </button>
                </div>

                {form === 'recruiter' ? (
                    <div>
                        <RecruiterRegister />
                    </div>
                ) : (
                    <div>
                        <StudentsRegister />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CrudRegister;
