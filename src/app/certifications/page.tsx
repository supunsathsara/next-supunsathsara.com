import type { Metadata } from "next";
import CertificationsGrid from "@/components/CertificationsGrid";
import certificates from "@/constants/certificates";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Certifications",
  description: `${certificates.length} industry certifications in software engineering, web development, cybersecurity and cloud, from freeCodeCamp, Microsoft, GitHub, Cisco, Postman and NASA.`,
  path: "/certifications",
});

export default function CertificationPage() {
  return <CertificationsGrid />;
}
