import gis from "../assets/gis.png";
import tree from "../assets/tree.png";
import cardiology from "../assets/cardiology.png";
import social from "../assets/social.png";
import holographic from "../assets/holographic.png";

function About() {
  return (
    <div className="w-full px-4 mb-10 md:px-8">
      <div className='flex gap-10 my-8 mx-auto max-w-5xl'>
        <article className='p-4'>
          <h3 className='card-font-h3 text-3xl font-semibold text-center my-4'>EpiGis</h3>
          <p className="text-left">Welcome to EpiGis! this is a initiative that is being developed aiming to share valuable information regarded to epidemiology, environment, demography and humanitarian affairs of Mozambique for all kind of people in a way that all can understad.</p>
          <h4 className="font-bold my-4 card-font-h3">What we do?</h4>
          <p className="text-left">We walk through all open data portal seeking for valuable resources like thirsty man looking for water {`:)`}, in our case is just data. Whenever we find it, we careful clean, process, analysis and finally we build visualizations, especially maps to share the results with all.</p>
          <h4 className="font-bold my-4 card-font-h3">Did you saw something interesting?</h4>
          <p className="text-left">Feel free to use or share any of the maps publeshed here. EpiGis team is open to colaborate with any one who is willing to help</p>
        </article>
        <div className='relative w-full holo'>
          <span className="absolute w-[150px] shadow-xl rounded-md bg-slate-50 z-30"></span> {/*just to increase the shadow*/}
          <img src={gis} alt="gis" className="absolute w-[150px] shadow-xl rounded-md bg-slate-50 p-6 z-30"/>
          <img src={cardiology} className="absolute top-40  w-[150px] h-[150px] shadow-md rounded-md bg-slate-50 p-10"></img>
          <span className="absolute top-44 left-32 w-[150px] h-[150px] shadow-2xl bg-slate-50 rounded-md"></span>
          <img src={tree} alt="tree" className="absolute top-44 left-32 w-[150px] h-[150px] shadow-2xl bg-slate-50 rounded-md p-8"></img>
          <img src={social} className="absolute top-4 left-32 w-[150px] h-[150px] shadow-2xl bg-slate-50 rounded-md p-10"></img>
        </div>
      </div>
    </div>
  )
}

export default About