'use client'

import { motion } from "framer-motion";

const CertificateItem = ({ certificate, index }) => {
    return (
        <motion.li 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="py-4 border-b border-[#33353F] shadow-[#2A0E61]/50"
        >
            <h3 className="text-xl font-semibold mb-2">
                {certificate.name}
                <span className="text-xl my-0 text-[#ADB7BE] ml-1"> by {certificate.provider}</span>
            </h3>

            <a
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ADB7BE] hover:text-blue-600 hover:underline"
            >
                View Certificate
            </a>
        </motion.li>
    );
};

export default CertificateItem;