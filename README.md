# 现代两性关系自查

粉系可交互静态站（两页）：

1. **自查页** `index.html` — 四功能自查 → 推「可能适合」→ 从推荐池抽卡；醒目入口跳全表  
2. **全表页** `table.html` — 完整词汇表（承诺 / 互动 / 警示 + 搜索），组内正式→不正式排序，可返回自查  

技术栈：**Vite + 原生 JS**（多页入口）。线上通过 **Cloudflare Workers Builds**（Git）发布，只上传构建产物 `dist`。

界面和词条释义有 10 种语言：`zh-CN`（默认）、`zh-TW`、`en`、`es`、`ja`、`ko`、`vi`、`ru`、`fr`、`it`。两页顶部都可以切换。选择写入 `localStorage`，地址栏 `?lang=` 优先并同步到另一页。任何语言下，关系词都会同时显示本地名称和英文原词。

## Cloudflare Workers Builds

这是 **Workers Builds**（连接 Git 仓库的 Worker），不是经典 Pages。`wrangler.jsonc` 只设置 `assets.directory` 为 `./dist`，没有 Worker 脚本。因此 `npx wrangler deploy` 按静态资源打包，**不会**走 Vite 框架自动配置。没有这份配置时，Wrangler 会把项目识别成 Vite，并在 Vite 5.4 上报错（自动配置需要 Vite >= 6）。不要为此升级 Vite，也不要加 `@cloudflare/vite-plugin`。

在该 Worker 的 **Settings → Builds** 里使用：

| 设置 | 值 |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Root directory | `/` |
| API token | 一个仍然有效的 Workers Builds API token |

**Deploy command 必填。** 留空不会停掉部署：Workers Builds 会把它填回默认的 `npx wrangler deploy`。仓库里已有 `wrangler.jsonc` 之后，这个默认命令是对的。

保存 Builds 设置需要有效的 API token。已删除、已轮换或失效的 build token 会导致保存失败（`Invalid request body`），或构建报 token 不可用。到 **Settings → Builds → API token** 重新选择或新建一个 token，再保存。

本地可选：`npm run deploy`（先 `npm run build`，再 `wrangler deploy`）。Workers Builds 已经单独跑过 Build command，仪表盘里的 Deploy command 保持 `npx wrangler deploy`，避免构建两次。

### 备选：经典 Cloudflare Pages

如果另外建的是 **Pages** 项目（不是 Workers Builds）：Build command `npm run build`，Build output directory `dist`，不要填 Deploy command。Pages 直接发布构建目录，不运行 `wrangler deploy`。

## 代码

```text
index.html      # 自查页
table.html      # 全表页
src/check.js    # 自查 + 推荐池抽卡
src/table.js    # 全表浏览
src/data.js     # terms(+formality) + reading + matchTerms
src/i18n.js     # 语言选择、?lang=、localStorage
src/locales/    # 界面文案与 10 语词条
src/style.css
wrangler.jsonc  # Workers 静态资源（./dist），无 Worker 脚本
dist/           # npm run build 产物（不入库）
```

## 正式度

每条词有 `formality`：`3` 正式 / `2` 中性 / `1` 轻松。全表先按分类（承诺→互动→警示），同类内按 formality 降序。

## 本地

```bash
npm install
npm run dev
npm run build && npm run preview -- --host 0.0.0.0 --port 4173
```
