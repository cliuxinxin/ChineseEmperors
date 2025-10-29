# 中国皇帝年龄查询网站 - 部署教程

## 项目概述

这是一个基于 Vite + React + TypeScript 构建的中国皇帝年龄查询网站，可以按死亡年龄查询历代皇帝及其成就时间轴。

## 部署前准备

### 1. 确保项目可正常构建

在部署前，请确保项目可以正常构建：

```bash
# 安装依赖
npm install

# 测试构建
npm run build

# 运行本地开发服务器测试
npm run dev
```

### 2. 检查 GitHub 仓库设置

1. 确保你的仓库是公开的（GitHub Pages 需要公开仓库）
2. 确认仓库名称为 `ChineseEmperors`（重要！因为构建配置基于此名称）

## 部署到 GitHub Pages

### 方法一：自动部署（推荐）

项目已经配置了 GitHub Actions，会自动部署到 GitHub Pages。

#### 步骤：

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "完成中国皇帝年龄查询网站开发"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入 GitHub 仓库页面
   - 点击 "Settings" 标签
   - 在左侧菜单中找到 "Pages"
   - 在 "Source" 部分选择 "GitHub Actions"
   - 保存设置

3. **查看部署状态**
   - 进入仓库的 "Actions" 标签
   - 查看 "Deploy to GitHub Pages" 工作流状态
   - 等待部署完成（通常需要 2-5 分钟）

4. **访问网站**
   - 部署完成后，网站地址为：
     `https://[你的GitHub用户名].github.io/ChineseEmperors/`

### 方法二：手动部署

如果需要手动部署，可以按照以下步骤：

1. **构建项目**
   ```bash
   npm run build
   ```

2. **启用 GitHub Pages**
   - 在仓库 Settings → Pages 中
   - 选择 "Deploy from a branch"
   - 选择分支：`gh-pages`（如果没有，先创建）
   - 选择文件夹：`/(root)`

3. **创建 gh-pages 分支**
   ```bash
   # 切换到构建输出目录
   cd dist

   # 初始化 git（如果还没有）
   git init
   git add .
   git commit -m "Deploy to GitHub Pages"

   # 创建并推送到 gh-pages 分支
   git branch -M main
   git push -f git@github.com:[你的用户名]/ChineseEmperors.git main:gh-pages
   ```

## 部署后验证

部署完成后，请验证以下功能：

1. **首页加载**
   - 访问网站首页
   - 确认标题和搜索框正常显示

2. **搜索功能**
   - 输入年龄（如：51、49、81、68）
   - 确认搜索结果正确显示

3. **详情页面**
   - 点击皇帝卡片
   - 确认详情页面正常加载
   - 检查成就时间轴显示

4. **分享功能**
   - 在详情页面点击"分享链接"
   - 确认链接可以复制和分享

5. **响应式设计**
   - 在手机和不同屏幕尺寸上测试
   - 确认布局自适应

## 常见问题解决

### 1. 页面显示 404
- 检查仓库名称是否为 `ChineseEmperors`
- 确认 `vite.config.ts` 中的 `base` 配置正确
- 确保 GitHub Pages 源设置为正确的分支

### 2. 数据加载失败
- 确认 `data/emperors.json` 文件存在
- 检查浏览器控制台是否有错误信息
- 验证 JSON 文件格式正确

### 3. 样式显示异常
- 清除浏览器缓存
- 确认 CSS 文件正确加载
- 检查网络请求状态

### 4. 路由问题
- 确保使用 HashRouter（如果需要）
- 检查 GitHub Pages 的 SPA 支持

## 更新网站内容

### 添加新的皇帝数据

1. 编辑 `data/emperors.json` 文件
2. 按照现有格式添加新的皇帝数据
3. 提交更改并推送到 GitHub
4. GitHub Actions 会自动重新部署

### 修改样式或功能

1. 修改对应的组件文件
2. 本地测试：`npm run dev`
3. 构建测试：`npm run build`
4. 提交并推送更改

## 性能优化建议

1. **图片优化**
   - 如有皇帝画像，使用 WebP 格式
   - 实现懒加载

2. **代码分割**
   - 考虑使用 React.lazy 进行路由级代码分割

3. **缓存策略**
   - 利用 Service Worker 实现离线缓存

## 监控和分析

建议添加：

1. **Google Analytics** - 用户行为分析
2. **Sentry** - 错误监控
3. **Lighthouse** - 性能监控

## 联系方式

如有部署问题，请：
1. 检查 GitHub Actions 日志
2. 查看浏览器控制台错误
3. 创建 GitHub Issue 描述问题

---

**部署成功后的网站地址：**
`https://[你的GitHub用户名].github.io/ChineseEmperors/`

祝部署顺利！🚀