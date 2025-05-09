import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import newsData from '../../../data/news-data';

async function getArticleBySlug(slug) {
  const allArticles = [
    ...newsData.leftSideArticles,
    ...newsData.featuredArticles,
    ...newsData.rightSideArticles
  ];
  
  const article = allArticles.find(article => article.slug === slug);
  
  if (!article) return null;
  
  const readTime = article.readTime || Math.ceil((article.excerpt || '').length / 500) || 3;
  
  return {
    ...article,
    readTime
  };
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    return {
      title: 'Article Not Found - Odisha Khabar',
      description: 'The requested article could not be found'
    };
  }
  
  return {
    title: `${article.title} - Odisha Khabar`,
    description: article.excerpt || 'Read the full story on Odisha Khabar',
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.image }]
    }
  };
}

export default async function StoryPage({ params }) {
  const { slug } = params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  
  const categorySlug = article.category.toLowerCase().replace(/\s+/g, '-');
  const formattedDate = article.date;
  
  // Function to get related articles from the same category
  const getRelatedArticles = () => {
    const allArticles = [
      ...newsData.leftSideArticles,
      ...newsData.featuredArticles,
      ...newsData.rightSideArticles
    ];
    
    return allArticles
      .filter(item => 
        item.category === article.category && 
        item.slug !== article.slug
      )
      .slice(0, 3);
  };
  
  const relatedArticles = getRelatedArticles();
  
  return (
    <article className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6 text-gray-600 dark:text-gray-400">
        <ol className="flex flex-wrap items-center">
          <li className="flex items-center">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
          </li>
          <li className="flex items-center">
            <Link href={`/category/${categorySlug}`} className="hover:text-primary">
              {article.category}
            </Link>
            <span className="mx-2">/</span>
          </li>
          <li className="truncate max-w-[200px] sm:max-w-xs">{article.title}</li>
        </ol>
      </nav>
      
      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-6 gap-4">
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </span>
          
          <span className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {article.readTime} min read
          </span>
          
          <Link 
            href={`/category/${categorySlug}`}
            className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            {article.category}
          </Link>
        </div>
      </header>
      
      <div className="relative w-full h-64 md:h-96 mb-8">
        <Image
          src={article.image || '/images/placeholder.jpg'}
          alt={article.title}
          fill
          className="object-cover rounded-lg"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
        />
      </div>
      
      <div className="max-w-3xl mx-auto">
        <div className="text-lg font-medium mb-6 text-gray-700 dark:text-gray-300">
          {article.excerpt}
        </div>
        
        <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
          {article.description ? (
            <div dangerouslySetInnerHTML={{ __html: article.description }} />
          ) : (
            <p>Full article content is not available at this time.</p>
          )}
        </div>
        
        <div className="border-t border-b py-6 dark:border-gray-700 mb-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Share:</span>
              
              <button aria-label="Share on Twitter" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              <button aria-label="Share on Facebook" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </button>
              <button aria-label="Share on LinkedIn" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-blue-800 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </button>
              <button aria-label="Share via WhatsApp" className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-green-500 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.5 5.6L.6 23.4l6-1.6c1.6.9 3.5 1.3 5.4 1.3 6.3 0 11.4-5.1 11.4-11.4-.1-2.8-1.2-5.7-3.3-7.8zM12 21.4c-1.7 0-3.3-.5-4.8-1.3l-.4-.2-3.5 1 1-3.4L4 17c-1-1.5-1.4-3.2-1.4-5.1 0-5.2 4.2-9.4 9.4-9.4 2.5 0 4.9 1 6.7 2.8 1.8 1.8 2.8 4.2 2.8 6.7-.1 5.2-4.3 9.4-9.5 9.4zm5.1-7.1c-.3-.1-1.7-.9-1.9-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1s-1.2-.5-2.3-1.4c-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6s.3-.3.4-.5c.2-.1.3-.3.4-.5.1-.2 0-.4 0-.5C10 9 9.3 7.6 9 7c-.1-.4-.4-.3-.5-.3h-.6s-.4.1-.7.3c-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.3-.3-.4-.6-.5z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <button className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save Article
            </button>
          </div>
        </div>
      </div>
      
      {relatedArticles.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArticles.map(relatedArticle => (
              <div key={relatedArticle.id} className="border rounded-lg overflow-hidden shadow-sm dark:border-gray-700">
                <div className="relative h-48 w-full">
                  <Image 
                    src={relatedArticle.image || '/images/placeholder.jpg'} 
                    alt={relatedArticle.title} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-2 hover:text-primary">
                    <Link href={`/story/${relatedArticle.slug}`}>{relatedArticle.title}</Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {relatedArticle.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{relatedArticle.date}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      {relatedArticle.readTime || Math.ceil((relatedArticle.excerpt || '').length / 500) || 3} min read
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}