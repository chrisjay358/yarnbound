import { testimonials } from '../data/testimonials';

import AuthorPhoto from './AuthorPhoto';
import SectionHeader from './SectionHeader';
import styles from './SectionTestimonials.module.css';

function SectionTestimonials() {
  return (
    <section className="section section-inverse" id="testimonials">
      <div className="container text-center">
        <SectionHeader
          tag="Loved by readers"
          heading="What readers are saying"
          description="Thousands of readers use Yarnbound to find their next book and keep track of the ones they love."
        />
      </div>

      <div className={`container ${styles.testimonialBox}`}>
        {testimonials.map((testimonial) => (
          <Testimonial testimonial={testimonial} key={testimonial.id} />
        ))}
      </div>
    </section>
  );
}

function Testimonial({ testimonial }) {
  return (
    <figure className={styles.testimonial}>
      <blockquote className={styles.testimonialText}>
        "{testimonial.text}"
      </blockquote>

      <div className={styles.person}>
        <AuthorPhoto
          src={testimonial.avatar}
          initials={testimonial.initials}
          imgClass={styles.personImg}
          fallbackClass={styles.personInitials}
        />
        <figcaption>
          <p className={styles.personName}>{testimonial.name}</p>
          <p className={styles.personMeta}>{testimonial.location}</p>
        </figcaption>
      </div>
    </figure>
  );
}

export default SectionTestimonials;
