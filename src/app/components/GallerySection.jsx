import Image from "next/image";
import AboutImg from "../../../public/images/about-1.jpg";
import WayForward from "../../../public/images/gallery/way-forward-to-the-dev-stage.jpg";
import GoldMedal from "../../../public/images/gallery/gold-medal.jpg";
import Convocation from "../../../public/images/gallery/convocation.jpg";
import IntroGitEvent from "../../../public/images/gallery/intro-git-event.jpg";
import Rugby from "../../../public/images/gallery/rugby.jpg";
import NotifibmDemo from "../../../public/images/gallery/notifibm-demo.jpg";






const GallerySection = () => {
    return (
        <section className="gallery-section max-w-3xl 3xl:max-4xl mx-auto mb-8 pb-4">
            <div className="columns-2 sm:columns-3 gap-4 my-8">
                <div className="relative h-40 mb-4">
                    <Image
                        alt="A way forward to the dev stage | knowledge sharing session for the juniors"
                        title="A way forward to the dev stage | Knowledge sharing session for the juniors"
                        src={WayForward}
                        fill
                        sizes="(max-width: 768px) 213px, 33vw"
                        priority
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="relative h-80 mb-4 sm:mb-0">
                    <Image
                        alt="Gold medal for the best Academic performance in all NIBM campuses"
                        title="Gold medal for the best Academic performance in all NIBM campuses"
                        src={GoldMedal}
                        fill
                        sizes="(max-width: 768px) 213px, 33vw"
                        priority
                        className="rounded-lg object-cover object-[-16px] sm:object-center"
                    />
                </div>
                <div className="relative h-40 sm:h-80 sm:mb-4">
                    <Image
                        alt="Me at 2023 NIBM Diploma Convocation"
                        title="Me at 2023 NIBM Diploma Convocation"
                        src={Convocation}
                        fill
                        sizes="(max-width: 768px) 213px, 33vw"
                        priority
                        className="rounded-lg object-cover object-top sm:object-center"
                    />
                </div>
                <div className="relative h-40 mb-4 sm:mb-0">
                    <Image
                        alt="Me standing on stage at the Intro to Git event organized by the NIBM Computer Society"
                        title="Me standing on stage at the Intro to Git event organized by the NIBM Computer Society"
                        src={IntroGitEvent}
                        fill
                        sizes="(max-width: 768px) 213px, 33vw"
                        priority
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="relative h-40 mb-4">
                    <Image
                        alt="Me presenting the Notifibm project at diploma final project presentation"
                        title="Me presenting the Notifibm project at diploma final project presentation"
                        src={NotifibmDemo}
                        fill
                        sizes="(max-width: 768px) 213px, 33vw"
                        priority
                        className="rounded-lg object-cover"
                    />
                </div>
                <div className="relative h-80">
                    <Image
                        alt="Me playing rugby for the NIBM rugby team"
                        title="Me playing rugby for the NIBM rugby team"
                        src={Rugby}
                        fill
                        sizes="(min-width: 768px) 213px, 33vw"
                        priority
                        className="rounded-lg object-cover"
                    />
                </div>
            </div>
        </section>
    )
};

export default GallerySection;