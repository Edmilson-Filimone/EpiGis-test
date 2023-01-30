import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function Slider({ data }) {
  //SwiperCore.use(Autoplay, Navigation, Pagination, EffectFade);
  console.log(data);

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
            <div className="relative h-[400px]">
                <div
                  className="w-full h-full"
                  style={{
                    background: `url(${image.data.profileUrl}) no-repeat center`,
                    backgroundSize:'cover',
                    backgroundAttachment:'fixed',
                    backgroundPositionY:'-150px'
                  }}>
                </div>
                <div className="absolute top-6 right-0 bg-slate-600 text-white font-semibold shadow-xl  py-1 px-3">
                    {`${image.data.name} `}
                </div>
                <div className="absolute top-20 right-0 bg-red-400 text-white font-semibold shadow-xl  py-1 px-3">
                    {`${image.data.category} `}
                </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Slider;
