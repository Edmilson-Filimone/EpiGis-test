import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { auth, firestore, storage } from "../firebase.config";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import {useNavigate} from "react-router-dom"

function CreateListing() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "The burden of Malaria",
    category: "Epidemiology",
    author: "Edmilson FIlimone",
    country: "Moazambique",
    region: "South",
    province: "Mpauto",
    district: "Matola",
    date: "10/12/2023",
    description: "",
    keyword:"",
    profile: "",
    images: "",
  });

  const {
    name,
    category,
    author,
    country,
    region,
    province,
    district,
    date,
    description,
    keyword,
    profile,
    images,
  } = formData;

  /**upload image to fire storage*/
  const uploadImage = async (image) => {
    return new Promise((resolve, reject) => {
      const fileName = `${author}/${category}/${keyword}/${image.name}-${uuid()}`.replace(" ", "_").replace(",", "_"); //removing blank spaces and comma
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        //log progress callback
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        //error callback
        (error) => {
          reject(error);
        },
        //sucess callback
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  /**OncChange function*/
  const onChange = (e) => {
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
      }));
      console.log(`${e.target.id} : ${e.target.value}`);
    }
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.files,
      }));
      console.log(e.target.files);
    }
  };

  /**OnSubmit function*/
  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    //Uploading images
    const imagesUrl = await Promise.all(
      [...images].map((img) => uploadImage(img))
    ).catch((error) => {
      setLoading(false);
      console.log(error);
      toast.error("Unable to upload images");
      return;
    });

    const profileUrl = await uploadImage(profile[0]).catch((error) => {
      setLoading(false);
      console.log(error);
      toast.error("Unable to upload profile");
      return;
    });
      
     //uploading to firestore
      delete formData.profile
      delete formData.images
      const data = {...formData, profileUrl, imagesUrl, timeStamp:serverTimestamp()}
      

      const collectionRef = collection(firestore, "maps")
      const docRef = await addDoc(collectionRef, data)
      toast.success("Data was uploaded successfully")
      navigate(`/listing/${docRef.id}`)
  };

  if(loading){
    return (
      <div className="text-center mx-auto text-2xl font-mono font-semibold">
        Is Loading
      </div>)
  }

  return (
    <>
      <div className="w-full mt-10 py-8 px-4">
        <h3 className="text-center mx-auto text-2xl font-semibold">
          Create Listing
        </h3>
        <form
          onSubmit={onSubmit}
          className="flex flex-col space-y-5 items-center max-w-[700px] w-full mx-auto py-5"
        >
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="name">Project name</label>
            <input
              className="w-full rounded-md bg-gray-300 border-none"
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="category">Category</label>
            <input
              className="w-full rounded-md bg-gray-300 border-none"
              type="text"
              name="category"
              id="category"
              value={category}
              onChange={onChange}
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="author">Author</label>
            <input
              className="w-full rounded-md bg-gray-300 border-none"
              type="text"
              name="author"
              id="author"
              value={author}
              onChange={onChange}
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="country">Country</label>
            <input
              className="w-full rounded-md bg-gray-300 border-none"
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={onChange}
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="region">Region</label>
            <input
              className="w-full rounded-md bg-gray-300 border-none"
              type="text"
              name="region"
              id="region"
              value={region}
              onChange={onChange}
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="province">Province</label>
            <input
              className="w-full rounded-md bg-gray-300 border-none"
              type="text"
              name="province"
              id="province"
              value={province}
              onChange={onChange}
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="district">District</label>
            <input
              className="w-full rounded-md bg-gray-300 border-none"
              type="text"
              name="district"
              id="district"
              value={district}
              onChange={onChange}
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="date">Date of the project</label>
            <input
              className="w-full rounded-md bg-gray-300 border-none"
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={onChange}
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="description">Description</label>
            <textarea
              className="w-full rounded-md bg-gray-300 border-none"
              rows="7"
              name="description"
              id="description"
              value={description}
              onChange={onChange}
              required
            ></textarea>
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="date">Keyword</label>
            <input
              className="w-full rounded-md bg-gray-300 border-none"
              type="text"
              name="keyword"
              id="keyword"
              value={keyword}
              onChange={onChange}
              placeholder="Ex: Malaria"
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="profile">Image to display</label>
            <input
              className="w-full p-2 rounded-md bg-gray-300 border-none"
              type="file"
              name="profile"
              id="profile"
              onChange={onChange}
              accept="image/*"
              required
            />
          </div>
          <div className="w-full flex flex-col space-y-2 justify-start">
            <label htmlFor="images">Project Images</label>
            <input
              className="w-full p-2 rounded-md bg-gray-300 border-none"
              type="file"
              name="images"
              id="images"
              onChange={onChange}
              accept="image/*"
              multiple
              max={6}
              required
            />
          </div>
          <button
            className="w-full text-sm border-blue-400 bg-blue-400 uppercase text-white font-medium py-2 px-2 shadow-md rounded-md transition duration-100 ease-in-out hover:bg-blue-500"
            type="submit"
          >
            Create Listing
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateListing;
