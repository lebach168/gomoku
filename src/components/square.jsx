import React from "react";

export default function Square({ value, onClick, isWin, row, col }) {

    return (
        <button className="square"
            style={{ backgroundColor: isWin ? "green" : "" }}
            onClick={() => onClick(row, col)}>
            {value}
        </button>
    );
}