import React from 'react';
import Header from '../components/layout/Header';
import TopArticlesSection from '../components/home/TopArticlesSection';

function HomePage() {
  return (
    <div className="OR-home-page">
      <Header />
      <main className="container dark:bg-gray-900">
        <TopArticlesSection />

        
      </main>
    </div>
  );
}

export default HomePage;