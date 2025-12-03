import React, { useState, useEffect, useRef } from "react";

type Slide = {
  id: number;
  image: string;
  alt: string;
};

type Props = {
  slides?: Slide[];
  autoPlayInterval?: number; // in milliseconds
};

const AdCarousel: React.FC<Props> = ({
  slides,
  autoPlayInterval = 5000, // 5 seconds default
}) => {
  // Default slides with placeholder images from Unsplash
  const defaultSlides: Slide[] = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
      alt: "Fashion Store",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=400&fit=crop",
      alt: "Shopping Experience",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=400&fit=crop",
      alt: "Fashion Collection",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop",
      alt: "Retail Store",
    },
  ];

  const carouselSlides = slides || defaultSlides;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === carouselSlides.length - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, autoPlayInterval, carouselSlides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex =
      currentIndex === 0 ? carouselSlides.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex =
      currentIndex === carouselSlides.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - go to next
      goToNext();
    } else if (distance < -minSwipeDistance) {
      // Swipe right - go to previous
      goToPrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="relative w-full max-w-[350px] mx-auto overflow-hidden rounded-lg shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Carousel Container */}
      <div className="relative h-32 sm:h-36">
        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {carouselSlides.map((slide, index) => (
            <div
              key={slide.id}
              className="min-w-full h-full relative flex-shrink-0"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    const colors = [
                      "bg-gradient-to-br from-blue-500 to-purple-600",
                      "bg-gradient-to-br from-pink-500 to-red-600",
                      "bg-gradient-to-br from-green-500 to-teal-600",
                      "bg-gradient-to-br from-yellow-500 to-orange-600",
                    ];
                    parent.className += ` ${colors[index % colors.length]} flex items-center justify-center`;
                    const fallback = document.createElement("div");
                    fallback.className = "text-white text-2xl font-bold";
                    fallback.textContent = `Ad ${index + 1}`;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all z-10"
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all z-10"
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5 text-gray-800"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Progress Indicator (Top) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 bg-opacity-50 z-10">
          <div
            className="h-full bg-white transition-all duration-300 ease-linear"
            style={{
              width: isAutoPlaying
                ? `${((currentIndex + 1) / carouselSlides.length) * 100}%`
                : "0%",
            }}
          />
        </div>

        {/* Slide Indicators (Bottom) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-8"
                  : "bg-white bg-opacity-50 w-2 hover:bg-opacity-75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdCarousel;

