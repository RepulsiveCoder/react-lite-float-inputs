import React from "react";
import "./Input.css";

type ClassProps = {
    wrapperClassName?: string;
    labelClassName?: string;
};

type LabelPrefixSuffixProps = {
    labelPrefix?: string | React.ReactNode | null | undefined;
    labelSuffix?: string | React.ReactNode | null | undefined;
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string } & ClassProps;
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string } & ClassProps;
type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string } & ClassProps;
type RangeInputProps = React.InputHTMLAttributes<HTMLInputElement> & ClassProps & { labelPosition?: "top" | "bottom" | "left" | "right" | "none" };
type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string | React.ReactNode } & LabelPrefixSuffixProps & ClassProps;
type RadioProps = React.InputHTMLAttributes<HTMLInputElement> &
    {
        label?: string | React.ReactNode;
        options?: ({
            value: string;
            label: string | React.ReactNode;
        } & LabelPrefixSuffixProps)[];
        selectedValue?: string;
    } & LabelPrefixSuffixProps & ClassProps;


const Input: React.FC<InputProps> = ({ label, wrapperClassName, labelClassName, ...props }) => {
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
            <input type="text" placeholder="" {...props} onFocus={onFocus} onBlur={onBlur} />
            <label className={labelClassName}>{showOriginalLabel ? originalLabel??label : label}</label>
        </div>
    );
};

const TextArea: React.FC<TextAreaProps> = ({ label, wrapperClassName, labelClassName, ...props }) => {
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
            <textarea placeholder="" {...props} onFocus={onFocus} onBlur={onBlur} ></textarea>
            <label className={labelClassName}>{showOriginalLabel ? originalLabel??label : label}</label>
        </div>
    );
};

const Select: React.FC<SelectProps> = ({ label, wrapperClassName, labelClassName, ...props }) => {
    const [ isBlankValue, setIsBlankValue ] = React.useState(true);

    const onFocus = (e: React.FocusEvent<HTMLSelectElement>) => {
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
            <select {...props} className={isBlankValue ? `input-select-blank-value ${props.className ?? ""}` : props.className} onFocus={onFocus} onBlur={onBlur} onChange={onChange} >
                {props.children}
            </select>
            <label className={labelClassName}>{label}</label>
        </div>
    );
}

const RangeInput: React.FC<RangeInputProps> = ({ labelPosition = "right", wrapperClassName="flex items-center gap-2", labelClassName="text-sm min-w-8! border text-right border-gray-600 rounded-md px-1", ...props }) => {
    return (
        <div className={`rfl-input-wrapper rfl-range-wrapper ${labelPosition} ${wrapperClassName ?? ""}`}>
            {labelPosition === "top" || labelPosition === "left" ? <div className={`range-value ${labelClassName ?? ""}`}>{props.value}</div> : null}
            <input type="range" {...props}  />
            {labelPosition === "bottom" || labelPosition === "right" ? <div className={`range-value ${labelClassName ?? ""}`}>{props.value}</div> : null}
        </div>
    );
};

const Checkbox: React.FC<CheckboxProps> = ({ label, wrapperClassName, labelClassName, labelPrefix, labelSuffix, ...props }) => {
    return (
        <div className={`rfl-input-wrapper ${wrapperClassName ?? ""}`}>
            {labelPrefix}
            <label className={`checkbox-label ${labelClassName ?? ""}`}>
                <input type="checkbox" {...props} />
                {label}
            </label>
            {labelSuffix}
        </div>
    );
};

const Radio: React.FC<RadioProps> = ({ label, options, selectedValue, wrapperClassName, labelClassName, labelPrefix, labelSuffix, ...props }) => {
    if (options && Array.isArray(options)) {
        return (
            <>
                {options.map((option) => (
                    <div className={`rfl-input-wrapper ${wrapperClassName ?? ""}`} key={option.value}>
                        {option.labelPrefix}
                        <label className={`radio-label ${labelClassName ?? ""}`}>
                            <input type="radio" {...props} value={option.value} checked={selectedValue === option.value} />
                            {option.label}
                        </label>
                        {option.labelSuffix}
                    </div>
                ))}
            </>
        );
    }

    return (
        <div className={`rfl-input-wrapper ${wrapperClassName ?? ""}`}>
            {labelPrefix}
            <label className={`radio-label ${labelClassName ?? ""}`}>
                <input type="radio" {...props} />
                {label}
            </label>
            {labelSuffix}
        </div>
    );
};

export default Input;
export { Input, TextArea, Select, RangeInput, Checkbox, Radio };