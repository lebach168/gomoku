import React, { useEffect, useState } from 'react';

import Board from './board';
import Move from './move';

const deepCopy = (object) => {
    return JSON.parse(JSON.stringify(object))
}
export default function Game() {
    const [boardSize, setBoardSize] = useState(5);
    const [xTurn, setXTurn] = useState(true);
    const [history, setHistory] = useState([]);
    const [board, setBoard] = useState(
        Array(boardSize)
            .fill("")
            .map(() => Array(boardSize).fill(""))
    );
    const [status, setStatus] = useState('');
    const [winLine, setWinLine] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const resizeBoard = (i) => {
        setBoardSize(i);
        setBoard(Array(i)
            .fill("")
            .map(() => Array(i).fill("")))
        setHistory([]);
        setStatus('');
        setWinLine([]);
        setXTurn(true);
    }

    const handleClick = (row, col) => {

        if (board[row][col] === "" && winLine.length < 5 && status !== "DRAW") {
            board[row][col] = (xTurn === true ? 'X' : 'O');
            setXTurn(!xTurn);
            const newBoard = deepCopy(board);
            setBoard(newBoard);
            const continueHistory = history.slice(0, currentStep + 1);
            const newHistory = deepCopy(continueHistory.concat([{ board: newBoard, row: row, col: col }]));
            setHistory(newHistory)
            setCurrentStep(currentStep + 1);
        }
    }
    const calculateWinner = (board) => {
        let draw = 0;
        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (board[i][j] === "") continue;

                let line = [{ row: i, col: j }];

                for (let k = 1; k < boardSize - j && k < 5; k++) {
                    if (board[i][j + k] === board[i][j])
                        line.push({ row: i, col: j + k });
                    else break;
                }
                if (line.length === 5) {
                    setWinLine(line);
                    if (xTurn === true) {
                        setStatus('O win');
                    } else setStatus('X win');
                    return;
                } else line = [{ row: i, col: j }];

                for (let k = 1; k < boardSize - i && k < 5; k++) {
                    if (board[i + k][j] === board[i][j]) line.push({ row: i + k, col: j });
                    else break;
                }
                if (line.length === 5) {
                    setWinLine(line);
                    if (xTurn === true) {
                        setStatus('O win');
                    } else setStatus('X win');
                    return;
                } else line = [{ row: i, col: j }];

                for (let k = 1; k < boardSize - i && k < boardSize - j && k < 5; k++) {
                    if (board[i + k][j + k] === board[i][j]) line.push({ row: i + k, col: j + k });
                    else break;
                }
                if (line.length === 5) {
                    setWinLine(line);
                    if (xTurn === true) {
                        setStatus('O win');
                    } else setStatus('X win');
                    return;
                } else line = [{ row: i, col: j }];

                for (let k = 1; k > i - boardSize && k < boardSize - j && k < 5 && i >= k; k++) {
                    if (board[i - k][j + k] === board[i][j]) line.push({ row: i - k, col: j + k });
                    else break;
                }
                if (line.length === 5) {
                    setWinLine(line);
                    if (xTurn === true) {
                        setStatus('O win');
                    } else setStatus('X win');
                    return;
                } else line = [{ row: i, col: j }];
                draw += 1;
            }
        }
        if (draw === boardSize * boardSize) {
            setStatus('DRAW');
        }
    }
    const jumpTo = (step) => {
        setCurrentStep(step);
        setXTurn((step % 2) === 1);
        setBoard(history[step].board);
    }
    const resetGame = () => {
        setHistory([]);
        setBoard(
            Array(boardSize)
                .fill("")
                .map(() => Array(boardSize).fill(""))
        );
        setStatus('');
        setWinLine([]);
        setXTurn(true);
    }
    useEffect(() => {
        calculateWinner(board);

    }, [board]);

    return (
        <div className="game">
            <div style={{ textAlign: "center", padding: "20px" }}>
                <label>Kích thước: </label>
                <select id="boardSize" onChange={() => resizeBoard(Number(document.getElementById("boardSize").value))}>
                    <option value="5">5x5</option>
                    <option value="10">10x10</option>
                    <option value="15">15x15</option>
                    <option value="20">20x20</option>
                </select>
            </div>

            <div className="game-board">
                <div>
                    Next player: {xTurn === true ? "X" : "O"}
                </div>
                <Board
                    board={board}
                    winLine={winLine}
                    onClick={handleClick}
                />
            </div>
            <div className="game-info">
                <ol>
                    <button onClick={() => resetGame()}>play again</button>
                </ol>
                <ol>
                    <div style={{ fontWeight: "bold" }}>{status}</div>
                </ol>
                <ol><Move history={history} current={currentStep} onClick={jumpTo} /></ol>
            </div>
        </div >
    )
}