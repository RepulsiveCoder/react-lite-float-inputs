import React from "react";
import "./Input.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string } ;
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string } ;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string } ;
type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string } ;
type RadioProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string, options?: { value: string, label: string }[], selectedValue?: string } ;


const Input: React.FC<InputProps> = ({ label, ...props }) => {
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
        <div className="rfl-input-wrapper">
            <input type="text" placeholder="" {...props} onFocus={onFocus} onBlur={onBlur} />
            <label>{showOriginalLabel ? originalLabel??label : label}</label>
        </div>
    );
};

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
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
        <div className="rfl-input-wrapper">
            <textarea placeholder="" {...props} onFocus={onFocus} onBlur={onBlur} ></textarea>
            <label>{showOriginalLabel ? originalLabel??label : label}</label>
        </div>
    );
};

const Select: React.FC<SelectProps> = ({ label, ...props }) => {
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
        <div className="rfl-input-wrapper">
            <select {...props} className={isBlankValue ? "input-select-blank-value" : ""} onFocus={onFocus} onBlur={onBlur} onChange={onChange} >
                {props.children}
            </select>
            <label>{label}</label>
        </div>
    );
}

const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
    return (
        <div className="rfl-input-wrapper">
            <label className="checkbox-label">
            <input type="checkbox" {...props} />
            {label}
            </label>
        </div>
    );
};

const Radio: React.FC<RadioProps> = ({ label, options, selectedValue, ...props }) => {
    if (options && Array.isArray(options)) {
        console.log('Options: ', options);
        return (
            <>
                {options.map((option) => (
                    <div className="rfl-input-wrapper" key={option.value}>
                        <label className="radio-label">
                        <input type="radio" {...props} value={option.value} checked={selectedValue === option.value} />
                        {option.label}
                        </label>
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className="rfl-input-wrapper">
            <label className="radio-label">
            <input type="radio" {...props} />
            {label}
            </label>
        </div>
    );
};

export default Input;
export { TextArea, Select, Checkbox, Radio };