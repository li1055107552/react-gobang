import { useState } from "react"
import { Board, row, col } from "./Board"
import Control from "./control"
import { statusType, ctrlType } from "@/type"

export default function Game() {

    const [status, setStatus] = useState<statusType>(null)

    const [step, setStep] = useState(0)
    const [squares, setSquares] = useState(Array(row * col).fill(null));
    const [history, setHistort] = useState<number[]>(Array(0));

    // function actionHandle(action: null | ctrlType, callback?: Function | undefined) {
    //     console.log(action)
    //     switch (action) {
    //         case "restart":
    //             setStatus(null)
    //             setStep(0)
    //             setSquares(Array(row * col).fill(null));
    //             setHistort(Array(0));
    //             break;
    //         case "review":
    //             setStatus("review")

    //             break;
    //         case "back": {
    //             let nextSquares = squares.slice()
    //             let index: number = 0;

    //             if (status === "review") {
    //                 index = history[step - 1]
    //             }
    //             else if (status === "continue") {
    //                 index = history.pop() as number
    //             }
    //             else if (status === "end") {
    //                 index = history.pop() as number
    //                 setStatus("continue")
    //             }

    //             setStep(step - 1)
    //             nextSquares[index] = null
    //             setSquares(nextSquares)

    //             break;
    //         }
    //         case "next": {
    //             let index = history[step]
    //             let nextSquares = squares.slice()
    //             nextSquares[index] = step % 2 === 0 ? "black" : "white"
    //             setStep(step + 1)
    //             setSquares(nextSquares)
    //             break;
    //         }
    //         case "x1":
    //             break;
    //         case "x2":
    //             break;
    //         case "x4":
    //             break;
    //         default:
    //             break;
    //     }

    //     callback && callback()
    // }

    return (
        <div className="game flex flex-col m-auto">
            <Board
                status={status}
                setStatus={setStatus}
                step={step}
                setStep={setStep}
                squares={squares}
                setSquares={setSquares}
                history={history}
                setHistort={setHistort}
            ></Board>
            <Control
                status={status}
                setStatus={setStatus}
                step={step}
                setStep={setStep}
                squares={squares}
                setSquares={setSquares}
                history={history}
                setHistort={setHistort}
            ></Control>
        </div>
    )
}