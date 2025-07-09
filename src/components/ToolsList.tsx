// components/ResourceList.tsx
import React from 'react'; // 确保导入 React
import { Link } from "@/lib/i18n";
import { ExternalLink, ArrowRightIcon } from 'lucide-react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge";

import { getDataList } from '@/lib/data';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// type toolProps = {
//   name: string;
//   description: string;
//   url: string;
//   tags: string[]
// }

type categoryProps = {
  name: string,
  src: string,
  description: string,
  link: string
}

type categoryListProps = {
  categories: categoryProps[]
}


type toolsListProps = {
  category: categoryProps,
  locale: string,
  showMoreLink?: boolean
}

type toolProps = {
  name: string,
  description: string,
  url: string,
  icon_url?: string,
  tags?: string[]
  
}





const ToolsList = ({ category, locale, showMoreLink = true }: toolsListProps) => {
  const t = useTranslations('toolsList');
  const srcList = getDataList(category.src, locale)

  return (
    <section className="relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight capitalize bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">{category.name}</h2>
        {showMoreLink && (
          <Link href={`/category/${category.link}`} className="group capitalize text-primary hover:text-primary/80 transition-all duration-300 hover:underline flex items-center gap-2">
            {t('more')} <span className='capitalize font-bold'>{category.name}</span> {t('tools')}
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* @ts-ignore */}
        {srcList.slice(0,8).map((resource: toolProps, index) => (
          <Card key={index} className='group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover-lift hover:bg-card/80 transition-all duration-300'>
            <CardHeader className="space-y-4">
              <a 
                href={`${resource.url}?utm_source=runtoweb3.com`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/link text-foreground hover:text-primary transition-all duration-300 flex items-start gap-3"
              >
                <div className='relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50 flex items-center justify-center group-hover/link:scale-110 transition-transform duration-300'>
                  { resource.icon_url ?
                    <Image width={24} height={24} src={resource.icon_url} alt={`${resource.name} favicon`} loading='lazy' className="rounded-lg"/>
                    :
                    <img width="24" height="24" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} loading='lazy' className="rounded-lg"/>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className='capitalize tracking-tight text-lg font-semibold group-hover/link:text-primary transition-colors duration-300 flex items-center gap-2'>
                    {resource.name}
                    <ExternalLink size={14} className='opacity-0 group-hover/link:opacity-100 transition-opacity duration-300' />
                  </CardTitle>
                </div>
              </a>
              <CardDescription className='space-y-4'>
                <p className='text-sm text-muted-foreground leading-relaxed line-clamp-3'>
                  {resource.description}
                </p>
                { resource.tags && resource.tags.length > 0 && (
                  <div className='flex flex-wrap gap-1.5'>
                    {resource.tags.slice(0,3).map((tag, i) => (
                      <Badge key={i} variant="secondary" className='text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border-0 hover:bg-primary/20 transition-colors'>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}     
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

const ToolsPage = ({ category, locale }: { category: categoryProps, locale: string }) => {
  const srcList = getDataList(category.src, locale);

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* @ts-ignore */}
        {srcList.map((resource: toolProps, index) => (
          <Card key={index} className='max-w-sm overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105'>
            <CardHeader>
              <a 
                href={`${resource.url}?utm_source=runtoweb3.com`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                <div className='border border-gray-200 p-1 rounded-md mr-1 bg-white'>
                  {/* <img width="20" height="20" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} /> */}
                  { resource.icon_url ?
                    <Image width={20} height={20} src={resource.icon_url}  alt={`${resource.name} favicon`} loading='lazy'/>
                    :
                    <img width="20" height="20" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} loading='lazy'/>
                  }
                </div>
                <CardTitle className='capitalize tracking-tighter'>{resource.name}</CardTitle>
                <ExternalLink size={16} className='ml-1' />
              </a>
              <CardDescription className='flex flex-col justify-between '>
                <div className='h-[60px] line-clamp-3 mt-1 tracking-tight text-start'>
                  {resource.description}
                </div>
                { resource.tags ? 
                  <div className='mt-3'>
                  {resource.tags.slice(0,3).map((tag, i) => (
                    <Badge key={i} variant="secondary" className='text-xs pb-1 mr-1 mt-2 tracking-tighter'>{tag}</Badge>
                  ))}
                </div> :
                 null
                }     
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

type searchPageProps = {
  searchData: toolProps[]
}

const SearchPage = ({ searchData }: searchPageProps) => {

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {/* @ts-ignore */}
        {searchData.map((resource: toolProps, index) => (
          <Card key={index} className='max-w-sm overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105'>
            <CardHeader>
              <a 
                href={`${resource.url}?utm_source=runtoweb3.com`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                <div className='border border-gray-200 p-1 rounded-md mr-1 bg-white'>
                  {/* <img width="20" height="20" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} /> */}
                  { resource.icon_url ?
                    <Image width={20} height={20} src={resource.icon_url}  alt={`${resource.name} favicon`} loading='lazy'/>
                    :
                    <img width="20" height="20" src={`https://favicon.im/${resource.url}?larger=true`} alt={`${resource.name} favicon`} loading='lazy'/>
                  }
                </div>
                <CardTitle className='capitalize tracking-tighter'>{resource.name}</CardTitle>
                <ExternalLink size={16} className='ml-1' />
              </a>
              <CardDescription className='flex flex-col justify-between '>
                <div className='h-[60px] line-clamp-3 mt-1 tracking-tight text-start'>
                  {resource.description}
                </div>
                { resource.tags ? 
                  <div className='mt-3'>
                  {resource.tags.slice(0,3).map((tag, i) => (
                    <Badge key={i} variant="secondary" className='text-xs pb-1 mr-1 mt-2 tracking-tighter'>{tag}</Badge>
                  ))}
                </div> :
                 null
                }     
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}


const CategoryList = ({ categories }: categoryListProps) => {

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* @ts-ignore */}
        {categories.map((category: categoryProps, index) => (
          <Card key={index} className='max-w-sm overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105'>
            <CardHeader>
              <a 
                href={`/category/${category.link}`}
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center gap-1"
              >
                <CardTitle className='capitalize'>{category.name}</CardTitle>
                <ArrowRightIcon size={16} className='ml-2'/>
              </a>
              <CardDescription className='flex flex-col justify-between'>
                <div className='h-[40px] line-clamp-2 mt-4 tracking-tight text-start'>
                {category.description}
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  )
}

export { ToolsList, ToolsPage, CategoryList, SearchPage };