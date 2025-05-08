import Link from 'next/link';

const CategoryLink = ({ category, className = '' }) => {
  return (
    <Link 
      href={`/${category.toLowerCase().replace(/\s+/g, '-')}`}
      className={`text-sm font-medium hover:text-primary transition-colors ${className}`}
    >
      {category}
    </Link>
  );
};

export default CategoryLink;