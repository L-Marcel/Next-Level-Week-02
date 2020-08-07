import React, { InputHTMLAttributes } from 'react';

import './style.css'

interface SelectProps extends InputHTMLAttributes<HTMLSelectElement>{
    label: string;
    name: string;
    options: {
        value: string;
        label: string;
    }[];
}

const Select: React.FC<SelectProps> = ({label, name, options, ...rest}) => {
    return(
        <div className="select-block">
            <label htmlFor={name}>
                {label}
            </label>
            <select defaultValue="" id={name} {...rest}>
                <option value="" disabled hidden>
                    --Selecione uma opção--
                </option>

                {options.map(function(item, index){
                    return(
                        <option key={index} value={item.value}>
                            {item.label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
}

export default Select;