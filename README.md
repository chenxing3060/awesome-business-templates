# 🎨 Awesome Business Templates

**205 套艺术风格 HTML 演示模板 • 23 种艺术流派 • 8 维标签体系 • 内置 AI 匹配引擎**

[![GitHub stars](https://img.shields.io/github/stars/chenxing3060/awesome-business-templates?style=flat-square)](https://github.com/chenxing3060/awesome-business-templates/stargazers)
[![GitHub license](https://img.shields.io/github/license/chenxing3060/awesome-business-templates?style=flat-square)](https://github.com/chenxing3060/awesome-business-templates/blob/main/LICENSE)
[![Template Count](https://img.shields.io/badge/templates-205-blue?style=flat-square)](templates.json)

一套开箱即用的艺术风格演示模板库。每个模板都是**自包含 HTML 文件**，内置键盘导航、响应式设计、零外部依赖（仅 Google Fonts）。附带智能匹配引擎，可根据内容自动推荐最佳模板。

---

## ✨ 核心功能

### 🖼️ 205 套模板

覆盖印象派、东方美学、新艺术、古典、波普、超现实、抽象表现等 23 种艺术流派，每种流派包含多个情绪/色彩变体。

### 🏷️ 8 维标签体系

| 维度 | 说明 | 示例值 |
|------|------|--------|
| **colorScheme** | 色彩基调 | light / dark / warm / cool / vibrant / neutral / monochrome / pastel / earth / jewel |
| **mood** | 情绪氛围 | serene / dramatic / playful / elegant / romantic / minimal / mystical / energetic ... |
| **movement** | 艺术流派 | impressionism / oriental / art-nouveau / classical / pop-art / surrealism ... |
| **useCase** | 适用场景 | presentation / portfolio / gallery / poster / invitation / blog ... |
| **formality** | 正式程度 | high / medium / low |
| **density** | 内容密度 | sparse / medium / dense |
| **fontStyle** | 字体风格 | serif / sans-serif / display / monospace / handwritten ... |
| **era** | 时代感 | classic / vintage / modern / futuristic / retro ... |

### 🤖 AI 智能匹配

内置 `template-matcher.js` 引擎，支持：

- **文本分析**：根据用户输入自动提取情绪、流派、场景
- **多维度评分**：8 个维度加权匹配
- **中英双语**：支持中英文关键词识别
- **`recommend()`**：Top 20 推荐
- **`filter()`**：精确筛选
- **`explain()`**：匹配理由解释

### 📦 零依赖

每个模板是**独立 HTML 文件**，内联所有 CSS 和 JavaScript。打开即用，无需构建工具，无需安装。

---

## 🚀 快速开始

### 浏览所有模板

```bash
# 直接在浏览器中打开
open index.html
```

支持：按流派筛选 · 按情绪筛选 · 按色彩筛选 · 按场景筛选 · 关键词搜索 · AI 智能匹配

### Node.js 中使用智能匹配

```javascript
const data = require('./templates.json');
const TemplateMatcher = require('./template-matcher.js');
const matcher = new TemplateMatcher(data);

// 智能推荐
const result = matcher.recommend({
  text: "一场关于春天花卉的摄影展，温暖浪漫的氛围",
  useCase: "gallery"
});
console.log(result.results); // Top 20 推荐
```

### 精确筛选

```javascript
const filtered = matcher.filter({
  mood: "peaceful",
  colorScheme: "pastel",
  useCase: "invitation"
});
```

---

## 📁 项目结构

```
awesome-business-templates/
├── index.html              # 模板库浏览界面（多维度筛选 + AI 匹配）
├── templates.json          # 205 套模板元数据索引
├── template-matcher.js     # 智能模板匹配引擎（浏览器/Node.js）
├── README.md               # 项目说明（你在这里）
├── SKILL.md                # Skill 定义文档
├── AGENTS.md               # AI 代理操作手册
├── USAGE.md                # 使用指南
├── base/                   # 28 个基座模板 HTML
│   ├── impressionism.html  # 印象派 · 暖调柔光
│   ├── oriental.html       # 东方美学 · 水墨留白
│   ├── art-nouveau.html    # 新艺术 · 金色曲线
│   ├── classical.html      # 古典主义 · 明暗戏剧
│   ├── modernism.html      # 现代主义 · 几何构成
│   ├── pop-art.html        # 波普艺术 · 鲜艳原色
│   ├── surrealism.html     # 超现实 · 梦幻错位
│   ├── abstract.html       # 抽象表现 · 自由笔触
│   ├── baroque.html        # 巴洛克 · 金色辉煌
│   ├── romanticism.html    # 浪漫主义 · 壮丽自然
│   ├── realism.html        # 写实主义 · 质朴真实
│   ├── fauvism.html        # 野兽派 · 狂野色彩
│   ├── minimalism.html     # 极简主义 · 少即是多
│   ├── cubism.html         # 立体主义 · 多面视角
│   ├── expressionism.html  # 表现主义 · 情感扭曲
│   ├── rococo.html         # 洛可可 · 粉彩柔美
│   ├── symbolism.html      # 象征主义 · 神秘诗意
│   ├── post-impressionism.html # 后印象派 · 笔触情感
│   ├── renaissance.html    # 文艺复兴 · 古典庄严
│   ├── contemporary.html   # 当代艺术 · 实验混搭
│   ├── bauhaus.html        # 包豪斯 · 功能理性
│   ├── naive.html          # 稚拙派 · 天真童趣
│   ├── street-art.html     # 街头艺术 · 涂鸦粗犷
│   ├── graphic.html        # 平面插画 · 时尚扁平
│   ├── digital.html        # 数字科技 · 霓虹赛博
│   ├── vintage.html        # 复古怀旧 · 褪色时光
│   ├── japanese.html       # 和风禅意 · 空寂留白
│   └── luxury.html         # 奢华高端 · 金黑丝绒
└── templates/              # （预留）个性化输出目录
```

---

## 🎯 流派一览

| 流派 | 基座模板 | 模板数 | 典型配色 | 情绪 |
|------|---------|--------|---------|------|
| 🎨 印象派 | impressionism.html | 10 | 暖粉、天蓝、薰衣草 | 宁静 · 浪漫 · 愉悦 |
| 🏯 东方美学 | oriental.html | 10 | 墨黑、宣纸白、朱红 | 沉思 · 宁静 · 极简 |
| 🌸 新艺术 | art-nouveau.html | 10 | 金色、象牙白、暖棕 | 奢华 · 优雅 · 浪漫 |
| 🏛️ 古典主义 | classical.html | 10 | 深褐、暖米色、金色 | 戏剧 · 学术 · 庄严 |
| 📐 现代主义 | modernism.html | 10 | 白、红、黑 | 大胆 · 简约 · 学术 |
| 🎭 波普艺术 | pop-art.html | 10 | 亮红、亮蓝、黄 | 愉悦 · 大胆 · 趣味 |
| 💭 超现实 | surrealism.html | 10 | 暖米、金色、紫灰 | 神秘 · 梦幻 · 沉思 |
| 🎨 抽象表现 | abstract.html | 10 | 橙、蓝、黑白 | 活力 · 沉思 · 大胆 |
| 👑 巴洛克 | baroque.html | 5 | 金、深褐、暖白 | 戏剧 · 奢华 · 庄严 |
| 🌄 浪漫主义 | romanticism.html | 5 | 深蓝、暖橙、灰蓝 | 戏剧 · 沉思 · 浪漫 |
| 📷 写实主义 | realism.html | 4 | 土褐、灰蓝、大地色 | 质朴 · 宁静 · 沉思 |
| 🐅 野兽派 | fauvism.html | 3 | 亮红、橙、绿 | 活力 · 大胆 · 愉悦 |
| ⬜ 极简主义 | minimalism.html | 3 | 白、黑、灰 | 极简 · 优雅 · 宁静 |
| 🔷 立体主义 | cubism.html | 4 | 赭石、橙、暖灰 | 大胆 · 学术 · 沉思 |
| 😱 表现主义 | expressionism.html | 6 | 橙红、深褐、暖灰 | 戏剧 · 活力 · 大胆 |
| 🌺 洛可可 | rococo.html | 3 | 粉红、粉绿、金 | 愉悦 · 浪漫 · 趣味 |
| 🌙 象征主义 | symbolism.html | 3 | 紫、金、粉紫 | 神秘 · 梦幻 · 浪漫 |
| 🖌️ 后印象派 | post-impressionism.html | 5 | 梵高黄、绿、橙 | 戏剧 · 愉悦 · 沉思 |
| 🏛️ 文艺复兴 | renaissance.html | 3 | 赭石、红、羊皮纸 | 学术 · 戏剧 · 沉思 |
| 🔥 当代艺术 | contemporary.html | 4 | 品红、灰蓝、冷灰 | 戏剧 · 沉思 · 趣味 |
| 🟦 包豪斯 | bauhaus.html | 5 | 红、黄、蓝 | 学术 · 大胆 · 趣味 |
| 🌿 稚拙派 | naive.html | 3 | 翠绿、金黄、暖白 | 趣味 · 神秘 · 愉悦 |
| 🏙️ 其他混合 | 多基座 | 53+ | 多色系 | 全情绪覆盖 |

---

## 🧠 智能匹配原理

匹配器使用**加权评分系统**：

```
score = Σ (各维度得分 × 权重)
```

默认权重：
- mood: 0.20 （情绪最优先）
- movement: 0.20 （流派）
- colorScheme: 0.15 （色彩）
- useCase: 0.15 （场景）
- formality: 0.10 （正式度）
- density: 0.08 （密度）
- fontStyle: 0.07 （字体）
- era: 0.05 （时代）

文本分析自动识别中英文关键词，支持 17 种情绪、23 种流派、15 种场景、10 种色彩方案的自动检测。

---

## 📜 许可证

MIT License — 可自由使用、修改、商用。

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！更多模板风格持续添加中。

---

> 基于 [qiaomu-artist-style](https://github.com/joeseesun/qiaomu-artist-style) 项目扩展 · Made with ❤️
