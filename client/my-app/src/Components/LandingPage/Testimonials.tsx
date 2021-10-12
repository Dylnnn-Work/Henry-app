import React from 'react';
import vojta1 from './Images/vojta1.png';
import lucia from './Images/lucia.png';
import enrique from './Images/vojta.jpeg';

const testimonials = [
    {
        title: ' Ribbon',
        text:
            '"We are a company that allows people to generate money by offering all kinds of online experience services. Henry helped us by offering us a wide variety of highly qualified and super motivated developers. The best thing we saw from the developers was their motivation and enthusiasm to work in a place where their work has a high impact. They learn very quickly and have an eagerness to be independent, make decisions and learn more and more to become better programmers"',
        img: vojta1,
        author: 'Vojta Drmota, Co-Founder'
    },
    {
        title: 'Osmind',
        text:
            '"We are a Digital Mental Health Startup based in Silicon Valley. Henry helped me find amazing developers in less than half the time it would have taken me to find them otherwise. I would recommend Henry to any Startup founder who is desperately looking for resources to build their development team"',
        img: lucia,
        author: 'Lucia Huang, Co-Founder and CEO'
    },
    {
        title: 'YCombinator',
        text:
            '"Given the large unmet demand for software engineers, creating a school in Latin America to develop those engineers is a big opportunity, and this is the team to succeed. We invested in Henry because the team is talented and mission-driven"',
        img: enrique,
        author: 'Tim Brady, Partner'
    }
];

const Testimonials: React.FC = () => {
    const [state, setState] = React.useState(0);

    const handlePrevious = () => {
        state === 0 ? setState(2) : setState((old) => old - 1);
    };

    const handleNext = () => {
        state === 2 ? setState(0) : setState((old) => old + 1);
    };

    return (
        <div className="flex justify-center self-center">
            <button onClick={handlePrevious} className="focus:outline-none">
                <svg
                    className="h-10 w-10"
                    xmlns="http://www.w3.org/100/svg"
                    viewBox="0 0 20 20"
                    fill="yellow">
                    <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <div className="flex ml-5 mr-5">
                <div className=" max-w-4xl px-8 py-4 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 ">
                    <div className="flex justify-center -mt-16 md:justify-end">
                        <img
                            className="object-cover w-20 h-20 border-2 border-white-500 rounded-full dark:border-white-400"
                            alt="Testimonial avatar"
                            src={testimonials[state].img}
                        />
                    </div>

                    <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 md:text-3xl">
                        {testimonials[state].title}
                    </h2>

                    <p className="mt-2 text-xl text-gray-600 dark:text-gray-200">
                        {testimonials[state].text}
                    </p>

                    <div className="flex justify-end mt-4">
                        <a className="text-m font-medium text-black-500 dark:text-black-300">
                            {testimonials[state].author}
                        </a>
                    </div>
                </div>
            </div>
            <button onClick={handleNext} className="focus:outline-none">
                <svg
                    className="h-10 w-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="yellow">
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

export default Testimonials;
