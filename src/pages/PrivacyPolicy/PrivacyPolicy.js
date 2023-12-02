import MarkdownReader from "../../components/markdown/MarkdownReader";
import privacyPolicyContent from "./privacy-policy.md";

const PrivacyPolicy = () => {
  return <MarkdownReader markdownContent={privacyPolicyContent} />;
};

export default PrivacyPolicy;
