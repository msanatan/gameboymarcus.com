import { AspectRatio } from "@chakra-ui/react";

export default function YouTubeEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <AspectRatio maxW={960} ratio={16 / 9} margin={[1, 2, 3]}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </AspectRatio>
  );
}
