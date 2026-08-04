import {
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineGlobeAlt,
  HiOutlineHeart,
  HiOutlineMagnifyingGlass,
  HiOutlinePuzzlePiece,
  HiOutlineRocketLaunch,
  HiOutlineSparkles,
} from 'react-icons/hi2';

import { APP_URL } from '../utils/helpers';

export const bookGenres = [
  {
    name: 'Fiction',
    slug: 'fiction',
    blurb: 'Novels, classics, and everything invented',
    Icon: HiOutlineBookOpen,
  },
  {
    name: 'Mystery',
    slug: 'mystery',
    blurb: 'Detectives, puzzles, and the last page',
    Icon: HiOutlineMagnifyingGlass,
  },
  {
    name: 'Romance',
    slug: 'romance',
    blurb: 'Slow burns and second chances',
    Icon: HiOutlineHeart,
  },
  {
    name: 'Sci-Fi',
    slug: 'science-fiction',
    blurb: 'Far futures and stranger presents',
    Icon: HiOutlineRocketLaunch,
  },
  {
    name: 'Biography',
    slug: 'biography',
    blurb: 'Real lives, told properly',
    Icon: HiOutlineAcademicCap,
  },
  {
    name: 'History',
    slug: 'history',
    blurb: 'How we got here, in detail',
    Icon: HiOutlineGlobeAlt,
  },
  {
    name: 'Self-Help',
    slug: 'self-help',
    blurb: 'Habits, focus, and starting over',
    Icon: HiOutlineSparkles,
  },
  {
    name: 'Children',
    slug: 'juvenile-fiction',
    blurb: 'First books and forever favourites',
    Icon: HiOutlinePuzzlePiece,
  },
].map((genre) => ({
  ...genre,
  href: `${APP_URL}/genres/${genre.slug}`,
}));

export const ALL_GENRES_URL = `${APP_URL}/genres`;
