import { useEffect, useState } from "react";
import { firestore } from "../firebase.config";
import { useParams } from "react-router-dom";
import CardListing from "../components/CardListing";
import { collection, getDocs, limit, orderBy, query, where} from "firebase/firestore";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";


function CategoryListing() {
  const params = useParams()
  const [data, setData] = useState(null);
  const [done, setDone] = useState(false)
  const [noData, setNoData] = useState(false)
  const [queryLimit, setQueryLimit] = useState(3)


  /** Fetching Data from db*/
  useEffect(() => {
    let listDoc = [];
    async function fetchData() {
      const collectionRef = collection(firestore, "maps");
      const q = query(collectionRef, where("category", "==", params.category), orderBy("timeStamp", "asc"), limit(queryLimit))
      const querySnap = await getDocs(q);
      if (!querySnap.empty) {
        querySnap.forEach((doc) => {
          listDoc.push({ id: doc.id, data: doc.data() });
        });
        setDone(true)
        setData(listDoc); //o estado deve ser actualizado dentro da funcao async, se colocar esse trecho fora, ele vai actualizar o estado primeiro antes de rodar a funcao - problema do assincronismo
      }
      if(querySnap.empty){
        setDone(true)
        setNoData(true)
      }
    }
    fetchData();
  }, [queryLimit]);

  //return Loading while fetching data
  if(!done){
    return (<Loading />)
  }

  //return a notification that theire's no data available
  if(noData){
    return (<NotFound label={params.category}/>)
  }

  return (
    <div className="w-full mt-5 mb-10">
      <h3 className="text-2xl text-center my-8 mx-auto font-semibold capitalize card-font-h3">
        {params.category}
      </h3>
      <div className="w-full mx-auto mt-5 lg:px-10 px-5 text-center flex flex-col items-center md:flex-row md:flex-wrap justify-center gap-5">
            {done && data.map(({id, data}) => (
              <CardListing key={id} id={id} data={data} />
            ))}
      </div>
      {queryLimit <= data.length && 
      (<button
        onClick={()=>{setQueryLimit((prev)=>(prev + 3))}}
        className="block mt-10 mx-auto py-2 px-3 shadow-md rounded-md bg-blue-400 bg-gradient-to-bl text-white text-center font-medium transition ease-in-out duration-100 hover:bg-blue-500"
      >
        Load More
      </button>)}
    </div>
  );
}

export default CategoryListing;