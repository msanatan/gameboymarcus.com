export default function InstagramEmbed({
  id,
  title,
  orientation,
}: {
  id: string;
  title: string;
  orientation: string;
}) {
  const aspectClass = orientation === "landscape" ? "aspect-video" : "aspect-[9/16]";

  return (
    <div className={`relative my-4 max-w-xl overflow-hidden rounded-lg md:my-6 ${aspectClass}`}>
      <iframe
        src={`https://www.instagram.com/reel/${id}/embed`}
        title={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
