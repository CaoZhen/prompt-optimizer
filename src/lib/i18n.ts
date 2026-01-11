
export type Language = 'chinese' | 'english';

export const UI_LABELS = {
    appTitle: {
        chinese: '图片提示词优化',
        english: 'AI Prompt Optimizer'
    },
    quickMode: {
        chinese: '快速模式',
        english: 'Quick Mode'
    },
    quickModeInputLabel: {
        chinese: '描述你想生成的画面',
        english: 'Describe your idea...'
    },
    standardMode: {

        chinese: '标准模式',
        english: 'Standard Mode'
    },
    loadTemplate: {
        chinese: '加载模板',
        english: 'Load Template'
    },
    settings: {
        chinese: '设置',
        english: 'Settings'
    },
    language: {
        chinese: '语言',
        english: 'Language'
    },
    poweredBy: {
        chinese: 'Powered by DeepSeek AI',
        english: 'Powered by DeepSeek AI'
    },
    generate: {
        chinese: '生成提示词',
        english: 'Generate'
    },
    generatedResult: {
        chinese: '生成结果',
        english: 'Generated Result'
    },
    copy: {
        chinese: '复制',
        english: 'Copy'
    },
    copied: {
        chinese: '已复制',
        english: 'Copied'
    },
    copyPrompt: {
        chinese: '复制提示词',
        english: 'Copy Prompt'
    },
    structuring: {
        chinese: '解析结构中',
        english: 'Structuring...'
    },
    structureFailed: {
        chinese: '结构解析失败',
        english: 'Structure Failed'
    },
    refine: {
        chinese: '进入标准模式微调',
        english: 'Refine in Standard Mode'
    },
    structureJson: {
        chinese: 'JSON 结构',
        english: 'Structure (JSON)'
    },
    targetModel: {
        chinese: '选择目标模型',
        english: 'Target Model'
    },
    coreElements: {
        chinese: '核心要素',
        english: 'Core Elements'
    },
    visualModifiers: {
        chinese: '视觉修饰',
        english: 'Visual Modifiers'
    },
    technicalSpecs: {
        chinese: '技术参数',
        english: 'Technical Specs'
    },
    negativePrompt: {
        chinese: '负面提示',
        english: 'Negative Prompt'
    },
    finalPrompt: {
        chinese: '最终提示词',
        english: 'Final Prompt'
    },
    reference: {
        chinese: '原始提示词',
        english: 'Input Prompt'
    },
    deepSeekConfig: {
        apiKeyConfigured: { chinese: '已配置 API Key (仅本地保存)', english: 'API Key Configured (Local Only)' },
        remove: { chinese: '移除', english: 'Remove' },
        title: { chinese: '配置 DeepSeek API Key', english: 'Configure API Key' },
        description: {
            chinese: '未检测到服务器端 API Key。请输入您的 DeepSeek API Key 以使用此功能。您的 Key 仅存储在本地浏览器中。',
            english: 'Server API key is not configured. Please enter your DeepSeek API key to use this feature. Your key is stored locally in your browser.'
        },
        test: { chinese: '测试', english: 'Test' },
        save: { chinese: '保存', english: 'Save' },
        connectionSuccess: { chinese: '连接成功！', english: 'Connection successful!' },
        connectionFailed: { chinese: '连接失败', english: 'Connection failed' },
        networkError: { chinese: '网络错误', english: 'Network error occurred' }
    },
    styleSelection: {
        title: { chinese: '选择一种风格', english: 'Select a Style' },
        description: {
            chinese: '我们无法自动确定最匹配的风格。请手动选择一种：',
            english: 'We could not automatically detect the style. Please choose one:'
        },
        cancel: { chinese: '取消', english: 'Cancel' }
    },
    styleNames: {
        general: { chinese: '通用 / 综合', english: 'General / Universal' },
        photography: { chinese: '摄影', english: 'Photography' },
        'traditional-art': { chinese: '传统艺术', english: 'Traditional Art' },
        'digital-art': { chinese: '数字艺术 & 3D', english: 'Digital Art & 3D' },
        anime: { chinese: '动漫 & 插画', english: 'Anime & Illustration' },
        custom: { chinese: '自定义风格', english: 'Custom Style' }
    },
    styleDescriptions: {
        general: {
            chinese: '适用于大多数主题，平衡细节与创造力。',
            english: 'Versatile style suitable for most subjects, balancing detail and creativity.'
        },
        photography: {
            chinese: '写实摄影、电影镜头、纪录片及商业拍摄。',
            english: 'Realistic photography, cinematic shots, and documentation.'
        },
        'traditional-art': {
            chinese: '油画、素描、水彩、水墨及古典艺术风格。',
            english: 'Oil painting, sketch, watercolor, and ink styles.'
        },
        'digital-art': {
            chinese: '赛博朋克、3D 渲染、故障艺术及现代设计。',
            english: 'Cyberpunk, 3D Renders, Glitch Art, and Modern Design.'
        },
        anime: {
            chinese: '日系动漫、漫画、卡通及赛璐珞风格。',
            english: 'Japanese Anime, Manga, Cartoons, and Cel-Shaded styles.'
        },
        custom: {
            chinese: '自定义风格',
            english: 'Custom Style'
        }
    },
    customStyle: {
        placeholder: {
            chinese: '输入风格名称（例如：像素艺术、极简主义...）',
            english: 'Enter style name (e.g. Pixel Art, Minimalism...)'
        },
        description: {
            chinese: '输入您想要的任何视觉风格。',
            english: 'Enter any visual style you desire.'
        }
    }
};

export const FIELD_LABELS = {

    subject: { chinese: '主体与动态', english: 'Subject & Action' },
    spatialRelationship: { chinese: '互动与空间关系', english: 'Interaction & Spatial' },
    environment: { chinese: '场景', english: 'Environment' },
    theme: { chinese: '核心概念', english: 'Core Concept' },
    style: { chinese: '风格/媒介', english: 'Style/Medium' },
    lighting: { chinese: '光影', english: 'Lighting' },
    effects: { chinese: '视觉特效及纹理质感', english: 'Visual Effects & Texture' },
    colorMood: { chinese: '色调与氛围', english: 'Color & Mood' },
    composition: { chinese: '镜头与构图', english: 'Shot & Composition' },
    visualLayers: { chinese: '画面层次', english: 'Visual Layers' },
    typography: { chinese: '文字与排版', english: 'Typography & Layout' },
    details: { chinese: '细节', english: 'Details' },
    quality: { chinese: '质量', english: 'Quality' },
    aspectRatio: { chinese: '画面比例', english: 'Aspect Ratio' },
    model: { chinese: '模型版本', english: 'Model Version' },
    camera: { chinese: '镜头/相机', english: 'Camera' },
    artisticReference: { chinese: '艺术参考', english: 'Artistic Reference' }
};

export const PLACEHOLDERS = {
    quickInput: {
        chinese: '例如：赛博朋克风格的上海街道，下雨天，蓝色霓虹灯...',
        english: 'E.g., Cyberpunk street in Shanghai, raining, blue neon lights...'
    },
    subject: { chinese: '例如：一个未来的武士，正在检修设备，回头凝望...', english: 'E.g., A futuristic samurai, repairing equipment, looking back...' },
    spatialRelationship: { chinese: '例如：主体位于画面中心，与周围环境互动，前后错落的层次', english: 'E.g., Subject in center, interacting with surroundings, foreground/background layers' },
    environment: { chinese: '例如：赛博朋克街道', english: 'E.g., Cyberpunk street' },
    theme: { chinese: '例如：探索与孤独', english: 'E.g., Exploration and loneliness' },
    style: { chinese: '例如：油画, 电影感 3D 渲染', english: 'E.g., Oil painting, Cinematic 3D render' },
    lighting: { chinese: '例如：电影感布光', english: 'E.g., Cinematic lighting' },
    effects: { chinese: '例如：丁达尔光, 胶片颗粒, 粗糙纹理', english: 'E.g., Tyndall effect, film grain, rough texture' },
    colorMood: { chinese: '例如：霓虹蓝和粉色, 忧郁的氛围, 暖色调', english: 'E.g., Neon blue and pink, melancholic mood, warm tones' },
    composition: { chinese: '例如：特写镜头, 仰视, 黄金分割构图', english: 'E.g., Close-up, low angle, rule of thirds' },
    visualLayers: { chinese: '例如：前景花朵虚化，主体在中景，远处有连绵雪山', english: 'E.g., Blurred flowers in foreground, subject in middle ground, snowy mountains in distance' },
    typography: { chinese: '例如：大写标题，无衬线字体，文字紧凑排布在底部', english: 'E.g., Uppercase title, sans-serif font, text tightly arranged at the bottom' },
    details: { chinese: '例如：眼神接触, 互动手势', english: 'E.g., Eye contact, interactive gestures' },
    negative: { chinese: '模糊, 扭曲, 坏手...', english: 'Blurry, distorted, bad hands...' },
    artisticReference: { chinese: '例如：梵高，赛博朋克 2077，吉卜力工作室', english: 'E.g., Van Gogh, Cyberpunk 2077, Studio Ghibli' }
};

export const CATEGORY_NAMES = {
    character: { chinese: '一、角色与肖像类', english: '1. Character & Portrait' },
    scene: { chinese: '二、场景与氛围类', english: '2. Scene & Atmosphere' },
    product: { chinese: '三、产品与商业类', english: '3. Product & Commercial' },
    art: { chinese: '四、风格化与艺术类', english: '4. Style & Art' }
};
