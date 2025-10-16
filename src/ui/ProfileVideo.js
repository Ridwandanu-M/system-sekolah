const ProfileVideo = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[120rem] mx-auto py-[8rem] lg:py-[10.8rem] px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[3.2rem] items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <iframe
                src="https://www.youtube.com/embed/mn7ms8dmG28?rel=0"
                className="aspect-video w-full border-4 lg:border-[.8rem] border-[var(--primary-color)] rounded-xl shadow-2xl"
                allowFullScreen
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin"
                title="Video Profil SMP Muhammadiyah 1 Seyegan"
              />
            </div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col gap-6 lg:gap-[2.4rem]">
            <div className="text-center lg:text-left">
              <h2 className="text-[2.8rem] md:text-[3.2rem] lg:text-[3.6rem] font-[700] text-[var(--primary-color)] mb-4">
                Video Profil Sekolah
              </h2>
              <div className="w-[8rem] h-[0.4rem] bg-yellow-400 mx-auto lg:mx-0 rounded-full"></div>
            </div>
            <p className="text-[1.5rem] md:text-[1.6rem] lg:text-[1.8rem] text-justify text-gray-700 leading-relaxed">
              Saksikan berbagai kegiatan dan fasilitas unggulan SMP Muhammadiyah
              1 Seyegan. Mulai dari kegiatan ekstrakurikuler seperti Tapak Suci,
              Outing Class, Hizbul Wathan, hingga fasilitas modern seperti
              Laboratorium Komputer, Perpustakaan Digital, dan ruang
              pembelajaran yang nyaman.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-[1.6rem] py-[.8rem] bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-[1.4rem] font-medium">
                Tapak Suci
              </span>
              <span className="px-[1.6rem] py-[.8rem] bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-[1.4rem] font-medium">
                Lab Komputer
              </span>
              <span className="px-[1.6rem] py-[.8rem] bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-[1.4rem] font-medium">
                Perpustakaan
              </span>
              <span className="px-[1.6rem] py-[.8rem] bg-[var(--primary-color)]/10 text-[var(--primary-color)] rounded-full text-[1.4rem] font-medium">
                Outing Class
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements - Hidden on mobile */}
      <div className="hidden lg:block absolute top-[4.8rem] left-[8.8rem] w-[10rem] h-[10rem] bg-[var(--primary-color)]/20 rounded-full"></div>
      <div className="hidden lg:block absolute bottom-[4.8rem] right-[8.8rem] w-[10rem] h-[10rem] bg-yellow-400/30 rounded-full"></div>
    </section>
  );
};

export default ProfileVideo;
