
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
    }
};

export const FIELD_LABELS = {

    subject: { chinese: '主体', english: 'Subject' },
    action: { chinese: '动作/状态', english: 'Action/State' },
    environment: { chinese: '场景', english: 'Environment' },
    theme: { chinese: '核心概念', english: 'Core Concept' },
    style: { chinese: '风格/媒介', english: 'Style/Medium' },
    lighting: { chinese: '光影', english: 'Lighting' },
    effects: { chinese: '光影特效与细节质感', english: 'Effects & Texture' },
    color: { chinese: '色彩与色调策略', english: 'Color & Tone Strategy' },
    mood: { chinese: '氛围', english: 'Mood' },
    composition: { chinese: '镜头构图、画面层次与排版', english: 'Composition & Layers' },
    typography: { chinese: '文字与标题', english: 'Typography & Title' },
    details: { chinese: '细节与互动', english: 'Details & Interaction' },
    quality: { chinese: '质量', english: 'Quality' },
    aspectRatio: { chinese: '画面比例', english: 'Aspect Ratio' },
    model: { chinese: '模型版本', english: 'Model Version' },
    camera: { chinese: '镜头/相机', english: 'Camera' }
};

export const PLACEHOLDERS = {
    quickInput: {
        chinese: '例如：赛博朋克风格的上海街道，下雨天，蓝色霓虹灯...',
        english: 'E.g., Cyberpunk street in Shanghai, raining, blue neon lights...'
    },
    subject: { chinese: '例如：一个未来的武士', english: 'E.g., A futuristic samurai' },
    action: { chinese: '例如：正在检修设备, 回头凝望', english: 'E.g., Repairing equipment, looking back' },
    environment: { chinese: '例如：赛博朋克街道', english: 'E.g., Cyberpunk street' },
    theme: { chinese: '例如：探索与孤独', english: 'E.g., Exploration and loneliness' },
    style: { chinese: '例如：油画, 电影感 3D 渲染', english: 'E.g., Oil painting, Cinematic 3D render' },
    lighting: { chinese: '例如：电影感布光', english: 'E.g., Cinematic lighting' },
    effects: { chinese: '例如：丁达尔光, 胶片颗粒, 粗糙纹理', english: 'E.g., Tyndall effect, film grain, rough texture' },
    color: { chinese: '例如：霓虹蓝和粉色, 暖色调, 对比色...', english: 'E.g., Neon blue and pink, warm tones, contrasting colors...' },
    mood: { chinese: '例如：神秘的', english: 'E.g., Mysterious' },
    composition: { chinese: '例如：特写镜头, 仰视, 多层次背景', english: 'E.g., Close-up, low angle, multi-layered background' },
    typography: { chinese: '例如：大写标题，无衬线字体，霓虹灯文字...', english: 'E.g., Uppercase title, sans-serif font, neon text...' },
    details: { chinese: '例如：眼神接触, 互动手势', english: 'E.g., Eye contact, interactive gestures' },
    negative: { chinese: '模糊, 扭曲, 坏手...', english: 'Blurry, distorted, bad hands...' }
};

export const CATEGORY_NAMES = {
    character: { chinese: '一、角色与肖像类', english: '1. Character & Portrait' },
    scene: { chinese: '二、场景与氛围类', english: '2. Scene & Atmosphere' },
    product: { chinese: '三、产品与商业类', english: '3. Product & Commercial' },
    art: { chinese: '四、风格化与艺术类', english: '4. Style & Art' }
};
