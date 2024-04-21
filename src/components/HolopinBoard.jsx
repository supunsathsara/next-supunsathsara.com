import Image from "next/image";

const HolopinBoard = () => {
    return (
        <section className="justify-center">
            <a href="https://www.holopin.io/@supunsathsara" target="_blank" rel="noopener noreferrer">
                <Image
                    src="https://holopin.me/supunsathsara"
                    alt="@supunsathsara's Holopin board"
                    className="rounded-xl cursor-pointer transform-gpu duration-200 mx-auto my-15 mb-12 md:mb-20 md:w-[80%]"
                    width={2428}
                    height={764}
                />
            </a>
        </section>
    )
}

export default HolopinBoard;