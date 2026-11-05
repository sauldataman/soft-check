# 现代两性关系自查

粉系可交互静态站（两页）：

1. **自查页** `index.html` — 四功能自查 → 推「可能适合」→ 从推荐池抽卡；醒目入口跳全表  
2. **全表页** `table.html` — 完整词汇表（承诺 / 互动 / 警示 + 搜索），组内正式→不正式排序，可返回自查  

技术栈：**Vite + 原生 JS**（多页入口），适合挂到 **Cloudflare Pages**。

## Cloudflare Pages

| 设置 | 值 |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js | 18+ |

## 代码

```text
index.html      # 自查页
table.html      # 全表页
src/check.js    # 自查 + 推荐池抽卡
src/table.js    # 全表浏览
src/data.js     # terms(+formality) + reading + matchTerms
src/style.css
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
