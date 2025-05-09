// app/story/[slug]/page.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import newsData from '../../../data/news-data';
import { BASE_URL } from '../../../../src/utils/config';
import Header from '../../../components/layout/Header';

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
  const { slug } = await params;
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
      images: [{ url: article.image }],
      url: `${BASE_URL}/story/${slug}`
    }
  };
}

export default async function StoryPage({ params }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  
  if (!article) {
    notFound();
  }
  
  const categorySlug = article.category.toLowerCase().replace(/\s+/g, '-');
  const formattedDate = article.date;
  
  const authorName = article.author && typeof article.author === 'object' 
    ? article.author.name || 'Anonymous' 
    : article.author || 'Anonymous';
  
  const authorSlug = authorName.toLowerCase().replace(/\s+/g, '-');
  
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
    <>
    <Header />
    <div className="container bg-gray-50 dark:bg-gray-900">
     
      <article className="mx-auto px-4 py-8 max-w-4xl">
        {/* Tag line */}
        <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
          {article.category}
        </div>
        
        {/* Article Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          {article.title}
        </h1>
        
        {/* Author info */}
        <div className="flex items-center mb-6">
          {article.author && (
            <>
              <div className="mr-2 text-sm">By</div>
              <Link href={`/author/${authorSlug}`} className="text-primary font-medium text-sm">
                {authorName}
              </Link>
            </>
          )}
        </div>
        
        <div className="text-lg font-medium mb-6 text-gray-700 dark:text-gray-300 border-l-4 border-primary pl-4 py-2 bg-gray-100 dark:bg-gray-800">
          {article.excerpt}
        </div>
        
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
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-8">
          <span className="mr-2">{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{article.readTime} min read</span>
          
          <div className="ml-auto">
            <button className="flex items-center text-gray-500 hover:text-primary" aria-label="Share article">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none dark:prose-invert mb-12">
          {article.description ? (
            <div dangerouslySetInnerHTML={{ __html: article.description }} />
          ) : (
            <>
              <p className="mb-4">
                On the evening of 24 April, two days after a deadly terrorist attack in Pahalgam claimed at least 26 civilian lives, a senior executive at HDFC Bank sent a terse message to a collemay come for us n He t referring to the perpetrators of the attack. He meant the regulators.
              </p>
              <p className="mb-4">The warning was well-placed.</p>
              <p className="mb-4">
                In the days that followed, senior officials across the Ministry of Home Affairs, the Ministry of Corporate Affairs, and the Ministry of Finance convened for urgent meetings to address the emerging crisis in  payments industry.
              </p>
              <p>
                India wants to stop terror-funded rupees, banks want to stop inadvertently laundering them, and compliance firms just want to be on eves speed dial.
              </p>
            </>
          )}
        </div>
        
        {/* Related articles section */}
        {relatedArticles.length > 0 && (
          <div className="mt-12 border-t pt-8 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map(relatedArticle => (
                <div key={relatedArticle.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="relative h-48 w-full">
                    <Image 
                      src={relatedArticle.image || '/images/placeholder.jpg'} 
                      alt={relatedArticle.title} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2">
                      <Link href={`/story/${relatedArticle.slug}`} className="hover:text-primary transition-colors duration-300">
                        {relatedArticle.title}
                      </Link>
                    </h3>
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
    </div>
    </>
  );
}