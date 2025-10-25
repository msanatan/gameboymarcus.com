export default function YouTubeEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <div className="relative my-4 aspect-video max-w-3xl overflow-hidden rounded-lg md:my-6">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}
