# 快速部署指南

## 🚀 3步完成部署

### 第1步：推送代码到 GitHub

```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "完成中国皇帝年龄查询网站开发"

# 推送到 GitHub
git push origin main
```

### 第2步：启用 GitHub Pages

1. 打开你的 GitHub 仓库页面
2. 点击顶部 "Settings" 标签
3. 在左侧菜单中找到 "Pages"
4. 在 "Source" 部分选择 "GitHub Actions"
5. 保存设置

### 第3步：等待自动部署

1. 点击顶部 "Actions" 标签
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待约 2-5 分钟完成部署
4. 访问你的网站：

   `https://[你的GitHub用户名].github.io/ChineseEmperors/`

## ✅ 部署验证清单

- [ ] 首页正常加载
- [ ] 搜索功能可用（测试年龄：51、49、81、68）
- [ ] 详情页面可访问
- [ ] 分享链接功能正常
- [ ] 手机端显示正常

## 🆘 遇到问题？

1. **页面显示 404**
   - 确认仓库名称为 `ChineseEmperors`
   - 检查 GitHub Pages 设置

2. **数据不显示**
   - 查看浏览器控制台错误
   - 确认 `data/emperors.json` 文件存在

3. **样式异常**
   - 清除浏览器缓存
   - 重新加载页面

## 📞 获取帮助

如果部署遇到问题，请：
- 查看详细的 [DEPLOYMENT.md](./DEPLOYMENT.md)
- 在 GitHub 仓库创建 Issue
- 检查 GitHub Actions 日志

---

**你的网站地址：**
`https://[你的GitHub用户名].github.io/ChineseEmperors/`

🎉 祝你部署成功！