import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const ArticleCard = ({ id, title, excerpt, category, image, date, slug }) => {
  const categorySlug = category.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="mb-6 border-b pb-6 dark:border-gray-700">
      <div className="relative h-48 mb-3">
        <Image 
          src={image || '/images/placeholder.jpg'} 
          alt={title}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <Link 
        href={`/category/${categorySlug}`}
        className="text-primary text-sm font-medium hover:underline mb-2 inline-block"
      >
        {category}
      </Link>
      <h3 className="font-bold text-lg mb-2">
        <Link 
          href={`/story/${slug || id}`}
          className="hover:text-primary transition-colors"
        >
          {title}
        </Link>
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
        {excerpt}
      </p>
      <span className="text-xs text-gray-500">{date}</span>
    </div>
  );
};

export default ArticleCard;