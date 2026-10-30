# GitHub → Cloudflare Pages 持续发布

项目为静态网站，发布文件位于 `dist/`，无需后端服务。

## 创建自己的部署

以下步骤仅适用于项目许可允许的用途；商业使用须另行获得授权。

1. Fork 本仓库，或将代码导入自己的 GitHub 仓库。
2. 在 Cloudflare 的 Workers & Pages 中创建 Pages 项目，连接自己的 GitHub 仓库。
3. 使用以下构建设置：

| 项目 | 值 |
| --- | --- |
| 生产分支 | `main` |
| 框架 | `None` |
| 项目根目录 | 仓库根目录 |
| 构建命令 | `npm run build` |
| 发布目录 | `dist` |
| Node.js | `22` 或更高版本 |

构建命令运行自动检查；检查失败时不会发布该次更新。项目名和网址由你的 Cloudflare 账号配置决定，可按需修改 `wrangler.toml` 中的 `name`。

## 持续更新

在 GitHub 中提交或合并到生产分支后，Cloudflare 会自动检查和部署。以控制台的最终部署状态为准。

发布前运行 `npm test`。不要提交账号凭据、`.env`、本地作品、浏览器数据或个人控制台地址。GitHub 仓库可见性与网站访问权限分别管理。

如果复用首页，请替换演示视频、封面和品牌素材，更新其中的网址；这些素材不属于软件许可证的授权范围。

## 作品迁移

浏览器存储按网址隔离。更换域名、设备或浏览器前，在旧网址导出作品 JSON，再到新网址导入。原图与撤销历史不随作品副本保存。

## 项目在线演示

- 首页：https://bead-studio-5xr.pages.dev/
- 工作台：https://bead-studio-5xr.pages.dev/studio

## 官方文档

- [Git 集成](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [静态网站部署](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Wrangler 配置](https://developers.cloudflare.com/pages/functions/wrangler-configuration/)
