import React, { useState, useEffect } from 'react';
import Creatable from 'react-select/creatable';
import { Options } from '../../../../types/Alumns';

type abilities = {
    options: Options[];
    selectAbility: any;
};

const Abilities: React.FC<abilities> = ({ selectAbility, options }) => {
    return (
        <>
            <h2 className="max-w-sm mx-auto md:w-1/4 text-gray-600">
                Abilities
            </h2>
            <div className="max-w-full mx-auto space-y-5 ">
                <Creatable
                    id="select"
                    isMulti
                    options={options}
                    defaultValue={options}
                    getOptionValue={(options) => options.label}
                    getOptionLabel={(options) => options.value}
                    menuShouldScrollIntoView={true}
                    components={{
                        DropdownIndicator: null
                    }}
                    onChange={(ability: any) => selectAbility(ability)}
                />
            </div>
        </>
    );
};

export default Abilities;
