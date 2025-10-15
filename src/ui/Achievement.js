import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Achievement = () => {
  return (
    <section className="bg-[var(--primary-color)]">
      <div className="max-w-[120rem] mx-auto py-[10.8rem]">
        <h2 className="text-center text-[3.2rem] font-[700] text-[#fff]">
          Prestasi
        </h2>
        <div>
          <Carousel>
            <CarouselContent>
              <CarouselItem className="basis-1/3">...</CarouselItem>
              <CarouselItem className="basis-1/3">...</CarouselItem>
              <CarouselItem className="basis-1/3">...</CarouselItem>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Achievement;
