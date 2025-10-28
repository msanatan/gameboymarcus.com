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

function addReferrer(url: string): string {
  return url.indexOf("?") === -1 ? `${url}?ref=gameboymarcus.com` : `${url}&ref=gameboymarcus.com`;
}

export default function ProjectsPage() {
  const typedPortfolio = portfolio as PortfolioItem[];

  return (
    <div className="flex-1 bg-black px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-12 text-center font-kenneyBlocks text-3xl text-primary">
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
                      href={addReferrer(project.links.playStore)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Google Play Store"
                    >
                      <Image
                        src="/images/icons/google-playstore.svg"
                        alt="Play Store"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.appStore && (
                    <a
                      href={addReferrer(project.links.appStore)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Apple App Store"
                    >
                      <Image
                        src="/images/icons/apple-appstore.svg"
                        alt="App Store"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.itch && (
                    <a
                      href={addReferrer(project.links.itch)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Itch.io"
                    >
                      <Image
                        src="/images/icons/itch.svg"
                        alt="Itch.io"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.meta && (
                    <a
                      href={addReferrer(project.links.meta)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Meta Quest"
                    >
                      <Image
                        src="/images/icons/meta-logo.svg"
                        alt="Meta Quest"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={addReferrer(project.links.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="GitHub"
                    >
                      <Image
                        src="/images/icons/github.svg"
                        alt="GitHub"
                        width={32}
                        height={32}
                        className="transition-opacity hover:opacity-70"
                      />
                    </a>
                  )}
                  {project.links.website && (
                    <a
                      href={addReferrer(project.links.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      title="Website"
                    >
                      <Image
                        src="/images/icons/website.svg"
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
