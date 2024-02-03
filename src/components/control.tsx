import { useEffect, useRef, useState } from "react"
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


    let stepTmp = useRef(step)
    let isAutoReview = useRef(false);
    let delayTime = useRef(0);
    // let [isAutoReview, setIsAutoReview] = useState<boolean>(true);
    // let [delayTime, setDelayTime] = useState<number>(0);

    const restart = () => {
        setStatus(null)
        setStep(0)
        setSquares(Array(row * col).fill(null));
        setHistort(Array(0));
        stepTmp.current = 0
        isAutoReview.current = false
        delayTime.current = 0
    }

    const review = () => {
        setStatus("review")
        stepTmp.current = step
    }

    const toStart = () => {
        setStep(0)
        isAutoReview.current = false
        stepTmp.current = 0
        setSquares(Array(row * col).fill(null))
    }

    const back = () => {
        let nextSquares = squares.slice()
        let index: number = 0;

        if (status === "review") {
            index = history[stepTmp.current - 1]
        }
        else if (status === "continue") {
            index = history.pop() as number
        }
        else if (status === "end") {
            index = history.pop() as number
            setStatus("continue")
        }

        setStep(stepTmp.current - 1)
        stepTmp.current = stepTmp.current - 1

        // nextSquares[index] = null
        setSquares((pre: any[]) => {
            pre[index] = null
            return pre.slice()
        })
    }

    const stop = () => {
        console.log("stop");
        isAutoReview.current = false
    }

    const next = () => {
        let index = history[step]
        let nextSquares = squares.slice()
        nextSquares[index] = step % 2 === 0 ? "black" : "white"
        setStep(step + 1)
        stepTmp.current = step + 1
        setSquares(nextSquares)
    }

    const toEnd = () => {
        stepTmp.current = step

        let steptmp = step
        let nextSquares = squares.slice()
        for (steptmp < history.length; steptmp < history.length; steptmp++) {
            let index = history[steptmp]
            nextSquares[index] = steptmp % 2 === 0 ? "black" : "white"
        }
        setStep(steptmp)
        stepTmp.current = steptmp

        setSquares(nextSquares)
    }

    const x1 = () => {
        let time = delayTime.current
        delayTime.current = 1000 / 1

        if (!isAutoReview.current) {
            setTimeout(() => {
                auto()
            }, time);
        }
    }
    const x2 = () => {
        let time = delayTime.current
        delayTime.current = 1000 / 2

        if (!isAutoReview.current) {
            setTimeout(() => {
                auto()
            }, 1000);
        }

    }


    const auto = async () => {
        console.log("auto run");

        isAutoReview.current = true

        while (stepTmp.current < history.length) {
            console.log(isAutoReview.current);
            if (isAutoReview.current) { // 判断是否被打断 或 更改复盘条件
                console.log(stepTmp.current);
                await new Promise<void>((resolve, reject) => {

                    let index = history[stepTmp.current]
                    setSquares((pre: any[]) => {
                        pre[index] = stepTmp.current % 2 === 0 ? "black" : "white"
                        return pre.slice()
                    })

                    setTimeout(() => {
                        isAutoReview.current && stepTmp.current++
                        resolve()
                    }, delayTime.current)
                })

            }
            else {
                setStep(stepTmp.current)
                break
            }
        }
        setStep(stepTmp.current)
        isAutoReview.current = false
    }


    const btns = [
        { action: "toStart", callback: toStart, text: "II<", show: () => status === "review" },
        { action: "back", callback: back, text: "<", show: () => stepTmp.current !== 0 },
        { action: "stop", callback: stop, text: "II", show: () => status === "review" },
        { action: "next", callback: next, text: ">", show: () => stepTmp.current < history.length },
        { action: "toEnd", callback: toEnd, text: ">II", show: () => status === "review" && stepTmp.current < history.length },
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

