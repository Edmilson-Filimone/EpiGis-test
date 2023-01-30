import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase.config.js";
import Slider from "../components/Slider.jsx";

function Portfolio() {
  const [content, setContent] = useState([]);
  const [done, setDone] = useState(false);

  //fetching data
  useEffect(() => {
    let list = [];
    async function fetchData() {
      const collectionRef = collection(firestore, "maps");
      const docSnap = await getDocs(collectionRef);
      if (!docSnap.empty) {
        docSnap.forEach((doc) => {
          list.push({id:doc.id, data:doc.data()});
        });
        setContent(list);
        setDone(true);
      }
    }
    fetchData();
  }, []);


  return (
    <>
      {done && <Slider data={content} />}
    </>
  );
}

export default Portfolio;
