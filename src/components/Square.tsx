interface square {
    index: number;
    value: "black" | "white" | null;
    handleClick: () => void;
}

export default function Square( {index, value, handleClick}: square ) {

    return (
    <button className="square leading-10 w-10 flex flex-col items-center justify-center" 
    onClick={handleClick}>
        <span 
            className={`block flex flex-col items-center justify-center w-1/2 h-1/2 ${value?"rounded-full":""}`} 
            style={{
                "backgroundColor": value,
                // "color": "rgba(0,0,0,0)" 
            }}
        // >{value}</span>
        >·</span>
    </button>
    );
}