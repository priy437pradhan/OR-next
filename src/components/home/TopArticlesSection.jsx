'use client'

import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import FeaturedArticle from './FeaturedArticle';
import newsData from '../../data/news-data';

const TopArticlesSection = () => {
  const [articles, setArticles] = useState({
    leftSideArticles: [],
    rightSideArticles: [],
    featuredArticles: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use the imported data directly instead of fetching
    setArticles({
      leftSideArticles: newsData.leftSideArticles || [],
      rightSideArticles: newsData.rightSideArticles || [],
      featuredArticles: newsData.featuredArticles || []
    });
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p>Loading articles...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
          <span className="border-b-2 border-primary pb-2">Top Articles</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            {articles.leftSideArticles.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>

          <div className="lg:col-span-6 space-y-8">
            {articles.featuredArticles.map(article => (
              <FeaturedArticle key={article.id} {...article} />
            ))}
          </div>

          <div className="lg:col-span-3">
            {articles.rightSideArticles.map(article => (
              <ArticleCard key={article.id} {...article} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopArticlesSection;