// src/app/api/categories/[category]/route.js
import { NextResponse } from 'next/server';
import newsData from '../../../../data/news-data';

export async function GET(request, { params }) {
  const { category } = params;
  
  const categoryLower = category.toLowerCase();
  
  const allArticles = [
    ...newsData.leftSideArticles,
    ...newsData.featuredArticles,
    ...newsData.rightSideArticles
  ];
  
  const categoryArticles = allArticles.filter(article => 
    article.category.toLowerCase().replace(/\s+/g, '') === categoryLower
  );
  
  const articlesWithReadTime = categoryArticles.map(article => ({
    ...article,
    readTime: article.readTime || Math.ceil(article.excerpt.length / 500) || 3
  }));
  
  if (articlesWithReadTime.length === 0) {
    return NextResponse.json(
      { message: `No articles found for category: ${category}` },
      { status: 404 }
    );
  }
  
  return NextResponse.json({
    category: category,
    articles: articlesWithReadTime
  });
}