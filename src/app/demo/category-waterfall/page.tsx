import CategoryWaterfall from '@/components/layout/CategoryWaterfall';
import { Link, Category } from '@/types';

// 模拟数据 - 用于演示组件效果
const mockLinks: Link[] = [
  {
    id: '1',
    name: '瓜子影视',
    desc: '追剧、体育、综艺资源聚合',
    url: 'https://example.com',
    category1: '影视',
    category2: '在线看',
    iconfile: '',
    iconlink: '',
    tags: ['iOS', 'Android', 'Web'],
    created: new Date().toISOString(),
  },
  {
    id: '2',
    name: '电影天堂',
    desc: '安卓、iOS双端支持的影视App',
    url: 'https://example.com',
    category1: '影视',
    category2: '在线看',
    iconfile: '',
    iconlink: '',
    tags: ['iOS', 'Android'],
    created: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'No视频',
    desc: '主打海外影视资源，无广告',
    url: 'https://example.com',
    category1: '影视',
    category2: '在线看',
    iconfile: '',
    iconlink: '',
    tags: ['Web'],
    created: new Date().toISOString(),
  },
  {
    id: '4',
    name: '注视影视',
    desc: '海外影视剧、电影资源站',
    url: 'https://example.com',
    category1: '影视',
    category2: '在线看',
    iconfile: '',
    iconlink: '',
    tags: ['iOS', 'Android', 'Web', 'TV'],
    created: new Date().toISOString(),
  },
  {
    id: '5',
    name: '剧OK',
    desc: '可观看全网影视资源，支持倍速',
    url: 'https://example.com',
    category1: '影视',
    category2: '在线看',
    iconfile: '',
    iconlink: '',
    tags: ['Web'],
    created: new Date().toISOString(),
  },
  {
    id: '6',
    name: '真狼影视',
    desc: '免费观看全网影视剧集',
    url: 'https://example.com',
    category1: '影视',
    category2: '在线看',
    iconfile: '',
    iconlink: '',
    tags: ['Android'],
    created: new Date().toISOString(),
  },
  {
    id: '7',
    name: '西瓜影院',
    desc: '可免费在线观看各类影视',
    url: 'https://example.com',
    category1: '影视',
    category2: '在线看',
    iconfile: '',
    iconlink: '',
    tags: ['Web'],
    created: new Date().toISOString(),
  },
  {
    id: '8',
    name: '雪落影视',
    desc: '原修罗影视（高清资源）',
    url: 'https://example.com',
    category1: '影视',
    category2: '在线看',
    iconfile: '',
    iconlink: '',
    tags: ['iOS', 'Android'],
    created: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'LIBVIO',
    desc: '以海外影视资源为主的聚合站',
    url: 'https://example.com',
    category1: '影视',
    category2: '下载',
    iconfile: '',
    iconlink: '',
    tags: ['Web'],
    created: new Date().toISOString(),
  },
  {
    id: '10',
    name: '厂长资源',
    desc: '高清、秒播不卡顿',
    url: 'https://example.com',
    category1: '影视',
    category2: '下载',
    iconfile: '',
    iconlink: '',
    tags: ['Web'],
    created: new Date().toISOString(),
  },
  {
    id: '11',
    name: '爱壹帆',
    desc: '面向海外华人的影视平台',
    url: 'https://example.com',
    category1: '影视',
    category2: '下载',
    iconfile: '',
    iconlink: '',
    tags: ['iOS', 'Android', 'Windows'],
    created: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'VIP视频解析',
    desc: '免VIP会员观看各大平台',
    url: 'https://example.com',
    category1: '影视',
    category2: '下载',
    iconfile: '',
    iconlink: '',
    tags: ['Web'],
    created: new Date().toISOString(),
  },
  // 音乐分类
  {
    id: '13',
    name: '洛雪音乐',
    desc: '全平台无损音乐下载工具',
    url: 'https://example.com',
    category1: '音乐',
    category2: '下载工具',
    iconfile: '',
    iconlink: '',
    tags: ['Windows', 'Mac', 'Linux'],
    created: new Date().toISOString(),
  },
  {
    id: '14',
    name: 'Listen1',
    desc: '聚合多平台音乐的播放器',
    url: 'https://example.com',
    category1: '音乐',
    category2: '下载工具',
    iconfile: '',
    iconlink: '',
    tags: ['Windows', 'Mac', 'Web'],
    created: new Date().toISOString(),
  },
  {
    id: '15',
    name: 'YesPlayMusic',
    desc: '高颜值的网易云第三方客户端',
    url: 'https://example.com',
    category1: '音乐',
    category2: '播放器',
    iconfile: '',
    iconlink: '',
    tags: ['Windows', 'Mac', 'Linux'],
    created: new Date().toISOString(),
  },
];

const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: '影视',
    iconName: 'Film',
    order: 1,
    enabled: true,
  },
  {
    id: 'cat-2',
    name: '音乐',
    iconName: 'Music',
    order: 2,
    enabled: true,
  },
];

export default function CategoryWaterfallDemo() {
  const enabledCategories = new Set(mockCategories.map(c => c.name));

  return (
    <main className="min-h-screen bg-background">
      {/* 页面标题 */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            分类瀑布流演示
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            参考「硬核指南」的高密度卡片式布局
          </p>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="container max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <CategoryWaterfall
          links={mockLinks}
          categories={mockCategories}
          enabledCategories={enabledCategories}
        />
      </div>
    </main>
  );
}
