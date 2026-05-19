# 使用指南

## 快速开始

### 浏览所有模板

直接在浏览器中打开 `index.html`，即可浏览所有 205 套模板，支持多维度筛选和智能匹配。

```bash
open ~/Downloads/qiaomu-artist-style/skill/index.html
```

### 智能匹配

在 `index.html` 页面的智能匹配面板中，输入文字描述，选择可选的情绪/场景，点击"智能推荐"即可获得 Top 20 匹配结果。

或在 JavaScript 中使用 TemplateMatcher：

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
// 按条件精确筛选
const filtered = matcher.filter({
  mood: "peaceful",
  colorScheme: "pastel",
  useCase: "invitation"
});
```

### 查看匹配理由

```javascript
const explanation = matcher.explain("imp-002", {
  text: "自然风光摄影展",
  mood: "peaceful"
});
console.log(explanation.details);
```

---

## 模板索引

| 流程序号 | 流派 | 基座模板 | 模板数量 |
|----------|------|---------|---------|
| 1 | 印象派 | impressionism.html | 10 |
| 2 | 东方美学 | oriental.html | 10 |
| 3 | 新艺术 | art-nouveau.html | 10 |
| 4 | 古典主义 | classical.html | 10 |
| 5 | 现代主义 | modernism.html | 10 |
| 6 | 波普艺术 | pop-art.html | 10 |
| 7 | 超现实主义 | surrealism.html | 10 |
| 8 | 抽象表现主义 | abstract.html | 10 |
| 9 | 巴洛克 | baroque.html | 5 |
| 10 | 浪漫主义 | romanticism.html | 5 |
| 11 | 写实主义 | realism.html | 4 |
| 12 | 野兽派 | fauvism.html | 3 |
| 13 | 极简主义 | minimalism.html | 3 |
| 14 | 立体主义 | cubism.html | 4 |
| 15 | 表现主义 | expressionism.html | 6 |
| 16 | 洛可可 | rococo.html | 3 |
| 17 | 象征主义 | symbolism.html | 3 |
| 18 | 后印象派 | post-impressionism.html | 5 |
| 19 | 文艺复兴 | renaissance.html | 3 |
| 20 | 当代艺术 | contemporary.html | 4 |
| 21 | 包豪斯 | bauhaus.html | 5 |
| 22 | 稚拙派 | naive.html | 3 |
| 23 | 其他混合 | 多基座 | 205 总计 |

---

## 标签维度说明

| 维度 | 代码值 | 中文说明 |
|------|--------|---------|
| **colorScheme** | light / dark / warm / cool / vibrant / neutral / monochrome / pastel / earth / jewel | 色彩基调 |
| **mood** | serene / dramatic / playful / elegant / rustic / futuristic / romantic / minimal / bold / academic / mystical / nostalgic / energetic / peaceful / luxurious / whimsical / contemplative | 情绪氛围 |
| **movement** | 23 种艺术流派 | 艺术风格归属 |
| **useCase** | presentation / portfolio / gallery / blog / poster / resume / pitch / report / invitation / catalog / slideshow / moodboard / lookbook / manifesto / yearbook | 适用场景 |
| **formality** | high / medium / low | 正式程度 |
| **density** | sparse / medium / dense | 内容密度 |
| **fontStyle** | serif / sans-serif / display / monospace / handwritten / slab-serif / modern-serif / geometric | 字体风格 |
| **era** | classic / vintage / modern / contemporary / futuristic / retro / medieval / industrial | 时代感 |
