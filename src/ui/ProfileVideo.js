const ProfileVideo = () => {
  return (
    <section className="relative">
      <div className="max-w-[120rem] mx-auto py-[10.8rem] grid grid-cols-2 gap-[3.2rem] items-center">
        <iframe
          src="https://www.youtube.com/embed/mn7ms8dmG28?rel=0"
          className="aspect-video w-[100%] border-[.8rem] border-[var(--primary-color)] rounded-lg shadow-lg"
          allowFullScreen
          allow="accelerometer *; clipboard-write *; encrypted-media *; gyroscope *; picture-in-picture *; web-share *;"
          referrerPolicy="strict-origin"
        />
        <div className="flex flex-col gap-[2.4rem]">
          <h2 className="text-[3.2rem] font-[700] text-[var(--primary-color)]">
            Video Profil
          </h2>
          <p className="text-[1.6rem] text-justify text-[#000]/75">
            Berbagai hal mengenai kegiatan-kegiatan dan fasilitas yang ada di
            SMP Muhammadiyah 1 Seyegan. Contoh kegiatannya seperti tapak suci,
            outing class, Hisbul Waton, dan masih banyak lagi. Dan beberapa
            fasilitasnya berupa Laboratorium Komputer, perpustakaan, dan lain
            sebagainya.
          </p>
        </div>
      </div>
      <div className="absolute top-[4.8rem] left-[8.8rem] h-[10rem] pr-[10rem] bg-[var(--primary-color)] rounded-[50%]"></div>
      <div className="absolute bottom-[4.8rem] right-[8.8rem] h-[10rem] pr-[10rem] bg-[var(--primary-color)] rounded-[50%]"></div>
    </section>
  );
};

export default ProfileVideo;
