import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebase.config.js";
import Slider from "../components/Slider.jsx";
import { FaChartBar, FaLeaf, FaPeopleCarry} from "react-icons/fa";
import {FcComboChart} from "react-icons/fc"
import { BsMap } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";

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
      <section className="py-10 px-16 bg-white">
        <h3 className="text-3xl font-semibold text-center py-8 card-font-h3">Categories</h3>
      <section className="flex flex-col space-y-5">
        <article className="flex space-x-2">
          <div className="w-[100px] h-[100px] border text-center text-4xl py-8 px-8 shadow-lg text-white bg-orange-400"><HiUserGroup/></div>
          <div className="shadow-lg bg-slate-100 py-2 px-2 border-r-orange-400 border-r-4">
            <h4 className="font-bold uppercase ">Demography</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel earum voluptatibus placeat laboriosam, explicabo, quos laborum ipsa pariatur rerum commodi, magni laudantium eos veniam fuga atque cupiditate! Nostrum, odio animi?</p>
          </div>
         </article>
         <article className="flex space-x-2">
          <div className="w-[100px] h-[100px] border text-center text-4xl py-8 px-8 shadow-lg text-white bg-green-400"><FaLeaf/></div>
          <div className="shadow-lg bg-white py-2 px-2 border-r-green-400 border-r-4">
            <h4 className="font-bold uppercase ">Envirenment</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel earum voluptatibus placeat laboriosam, explicabo, quos laborum ipsa pariatur rerum commodi, magni laudantium eos veniam fuga atque cupiditate! Nostrum, odio animi?</p>
          </div>
         </article>
         <article className="flex space-x-2">
          <div className="w-[100px] h-[100px] border text-center text-4xl py-8 px-8 shadow-lg text-white bg-red-400"><FaChartBar/></div>
          <div className="shadow-lg bg-slate-100 py-2 px-2 border-r-red-400 border-r-4">
            <h4 className="font-bold uppercase ">Epidimiology</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel earum voluptatibus placeat laboriosam, explicabo, quos laborum ipsa pariatur rerum commodi, magni laudantium eos veniam fuga atque cupiditate! Nostrum, odio animi?</p>
          </div>
         </article>
         <article className="flex space-x-2">
          <div className="w-[100px] h-[100px] border text-center text-4xl py-8 px-8 shadow-lg text-white bg-blue-400"><FaPeopleCarry/></div>
          <div className="shadow-lg bg-white py-2 px-2 border-r-blue-500 border-r-4">
            <h4 className="font-bold uppercase ">Humanitarian</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel earum voluptatibus placeat laboriosam, explicabo, quos laborum ipsa pariatur rerum commodi, magni laudantium eos veniam fuga atque cupiditate! Nostrum, odio animi?</p>
          </div>
         </article>
      </section>
      </section>
    </>
  );
}

export default Portfolio;
