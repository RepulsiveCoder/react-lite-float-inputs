import React from "react";
import "./Input.css";

type ClassProps = {
    wrapperClassName?: string;
    inputClassName?: string;
    labelClassName?: string;
};

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string } & ClassProps;
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string } & ClassProps;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string } & ClassProps;
type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string } & ClassProps;
type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string, options?: { value: string, label: string }[], selectedValue?: string } & ClassProps;


const Input: React.FC<InputProps> = ({ label, wrapperClassName, inputClassName, labelClassName, ...props }) => {
    const [ showOriginalLabel, setShowOriginalLabel ] = React.useState(false);
    const originalLabel = label;
    if (props.placeholder && props.placeholder.length > 0) {
        label = props.placeholder;
        props.placeholder = "";
    }

    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setShowOriginalLabel(e.target.matches(':focus') || !e.target.matches(':placeholder-shown'));
        if (props.onFocus && typeof props.onFocus === 'function') {
            props.onFocus(e);
        }
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setShowOriginalLabel(e.target.matches(':focus') || !e.target.matches(':placeholder-shown'));
        if (props.onBlur && typeof props.onBlur === 'function') {
            props.onBlur(e);
        }
    }

    return (
        <div className={`rfl-input-wrapper ${wrapperClassName ?? ""}`}>
            <input type="text" placeholder="" className={inputClassName} {...props} onFocus={onFocus} onBlur={onBlur} />
            <label className={labelClassName}>{showOriginalLabel ? originalLabel??label : label}</label>
        </div>
    );
};

const TextArea: React.FC<TextAreaProps> = ({ label, wrapperClassName, inputClassName, labelClassName, ...props }) => {
    const [ showOriginalLabel, setShowOriginalLabel ] = React.useState(false);
    const originalLabel = label;
    if (props.placeholder && props.placeholder.length > 0) {
        label = props.placeholder;
        props.placeholder = "";
    }

    const onFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setShowOriginalLabel(e.target.matches(':focus') || !e.target.matches(':placeholder-shown'));
        if (props.onFocus && typeof props.onFocus === 'function') {
            props.onFocus(e);
        }
    }

    const onBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setShowOriginalLabel(e.target.matches(':focus') || !e.target.matches(':placeholder-shown'));
        if (props.onBlur && typeof props.onBlur === 'function') {
            props.onBlur(e);
        }
    }

    return (
        <div className={`rfl-input-wrapper ${wrapperClassName ?? ""}`}>
            <textarea placeholder="" className={inputClassName} {...props} onFocus={onFocus} onBlur={onBlur} ></textarea>
            <label className={labelClassName}>{showOriginalLabel ? originalLabel??label : label}</label>
        </div>
    );
};

const Select: React.FC<SelectProps> = ({ label, wrapperClassName, inputClassName, labelClassName, ...props }) => {
    const [ isBlankValue, setIsBlankValue ] = React.useState(true);

    const onFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setIsBlankValue(e.target.value === '' );
        if (props.onFocus && typeof props.onFocus === 'function') {
            props.onFocus(e);
        }
    }

    const onBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
        setIsBlankValue(e.target.value === '' );
        if (props.onBlur && typeof props.onBlur === 'function') {
            props.onBlur(e);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setIsBlankValue(e.target.value === '' );
        if (props.onChange && typeof props.onChange === 'function') {
            props.onChange(e);
        }
    }

    React.useEffect(() => {
        setIsBlankValue((props.value === '' || props.value === undefined || props.value === null) && (props.defaultValue === '' || props.defaultValue === undefined || props.defaultValue === null));
    }, []);

    return (
        <div className={`rfl-input-wrapper ${wrapperClassName ?? ""}`}>
            <select {...props} className={isBlankValue ? `input-select-blank-value ${inputClassName ?? ""}` : inputClassName} onFocus={onFocus} onBlur={onBlur} onChange={onChange} >
                {props.children}
            </select>
            <label className={labelClassName}>{label}</label>
        </div>
    );
}

const Checkbox: React.FC<CheckboxProps> = ({ label, wrapperClassName, inputClassName, labelClassName, ...props }) => {
    return (
        <div className={`rfl-input-wrapper ${wrapperClassName ?? ""}`}>
            <label className={`checkbox-label ${labelClassName ?? ""}`}>
            <input type="checkbox" className={inputClassName} {...props} />
            {label}
            </label>
        </div>
    );
};

const Radio: React.FC<RadioProps> = ({ label, options, selectedValue, wrapperClassName, inputClassName, labelClassName, ...props }) => {
    if (options && Array.isArray(options)) {
        console.log('Options: ', options);
        return (
            <>
                {options.map((option) => (
                    <div className={`rfl-input-wrapper ${wrapperClassName ?? ""}`} key={option.value}>
                        <label className={`radio-label ${labelClassName ?? ""}`}>
                        <input type="radio" className={inputClassName} {...props} value={option.value} checked={selectedValue === option.value} />
                        {option.label}
                        </label>
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className={`rfl-input-wrapper ${wrapperClassName ?? ""}`}>
            <label className={`radio-label ${labelClassName ?? ""}`}>
            <input type="radio" className={inputClassName} {...props} />
            {label}
            </label>
        </div>
    );
};

export default Input;
export { Input, TextArea, Select, Checkbox, Radio };