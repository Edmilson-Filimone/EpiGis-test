import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { EffectFade, Autoplay, Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useNavigate } from "react-router-dom";

function Slider({ data }) {
  const navigate = useNavigate();
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        effect="fade"
        navigation={true}
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
      >
        {data.map((image) => (
          <SwiperSlide className="w-full bg-white" key={image.id}>
            <div className="relative h-[400px]" onClick={()=>navigate(`/listing/${image.id}`)}>
              <div
                style={{
                  background: `url(${image.data.profileUrl}) no-repeat center`,
                  backgroundSize:'contain'
                }}
                className="w-full h-full md:bg-cover"
              ></div>
              <div className="absolute top-6 right-0 bg-slate-600 text-sm md:text-base text-white font-semibold max-w-[300px] md:max-w-[420px] truncate shadow-xl  py-1 px-3">
                {`${image.data.name} `}
              </div>
              <div className="absolute top-16 right-0 bg-red-400 text-sm md:text-base text-white font-semibold shadow-xl  py-1 px-3">
                {`${image.data.category} `}
              </div>
            </div>
          </SwiperSlide>)
          )}
      </Swiper>
    </>
  );
}

export default Slider;
