import Footer from '../components/Footer';
import Header from '../components/Header';
import SectionCta from '../components/SectionCta';
import SectionFeaturedAuthors from '../components/SectionFeaturedAuthors';
import SectionGenres from '../components/SectionGenres';
import SectionNewsletter from '../components/SectionNewsletter';
import SectionTestimonials from '../components/SectionTestimonials';
import SectionTrendingBooks from '../components/SectionTrendingBooks';

function Home() {
  return (
    <>
      <Header />
      <main>
        <SectionGenres />
        <SectionTrendingBooks />
        <SectionFeaturedAuthors />
        <SectionTestimonials />
        <SectionCta />
        <SectionNewsletter />
      </main>
      <Footer />
    </>
  );
}

export default Home;
