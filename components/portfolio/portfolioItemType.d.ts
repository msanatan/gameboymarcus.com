interface PortfolioImage {
  url: string;
  alt: string;
}
interface PortfolioItem {
  title: string;
  description: string;
  img: PortfolioImage;
  links: Record<string, string>;
  role: string;
}
