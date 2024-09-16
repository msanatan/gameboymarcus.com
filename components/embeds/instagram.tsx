import { AspectRatio } from "@chakra-ui/react";

export default function InstagramEmbed({
  id,
  title,
  orientation,
}: {
  id: string;
  title: string;
  orientation: string;
}) {
  return (
    <AspectRatio
      maxW={640}
      ratio={orientation === "landscape" ? 16 / 9 : 9 / 16}
      margin={[1, 2, 3]}
    >
      <iframe
        src={`https://www.instagram.com/reel/${id}/embed`}
        title={title}
        loading="lazy"
      />
    </AspectRatio>
  );
}
