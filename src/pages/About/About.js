import aboutContent from "./about.md";
import MarkdownReader from "../../components/markdown/MarkdownReader";

const About = () => {
 return <MarkdownReader markdownContent={aboutContent} />;
};

export default About;
