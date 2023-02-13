import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { firestore, storage } from "../firebase.config";
import { toast } from "react-toastify";
import {
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";

function EditListing() {
  window.scrollTo(0,0)
  const params = useParams();
  const navigate = useNavigate();
  const [updateImages, setUpdateImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    author: "",
    country: "",
    region: "",
    province: "",
    district: "",
    date: "",
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

  //fetching data from firestore to update the
  useEffect(() => {
    async function fetchData(id) {
      const docRef = doc(firestore, "maps", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) {
        setFormData(docSnap.data());
      }
    }
    fetchData(params.id);
  }, [params.id]);

  /**upload image to fire storage*/
  const uploadImage = async (image) => {
    return new Promise((resolve, reject) => {
      const fileName = `${author}/${category}/${keyword}/${image.name}-${uuid()}`.replace(" ", "_").replace(",", "_");
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

    //var to keep the final data 
    let data;

    //conditionally updating images, if updateImages is true we want to update images also
    if (updateImages) {

      //Delete old images on storage to replace with new ones
      const refImages = [formData?.profileUrl, ...formData?.imagesUrl ]
      refImages.forEach((reference)=> {
        const fileRef = ref(storage, reference)
        deleteObject(fileRef).then(()=>{
          console.log('Deleting image...')
        }).catch((error)=> console.log(error))
      })

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

    //removing profile and images fields
    delete formData.profile;
    delete formData.images;

      data = {
        ...formData,
        profileUrl,
        imagesUrl,
        timeStamp: serverTimestamp(),
      };
      //console.log("UPDATING IMAGES")
    }

    if (!updateImages) {
      data = { ...formData, timeStamp: serverTimestamp() };
      //console.log("NOT UPDATING IMAGES");
    }

    //updating firestore db
    const docRef = doc(firestore, "maps", params.id);
    await updateDoc(docRef, data);
    toast.success("Data was uploaded successfully");
    navigate(`/listing/${params.id}`);
  };

  if (loading) {
    return <Loading />
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
          <p className="font-medium">You want to update images?</p>
          <div className="w-full flex space-x-3 justify-start">
            <button
              className={`w-full py-2 px-3 font-medium rounded-md shadow-md shadow-slate-500 ${
                updateImages ? "bg-slate-800 text-white" : "bg-white text-black"
              }`}
              type="button"
              onClick={() => setUpdateImages(true)}
            >
              Yes
            </button>
            <button
              className={`w-full py-2 px-3 font-medium rounded-md shadow-md shadow-slate-500 ${
                !updateImages
                  ? "bg-slate-800 text-white"
                  : "bg-white text-black"
              }`}
              type="button"
              onClick={() => setUpdateImages(false)}
            >
              No
            </button>
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
              disabled={!updateImages}
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
              disabled={!updateImages}
              required
            />
          </div>
          <button
            className="w-full text-sm border-blue-400 bg-blue-400 uppercase text-white font-medium py-2 px-2 shadow-md rounded-md transition duration-100 ease-in-out hover:bg-blue-500"
            type="submit"
          >
            Update Listing
          </button>
        </form>
      </div>
    </>
  );
}

export default EditListing;
