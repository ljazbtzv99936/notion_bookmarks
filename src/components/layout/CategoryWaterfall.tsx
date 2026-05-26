'use client';

import React, { useMemo, memo } from 'react';
import ResourceCard from '@/components/ui/ResourceCard';
import * as Icons from 'lucide-react';
import { Link, Category } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryWaterfallProps {
  links: Link[];
  categories: Category[];
  enabledCategories: Set<string>;
  /** 当前选中的二级分类，用于过滤显示 */
  activeSubCategory?: string;
  className?: string;
}

/**
 * 分类瀑布流组件
 * 
 * 按照一级分类和二级分类组织资源卡片，采用响应式网格布局。
 * 移动端优先设计，支持从单列到多列的自适应。
 */
const CategoryWaterfall = memo(function CategoryWaterfall({
  links,
  categories,
  enabledCategories,
  activeSubCategory,
  className,
}: CategoryWaterfallProps) {
  // 按一级和二级分类组织链接
  const linksByCategory = useMemo(() => {
    return links.reduce((acc, link) => {
      const cat1 = link.category1;
      const cat2 = link.category2;

      if (enabledCategories.has(cat1)) {
        if (!acc[cat1]) {
          acc[cat1] = {};
        }
        if (!acc[cat1][cat2]) {
          acc[cat1][cat2] = [];
        }
        acc[cat1][cat2].push(link);
      }
      return acc;
    }, {} as Record<string, Record<string, Link[]>>);
  }, [links, enabledCategories]);

  // 获取有效的分类列表（排除没有链接的分类）
  const validCategories = useMemo(() => {
    return categories.filter(cat => linksByCategory[cat.name]);
  }, [categories, linksByCategory]);

  if (validCategories.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        <p>暂无资源</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-10 sm:space-y-16', className)}>
      {validCategories.map((category) => {
        const categoryLinks = linksByCategory[category.name];
        if (!categoryLinks) return null;

        // 如果指定了二级分类筛选，只显示匹配的
        const subCategoriesToShow = activeSubCategory
          ? Object.entries(categoryLinks).filter(([subCat]) => subCat === activeSubCategory)
          : Object.entries(categoryLinks);

        if (subCategoriesToShow.length === 0) return null;

        return (
          <section 
            key={category.id} 
            id={category.id} 
            className="space-y-6 sm:space-y-8"
          >
            {/* 一级分类标题 */}
            <div className="flex items-center gap-2 sm:gap-3 pb-2 border-b border-border/50">
              {category.iconName && Icons[category.iconName as keyof typeof Icons] && (
                <div className="w-6 h-6 sm:w-7 sm:h-7 p-1 sm:p-1.5 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  {React.createElement(
                    Icons[category.iconName as keyof typeof Icons] as React.ComponentType<{ className: string }>,
                    { className: 'w-4 h-4 sm:w-5 sm:h-5' }
                  )}
                </div>
              )}
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                {category.name}
              </h2>
            </div>

            {/* 二级分类及其资源 */}
            <div className="space-y-8 sm:space-y-12">
              {subCategoriesToShow.map(([subCategory, subLinks]) => (
                <div
                  key={`${category.id}-${subCategory.toLowerCase().replace(/\s+/g, '-')}`}
                  id={`${category.id}-${subCategory.toLowerCase().replace(/\s+/g, '-')}`}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* 二级分类标题 */}
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-primary" />
                    <h3 className="text-base sm:text-lg font-medium text-foreground/90">
                      {subCategory}
                    </h3>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      ({subLinks.length})
                    </span>
                  </div>

                  {/* 资源卡片网格 - 移动端优先的响应式布局 */}
                  <div className={cn(
                    'grid gap-3',
                    // 移动端：1列
                    'grid-cols-1',
                    // 小屏幕：2列
                    'sm:grid-cols-2',
                    // 中等屏幕：3列
                    'md:grid-cols-3',
                    // 大屏幕：4列（参考截图的布局）
                    'lg:grid-cols-4',
                    // 超大屏幕：5列
                    'xl:grid-cols-5'
                  )}>
                    {subLinks.map((link) => (
                      <ResourceCard key={link.id} link={link} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
});

export default CategoryWaterfall;
