/**
 * Qiaomu Artist Style - 智能模板匹配器
 * 
 * 根据用户输入内容（主题、文字、色彩偏好、情绪等），
 * 从 200 套模板中智能推荐最合适的风格。
 * 
 * 支持 Node.js 和浏览器两种运行环境。
 * 
 * 使用示例:
 *   const matcher = new TemplateMatcher(templatesData);
 *   const results = matcher.recommend({
 *     text: "一场关于春天和自然的艺术展览",
 *     mood: ["peaceful", "romantic"],
 *     colorScheme: "pastel",
 *     useCase: "gallery"
 *   });
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.TemplateMatcher = factory();
  }
}(this, function () {

  const DEFAULT_WEIGHTS = {
    movement: 0.20,
    mood: 0.20,
    colorScheme: 0.15,
    useCase: 0.15,
    formality: 0.10,
    density: 0.08,
    fontStyle: 0.07,
    era: 0.05
  };

  const MOOD_KEYWORDS = {
    serene: ['宁静', '安详', '平静', 'peaceful', 'calm', 'tranquil', 'serene', 'quiet', 'gentle'],
    dramatic: ['戏剧', '强烈', '高潮', 'dramatic', 'intense', 'striking', 'bold', 'powerful', 'epic'],
    playful: ['有趣', '活泼', '欢乐', 'playful', 'fun', 'cheerful', 'lively', 'joyful', 'vibrant'],
    elegant: ['优雅', '精致', '高贵', 'elegant', 'refined', 'graceful', 'sophisticated', 'chic'],
    rustic: ['质朴', '乡村', '田园', 'rustic', 'country', 'pastoral', 'natural', 'earthy'],
    futuristic: ['未来', '科技', '赛博', 'futuristic', 'tech', 'cyber', 'digital', 'modern'],
    romantic: ['浪漫', '爱情', '温柔', 'romantic', 'love', 'tender', 'sweet', 'affection'],
    minimal: ['极简', '简约', '干净', 'minimal', 'clean', 'simple', 'pure', 'stripped'],
    bold: ['大胆', '前卫', '先锋', 'bold', 'daring', 'avant-garde', 'edgy', 'provocative'],
    academic: ['学术', '古典', '严谨', 'academic', 'classical', 'formal', 'scholarly', 'traditional'],
    mystical: ['神秘', '梦幻', '超现实', 'mystical', 'dreamy', 'surreal', 'magical', 'ethereal'],
    nostalgic: ['怀旧', '复古', '回忆', 'nostalgic', 'vintage', 'retro', 'memory', 'longing'],
    energetic: ['活力', '能量', '动感', 'energetic', 'dynamic', 'active', 'vital', 'lively'],
    peaceful: ['和平', '安宁', '和谐', 'peaceful', 'harmonious', 'tranquil', 'zen'],
    luxurious: ['奢华', '豪华', '高端', 'luxurious', 'opulent', 'premium', 'high-end', 'sumptuous'],
    whimsical: ['奇异', '幻想', '童话', 'whimsical', 'fantasy', 'fairytale', 'quirky', 'magical'],
    contemplative: ['沉思', '内省', '哲学', 'contemplative', 'meditative', 'philosophical', 'reflective']
  };

  const MOVEMENT_KEYWORDS = {
    impressionism: ['印象', '莫奈', '雷诺阿', '光色', '户外', 'impression', 'monet', 'light', 'color'],
    oriental: ['东方', '水墨', '国画', '山水', 'oriental', 'chinese', 'ink', 'brush', 'zen'],
    'art-nouveau': ['新艺术', '穆夏', '装饰', '曲线', 'art nouveau', 'much a', 'decorative', 'whiplash'],
    classical: ['古典', '文艺复兴', '巴洛克', 'classical', 'renaissance', 'baroque', 'academic'],
    modernism: ['现代', '现代主义', '几何', 'modern', 'modernist', 'geometric', 'abstraction'],
    surrealism: ['超现实', '达利', '梦境', 'surreal', 'dali', 'dream', 'unconscious'],
    'pop-art': ['波普', '沃霍尔', '流行', 'pop', 'warhol', 'popular', 'comic'],
    abstract: ['抽象', '表现', 'ab stract', 'expression', 'non-representational'],
    baroque: ['巴洛克', '华丽', '戏剧', 'baroque', 'ornate', 'dramatic', 'grand'],
    romanticism: ['浪漫', '崇高', '自然', 'romantic', 'sublime', 'nature', 'emotion'],
    realism: ['写实', '真实', '现实', 'realist', 'realism', 'truthful', 'everyday'],
    fauvism: ['野兽', '马蒂斯', '狂野', 'fauve', 'matisse', 'wild', 'vivid'],
    minimalism: ['极简', '极少', 'minimal', 'minimalist', 'reduction', 'essence'],
    cubism: ['立体', '毕加索', '几何', 'cubist', 'picasso', 'geometric', 'fragment'],
    bauhaus: ['包豪斯', '功能', '设计', 'bauhaus', 'functional', 'design', 'modernist'],
    expressionism: ['表现', '蒙克', '情感', 'expression', 'munch', 'emotion', 'distortion'],
    rococo: ['洛可可', '粉彩', '华丽', 'rococo', 'pastel', 'ornate', 'decorative'],
    symbolism: ['象征', '神秘', '梦幻', 'symbolist', 'mystery', 'dream', 'metaphor'],
    contemporary: ['当代', '现当代', 'contemporary', 'current', 'now', 'modern']
  };

  const USECASE_KEYWORDS = {
    presentation: ['展示', '演讲', '汇报', 'presentation', 'present', 'talk', 'slideshow'],
    portfolio: ['作品集', '个人', '展示', 'portfolio', 'showcase', 'work', 'collection'],
    gallery: ['画廊', '展览', '美术馆', 'gallery', 'exhibition', 'display', 'show'],
    blog: ['博客', '日志', '文章', 'blog', 'post', 'article', 'journal'],
    poster: ['海报', '宣传', '广告', 'poster', 'promotion', 'advertisement', 'flyer'],
    resume: ['简历', '履历', '求职', 'resume', 'cv', 'curriculum', 'career'],
    pitch: ['融资', '路演', '创业', 'pitch', 'investor', 'startup', 'fundraising'],
    report: ['报告', '年报', '分析', 'report', 'analysis', 'annual', 'review'],
    invitation: ['邀请', '请柬', '婚礼', 'invitation', 'invite', 'wedding', 'event'],
    catalog: ['目录', '画册', '产品', 'catalog', 'catalogue', 'product', 'brochure']
  };

  const SUBTLETY_MAP = {
    '典雅': 'elegant',
    '素雅': 'elegant',
    '极简': 'minimal',
    '简约': 'minimal',
    '奢华': 'luxurious',
    '土豪': 'luxurious',
    '可爱': 'playful',
    '活泼': 'playful',
    '深沉': 'dramatic',
    '压抑': 'dramatic',
    '温暖': 'serene',
    '温馨': 'serene',
    '宁静': 'peaceful',
    '禅意': 'peaceful',
    '创意': 'whimsical',
    '趣味': 'playful',
    '未来': 'futuristic',
    '科技': 'futuristic',
    '学术': 'academic',
    '专业': 'academic',
    '自由': 'energetic',
    '活力': 'energetic',
    '梦幻': 'mystical',
    '仙境': 'mystical',
    '怀旧': 'nostalgic',
    '复古': 'nostalgic',
    '爱情': 'romantic',
    '浪漫': 'romantic'
  };

  const COLOR_SCHEME_WORDS = {
    light: ['白', '明亮', '浅色', 'light', 'white', 'bright', 'pale'],
    dark: ['黑', '暗', '深色', 'dark', 'black', 'deep', 'shadow'],
    warm: ['暖', '红', '橙', '黄', 'warm', 'red', 'orange', 'yellow', 'sunset'],
    cool: ['冷', '蓝', '绿', '紫', 'cool', 'blue', 'green', 'purple', 'ocean'],
    vibrant: ['鲜艳', '浓烈', '饱和', 'vibrant', 'bold', 'saturated', 'bright'],
    neutral: ['中性', '灰', '素', 'neutral', 'gray', 'taupe', 'beige', 'brown'],
    monochrome: ['黑白', '单色', '灰度', 'monochrome', 'bw', 'black and white'],
    pastel: ['粉彩', '淡', '柔和', 'pastel', 'soft', 'muted', 'gentle'],
    earth: ['大地', '泥土', '自然', 'earth', 'terracotta', 'clay', 'natural'],
    jewel: ['宝石', '翡翠', '宝石', 'jewel', 'emerald', 'ruby', 'sapphire']
  };

  function TemplateMatcher(templatesData, options) {
    this.templates = templatesData && templatesData.templates
      ? templatesData.templates
      : (templatesData || []);
    this.weights = Object.assign({}, DEFAULT_WEIGHTS, options && options.weights);
    this._buildIndex();
  }

  TemplateMatcher.prototype._buildIndex = function () {
    this._byId = {};
    this._byMovement = {};
    this._byMood = {};
    this._byUseCase = {};
    this._byColorScheme = {};

    (this.templates || []).forEach(function (t) {
      this._byId[t.id] = t;
      var tags = t.tags || {};
      var movement = tags.movement;
      var mood = tags.mood;
      var useCase = tags.useCase;
      var cs = tags.colorScheme;

      if (movement) {
        this._byMovement[movement] = this._byMovement[movement] || [];
        this._byMovement[movement].push(t);
      }
      if (mood) {
        this._byMood[mood] = this._byMood[mood] || [];
        this._byMood[mood].push(t);
      }
      if (useCase) {
        this._byUseCase[useCase] = this._byUseCase[useCase] || [];
        this._byUseCase[useCase].push(t);
      }
      if (cs) {
        this._byColorScheme[cs] = this._byColorScheme[cs] || [];
        this._byColorScheme[cs].push(t);
      }
    }, this);
  };

  TemplateMatcher.prototype.getById = function (id) {
    return this._byId[id] || null;
  };

  TemplateMatcher.prototype.getByMovement = function (movement) {
    return this._byMovement[movement] || [];
  };

  TemplateMatcher.prototype.filter = function (filters) {
    var self = this;
    return this.templates.filter(function (t) {
      var tags = t.tags || {};
      var match = true;
      if (filters.movement && tags.movement !== filters.movement) match = false;
      if (filters.mood && tags.mood !== filters.mood) match = false;
      if (filters.colorScheme && tags.colorScheme !== filters.colorScheme) match = false;
      if (filters.useCase && tags.useCase !== filters.useCase) match = false;
      if (filters.formality && tags.formality !== filters.formality) match = false;
      if (filters.era && tags.era !== filters.era) match = false;
      if (filters.fontStyle && tags.fontStyle !== filters.fontStyle) match = false;
      if (filters.query) {
        var q = filters.query.toLowerCase();
        var nameMatch = t.name.toLowerCase().indexOf(q) !== -1;
        var descMatch = t.description.toLowerCase().indexOf(q) !== -1;
        if (!nameMatch && !descMatch) match = false;
      }
      return match;
    });
  };

  function _textScore(text, keywordMap) {
    if (!text) return {};
    var scores = {};
    var lower = text.toLowerCase();
    Object.keys(keywordMap).forEach(function (key) {
      var keywords = keywordMap[key];
      var score = 0;
      keywords.forEach(function (kw) {
        var k = kw.toLowerCase();
        var idx = lower.indexOf(k);
        if (idx !== -1) {
          score += 1;
          if (idx === 0) score += 0.5;
        }
      });
      if (score > 0) scores[key] = score;
    });
    return scores;
  }

  TemplateMatcher.prototype._analyzeInput = function (input) {
    var text = (input.text || input.title || '') + ' ' + (input.description || '');
    var result = {
      moods: [],
      movements: [],
      useCases: [],
      colorSchemes: []
    };

    if (input.mood) {
      result.moods = Array.isArray(input.mood) ? input.mood : [input.mood];
    } else if (text) {
      var moodScores = _textScore(text, MOOD_KEYWORDS);
      result.moods = Object.keys(moodScores).sort(function (a, b) {
        return moodScores[b] - moodScores[a];
      }).slice(0, 3);
    }

    if (input.movement) {
      result.movements = Array.isArray(input.movement) ? input.movement : [input.movement];
    } else if (text) {
      var movScores = _textScore(text, MOVEMENT_KEYWORDS);
      result.movements = Object.keys(movScores).sort(function (a, b) {
        return movScores[b] - movScores[a];
      }).slice(0, 2);
    }

    if (input.useCase) {
      result.useCases = Array.isArray(input.useCase) ? input.useCase : [input.useCase];
    } else if (text) {
      var ucScores = _textScore(text, USECASE_KEYWORDS);
      result.useCases = Object.keys(ucScores).sort(function (a, b) {
        return ucScores[b] - ucScores[a];
      }).slice(0, 2);
    }

    if (input.colorScheme) {
      result.colorSchemes = Array.isArray(input.colorScheme) ? input.colorScheme : [input.colorScheme];
    } else if (text) {
      var csScores = _textScore(text, COLOR_SCHEME_WORDS);
      result.colorSchemes = Object.keys(csScores).sort(function (a, b) {
        return csScores[b] - csScores[a];
      }).slice(0, 2);
    }

    if (text) {
      var lower = text.toLowerCase();
      Object.keys(SUBTLETY_MAP).forEach(function (cn) {
        if (lower.indexOf(cn.toLowerCase()) !== -1) {
          var eng = SUBTLETY_MAP[cn];
          if (result.moods.indexOf(eng) === -1) result.moods.push(eng);
        }
      });
    }

    return result;
  };

  TemplateMatcher.prototype._score = function (template, analysis, targetFormality, targetDensity) {
    var tags = template.tags || {};
    var score = 0;

    analysis.moods.forEach(function (mood) {
      if (tags.mood === mood) score += 1.0 * this.weights.mood;
      else {
        var moodWords = MOOD_KEYWORDS[mood] || [];
        var tmplMood = tags.mood;
        if (tmplMood) {
          var share = moodWords.filter(function (w) {
            return w.toLowerCase().indexOf(tmplMood) !== -1 || tmplMood.indexOf(w.toLowerCase()) !== -1;
          }).length;
          if (share > 0) score += 0.3 * this.weights.mood * (share / Math.min(moodWords.length, 3));
        }
      }
    }, this);

    analysis.movements.forEach(function (movement) {
      if (tags.movement === movement) score += 1.0 * this.weights.movement;
    }, this);

    analysis.useCases.forEach(function (uc) {
      if (tags.useCase === uc) score += 1.0 * this.weights.useCase;
    }, this);

    analysis.colorSchemes.forEach(function (cs) {
      if (tags.colorScheme === cs) score += 1.0 * this.weights.colorScheme;
    }, this);

    if (targetFormality && tags.formality === targetFormality) {
      score += 1.0 * this.weights.formality;
    }

    if (targetDensity && tags.density === targetDensity) {
      score += 1.0 * this.weights.density;
    }

    return Math.round(score * 1000) / 1000;
  };

  TemplateMatcher.prototype.recommend = function (input) {
    var self = this;
    var inputMood = input.mood;
    var inputMovement = input.movement;
    var inputUseCase = input.useCase;
    var inputColorScheme = input.colorScheme;
    var inputTitle = input.title || input.text || '';
    var inputDescription = input.description || '';

    var analysis = this._analyzeInput(input);

    var targetFormality = input.formality || null;
    var targetDensity = input.density || null;

    var candidates = [];
    var seen = {};

    var addIfNotSeen = function (t) {
      if (!seen[t.id]) {
        seen[t.id] = true;
        candidates.push(t);
      }
    };

    analysis.movements.forEach(function (m) {
      (self._byMovement[m] || []).forEach(addIfNotSeen);
    });
    analysis.moods.forEach(function (m) {
      (self._byMood[m] || []).forEach(addIfNotSeen);
    });
    analysis.useCases.forEach(function (u) {
      (self._byUseCase[u] || []).forEach(addIfNotSeen);
    });
    analysis.colorSchemes.forEach(function (c) {
      (self._byColorScheme[c] || []).forEach(addIfNotSeen);
    });

    if (candidates.length < 20) {
      this.templates.forEach(function (t) {
        if (!seen[t.id]) {
          seen[t.id] = true;
          candidates.push(t);
        }
      });
    }

    var scored = candidates.map(function (t) {
      return {
        template: t,
        score: self._score(t, analysis, targetFormality, targetDensity)
      };
    });

    scored.sort(function (a, b) {
      return b.score - a.score;
    });

    var top = 20;
    return {
      query: input,
      analysis: analysis,
      total: scored.length,
      results: scored.slice(0, top)
    };
  };

  TemplateMatcher.prototype.explain = function (templateId, input) {
    var t = this._byId[templateId];
    if (!t) return null;
    var analysis = this._analyzeInput(input);
    var details = {};
    var tags = t.tags || {};

    var w = this.weights;
    details.mood = {
      input: analysis.moods,
      template: tags.mood,
      match: analysis.moods.indexOf(tags.mood) !== -1,
      weight: w.mood
    };
    details.movement = {
      input: analysis.movements,
      template: tags.movement,
      match: analysis.movements.indexOf(tags.movement) !== -1,
      weight: w.movement
    };
    details.useCase = {
      input: analysis.useCases,
      template: tags.useCase,
      match: analysis.useCases.indexOf(tags.useCase) !== -1,
      weight: w.useCase
    };
    details.colorScheme = {
      input: analysis.colorSchemes,
      template: tags.colorScheme,
      match: analysis.colorSchemes.indexOf(tags.colorScheme) !== -1,
      weight: w.colorScheme
    };

    var score = this._score(t, analysis, input.formality, input.density);
    details.totalScore = score;

    return {
      template: t,
      details: details
    };
  };

  return TemplateMatcher;
}));
