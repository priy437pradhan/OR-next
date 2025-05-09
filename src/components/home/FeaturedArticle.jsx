import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const FeaturedArticle = ({ id, title, excerpt, category, image, date, slug, author }) => {
  // Safely handle category
  const categorySlug = category ? category.toLowerCase().replace(/\s+/g, '-') : '';
  
  // Handle author properly - ensure we're not trying to call toLowerCase on an object
  const authorName = author && typeof author === 'object' ? author.name || 'Anonymous' : author || 'Anonymous';
  
  return (
    <div className="mb-8 pb-8 border-b dark:border-gray-700">
      <div className="relative h-64 mb-4">
        <Image 
          src={image || '/images/placeholder.jpg'} 
          alt={title}
          fill
          className="object-cover rounded"
          sizes="(max-width: 768px) 100vw, 50vw"  
        />
      </div>
      
      <Link 
        href={`/category/${categorySlug}`}
        className="text-primary text-sm font-medium hover:underline mb-2 inline-block"
      >
        {category}
      </Link>
      <h2 className="font-bold text-2xl mb-3">
        <Link 
          href={`/story/${slug || id}`}
          className="hover:text-primary transition-colors"
        >
          {title}
        </Link>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 text-base mb-3">
        {excerpt}
      </p>
      
      <div className="flex items-center">
        {author && typeof author === 'object' && author.avatar && (
          <div className="w-10 h-10 rounded-full overflow-hidden relative mr-3">
            <Image 
              src={author.avatar} 
              alt={authorName}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <div className="font-medium">{authorName}</div>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedArticle;