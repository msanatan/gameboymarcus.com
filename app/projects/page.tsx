import Image from "next/image";
import portfolio from "@/services/portfolio.json";

export const metadata = {
  title: "Projects - GameBoyMarcus",
  description: "Games and projects by Marcus Sanatan",
};

type PortfolioItem = {
  title: string;
  description: string;
  img: { url: string; alt: string };
  links: {
    playStore?: string;
    appStore?: string;
    meta?: string;
    itch?: string;
    github?: string;
    website?: string;
  };
  role: string;
};

export default function ProjectsPage() {
  const typedPortfolio = portfolio as PortfolioItem[];

  return (
    <div className="flex-1 bg-black px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center font-retro text-3xl text-primary">
          Projects
        </h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {typedPortfolio.map((project, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border-4 border-primary bg-primary transition-transform hover:scale-105"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={project.img.url}
                  alt={project.img.alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="mb-3 text-lg font-bold text-black">
                  {project.title}
                </h2>
                <p className="mb-4 text-sm text-black md:text-base">
                  {project.description}
                </p>
                <p className="mb-4 text-xs italic text-black md:text-sm">
                  Role: {project.role}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.links.playStore && (
                    <a
                      href={`${project.links.playStore}?ref=gameboymarcus.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Google Play Store"
                    >
                      <Image
                        src="/images/portfolio/icons/google-playstore.svg"
                        alt="Play Store"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.appStore && (
                    <a
                      href={`${project.links.appStore}?ref=gameboymarcus.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Apple App Store"
                    >
                      <Image
                        src="/images/portfolio/icons/apple-appstore.svg"
                        alt="App Store"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.itch && (
                    <a
                      href={`${project.links.itch}?ref=gameboymarcus.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Itch.io"
                    >
                      <Image
                        src="/images/portfolio/icons/itch.svg"
                        alt="Itch.io"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.meta && (
                    <a
                      href={`${project.links.meta}?ref=gameboymarcus.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Meta Quest"
                    >
                      <Image
                        src="/images/portfolio/icons/meta-logo.svg"
                        alt="Meta Quest"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={`${project.links.github}?ref=gameboymarcus.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="GitHub"
                    >
                      <Image
                        src="/images/portfolio/icons/github.svg"
                        alt="GitHub"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.website && (
                    <a
                      href={`${project.links.website}?ref=gameboymarcus.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Website"
                    >
                      <Image
                        src="/images/portfolio/icons/website.svg"
                        alt="Website"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
