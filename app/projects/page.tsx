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
  };
  role: string;
};

export default function ProjectsPage() {
  const typedPortfolio = portfolio as PortfolioItem[];

  return (
    <div className="flex-1 bg-black px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center font-retro text-2xl text-primary">
          Projects
        </h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
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
                <h2 className="mb-3 font-retro text-xl text-black">
                  {project.title}
                </h2>
                <p className="mb-4 text-sm text-black md:text-base">
                  {project.description}
                </p>
                <p className="mb-4 text-xs italic text-black md:text-sm">
                  Role: {project.role}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.links.playStore && (
                    <a
                      href={project.links.playStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded bg-black px-4 py-2 font-retro text-xs text-primary transition-opacity hover:opacity-80"
                    >
                      Play Store
                    </a>
                  )}
                  {project.links.appStore && (
                    <a
                      href={project.links.appStore}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded bg-black px-4 py-2 font-retro text-xs text-primary transition-opacity hover:opacity-80"
                    >
                      App Store
                    </a>
                  )}
                  {project.links.itch && (
                    <a
                      href={project.links.itch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded bg-black px-4 py-2 font-retro text-xs text-primary transition-opacity hover:opacity-80"
                    >
                      Itch.io
                    </a>
                  )}
                  {project.links.meta && (
                    <a
                      href={project.links.meta}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded bg-black px-4 py-2 font-retro text-xs text-primary transition-opacity hover:opacity-80"
                    >
                      Meta Quest
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
