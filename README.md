# 中国皇帝年龄查询系统

一个基于React和TypeScript开发的网站，用于查询中国皇帝的生卒年份和主要成就。

## 功能特点

- 🏛️ **年龄查询**: 输入年龄，查看在该年龄去世的中国皇帝
- 📜 **详细信息**: 每位皇帝的生平概述、成就时间轴
- 🔗 **分享功能**: 支持分享皇帝详情页面
- 📱 **响应式设计**: 适配移动端和桌面端
- ✅ **数据验证**: 自动验证皇帝数据的完整性和准确性

## 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **路由**: React Router DOM v6
- **部署**: GitHub Pages + GitHub Actions
- **数据格式**: JSON

## 项目结构

```
├── data/
│   └── emperors.json          # 皇帝数据文件
├── src/
│   ├── components/            # React组件
│   │   ├── AgeInput.tsx      # 年龄输入组件
│   │   ├── EmperorCard.tsx   # 皇帝卡片组件
│   │   ├── AchievementTimeline.tsx  # 成就时间轴组件
│   │   └── ShareButton.tsx   # 分享按钮组件
│   ├── pages/                # 页面组件
│   │   ├── HomePage.tsx      # 首页
│   │   └── EmperorDetailPage.tsx  # 皇帝详情页
│   ├── hooks/                # 自定义Hooks
│   │   └── useEmperors.ts    # 数据获取Hook
│   ├── utils/                # 工具函数
│   │   ├── dateUtils.ts      # 日期工具函数
│   │   └── dataUtils.ts      # 数据处理工具
│   └── types/                # TypeScript类型定义
│       └── emperor.ts        # 皇帝数据类型
├── scripts/
│   └── validateData.js       # 数据验证脚本
└── .github/workflows/
    └── deploy.yml            # GitHub Actions部署配置
```

## 数据结构

每位皇帝包含以下信息：

```json
{
  "id": "tang_taizong",
  "name": "李世民",
  "temple_name": "唐太宗",
  "dynasty": "唐",
  "birth_date": "598-01-23",
  "death_date": "649-07-10",
  "death_age": 51,
  "achievements": [
    {"age": 20, "event": "参与玄武门之变，夺取政权"},
    {"age": 27, "event": "即位为唐太宗"}
  ],
  "summary": "唐太宗李世民，唐朝第二位皇帝...",
  "sources": [
    {"title": "旧唐书·太宗本纪", "url": null}
  ]
}
```

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000/ChineseEmperors/

### 构建项目

```bash
npm run build
```

### 验证数据

```bash
npm run validate-data
```

## 数据更新

1. 编辑 `data/emperors.json` 文件
2. 运行数据验证脚本确保格式正确
3. 提交更改并创建Pull Request
4. GitHub Actions会自动部署更新

## 部署

项目使用GitHub Actions自动部署到GitHub Pages。当推送到main分支时，会自动触发部署流程。

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

ISC License

## 数据来源

- 《二十四史》
- 《资治通鉴》
- 维基百科等公开资料

## 联系方式

如有问题或建议，请在GitHub Issues中提交。