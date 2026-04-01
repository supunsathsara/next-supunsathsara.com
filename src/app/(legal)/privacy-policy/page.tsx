

export default function PrivacyPage() {
    return (
        <div className="container mx-auto mt-24 my-8 relative z-5 text-center flex flex-col md:flex-row md:flex-wrap pb-12 text-white">
            <div className="my-4 text-center mx-auto">
                <h2 className="text-2xl sm:text-4xl text-white font-bold">Privacy Policy </h2>
            </div>
            <div className="m-2 text-center mx-auto" >
                <div
                    className="mt-[8px] mx-10 font-normal sm:text-lg text-sm text-start text-white"
                >
                    <p className="text-gray-200 mb-4">
                        Your privacy is important to us. This Privacy Policy outlines the types of personal information we receive and collect when you use our website, as well as how we safeguard your information. We never sell your personal information to third parties.
                    </p>
                    <h2 className="text-xl font-bold mb-2">Information We Collect:</h2>
                    <ul className="list-disc pl-4 text-gray-200">
                        <li>Personal Information: We may collect your name and email address when you submit forms or contact us.</li>
                        <li>Usage Data: We gather data on how you interact with our website, such as page views and session duration.</li>
                    </ul>
                    <h2 className="text-xl font-bold mt-4 mb-2">How We Use Your Information:</h2>
                    <ul className="list-disc pl-4 text-gray-200">
                        <li>We use your information to respond to your inquiries, provide information or services you request, and improve our website.</li>
                        <li>We may send you occasional updates, but you can opt out at any time.</li>
                    </ul>
                    <h2 className="text-xl font-bold mt-4 mb-2">Data Security:</h2>
                    <p className="text-gray-200 mb-4">
                        We take data security seriously and employ measures to protect your information. However, please be aware that no method of internet transmission or electronic storage is completely secure.
                    </p>
                    <h2 className="text-xl font-bold mt-4 mb-2">Third-Party Links:</h2>
                    <p className="text-gray-200 mb-4">
                        Our website may contain links to third-party websites. We are not responsible for their privacy practices.
                    </p>
                    <h2 className="text-xl font-bold mt-4 mb-2">Policy Changes:</h2>
                    <p className="text-gray-200 mb-4">
                        We may update this Privacy Policy from time to time. The most recent version will be posted on this page.
                    </p>
                    <h2 className="text-xl font-bold mt-4 mb-2">Contact Us:</h2>
                    <p className="text-gray-200 mb-4">
                        If you have any questions or concerns regarding our Privacy Policy, please contact us at <a href="mailto:contact@supunsathsara.com" className="font-semibold hover:underline">
                            contact@supunsathsara.com
                        </a>.
                    </p>
                    <p className="text-gray-300 text-sm mt-3">
                        This Privacy Policy was last updated on 2023.09.28.
                    </p>
                </div>
            </div>
        </div>
    )
}