import React from 'react';

interface Props {
    el: string;
    key: any;
    filter: string;
    handleClose: any;
}

const Chip: React.FC<Props> = ({ el, key, filter, handleClose }) => {
    return (
        <div className="mb-5">
            <div
                className="flex justify-center w-max m-1 font-medium py-1.5 px-1.5 rounded-full text-grayHenry border border-grayHenry"
                key={key}>
                <div className="text-sm font-normal leading-none w-full flex-initial">
                    {el}
                </div>
                <div className="flex flex-auto flex-row-reverse">
                    <div
                        className="focus:outline-none"
                        data-value={el}
                        data-name={filter}
                        onClick={(e) => {
                            handleClose(
                                e.currentTarget.getAttribute('data-value'),
                                e.currentTarget.getAttribute('data-name')
                            );
                        }}
                        onKeyPress={() => console.log('modificar')}
                        role="button"
                        tabIndex={0}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10%"
                            height="10%"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-x cursor-pointer hover:text-yellow-400 rounded-full w-4 h-4 ml-2">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chip;
