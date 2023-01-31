import gis from "../assets/gis.png";
import tree from "../assets/tree.png";
import cardiology from "../assets/cardiology.png";
import social from "../assets/social.png";
import {about} from "../../public/Js/contents";

function About() {
  return (
    <div className="w-full px-4 mb-10 md:px-8">
      <div className='flex flex-col items-center md:flex-row gap-10 my-8 mx-auto max-w-5xl'>
        <article className='p-4'>
          <h3 className='card-font-h3 text-3xl font-semibold text-center my-4'>EpiGis</h3>
          <p className="text-left">{about.first_paragraph.data}</p>
          <h4 className="font-bold my-4 card-font-h3">{about.second_paragraph.label}</h4>
          <p className="text-left">{about.second_paragraph.data}</p>
          <h4 className="font-bold my-4 card-font-h3">{about.third_paragraph.label}</h4>
          <p className="text-left">{about.third_paragraph.data}</p>
        </article>
        <div className='w-full flex justify-center'>
          <div className="relative px-4 min-w-[320px] md:w-full mb-[320px]">
            <span className="about-images shadow-xl z-30"></span> {/*just to increase the shadow*/}
            <img src={gis} alt="gis" className="about-images shadow-xl p-6 z-30"/>
            <img src={cardiology} className="about-images top-40 shadow-md p-10"></img>
            <span className="about-images top-44 left-32 shadow-2xl"></span>
            <img src={tree} alt="tree" className="about-images top-44 left-32 shadow-2xl p-8"></img>
            <img src={social} className="about-images top-4 left-32 shadow-2xl p-10"></img>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;