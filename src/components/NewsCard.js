import Image from "next/image";
import Link from "next/link";

const NewsCard = ({ news }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-[20rem]">
        <Image
          src={news.image || "/placeholder-news.jpg"}
          alt={news.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-[var(--primary-color)] text-white px-3 py-1 rounded-full text-[1.2rem] font-medium">
            {news.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-3 text-[1.2rem] text-gray-600">
          <span>{formatDate(news.date)}</span>
          <span>•</span>
          <span>{news.author}</span>
        </div>

        <h3 className="text-[2rem] font-bold mb-3 line-clamp-2 hover:text-[var(--primary-color)] transition-colors">
          <Link href={`/berita-pengumuman/berita/${news.slug}`}>
            {news.title}
          </Link>
        </h3>

        <p className="text-gray-600 text-[1.4rem] line-clamp-3 mb-4">
          {news.excerpt}
        </p>

        <Link
          href={`/berita-pengumuman/berita/${news.slug}`}
          className="inline-flex items-center text-[var(--primary-color)] font-medium hover:underline"
        >
          Baca Selengkapnya →
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
