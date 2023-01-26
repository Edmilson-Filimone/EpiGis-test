import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, firestore, storage } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import CardListing from "../components/CardListing";
import { collection, deleteDoc, doc, getDoc, getDocs} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";

function AdminPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [done, setDone] = useState(false)

  const signOut = () => {
    auth.signOut();
    toast.info("You signed out");
    navigate("/");
  };

  /** Fetching Data from db*/
  useEffect(() => {
    let listDoc = [];
    async function fetchData() {
      const collectionRef = collection(firestore, "maps");
      const querySnap = await getDocs(collectionRef);
      if (!querySnap.empty) {
        querySnap.forEach((doc) => {
          listDoc.push({ id: doc.id, data: doc.data() });
          setDone(true)
          setData(listDoc); //o estado deve ser actualizado dentro da funcao async, se colocar esse trecho fora, ele vai actualizar o estado primeiro antes de rodar a funcao - problema do assincronismo
        });
      }
    }
    fetchData();
  }, []);

  /**Delete Data from firestore and cloud storage*/
  async function removeDoc(id) {
    if(confirm("Delete this document?")){
      try {
        // 1. getting the urls images from firestore db
        const docRef = doc(firestore, 'maps', id)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
          const docData = docSnap.data()
          const refImages = [docData.profileUrl, ...docData.imagesUrl]
          
          //deleting all images from storages
          //2. use the urls retrieved from firestore db as reference on storage to target the file that we pretend to delete
          refImages.forEach((reference)=> {
            const fileRef = ref(storage, reference)
            deleteObject(fileRef).then(()=>{
              console.log('Deleting image...')
            }).catch((error)=> console.log(error))
          })
        }

        //deliting from firestore db
        await deleteDoc(docRef)

        /**Filtiring data*/
        setData(data.filter((doc)=> doc.id != id))
        toast.info("Document Deleted") 
      } catch (error) {
        toast.error(error)
      }
    }
  }

  /**Edit Doc*/
 const editDoc = (id) => {
    navigate(`/edit-listing/${id}`)
  }

  return (
    <div className="w-full mt-5">
      <h3 className="text-2xl text-center mt-5 mx-auto font-semibold">
        Administrator Page
      </h3>
      <div className="mx-auto mt-5 lg:px-10 px-5 text-center flex flex-col md:flex-row md:flex-wrap justify-center gap-4">
            {done && data.map(({id, data}) => (
              <CardListing key={id} id={id} data={data} onDelete={removeDoc} onEdit={editDoc}/>
            ))}
      </div>
      <button
        onClick={signOut}
        className="block mt-10 mx-auto py-2 px-3 shadow-md rounded-md bg-red-500 text-white text-center font-medium transition ease-in-out duration-100 hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
}

export default AdminPage;
