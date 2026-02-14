// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import './EarlyTestersCarousel.css';

const testimonials = [
  { img: '/images/testimonial-brett-earnshaw.png', name: 'Brett Earnshaw', role: 'Early Tester', quote: "My testosterone went from 658 to 749 in two months—more energy, sharper focus, better performance. This system changed my life." },
  { img: '/placeholder.svg', name: 'Mike VanDyke', role: 'Early Tester', quote: "I experienced rapid improvements in energy and cellular performance. It's a game-changer for anyone serious about health." },
  { img: '/placeholder.svg', name: 'Whitney Lopez', role: 'Early Tester & Controller', quote: "As a busy professional, the system gave me noticeable improvements in energy and focus—plus, I trust the science behind it." },
  { img: '/placeholder.svg', name: 'Jordan Sides', role: 'Early Tester & Research Participant', quote: "I wanted real results and evidence. This program delivered both—better wellness, sharper mind, and research I could be part of every step." },
  { img: '/placeholder.svg', name: 'Maryanne Van Dyke', role: 'Early Tester & Influencer', quote: "The Cellular Optimization System helped me level up my health and share authentic results with my audience—real energy, real confidence, every day." },
];

const EarlyTestersCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="early-testers-carousel">
      <div className="early-testers-viewport" ref={emblaRef}>
        <div className="early-testers-container">
          {testimonials.map((t, i) => (
            <div className="early-testers-slide" key={i}>
              <div className="ucos-testimonial-card">
                <img className="testimonial-avatar" src={t.img} alt={t.name} />
                <div className="testimonial-body">
                  <h4>{t.name}</h4>
                  <div className="role">{t.role}</div>
                  <blockquote>"{t.quote}"</blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="early-testers-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`early-testers-dot${i === selectedIndex ? ' active' : ''}`}
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default EarlyTestersCarousel;
