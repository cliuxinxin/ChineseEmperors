# 最终部署指南

## 问题诊断

根据错误信息：
```
ChineseEmperors/:12 GET https://cliuxinxin.github.io/src/main.tsx net::ERR_ABORTED 404 (Not Found)
```

这表明 GitHub Pages 没有正确提供 `index.html` 文件，而是直接显示了目录列表。

## 解决方案

### 方法一：使用 gh-pages 分支（推荐）

我已经修改了 GitHub Actions 工作流，使用 `peaceiris/actions-gh-pages` 这个更可靠的部署方法。

#### 部署步骤：

1. **提交代码**
   ```bash
   git add .
   git commit -m "使用gh-pages分支部署"
   git push origin main
   ```

2. **设置 GitHub Pages**
   - 进入 GitHub 仓库页面
   - 点击 "Settings" 标签
   - 在左侧菜单中找到 "Pages"
   - 在 "Source" 部分选择 "Deploy from a branch"
   - 选择分支：`gh-pages`
   - 选择文件夹：`/(root)`
   - 点击 "Save"

3. **等待部署**
   - 进入 "Actions" 标签
   - 查看 "Deploy to GitHub Pages" 工作流状态
   - 等待部署完成（约 2-5 分钟）

4. **访问网站**
   - `https://cliuxinxin.github.io/ChineseEmperors/`

### 方法二：手动部署（备选）

如果自动部署仍然有问题，可以手动部署：

1. **构建项目**
   ```bash
   npm run build
   ```

2. **创建 gh-pages 分支**
   ```bash
   # 切换到构建目录
   cd dist

   # 初始化 git
   git init
   git add .
   git commit -m "Deploy to GitHub Pages"

   # 推送到 gh-pages 分支
   git branch -M main
   git push -f git@github.com:cliuxinxin/ChineseEmperors.git main:gh-pages
   ```

3. **设置 GitHub Pages**（同方法一）

## 当前配置状态

### ✅ 已修复的问题

1. **Vite 配置**
   - 使用 `base: '/'` 简化路径
   - 生产环境和开发环境使用相同配置

2. **路由配置**
   - 使用 `HashRouter` 替代 `BrowserRouter`
   - 兼容 GitHub Pages 的路由限制

3. **数据加载**
   - 使用相对路径 `/data/emperors.json`
   - 确保在 GitHub Pages 上正确加载

4. **GitHub Actions**
   - 使用 `peaceiris/actions-gh-pages` 部署
   - 部署到 `gh-pages` 分支

### 🌐 网站地址

部署成功后，网站地址为：
`https://cliuxinxin.github.io/ChineseEmperors/`

## 验证部署

部署完成后，请验证：

1. **首页加载**
   - 访问网站首页
   - 确认标题和搜索框正常显示

2. **搜索功能**
   - 输入年龄：51、49、81、68
   - 确认搜索结果正确显示

3. **详情页面**
   - 点击皇帝卡片
   - 确认详情页面正常加载
   - URL 应该包含 `#` 符号

4. **控制台检查**
   - 按 F12 打开开发者工具
   - 查看 Console 标签
   - 确认没有 404 错误

## 故障排除

### 如果仍然显示空白页面

1. **清除浏览器缓存**
   - 按 Ctrl+Shift+R（Windows）或 Cmd+Shift+R（Mac）强制刷新

2. **检查 GitHub Actions 日志**
   - 进入 "Actions" 标签
   - 查看最新的工作流运行
   - 检查是否有构建错误

3. **检查 GitHub Pages 设置**
   - 确认源分支设置为 `gh-pages`
   - 确认文件夹设置为 `/(root)`

4. **手动访问资源**
   - 尝试访问：`https://cliuxinxin.github.io/ChineseEmperors/assets/index-c6f46775.js`
   - 如果返回 404，说明部署有问题

### 如果数据不显示

1. **检查数据文件**
   - 访问：`https://cliuxinxin.github.io/ChineseEmperors/data/emperors.json`
   - 确认 JSON 文件可以正常访问

2. **检查控制台错误**
   - 查看是否有数据加载错误

## 技术支持

如果以上方法都无法解决问题，请：

1. 在 GitHub 仓库创建 Issue
2. 提供完整的错误信息
3. 提供 GitHub Actions 构建日志
4. 提供浏览器控制台截图

---

**重要提醒：** 部署完成后，请等待 5-10 分钟让 GitHub Pages 完全生效。