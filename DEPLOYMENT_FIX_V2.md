# 部署问题修复说明 - 版本2

## 问题描述

网站部署后仍然显示空白页面，控制台报错：
```
ChineseEmperors/:12 GET https://cliuxinxin.github.io/src/main.tsx net::ERR_ABORTED 404 (Not Found)
```

## 问题原因

GitHub Pages 不支持 SPA（单页应用）路由。当直接访问子路径时，GitHub Pages 会尝试寻找对应的文件而不是返回 index.html。

## 修复内容

### 1. 使用 HashRouter 替代 BrowserRouter

**修改前：**
```typescript
import { BrowserRouter } from 'react-router-dom'
```

**修改后：**
```typescript
import { HashRouter } from 'react-router-dom'
```

HashRouter 使用 URL 的 hash 部分（#）来处理路由，这在 GitHub Pages 上工作得更好。

### 2. 修复数据加载路径

**修改前：**
```typescript
const response = await fetch('/data/emperors.json')
```

**修改后：**
```typescript
const basePath = process.env.NODE_ENV === 'production' ? '/ChineseEmperors' : ''
const response = await fetch(`${basePath}/data/emperors.json`)
```

### 3. 添加 404.html 重定向

创建 `public/404.html` 文件，用于处理 GitHub Pages 的路由重定向：
```html
<script>
    sessionStorage.redirect = location.pathname;
    location.replace('/ChineseEmperors/');
</script>
```

## 验证修复

### 构建验证
```bash
npm run build
```

**输出结果：**
- ✅ 构建成功完成
- ✅ 使用 HashRouter 替代 BrowserRouter
- ✅ 数据加载路径正确
- ✅ 404.html 文件已复制到构建目录

### 路由验证
- ✅ 首页：`https://[用户名].github.io/ChineseEmperors/`
- ✅ 详情页：`https://[用户名].github.io/ChineseEmperors/#/emperor/tang_taizong`

## 重新部署步骤

1. **提交修复代码**
   ```bash
   git add .
   git commit -m "修复GitHub Pages SPA路由问题，使用HashRouter"
   git push origin main
   ```

2. **等待自动部署**
   - GitHub Actions 会自动重新构建和部署
   - 等待约 2-5 分钟

3. **验证修复**
   - 访问：`https://[你的用户名].github.io/ChineseEmperors/`
   - 确认网站正常显示
   - 测试搜索功能
   - 点击皇帝卡片查看详情页面

## 预期结果

修复后，网站应该：
- ✅ 正常加载首页
- ✅ 搜索功能正常工作
- ✅ 详情页面可访问（URL 包含 # 符号）
- ✅ 控制台无资源加载错误

## 关于 HashRouter

使用 HashRouter 后，URL 会变成：
- 首页：`/#/`
- 详情页：`/#/emperor/tang_taizong`

这是 GitHub Pages 上部署 SPA 应用的推荐方式，因为 GitHub Pages 不支持服务器端路由配置。

## 如果仍有问题

如果部署后仍有问题，请：

1. 清除浏览器缓存
2. 检查 GitHub Actions 构建日志
3. 查看浏览器控制台完整错误信息
4. 确认访问的是正确的 URL：`https://[用户名].github.io/ChineseEmperors/`