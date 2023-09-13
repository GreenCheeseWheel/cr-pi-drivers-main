export default function FormInput({inputId, labelText, className, value, onChange, placeholder, type})
{
    return (
        <div className="form-section">
            <label htmlFor={inputId}>{labelText}</label>
            <input
                autoComplete="off"
                id={inputId}
                className={className}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type={type}
                />
        </div>
    )
}