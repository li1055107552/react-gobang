
export default function Control({ status, step, histort, actionHandle }: any) {

    let isDisable = (action: string): boolean => {
        
        switch (action) {
            case "review":
                return status !== "end"
            case "x1":
            case "x2":
            case "x4":
                return status !== "review"

            case "back":
                return step === 0

            case "next":
                return step === histort.length  

            default:
                return true
        }




    }
    let disabledStyle = (action: string): string => isDisable(action) ? "bg-blue-500/50" : "bg-blue-500"

    return (
        <div className="control flex flex-row justify-around">
            <button className="mx-1 text-white flex-1 bg-blue-500"
                onClick={() => actionHandle("restart")}>重置</button>

            <button className={"mx-1 text-white flex-1 " + disabledStyle("back")}
                disabled={isDisable("back")} onClick={() => actionHandle("back")}>后退</button>
            <button className={"mx-1 text-white flex-1 " + disabledStyle("next")}
                disabled={isDisable("next")} onClick={() => actionHandle("next")}>前进</button>

            <button className={"mx-1 text-white flex-1 " + disabledStyle("review")}
                disabled={isDisable("review")} onClick={() => actionHandle("review")}>回放</button>
            <button className={"mx-1 text-white flex-1 " + disabledStyle("x1")}
                disabled={isDisable("x1")} onClick={() => actionHandle("x1")}>x1</button>
            <button className={"mx-1 text-white flex-1 " + disabledStyle("x2")}
                disabled={isDisable("x2")} onClick={() => actionHandle("x2")}>x2</button>
            <button className={"mx-1 text-white flex-1 " + disabledStyle("x4")}
                disabled={isDisable("x4")} onClick={() => actionHandle("x4")}>x4</button>
        </div>
    )

}