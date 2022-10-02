import React, { useState } from "react";
const deepCopy = (object) => {
    return JSON.parse(JSON.stringify(object))
}
export default function Move({ history, current, onClick }) {
    const [isAscending, setIsAscending] = useState(true);
    const listMove = deepCopy(history);
    const sortMove = () => {
        setIsAscending(!isAscending);
    }
    return (
        <div>
            {(listMove.length > 0) ?
                (<button onClick={() => sortMove()}>
                    {isAscending ? "Descending" : "Ascending"}
                </button>) :
                <></>}
            {
                (isAscending ? listMove : listMove.reverse())
                    .map((item, step) => {
                        if (item) {
                            return (
                                <li key={step}>
                                    <button onClick={() => onClick(step)}
                                        style={{ fontWeight: step === current ? 'bold' : '' }}>
                                        Go to move #{isAscending ? (step + 1) : (listMove.length - step)} : row: {item.row}  col: {item.col}
                                    </button>
                                </li>
                            )
                        }
                    })
            }
        </div>
    )
}