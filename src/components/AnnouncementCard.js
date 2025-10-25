import Link from 'next/link';

const AnnouncementCard = ({ announcement }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500';
      case 'important':
        return 'bg-orange-500';
      case 'normal':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'Mendesak';
      case 'important':
        return 'Penting';
      case 'normal':
        return 'Normal';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-white rounded-lg border-l-4 border-[var(--primary-color)] shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className={`${getPriorityColor(announcement.priority)} text-white px-3 py-1 rounded-full text-[1.2rem] font-medium`}>
            {getPriorityText(announcement.priority)}
          </span>
          {announcement.isNew && (
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-[1.2rem] font-medium">
              Baru
            </span>
          )}
        </div>
        <span className="text-[1.2rem] text-gray-500">
          {formatDate(announcement.date)}
        </span>
      </div>

      <h3 className="text-[1.8rem] font-bold mb-3 hover:text-[var(--primary-color)] transition-colors">
        <Link href={`/berita-pengumuman/pengumuman/${announcement.slug}`}>
          {announcement.title}
        </Link>
      </h3>

      <p className="text-gray-600 text-[1.4rem] mb-4 line-clamp-2">
        {announcement.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[1.2rem] text-gray-500">
          <span>Oleh: {announcement.author}</span>
        </div>
        <Link
          href={`/berita-pengumuman/pengumuman/${announcement.slug}`}
          className="text-[var(--primary-color)] font-medium hover:underline"
        >
          Lihat Detail →
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementCard;
