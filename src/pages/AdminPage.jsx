import React from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import CardListing from "../components/CardListing";

function AdminPage() {
  const navigate = useNavigate();

  const signOut = () => {
    auth.signOut();
    toast.info("You signed out");
    navigate("/");
  };

  return (
    <div className="w-full mt-5">
      <h3 className="text-2xl text-center mt-5 mx-auto font-semibold">
        Administrator Page
      </h3>
      <div className="mx-auto mt-5 md:px-24 px-5 text-center grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <CardListing
          url={"https://firebasestorage.googleapis.com/v0/b/epi-gis.appspot.com/o/Humanitarian_North_crises_2022-Final.png-02a22b5f-8f31-4f8c-ae81-7516ef669cba?alt=media&token=48637761-bf0a-40ca-8e98-de944657d32c"}
          title={"Humanitarian north crises snapshot"}
        />
        <CardListing
          url={"https://firebasestorage.googleapis.com/v0/b/epi-gis.appspot.com/o/EpiGis-2%20(2).png-ee2d710b-a926-48dc-8534-7cca77bf5076?alt=media&token=694f2eb6-ed2d-425a-bbcd-4bdd626ec265"}
          title={"HIV/AIDS situation in Africans countries"}
        />
        <CardListing
          url={"https://firebasestorage.googleapis.com/v0/b/epi-gis.appspot.com/o/Tete_Malaria_2000-2011_P.falciparum_Prevalence.png-37f30fff-ae2e-44ed-8bf0-ba8b2d7639de?alt=media&token=e7ec352e-e6d1-4768-8b0f-22b91c73de41"}
          title={"Malaria prevalance in Tete - P. falciparum rates"}
        />
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
