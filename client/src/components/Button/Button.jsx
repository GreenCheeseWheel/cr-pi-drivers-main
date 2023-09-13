import './index.css'

export default function Button({text, onClick, disabled})
{
    return (
        <button 
            style={{cursor: disabled ? "not-allowed" : "pointer"}}
            onClick={onClick} 
            disabled={disabled} 
            className='button-comp'
            >
            {text}
        </button>
    )
}