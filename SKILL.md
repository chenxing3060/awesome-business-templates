---
name: awesome-business-templates
description: >
  205 套艺术风格 HTML 演示模板库，覆盖 23 种艺术流派、10 种色彩体系、
  17 种情绪氛围，支持 15 种使用场景。每套模板均为自包含 HTML，
  内置键盘导航、响应式设计，可直接在浏览器中打开使用。
  附带智能匹配引擎 (TemplateMatcher)，可根据用户输入内容自动推荐最合适的模板风格。
---

# awesome-business-templates

205 套艺术风格 HTML 演示模板（28 个基座模板 × 标签变体），
附智能匹配引擎。

## Skill 路径

```
~/Downloads/qiaomu-artist-style/skill/
├── SKILL.md                # Skill 定义文件
├── AGENTS.md               # 代理操作手册
├── USAGE.md                # 使用指南
├── templates.json          # 205 套模板元数据索引
├── template-matcher.js     # 智能模板匹配引擎
├── index.html              # 模板库浏览界面
├── base/                   # 28 个基座模板 HTML
│   ├── impressionism.html  # 印象派
│   ├── oriental.html       # 东方美学
│   ├── art-nouveau.html    # 新艺术
│   ├── classical.html      # 古典主义
│   ├── modernism.html      # 现代主义
│   ├── pop-art.html        # 波普艺术
│   ├── surrealism.html     # 超现实主义
│   ├── abstract.html       # 抽象表现主义
│   ├── baroque.html        # 巴洛克
│   ├── romanticism.html    # 浪漫主义
│   ├── realism.html        # 写实主义
│   ├── fauvism.html        # 野兽派
│   ├── minimalism.html     # 极简主义
│   ├── cubism.html         # 立体主义
│   ├── expressionism.html  # 表现主义
│   ├── rococo.html         # 洛可可
│   ├── symbolism.html      # 象征主义
│   ├── post-impressionism.html # 后印象派
│   ├── renaissance.html    # 文艺复兴
│   ├── contemporary.html   # 当代艺术
│   ├── bauhaus.html        # 包豪斯
│   ├── naive.html          # 稚拙派
│   ├── street-art.html     # 街头艺术
│   ├── graphic.html        # 平面插画
│   ├── digital.html        # 数字科技
│   ├── vintage.html        # 复古怀旧
│   ├── japanese.html       # 和风禅意
│   └── luxury.html         # 奢华高端
└── templates/              # （预留）个性化模板输出目录
```

## 完整工作流

每个演示文稿构建请求，按以下流程执行。**不要跳过任何步骤**。

### 第 1 步 — 询问用户场景和情绪

在读取任何文件之前，先问用户：

> "在使用模板之前，我想了解两点：
> 1. **使用场景是什么？**（例如：作品集展示、教学演示、品牌宣传、画廊展览等）
> 2. **希望传达什么氛围？**（例如：温暖文艺、大胆前卫、静谧典雅、奢华精致等）"

等待用户回答，不要提前选择。

### 第 2 步 — 读取 `templates.json` 并挑选 3 个候选

读取 `templates.json`。根据用户的场景和情绪，匹配每个模板的 `tags`（mood, movement, colorScheme, useCase）。**选出 3 个候选**，它们之间应有足够差异。

### 第 3 步 — 为每个候选构建首屏预览

对于 3 个候选模板：

1. 读取基座模板的 HTML（`base/<template>.html`），了解其视觉系统
2. 获取该模板的**第一页**（封面）
3. 将占位内容替换为用户的标题、副标题、作者、日期等
4. 保存为独立的 HTML 预览文件，例如 `previews/01-<slug>.html`

### 第 4 步 — 在浏览器中打开所有 3 个预览，发送路径给用户

使用 `open <path>` 打开每个文件。然后发消息给用户：

> "三个候选风格，欢迎对比：
> 1. **<模板 A>** — <一句话风格描述>
>    `/path/to/previews/01-a.html`
> 2. **<模板 B>** — <一句话风格描述>
>    `/path/to/previews/02-b.html`
> 3. **<模板 C>** — <一句话风格描述>
>    `/path/to/previews/03-c.html`
>
> 哪个感觉更对？"

等待用户选择。

### 第 5 步 — 在选定模板中构建完整演示文稿

一旦用户选定：

1. 复制基座模板到用户的 workspace
2. 按照"适配规则"适配每一页
3. 如果用户的演示文稿需要更多页，复制现有的布局进行扩展
4. **如果需要模板中没有的页面布局，使用模板的现有设计系统从零设计**

### 第 6 步 — 在浏览器中打开最终演示文稿，发送文件路径

用 `open <path>` 打开完成的演示文稿。发消息给用户，包含文件路径、选择理由和任何注意事项。

---

## 模板适配规则

### 始终保留（这些就是设计系统）

- **字体** — 模板导入的 Google Fonts 或 `font-family` 声明。从不替换
- **配色** — 所有 `:root` CSS 变量和颜色值。从不改色
- **布局网格** — 网格列、定位、flex 层次。不重构结构
- **页面级 CSS 类** — 如 `.cover`, `.content`, `.quote` 等。承载视觉标识
- **装饰元素** — 笔触纹理、水墨效果、金色边框、装饰曲线等
- **导航** — 键盘 ← → 控制、底部导航条

### 始终替换（这是用户的内容）

- **标题** — `<h1>`, `<h2>`, `<h3>` 等
- **正文** — `<p>`, 列表项等
- **名称、日期、署名** — 作者、日期、引文
- **段落文本** — 模板的内容占位符
- **图片占位符** — 用真实图片替换

### 增加/删除页面

- **增加**：复制最合适布局的现有页面，替换内容，更新页码
- **删除**：从末尾删除页面，更新页码

---

## 多维度标签匹配

每个模板在 `templates.json` 中带有 8 个维度的标签。匹配的优先顺序：

1. **mood（情绪）** — 最优先，匹配用户想要的感受
2. **movement（流派）** — 如果用户提到特定的艺术风格
3. **useCase（场景）** — 匹配用户的使用目的
4. **colorScheme（色彩）** — 匹配用户想要的色调
5. **formality（正式度）** — 用于筛选（高/中/低）
6. **density（密度）** — 用于适配内容量（稀疏/中等/密集）

当用户提供文字描述时，使用 `template-matcher.js` 的 `recommend()` 方法来自动分析并推荐。

---

## 常见问题

- **不要跳过第 1 步和第 4 步**
- **不要替换字体或改色**
- **不要混合不同模板的布局**
- **不要移除装饰元素**
- **始终在浏览器中打开文件** — `open <path>`

---

## 输出契约

每个成果物后：
1. 在浏览器中打开文件 — `open /absolute/path/to/file.html`
2. 发送绝对文件路径给用户
