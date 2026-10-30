# GitHub → Cloudflare Pages 持续发布

当前部署文件已在 `dist/` 中，运行时使用随站点提供的 Three.js 文件，无需服务端。

## 首次连接

1. 将项目放到自己的 GitHub 私有仓库，保留 `dist/`、`tests/`、`package.json`、锁文件、`.node-version` 和 `wrangler.toml`。不要上传 `node_modules/`、`qa/`、凭据或本地作品。
2. 在 Cloudflare 的 Workers & Pages 中创建 **Pages** 项目，选择连接 GitHub 仓库。不要误选需要 Worker 入口文件的部署方式。
3. 仅授权 Cloudflare 访问这个仓库。
4. 配置以下参数：

| 项目 | 值 |
| --- | --- |
| 生产分支 | `main`（如仓库使用其他主分支，选择实际分支） |
| 框架 | `None` |
| 项目根目录 | 仓库根目录 |
| 构建命令 | `npm run build` |
| 发布目录 | `dist` |
| Node.js | `22`（`.node-version` 已指定） |

`build` 运行现有测试，失败会阻止本次更新上线；网站文件无需编译。项目名默认 `bead-studio`，可按账号中可用名称调整 `wrangler.toml`。

## 发布范围

目前 ChatGPT Site 保持私有。GitHub 私有仓库不代表 Cloudflare 网站也私有：首次部署前必须确认网站访问范围。如继续私有，需配置 Cloudflare Access 并检查生产及预览地址的访问限制，完成前不要发布。不要修改当前 `.openai/hosting.json` 中的站点身份。

## 日常更新

本地修改后运行 `npm test`，提交并推送生产分支；Cloudflare 自动运行检查并发布。功能分支可用于预览，预览访问范围也需与发布目标一致。每次以 Cloudflare 部署结果及页面验证为准。

## 作品迁移

浏览器存储按网址隔离，旧网址中的作品和照图进度不会自动出现在新网址。先在旧站导出 JSON，再到新站导入。保留原站，确认新站的转换、编辑、3D、照图、保存和导出正常后再考虑切换域名。

## 项目连接

GitHub 私有仓库：https://github.com/fire-huang/bead-studio 。Cloudflare GitHub 应用仅授权此仓库。首次迁移通过 GitHub 网页上传源码；本机命令行尚未登录 GitHub，本地历史与该仓库的首次上传历史独立，后续使用命令行前应先登录并同步，不能强制覆盖远端。

Cloudflare Pages 项目：`bead-studio`；生产分支：`main`。2026-10-30 已按用户确认公开发布，GitHub 仓库保持私有。

- 首页：https://bead-studio-5xr.pages.dev/
- 工作台：https://bead-studio-5xr.pages.dev/studio
- 控制台：https://dash.cloudflare.com/a5205ee938ccffa08b3fa9fc2fc88b7e/pages/view/bead-studio

首次线上构建通过全部 17 项检查，并已验证首页、首次介绍、3D 预览、图片转换和照图模式加载正常。后续更新以控制台的最新构建结果为准。

官方参考：
- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/framework-guides/deploy-anything/
- https://developers.cloudflare.com/pages/functions/wrangler-configuration/
