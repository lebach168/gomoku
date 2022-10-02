import React from "react";
import Square from "./square";
export default function Board({ board, winLine, onClick }) {
    return (
        <div>
            {
                board.map((row, rowIndex) => {
                    return (
                        <div className="board-row" key={rowIndex}>
                            {row.map((value, colIndex) => {
                                let highlight = false;

                                winLine.map((element) => {
                                    highlight = highlight || (element.row === rowIndex && element.col === colIndex);
                                });
                                return (
                                    <Square
                                        key={rowIndex * row.length + colIndex}
                                        row={rowIndex}
                                        col={colIndex}
                                        isWin={highlight}
                                        value={value}
                                        onClick={onClick}
                                    />
                                );
                            })}
                        </div>

                    )
                })
            }
        </div>
    )
}
