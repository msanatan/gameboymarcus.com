interface PortfolioLinks {
  playStore?: string;
  appStore?: string;
  meta?: string;
  itch?: string;
}

interface PortfolioImage {
  url: string;
  alt: string;
}
interface PortfolioItem {
  title: string;
  description: string;
  img: PortfolioImage;
  links: PortfolioLinks;
  role: string;
}
