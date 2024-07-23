'use client'

import HeroHeader from "../components/HeroHeader";
import NavigationSticky from "../components/Navigation";
import SectionPost from "../sections/posts";

export default function Home() {

  return (
    <>
      {/* HERO HEADER */}
      <HeroHeader />
      {/* END HERO HEADER */}

      {/* NAVIGATION */}
      <NavigationSticky />
      {/* END NAVIGATION */}

      {/* LIST POSTS */}
      <SectionPost />
      {/* END LIST POSTS */}
    </>
  );
}
