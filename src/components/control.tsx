import { useEffect, useState } from "react"
import { row, col } from "./Board"

export default function Control(
    {
        status,     // "review" | "end" | "continue" | null
        setStatus,
        step,
        setStep,
        squares,
        setSquares,
        history,
        setHistort
    }: any) {

    let [timerId, setTimerId] = useState<null | NodeJS.Timeout>(null);
    let [timerStatus, setTimerStatus] = useState<number>(0);

    const restart = () => {
        setStatus(null)
        setStep(0)
        setSquares(Array(row * col).fill(null));
        setHistort(Array(0));
    }

    const review = () => {
        setStatus("review")
    }

    const toStart = () => {
        setStep(0)
        setSquares(Array(row * col).fill(null))
    }

    const back = () => {
        let nextSquares = squares.slice()
        let index: number = 0;

        if (status === "review") {
            index = history[step - 1]
        }
        else if (status === "continue") {
            index = history.pop() as number
        }
        else if (status === "end") {
            index = history.pop() as number
            setStatus("continue")
        }

        setStep(step - 1)
        nextSquares[index] = null
        setSquares(nextSquares)
    }

    const stop = () => {
        console.log("stop");
    }

    const next = () => {
        let index = history[step]
        let nextSquares = squares.slice()
        nextSquares[index] = step % 2 === 0 ? "black" : "white"
        setStep(step + 1)
        setSquares(nextSquares)
    }

    const toEnd = () => {
        let steptmp = step
        let nextSquares = squares.slice()
        for (steptmp < history.length; steptmp < history.length; steptmp++) {
            let index = history[steptmp]
            nextSquares[index] = steptmp % 2 === 0 ? "black" : "white"
        }
        setStep(steptmp)
        setSquares(nextSquares)
    }

    const x1 = () => {
        setTimerStatus(1000)
    }
    const x2 = () => {
        setTimerStatus(500)
    }


    const auto = (time: number) => {

        return setInterval(() => {

            let stepTmp = step++
            if (stepTmp < history.length) {
                let index = history[stepTmp]
                setSquares((pre: any[]) => {
                    pre[index] = stepTmp % 2 === 0 ? "black" : "white"
                    return pre.slice()
                })
            }
            else {
                clearInterval(timerId as NodeJS.Timeout)
                setTimerId(null)
            }
        }, time)
    }

    useEffect(() => {
        if (timerId) {
            clearInterval(timerId)
            setTimerId(null)
        }

        let Interval = auto(timerStatus)
        setTimerId(Interval)

        return () => {
            clearInterval(Interval);
        };

    }, [timerStatus])

    const btns = [
        { action: "toStart", callback: toStart, text: "II<", show: () => status === "review" },
        { action: "back", callback: back, text: "<", show: () => step !== 0 },
        { action: "stop", callback: stop, text: "II", show: () => status === "review" },
        { action: "next", callback: next, text: ">", show: () => step < history.length },
        { action: "toEnd", callback: toEnd, text: ">II", show: () => status === "review" && step < history.length },
        { action: "review", callback: review, text: "复盘", show: () => status === "end" },
        { action: "x1", callback: x1, text: "x1", show: () => status === "review" },
        { action: "x2", callback: x2, text: "x2", show: () => status === "review" }
    ].map((item, index) => {
        return (
            <button key={item.action}
                className={
                    "mx-1 text-white flex-1 " +
                    (item.show() ? "bg-blue-500" : "bg-blue-500/50")
                }
                disabled={!item.show()}
                onClick={item.callback}
            >{item.text}</button>
        )
    })

    return (
        <div className="control flex flex-row justify-around">
            <button className="mx-1 text-white flex-1 bg-blue-500"
                onClick={restart}>重置</button>
            {btns}
        </div>
    )

}

