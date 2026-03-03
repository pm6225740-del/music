"use client";

import { MinimalistHero } from '@/components/hero';

export default function Home() {
  const heroProps = {
    logoText: 'MUSIC',
    navLinks: [
      { label: 'FEATURES', href: '#' },
      { label: 'PRICING', href: '#' },
      { label: 'CONTACT', href: '#' },
    ],
    mainText: 'Elevate your YouTube videos with royalty-free, AI-generated soundtracks. Create the perfect mood and beat for your next viral hit in seconds.',
    readMoreLink: '#',
    imageSrc: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2000&auto=format&fit=crop', // Placeholder image
    imageAlt: 'AI Music visualization',
    overlayText: {
      part1: 'Create',
      part2: 'Your SOUND',
    },
    socialLinks: [],
    locationText: '',
  };

  return <MinimalistHero {...heroProps} />;
}
