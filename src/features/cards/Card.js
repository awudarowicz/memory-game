export default function Card(props) {
    return (
        <div className="p-2 flex aspect-square bg-black rounded cursor-pointer" onClick={props.onClick} >
            <img src={props.imageUrl} className={`w-full h-full ${props.active ? 'visible' : 'invisible'}`} alt="Card" />
        </div>
    )
}