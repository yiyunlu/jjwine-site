# CLAUDE.md — JJWine 官网开发约定

## 项目定位

这是 JJWine 面向国际酒饮品牌与零售客户的 B2B 官网。核心表达是：将全球品牌标准转化为在中国可执行、可验证的产品本地化、生产、质量和交付方案。

官网是平台级资产，不是单一示例品牌A 品牌项目页。不得把任何客户关系、授权范围或合作状态推断为可公开宣传的事实。

## 技术栈

- React 19 + TypeScript
- Vinext / Vite
- Cloudflare Workers + Static Assets
- 路由：`/en`、`/zh-cn`、`/es`、`/fr`；`/` 渲染英文页，canonical 指向 `/en`
- 无数据库、KV 或 R2
- 在线询盘只在 `/en`、`/zh-cn` 提供：需求简报弹窗加载 Cloudflare Turnstile，Worker 的 `POST /api/enquiry`（`worker/enquiry.ts`）向 Cloudflare 校验 Turnstile，再通过 Resend 把询盘发到运营方邮箱，不存储提交内容。环境变量见 `docs/enquiry-worker-env.md`

## 常用命令

```bash
npm install
npm run dev
npm run lint
npm test
npm run deploy:dry-run
```

提交前至少运行：

```bash
npm run lint && npm test && npm run deploy:dry-run
```

## 开发规则

1. 保持英文、简体中文、西班牙语、法语四种语言的内容和功能一致。只有两项按设计不一致：在线询盘只在 en、zh-cn 提供，es、fr 只保留本地下载和复制简报；隐私政策和法律声明只有 en、zh-cn 版本，es、fr 的法律页 URL 以 308 永久重定向到英文版。
2. 新增公开能力、认证、客户、品牌、工厂、市场覆盖或合规声明前，先查 `docs/事实与来源边界.md`；没有可读证据或明确授权时不得发布。
3. 维持移动端、键盘操作、语义化 HTML、reduced-motion 和基本无障碍支持。
4. 除现有的 Turnstile 校验和 Resend 询盘邮件外，不引入新的运行时服务、分析脚本、Cookie、表单上传或第三方追踪，除非任务明确批准并同步补齐隐私说明。
5. 不读取、复制或暴露父目录中的合同、报价、客户资料、邮件或个人信息，除非任务明确指定文件和用途。
6. 不修改业务源文件或 Obsidian 笔记；本目录只管理官网代码、公开内容和开发文档。
7. 不执行正式部署、购买域名、绑定域名、提交 Git、推送远端或创建云资源，除非 Eddie 明确要求。
8. 修改范围要聚焦；避免无关重构和全局格式化。
9. 每项改动必须有可运行验证，不能只写代码不测试。

## 当前优先问题

已知缺陷和改进以仓库的 open issues 为准，开工前先查看：

```bash
gh issue list -R yiyunlu/jjwine-site --state open
```

`docs/开发路线图.md` 记录上线前仍未完成、且没有对应 issue 的事项，例如：

- 中英法律文本交由专业法律人士复核
- 确认正式域名、部署地区以及是否涉及中国大陆 ICP
- 扩大自动化测试：移动菜单目前只测服务端渲染的标记，交互和需求简报下载还没有测试
- 持续检查 320px、390px、768px、1024px、1440px 关键视口
- 对西班牙语和法语进行母语级文案校对

## 目录说明

- `app/`：页面、组件、内容和样式
- `public/`：公开静态资源
- `tests/`：自动化测试
- `worker/`：Cloudflare Worker 入口
- `docs/事实与来源边界.md`：公开内容的证据和限制
- `docs/enquiry-worker-env.md`：在线询盘所需的 Worker 环境变量
- `docs/开发路线图.md`：后续开发顺序和验收标准
- `README.md`：安装、验证和部署说明
