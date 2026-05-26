'use client';

import { Link } from '@/types';
import { motion } from 'framer-motion';
import React, { useState, useEffect, memo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { 
  FaApple, 
  FaAndroid, 
  FaWindows, 
  FaDesktop, 
  FaGlobe,
  FaLinux,
  FaTv
} from 'react-icons/fa';

interface ResourceCardProps {
  link: Link;
  className?: string;
}

// 平台图标映射
const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'iOS': FaApple,
  'ios': FaApple,
  'iPhone': FaApple,
  'iphone': FaApple,
  'Mac': FaApple,
  'mac': FaApple,
  'macOS': FaApple,
  'macos': FaApple,
  'Android': FaAndroid,
  'android': FaAndroid,
  'Windows': FaWindows,
  'windows': FaWindows,
  'PC': FaDesktop,
  'pc': FaDesktop,
  'Web': FaGlobe,
  'web': FaGlobe,
  '网页': FaGlobe,
  'Linux': FaLinux,
  'linux': FaLinux,
  'TV': FaTv,
  'tv': FaTv,
};

// 获取图标URL的辅助函数
function getIconUrl(link: Link): string {
  if (link.iconfile) return link.iconfile;
  if (link.iconlink) return link.iconlink;
  return '/globe.svg';
}

// 首字母兜底组件
const FallbackIcon = memo(function FallbackIcon({ name }: { name: string }) {
  const initial = name.charAt(0).toUpperCase();
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-indigo-500',
    'bg-red-500',
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  
  return (
    <div className={cn(
      'w-full h-full rounded-xl flex items-center justify-center text-white font-bold text-lg',
      colors[colorIndex]
    )}>
      {initial}
    </div>
  );
});

// 图标组件
const ResourceIcon = memo(function ResourceIcon({ 
  src, 
  name,
  onError 
}: { 
  src: string; 
  name: string;
  onError: () => void;
}) {
  return (
    <img
      src={src}
      alt={name}
      className="w-full h-full object-contain rounded-xl"
      onError={onError}
      loading="lazy"
      decoding="async"
    />
  );
});

// 平台标签组件
const PlatformTags = memo(function PlatformTags({ tags }: { tags: string[] }) {
  const platformTags = tags.filter(tag => platformIcons[tag]);
  
  if (platformTags.length === 0) return null;
  
  return (
    <div className="absolute top-2 right-2 flex items-center gap-0.5">
      {platformTags.slice(0, 4).map((tag) => {
        const IconComponent = platformIcons[tag];
        return (
          <span
            key={tag}
            className="text-muted-foreground/60 hover:text-muted-foreground transition-colors"
            title={tag}
          >
            <IconComponent className="w-3 h-3" />
          </span>
        );
      })}
    </div>
  );
});

const ResourceCard = memo(function ResourceCard({ link, className }: ResourceCardProps) {
  const [imageSrc, setImageSrc] = useState(getIconUrl(link));
  const [imageError, setImageError] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  // 当 link 变化时重置状态
  useEffect(() => {
    setImageSrc(getIconUrl(link));
    setImageError(false);
  }, [link]);

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        // 基础样式
        'group relative block rounded-xl border bg-card',
        // 移动端优先 - 紧凑的 padding
        'p-3',
        // 中等屏幕及以上 - 稍大的 padding
        'sm:p-4',
        // 边框和阴影
        'border-border/40 hover:border-primary/30',
        'shadow-sm hover:shadow-md hover:shadow-primary/5',
        // 过渡动画
        'transition-all duration-200',
        className
      )}
    >
      {/* 平台标签 - 右上角 */}
      {link.tags && link.tags.length > 0 && (
        <PlatformTags tags={link.tags} />
      )}

      {/* 内容容器 */}
      <div className="flex items-start gap-3">
        {/* 图标容器 */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl overflow-hidden bg-muted/30">
          {imageError ? (
            <FallbackIcon name={link.name} />
          ) : (
            <ResourceIcon 
              src={imageSrc} 
              name={link.name}
              onError={handleImageError}
            />
          )}
        </div>
        
        {/* 文本内容 */}
        <div className="flex-1 min-w-0 pt-0.5">
          {/* 资源名称 */}
          <h3 className={cn(
            'font-medium text-foreground truncate',
            'text-sm sm:text-base',
            'group-hover:text-primary transition-colors',
            // 为平台标签留出空间
            link.tags && link.tags.some(t => platformIcons[t]) ? 'pr-12 sm:pr-14' : ''
          )}>
            {link.name}
          </h3>
          
          {/* 一句话描述 */}
          {link.desc && (
            <p className={cn(
              'text-muted-foreground truncate mt-1',
              'text-xs sm:text-sm',
              'group-hover:text-muted-foreground/80 transition-colors'
            )}>
              {link.desc}
            </p>
          )}
        </div>
      </div>

      {/* 悬浮渐变效果 */}
      <div className={cn(
        'absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-100',
        'bg-gradient-to-br from-primary/5 via-transparent to-transparent',
        'transition-opacity duration-300'
      )} />
    </motion.a>
  );
}, (prev, next) => {
  return (
    prev.link.id === next.link.id &&
    prev.link.name === next.link.name &&
    prev.link.desc === next.link.desc &&
    prev.link.url === next.link.url &&
    prev.link.iconfile === next.link.iconfile &&
    prev.link.iconlink === next.link.iconlink &&
    prev.className === next.className &&
    JSON.stringify(prev.link.tags) === JSON.stringify(next.link.tags)
  );
});

export default ResourceCard;
