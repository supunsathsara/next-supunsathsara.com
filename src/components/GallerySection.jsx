import Image from "next/image";
import WayForward from "@public/images/gallery/way-forward-to-the-dev-stage.jpg";
import GoldMedal from "@public/images/gallery/gold-medal.jpg";
import Convocation from "@public/images/gallery/convocation.jpg";
import IntroGitEvent from "@public/images/gallery/intro-git-event.jpg";
import Rugby from "@public/images/gallery/rugby.jpg";
import NotifibmDemo from "@public/images/gallery/notifibm-demo.jpg";
import IWBTop10 from "@public/images/gallery/iwb-top-10.jpg";
import PresentingAtIWB from "@public/images/gallery/presenting-at-iwb.jpg";

const GallerySection = () => {
  return (
    <section className="gallery-section max-w-6xl 3xl:max-8xl mx-auto mb-8 pb-4 pt-4">
      <div className="columns-2 sm:columns-3 md:columns-4 gap-4 my-8">
        <div className="relative h-40 mb-4">
          <Image
            alt="A way forward to the dev stage | knowledge sharing session for the juniors"
            title="A way forward to the dev stage | Knowledge sharing session for the juniors"
            src={WayForward}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 213px, (max-width: 1024px) 25vw, 20vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80 mb-4 sm:mb-0">
          <Image
            alt="Gold medal for the best Academic performance in all NIBM campuses"
            title="Gold medal for the best Academic performance in all NIBM campuses"
            src={GoldMedal}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 213px, (max-width: 1024px) 25vw, 20vw"
            priority
            className="rounded-lg object-cover object-[-16px] sm:object-center"
          />
        </div>
        <div className="relative h-40 sm:h-80 mb-4">
          <Image
            alt="Me at 2023 NIBM Diploma Convocation"
            title="Me at 2023 NIBM Diploma Convocation"
            src={Convocation}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 213px, (max-width: 1024px) 25vw, 20vw"
            priority
            className="rounded-lg object-cover object-top sm:object-center"
          />
        </div>
        <div className="relative h-40 mb-4 sm:mb-0">
          <Image
            alt="Me standing on stage at the Intro to Git event organized by the NIBM Computer Society"
            title="Me standing on stage at the Intro to Git event organized by the NIBM Computer Society"
            src={IntroGitEvent}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 213px, (max-width: 1024px) 25vw, 20vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40 mb-4">
          <Image
            alt="Me presenting the Notifibm project at diploma final project presentation"
            title="Me presenting the Notifibm project at diploma final project presentation"
            src={NotifibmDemo}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 213px, (max-width: 1024px) 25vw, 20vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-80 mb-4 sm:mb-0">
          <Image
            alt="Me playing rugby for the NIBM rugby team"
            title="Me playing rugby for the NIBM rugby team"
            src={Rugby}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 213px, (max-width: 1024px) 25vw, 20vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40 sm:h-80 mb-4">
          <Image
            alt='Presenting my project at Intra "Innovate with Ballerina" hackathon'
            title='Presenting my project at "Innovate with Ballerina" hackathon'
            src={PresentingAtIWB}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 213px, (max-width: 1024px) 25vw, 20vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
        <div className="relative h-40 mb-4 sm:mb-0">
          <Image
            alt='Made it to the top 10 finalists at the "Innovate with Ballerina" hackathon powered by WSO2'
            title='Made it to the top 10 finalists at the "Innovate with Ballerina" hackathon powered by WSO2'
            src={IWBTop10}
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 213px, (max-width: 1024px) 25vw, 20vw"
            priority
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
