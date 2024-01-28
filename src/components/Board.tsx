import { useState } from "react";
import Square from "./Square"

type square = "black" | "white" | null

const row: number = 15;
const col: number = 15;

export default function Board() {

    const [status, setStatus] = useState<square|string>(null)
    const [step, setStep] = useState(0)
    const [squares, setSquares] = useState(Array(row * col).fill(null));
    const [histort, setHistort] = useState<number[]>(Array(0));

    function handleClick(i: number) {
        console.log("click", i)
        if (squares[i] !== null) return;

        let nextSquares = squares.slice()
        nextSquares[i] = step % 2 === 0 ? "black" : "white"
        setSquares(nextSquares)

        setHistort([...histort, i])
        setStep(step + 1)

        // 这里传squares，squares还未更新？
        let winner = calculateWinner(nextSquares, i)    

        if (winner) {
            console.log("winner:", winner)
        }
    }

    let Rows = []
    for (let i = 0; i < col; i++) {
        Rows.push(
            <BoardRow
                key={i}
                rowindex={i}
                handleClick={handleClick}>
            </BoardRow>
        )
    }

    return (
        <div className="board flex flex-col">{Rows}</div>
    )

    function BoardRow({ rowindex }: any) {
        let rowItems = []
        for (let j = 0; j < row; j++) {
            rowItems.push(
                <Square key={rowindex * row + j}
                    index={rowindex * row + j}
                    value={squares[rowindex * row + j]}
                    handleClick={() => handleClick(rowindex * row + j)}
                ></Square>
            )
        }
        return <div className="board-row flex flex-row">{rowItems}</div>
    }
}

function getLines(i: number): Array<number[]> {

    let lines: Array<number[]> = []
    let rowIndex = Math.floor(i / row)
    let colIndex = i % row

    let [
        leftTop, top, rightTop,
        left, right,
        leftBottom, bottom, rightBottom,
    ] = Array(8).fill(0)

    for (let k = 0; k < 5; k++) {
        if (rowIndex - k >= 0 && colIndex - k >= 0) {
            leftTop = (rowIndex - k) * row + (colIndex - k)
        }
        if (rowIndex - k >= 0) {
            top = (rowIndex - k) * row + colIndex
        }
        if (rowIndex - k >= 0 && colIndex + k < col) {
            rightTop = (rowIndex - k) * row + (colIndex + k)
        }
        if (colIndex - k >= 0) {
            left = rowIndex * row + (colIndex - k)
        }
        if (colIndex + k < col) {
            right = rowIndex * row + (colIndex + k)
        }
        if (rowIndex + k < row) {
            bottom = (rowIndex + k) * row + colIndex
        }
        if (rowIndex + k < row && colIndex - k >= 0) {
            leftBottom = (rowIndex + k) * row + (colIndex - k)
        }
        if (rowIndex + k < row && colIndex + k < col) {
            rightBottom = (rowIndex + k) * row + (colIndex + k)
        }
    }

    function leftTop_rightBottom(leftTop: number, rightBottom: number) {
        let res = []
        for (let i = 0; leftTop + (i + 4) * row + i <= rightBottom; i++) {
            res.push([
                leftTop + (i + 0) * row + 0 + i,
                leftTop + (i + 1) * row + 1 + i,
                leftTop + (i + 2) * row + 2 + i,
                leftTop + (i + 3) * row + 3 + i,
                leftTop + (i + 4) * row + 4 + i,
            ])
        }
        return res
    }
    function rightTop_leftBottom(rightTop: number, leftBottom: number) {
        let res = []
        for (let i = 0; rightTop + (i + 4) * row - 4 - i <= leftBottom; i++) {
            res.push([
                rightTop + (i + 0) * row - 0 - i,
                rightTop + (i + 1) * row - 1 - i,
                rightTop + (i + 2) * row - 2 - i,
                rightTop + (i + 3) * row - 3 - i,
                rightTop + (i + 4) * row - 4 - i,
            ])
        }
        return res
    }
    function top_bottom(top: number, bottom: number) {
        let res = []
        for (let i = 0; top + (i + 4) * row <= bottom; i++) {
            res.push([
                top + (i + 0) * row,
                top + (i + 1) * row,
                top + (i + 2) * row,
                top + (i + 3) * row,
                top + (i + 4) * row,
            ])
        }
        return res
    }
    function left_right(left: number, right: number) {
        let res = []
        for (let i = 0; left + i + 4 <= right; i++) {
            res.push([
                left + i + 0,
                left + i + 1,
                left + i + 2,
                left + i + 3,
                left + i + 4
            ])
        }
        return res
    }

    lines = lines.concat(leftTop_rightBottom(leftTop, rightBottom))
    lines = lines.concat(rightTop_leftBottom(rightTop, leftBottom))
    lines = lines.concat(top_bottom(top, bottom))
    lines = lines.concat(left_right(left, right))

    return lines

}

function calculateWinner(square: Array<square>, i: number): square {

    let lines = getLines(i)

    for (let k = 0; k < lines.length; k++) {
        const [a, b, c, d, e] = lines[k];
        if (square[i] === square[a] &&
            square[i] === square[b] &&
            square[i] === square[c] &&
            square[i] === square[d] &&
            square[i] === square[e]
        ) return square[i]
    }
    return null
}