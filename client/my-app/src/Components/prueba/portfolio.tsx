import React from 'react';

const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100
};

const testimonials = [
    {
        title: ' Ribbon',
        text:
            '"We are a company that allows people to generate money by offering all kinds of online experience services. Henry helped us by offering us a wide variety of highly qualified and super motivated developers. The best thing we saw from the developers was their motivation and enthusiasm to work in a place where their work has a high impact. They learn very quickly and have an eagerness to be independent, make decisions and learn more and more to become better programmers"',
        img: 'vojta',
        author: 'Vojta Drmota, Co-Founder'
    },
    {
        title: 'Osmind',
        text:
            '"We are a Digital Mental Health Startup based in Silicon Valley. Henry helped me find amazing developers in less than half the time it would have taken me to find them otherwise. I would recommend Henry to any Startup founder who is desperately looking for resources to build their development team"',
        img: 'lucia',
        author: 'Lucia Huang, Co-Founder and CEO'
    },
    {
        title: ' 3',
        text:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit  Quae dolores deserunt ea doloremque natus error, rerumquas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!',
        img: 'as',
        author: 'bla bla 3'
    }
];

const Portfolio: React.FC = () => {
    const [state, setState] = React.useState(0);

    const handlePrevious = () => {
        state === 0 ? setState(2) : setState((old) => old - 1);
    };

    const handleNext = () => {
        state === 2 ? setState(0) : setState((old) => old + 1);
    };

    return (
        <div style={container}>
            <div
                onClick={handlePrevious}
                role={'button'}
                tabIndex={0}
                onKeyPress={() => console.log('')}>
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
            </div>
            <div
                style={{
                    display: 'flex',
                    marginLeft: 20,
                    marginRight: 20
                }}>
                <div className=" max-w-4xl grid grid-cols-2 px-8 py-4 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800 ">
                    <div
                        className="bg-gray-300 h-56 w-full rounded-lg shadow-md bg-cover "
                        style={{
                            backgroundImage:
                                'url(' +
                                'https://images.unsplash.com/photo-1543966888-7c1dc482a810?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80' +
                                ')'
                        }}></div>
                    <div>
                        <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white md:mt-0 md:text-3xl">
                            {testimonials[state].title}
                        </h2>

                        <p className="mt-2 text-xl text-gray-600 dark:text-gray-200">
                            {testimonials[state].text}
                        </p>

                        <div className="flex justify-end mt-4">
                            <a
                                // href="#"
                                className="text-m font-medium text-black-500 dark:text-black-300">
                                {testimonials[state].author}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div
                role={'button'}
                tabIndex={0}
                onClick={handleNext}
                onKeyPress={() => console.log('tecla apretada')}>
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
            </div>
        </div>
    );
};

export default Portfolio;
