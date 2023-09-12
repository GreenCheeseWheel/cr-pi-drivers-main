import './index.css'

export default function Button({text, onClick, disabled})
{
    return (
        <button onClick={onClick} disabled={disabled} className='button-comp'>
            {text}
        </button>
    )
}