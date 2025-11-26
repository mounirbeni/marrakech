"use client";

import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedExperiences } from "@/components/home/FeaturedExperiences";
import { WhyBookWithUs } from "@/components/home/WhyBookWithUs";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedExperiences />
      <WhyBookWithUs />
      <Testimonials />
    </div>
  );
}
