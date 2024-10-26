import CertificateItem from "@/components/CertificateItem";
import GradualSpacing from "@/components/ui/GradualSpacing";
import certificates from "@/constants/certificates";

export default function CertificationPage() {
    return (
        <div className="container min-h-screen mx-auto mt-24 my-8 relative z-5 text-center flex flex-col md:flex-col md:flex-wrap pb-12">
            <div className="my-4 text-center mx-auto">
                <GradualSpacing
                    className="font-display my-4 text-center text-4xl font-bold  text-white md:text-7xl md:leading-[5rem]"
                    text="Certifications"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto md:px-8 w-full">
                {certificates
                    .sort((a, b) => b.id - a.id)
                    .map((certificate, index) => (
                        <CertificateItem key={index} certificate={certificate} index={index} />
                    ))}
            </div>
        </div>
    );
}