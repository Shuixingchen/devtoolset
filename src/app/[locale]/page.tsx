// pages/index.js
import React, { Suspense } from 'react'; // 确保导入 React
import { getSortedPostsData } from '@/lib/posts'
import { getCategories } from '@/lib/data';

import { ToolsList } from '@/components/ToolsList';
import { ArticleList } from '@/components/ArticleList'

import { Search } from '@/components/Search';
import {getTranslations, getLocale} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}


type categoryType = { 
  name: string; 
  src: string; 
  description: string;
  link: string; 
}


export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations('home');
  // categories data
  const categories = getCategories(locale);
  console.log('categories: ', categories)

  const allPostsData = getSortedPostsData().slice(0, 6)
  
  // deployment

  return (
    <div className="relative">
      {/* Hero section with gradient background */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 web3-gradient dark:web3-gradient-dark opacity-10"></div>
        <div className="container mx-auto py-24 relative z-10">
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            <h1 className="mx-auto max-w-4xl text-4xl font-bold lg:text-8xl tracking-tighter bg-gradient-to-r from-primary via-purple-600 to-blue-600 bg-clip-text text-transparent">
              <span className="inline-block">runtoweb3</span>
            </h1>
            <h2 className="text-xl tracking-tight sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground max-w-3xl">{t("h2")}</h2>
            <p className="mx-auto max-w-[800px] text-lg md:text-xl tracking-tight text-muted-foreground leading-relaxed">
              {t("description")}
            </p>
            <div className='w-full px-2 pt-8 lg:w-1/2'>
              <Search className="w-full max-w-2xl mx-auto" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Tools sections */}
      <div className="container mx-auto py-16 space-y-20">
      
        {categories.map((category: categoryType, index: React.Key | null | undefined) => (
          <ToolsList key={index} category={category} locale={locale} />
        ))}
        
        {/* Articles section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-3xl"></div>
          <div className="relative z-10 p-8 md:p-12">
            <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>}>
              <ArticleList articles={allPostsData} />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  )
}