import CertificateItem from "@/components/CertificateItem";
import GradualSpacing from "@/components/ui/GradualSpacing";
import certificates from "@/constants/certificates";

export default function CertificationPage() {
    return (
        <div className="container min-h-screen mx-auto mt-24 my-8 relative z-5 text-center flex flex-col md:flex-col md:flex-wrap pb-12">
            <div className="my-4 text-center mx-auto">
                <GradualSpacing
                    className="font-display my-4 text-center text-4xl font-bold tracking-[-0.1em]  text-white md:text-7xl md:leading-[5rem]"
                    text="Certifications"
                />
            </div>

            <ul className="m-2 mt-[8px] mx-5 font-normal sm:text-lg text-sm text-start text-white space-y-4 list-disc">
            {certificates.reverse().map((certificate, index) => (
                    <CertificateItem key={index} certificate={certificate} index={index} />
                ))}
            </ul>
        </div>
    );
}