# 中国皇帝年龄查询

一个展示中国历代皇帝在不同年龄成就的网站。

## 功能特性

- 🔍 按年龄查询在该年龄去世的皇帝
- 📊 每位皇帝的成就时间轴
- 📱 响应式设计，支持移动端和桌面端
- 🔗 可分享的皇帝详情页面
- 📚 数据来源引用

## 技术栈

- **前端**: Vite + React + TypeScript
- **部署**: GitHub Pages
- **构建**: GitHub Actions
- **数据**: JSON 格式存储

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 数据格式

数据存储在 `/data` 目录下，采用 JSON 格式。每个皇帝包含以下字段：

- `id`: 唯一标识符
- `name`: 姓名
- `temple_name`: 庙号
- `dynasty`: 朝代
- `birth_date`: 出生日期 (YYYY-MM-DD)
- `death_date`: 死亡日期 (YYYY-MM-DD)
- `death_age`: 死亡年龄
- `achievements`: 成就列表（包含年龄和事件）
- `summary`: 生平概述
- `sources`: 数据来源

## 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages。主分支的每次推送都会触发自动构建和部署。

## 贡献

欢迎通过 Pull Request 添加或修改皇帝数据。所有数据变更都会经过自动验证。