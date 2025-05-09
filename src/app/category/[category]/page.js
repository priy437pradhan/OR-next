// app/category/[category]/page.js
import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../../../components/layout/Header';

import { BASE_URL } from '../../../../src/utils/config';

async function getCategoryData(category) {
  try {
    const apiCategory = category.toLowerCase().replace(/-/g, '');
    
    const response = await fetch(BASE_URL(`categories/${apiCategory}`), { 
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      console.error(`Error response from API: ${response.status}`);
      return null;
    }
    
    return await response.json();
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
    <div className="container">
      
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{formattedCategory}</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Showing {categoryData.articles.length} articles in {formattedCategory}
        </p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.articles.map(article => (
          <div key={article.id} className="border rounded-lg overflow-hidden shadow-sm dark:border-gray-700">
            <div className="relative h-48 w-full">
              <Image 
                src={article.image} 
                alt={article.title} 
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 hover:text-primary">
                <Link href={`/story/${article.slug}`}>{article.title}</Link>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                {article.excerpt}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">{article.date}</span>
                <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {article.readTime} min read
                </span>
              </div>
            </div>
          </div>
        ))}
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