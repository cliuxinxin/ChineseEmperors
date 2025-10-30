# chineseemperors

静态网站：按死亡年龄检索中国皇帝及其对应成就年龄。数据保存在 `src/data/emperors.json`。

部署：
1. npm install
2. npm run build
3. 将代码推送到 GitHub（main 分支）

CI 会自动构建并发布到 GitHub Pages（使用 peaceiris/actions-gh-pages）。

数据变更通过 PR，运行 `node scripts/validate.js` 进行基础校验。
