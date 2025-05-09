// app/category/[category]/page.js
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/layout/Header';
import newsData from '../../../data/news-data';
import { BASE_URL } from '../../../../src/utils/config';

async function getCategoryData(category) {
  try {
    const formattedCategory = category.replace(/-/g, ' ').split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Combine all articles from newsData
    const allArticles = [
      ...newsData.leftSideArticles,
      ...newsData.featuredArticles,
      ...newsData.rightSideArticles
    ];
    
    // Filter articles by category
    const categoryArticles = allArticles.filter(article => 
      article.category.toLowerCase() === formattedCategory.toLowerCase()
    );
    
    if (categoryArticles.length === 0) {
      return null;
    }
    
    return {
      name: formattedCategory,
      articles: categoryArticles
    };
  } catch (error) {
    console.error(`Error fetching category data for ${category}:`, error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { category } = params;
  const formattedCategory = category.replace(/-/g, ' ').split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return {
    title: `${formattedCategory} - Odisha Khabar`,
    description: `Latest news and articles from the ${formattedCategory} category`,
    openGraph: {
      title: `${formattedCategory} - Odisha Khabar`,
      description: `Latest news and articles from the ${formattedCategory} category`,
      url: `${BASE_URL}/category/${category}`
    }
  };
}

export default async function CategoryPage({ params }) {
  const { category } = params;
  
  const formattedCategory = category.replace(/-/g, ' ').split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const categoryData = await getCategoryData(category);
  
  if (!categoryData) {
    notFound();
  }
  
  return (
    <>
      <Header />
      <div className="container bg-gray-50 dark:bg-gray-900 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">
            {formattedCategory}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Showing {categoryData.articles.length} articles in {formattedCategory}
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData.articles.map(article => {
            const readTime = article.readTime || Math.ceil((article.excerpt || '').length / 500) || 3;
            
            return (
              <div key={article.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 dark:border-gray-700 bg-white dark:bg-gray-800">
                <div className="relative h-48 w-full">
                  <Image 
                    src={article.image || '/images/placeholder.jpg'} 
                    alt={article.title} 
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-lg mb-2">
                    <Link href={`/story/${article.slug}`} className="hover:text-primary transition-colors duration-300">
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{article.date}</span>
                    <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      {readTime} min read
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {categoryData.articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No articles found in this category.
            </p>
          </div>
        )}
      </div>
    </>
  );
}