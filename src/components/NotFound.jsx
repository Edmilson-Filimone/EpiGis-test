import tree_empty from "../assets/tree_empty.png"

function NotFound({label}) {
  return (
    <div className="flex flex-col items-center py-16 w-screen h-[80vh]">
        <div className="text-center font-light">It's seems that there is no map for {label.toLowerCase()}</div>
        <div>
            <img src={tree_empty} alt="no map :(" className="max-w-[300px] max-h-[300px] p-10"/>
        </div>
    </div>
  )
}

export default NotFound