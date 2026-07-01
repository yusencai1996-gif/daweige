# AGENTS.md

> 本文件是 opencode 的项目上下文，启动时自动读取。
> 在此描述项目意图、约定、命令与结构，让 agent 行为更贴合本项目。
> 可用 `opencode.json` 的 `instructions` 字段追加更多上下文文件。

## 项目简介

- **名称**：project
- **类型**：Web 前端（React + Vite + TypeScript），作为全平台（桌面/Web/安卓/iOS）开发的统一起点，后续按需扩展后端、桌面（Tauri/Electron）、移动端（React Native）
- **目标**：以 TypeScript 为核心，渐进式搭建跨端应用

## 目录结构

```
project/
├── AGENTS.md          # 本文件：项目上下文与约定（opencode 自动读取）
├── opencode.json      # opencode 配置
├── package.json       # npm 依赖与脚本
├── tsconfig*.json     # TypeScript 配置（app / node）
├── vite.config.ts     # Vite 配置
├── index.html         # 入口 HTML
├── public/            # 静态资源（favicon 等）
├── src/               # 源代码（入口 main.tsx、根组件 App.tsx）
├── tests/             # 测试（待启用）
├── docs/              # 文档
└── .opencode/         # opencode 扩展：agent / command / skill
```

## 开发命令

- 安装依赖：`npm install`
- 开发服务器：`npm run dev`（Vite，默认 http://localhost:5173）
- 类型检查：`npx tsc -b`
- 构建：`npm run build`（= `tsc -b && vite build`，产物在 `dist/`）
- 预览构建产物：`npm run preview`
- 测试：待启用（暂未接入框架）

> 约定：完成任务后，必须先运行 `npm run build`（含类型检查）再交付。

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

- 未经用户明确要求，不要执行 commit / push / amend。
- 提交信息遵循仓库既有风格（简洁、祈使语气）。
- 仅暂存与本次改动相关的文件。

## 注意事项 / 项目特有规则

<!-- 例如：特定目录禁止改动、必须兼容某版本、性能约束等 -->
TODO：补充本项目独有的约束。
