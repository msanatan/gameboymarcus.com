import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="flex flex-1 items-center justify-center bg-primary px-4 py-16 md:px-8 md:py-24">
        <div className="flex max-w-4xl flex-col items-center gap-8 text-center md:flex-row md:gap-16 md:text-left">
          <div className="shrink-0">
            <Image
              src="/images/logo.png"
              width={256}
              height={256}
              alt="GameBoyMarcus logo"
              priority={true}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-retro text-2xl text-black md:text-5xl">
              GameBoyMarcus
            </h1>
            <p className="text-lg text-black md:text-xl">
              Hi! I&apos;m Marcus, a software and game developer from Trinidad and Tobago.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4 md:justify-start">
              <Link
                href="/about"
                className="rounded-lg border-2 border-black px-6 py-3 font-retro text-sm text-black transition-all hover:bg-black hover:text-primary"
              >
                About Me
              </Link>
              <Link
                href="/projects"
                className="rounded-lg border-2 border-black px-6 py-3 font-retro text-sm text-black transition-all hover:bg-black hover:text-primary"
              >
                View Projects
              </Link>
              <Link
                href="/blog/page/1"
                className="rounded-lg border-2 border-black px-6 py-3 font-retro text-sm text-black transition-all hover:bg-black hover:text-primary"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
