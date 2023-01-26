import loading from "../assets/loading.svg"

function Loading() {
  return (
    <div className="relative top-0 w-full h-[80vh]">
        <img className="w-[100px] mt-[10%] mx-auto bg-transparent" src={loading} alt="loading" />
    </div>
  )
}

export default Loading