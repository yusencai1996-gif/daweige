# AGENTS.md

> 本文件是 opencode 的项目上下文，启动时自动读取。
> 在此描述项目意图、约定、命令与结构，让 agent 行为更贴合本项目。
> 可用 `opencode.json` 的 `instructions` 字段追加更多上下文文件。

## 项目简介

- **名称**：project（npm workspaces 单仓多包）
- **类型**：全栈 TypeScript —— 前端 React + Vite（`apps/web`），后端 Hono on Node（`apps/server`）。作为全平台（桌面/Web/安卓/iOS）开发的统一起点，后续按需扩展桌面（Tauri/Electron）、移动端（React Native）
- **目标**：以 TypeScript 为核心，渐进式搭建跨端应用

## 目录结构

```
project/
├── AGENTS.md          # 本文件：项目上下文与约定（opencode 自动读取）
├── opencode.json      # opencode 配置
├── package.json       # 根：workspaces 配置与聚合脚本
├── apps/
│   ├── web/           # 前端：React + Vite + TypeScript
│   │   ├── package.json
│   │   ├── index.html / vite.config.ts / tsconfig*.json
│   │   ├── public/    # 静态资源
│   │   └── src/       # 源码（main.tsx、App.tsx）
│   └── server/        # 后端：Hono on Node + TypeScript
│       ├── package.json
│       ├── tsconfig.json
│       └── src/index.ts
├── tests/             # 测试（待启用）
├── docs/              # 文档
└── .opencode/         # opencode 扩展：agent / command / skill
```

> 端口约定：前端 dev `5173`，后端 dev `3000`。前端 Vite 已配 `/api` 代理到 `http://localhost:3000`，开发时前端直接请求 `/api/...` 即可，无需处理跨域。

## 开发命令

在**仓库根目录**执行（npm workspaces 自动路由到对应子包）：

- 安装依赖：`npm install`
- 启动前端开发服务器：`npm run dev:web`（Vite，http://localhost:5173）
- 启动后端开发服务器：`npm run dev:server`（tsx watch，http://localhost:3000）
  - 开发时建议**两个终端**分别跑 `dev:web` 和 `dev:server`
- 后端类型检查：`npm run typecheck -w server`
- 构建（前后端一起）：`npm run build`
- 单独构建：`npm run build:web` / `npm run build:server`
- 测试：待启用（暂未接入框架）

> 约定：完成任务后，必须先跑 `npm run build`（前后端类型检查 + 打包）通过再交付。

## 环境 / 平台注意（重要）

本项目运行在 **WSL2**，有以下已处理的坑，改动时务必保持：

- **WSL 的 IPv6 出口不通**：Node/npm 默认走 IPv6 会挂死。已在 `~/.bashrc` 写入
  `export NODE_OPTIONS="--dns-result-order=ipv4first"`。交互式终端自动生效；
  若某次命令疑似卡住，手动加 `NODE_OPTIONS="--dns-result-order=ipv4first"` 前缀。
- **npm 源**：已切到国内镜像 `https://registry.npmmirror.com`（`~/.npmrc`），
  否则访问 npmjs.org 极慢/失败。
- **项目必须放在 WSL 原生文件系统（~/project）**，不要放 `/mnt/e` 等 Windows 盘——
  小文件 I/O 会慢 10~100 倍，`npm install` 会超时。Windows 侧可用
  `\\wsl.localhost\<发行版>\home\administrator\project` 访问。

## 代码约定

- 不主动添加注释，除非用户明确要求。
- 遵循已有代码风格：命名、缩进、导入顺序与周边文件保持一致。
- 新建文件前先查看同类现有文件，沿用其框架与库选择。
- 不暴露或提交密钥、令牌等敏感信息。

## Git 约定

- **日常小改动（功能修复、配置调整、文档更新等）可直接提交**，提交后汇报即可，无需逐次询问。
- **需先确认再做的操作**：`push`、`amend`、`force-push`、删除分支、`reset --hard` 等不可逆或影响远程的动作。
- 提交信息遵循仓库既有风格：中文、简洁、第一行祈使语气，必要时附正文说明动机。
- 仅暂存与本次改动相关的文件，不要 `git add .` 把无关变更一并带入。
- 提交前自行跑一次 `npm run build`（含类型检查）确保不破坏构建。

## 注意事项 / 项目特有规则

<!-- 例如：特定目录禁止改动、必须兼容某版本、性能约束等 -->
TODO：补充本项目独有的约束。

## 部署（GitHub + Vercel 自动部署）

- **GitHub 仓库**：`yusencai1996-gif/daweige`（SSH：`git@github.com:yusencai1996-gif/daweige.git`）
- **Vercel 项目**：`daweige`，已连接上述仓库，分支 `main`
- **Root Directory**：`apps/web`（单仓多包，Vercel 只构建前端）
- **自动部署**：每次 `git push origin main` 自动触发 Vercel 构建并发布到生产域名
- **生产网址**：https://daweige-three.vercel.app
- **手动部署**（不走 git 时）：`cd apps/web && npx vercel --prod`
- **推送鉴权**：SSH 用专用密钥 `~/.ssh/id_ed25519_github`（已在 `~/.ssh/config` 绑定 github.com）
