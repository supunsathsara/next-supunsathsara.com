import Image from "next/image";


export default function Loading() {
    return(
        <div className="flex items-center justify-center min-h-screen">
      <Image src='/images/Main-Logo.png'
        alt="supun sathsara logo"
        width={150}
        height={150}
        className="animate-pulse bg-blend-overlay mx-auto my-auto"
      />
    </div>
    )
}