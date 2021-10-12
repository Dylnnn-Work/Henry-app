import React from 'react';

interface Feature {
    img: string;
    title: string;
}

const Features: React.FC<Feature> = ({ img, title }) => {
    return (
        <div className="flex justify-center items-center p-10 w-auto overflow-hidden mx-auto">
            <div
                className="relative flex flex-col items-center justify-around p-4 mr-4 w-auto h-auto rounded-2xl "
                style={{ transform: 'translate(0px, 0px)', opacity: 1 }}>
                <div
                    className="absolute z-0 w-full h-full text-white transform scale-x-105 scale-y-95 bg-yellow-400 rounded-xl -rotate-2 "
                    style={{ zIndex: -1 }}></div>
                <div
                    className="absolute z-0 w-full h-full text-white transform scale-x-105 scale-y-95 bg-yellow_henry rounded-xl rotate-2 "
                    style={{ zIndex: -1 }}></div>
                <div
                    className="absolute z-0 w-full h-full transform scale-x-105 scale-y-95 bg-gradient-to-br from-grayHenry to-gray-400 rounded-xl "
                    style={{ zIndex: -1 }}></div>
                <h3 className="z-10 p-2 text-xl font-semibold text-white">
                    {title}
                </h3>
                <div className="z-10 p-2 max-w-lg">
                    <img src={img} alt="img" />
                </div>
            </div>
        </div>
    );
};

export default Features;
