import { Template } from './types';

export const TEMPLATES: Template[] = [
    // --- 一、角色与肖像类 (Character & Portrait) ---
    {
        id: 'char-movie-portrait',
        name: '角色_电影级主角肖像',
        description: '高质感、电影布光的英雄主角特写',
        category: 'character',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '一名饱经风霜的探险家，凝视远方，眼神坚毅',
            spatialRelationship: "主体占据画面中心，背景虚化处理",
            environment: '模糊的暴风雪背景',
            theme: '勇气与生存',
            style: '电影感人像摄影 (Cinematic Portrait)',
            modifiers: {
                lighting: '伦勃朗光，戏剧性阴影',
                visualLayers: "",
                composition: '面部特写 (Close-up)，浅景深',
                details: '面部纹理清晰，胡茬，雪花落在睫毛上',
                effects: '胶片颗粒，辉光',
                typography: '',
                colorMood: '冷色调，低饱和度。冷钢蓝与暗灰 (Steel Blue & Dark Grey)'
            },
            technical: {
                camera: '85mm f/1.2 lens',
                quality: '8k, masterpiece, raw photo',
                aspectRatio: '9:16',
                model: '--v 6.0'
            },
            negative: 'cartoon, 3d, painting, smooth skin, makeup'
        }
    },
    {
        id: 'char-anime-tachie',
        name: '角色_二次元角色立绘',
        description: '精美、高完成度的游戏角色设计',
        category: 'character',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '赛博风格的猫耳少女黑客，漂浮在空中，操控全息键盘',
            spatialRelationship: "悬浮于画面中央，由全息界面环绕",
            environment: '简单的科技感几何背景',
            theme: '未来科技',
            style: '日系二次元厚涂 (Anime Impasto)',
            modifiers: {
                lighting: '轮廓光，霓虹发光',
                visualLayers: "",
                composition: '全身立绘 (Full Body)，动态姿势',
                details: '半透明机械义肢，全息数据流',
                effects: '流动的数据光效',
                typography: '',
                colorMood: '赛博霓虹色 (Neon Colors)。品红与青色 (Magenta & Cyan)'
            },
            technical: {
                quality: 'best quality, illustration, detailed',
                aspectRatio: '9:16',
                model: '--niji 6'
            },
            negative: 'lowres, bad anatomy, bad hands, text'
        }
    },
    {
        id: 'char-concept-sheet',
        name: '角色_概念设计角色表',
        description: '包含三视图（正侧背）的角色设定图',
        category: 'character',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '奇幻骑士角色，展示正视图、侧视图、背视图',
            spatialRelationship: "三个视图并排展示，保持等距",
            environment: '纯色中性背景 (Neutral Background)',
            theme: '角色设定集 (Character Sheet)',
            style: '概念艺术 (Concept Art)',
            modifiers: {
                lighting: '平光，无阴影干扰',
                visualLayers: "",
                composition: '三视图并排 (Three views)，全身',
                details: '盔甲细节，武器设定拆解',
                effects: '',
                typography: '标注设计细节',
                colorMood: '清晰的固有色。金属银与皇家蓝 (Silver & Royal Blue)'
            },
            technical: {
                quality: 'design sheet, reference'
            },
            negative: 'dramatic lighting, heavy shadows, perspective distortion'
        }
    },
    {
        id: 'char-retro-photo',
        name: '角色_复古肖像摄影',
        description: '90年代胶片质感的复古人像',
        category: 'character',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '一位穿着牛仔外套的卷发青年，靠在旧车旁，手持可乐',
            spatialRelationship: "身体倚靠在车门上，与环境产生物理接触",
            environment: '90年代美国街头，夕阳',
            theme: '怀旧青春',
            style: '复古胶片摄影 (Vintage Film Photography)',
            modifiers: {
                lighting: '暖黄夕阳，漏光效果 (Light Leaks)',
                visualLayers: "",
                composition: '中景 (Medium Shot)',
                details: '噪点，褪色感',
                effects: '胶片划痕，光晕',
                typography: '',
                colorMood: '柯达胶片色调 (Kodak Portra)。暖黄与复古红 (Warm Yellow & Vintage Red)'
            },
            technical: {
                camera: '35mm film camera',
                quality: 'analog aesthetic'
            },
            negative: 'digital, hd, sharp, modern'
        }
    },
    {
        id: 'char-fantasy-race',
        name: '角色_奇幻种族特写',
        description: '展现特殊皮肤纹理与特征的奇幻生物',
        category: 'character',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '森林精灵弓箭手，警觉地聆听',
            spatialRelationship: "主体与背景森林融为一体，半遮挡",
            environment: '发光的魔法森林',
            theme: '自然与魔法',
            style: 'CG 渲染，超写实',
            modifiers: {
                lighting: '生物荧光，点光',
                visualLayers: "",
                composition: '极度特写 (Extreme Close-up)',
                details: '尖耳朵，树叶状皮肤纹理，发光瞳孔',
                effects: '飘浮的孢子',
                typography: '',
                colorMood: '翠绿与金。森林绿与荧光蓝 (Forest Green & Bioluminescent Blue)'
            },
            technical: {
                quality: 'unreal engine 5, 8k',
                aspectRatio: '1:1'
            },
            negative: 'human skin, plain'
        }
    },

    // --- 二、场景与氛围类 (Scene & Atmosphere) ---
    {
        id: 'scene-epic-movie',
        name: '场景_史诗感电影开场',
        description: '宏大、震撼的宽画幅电影场景',
        category: 'scene',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '古老的巨型遗迹，屹立在荒漠之中',
            spatialRelationship: "遗迹位于远景，与周围沙漠形成巨大尺度对比",
            environment: '无垠的沙漠，巨大的星球悬挂在天边',
            theme: '渺小与宏大',
            style: 'IMAX 电影摄影 (IMAX Cinematography)',
            modifiers: {
                lighting: '黄金时刻，长阴影',
                visualLayers: "",
                composition: '超广角 (Ultra Wide Angle)，极宽画幅',
                details: '微小的探险队作为比例尺',
                effects: '沙尘暴，热浪扭曲',
                typography: '电影标题 "DUNE"',
                colorMood: '橙黄与青蓝对比 (Orange & Teal)。沙黄与天空蓝 (Sand & Sky)'
            },
            technical: {
                aspectRatio: '21:9',
                quality: 'movie still, blockbuster'
            },
            negative: 'blur, messy, low resolution'
        }
    },
    {
        id: 'scene-healing-landscape',
        name: '场景_宁静治愈风景',
        description: '清新、治愈系自然风光',
        category: 'scene',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '山坡上的小木屋，静静伫立',
            spatialRelationship: "木屋坐落在山坡中景，融入自然环境",
            environment: '开满野花的山坡，远处的雪山，蓝天白云',
            theme: '宁静与治愈',
            style: '宫崎骏动画背景风格 (Ghibli Background Art)',
            modifiers: {
                lighting: '明亮的日光，透彻',
                visualLayers: "",
                composition: '全景 (Panorama)',
                details: '摇曳的草，飞鸟',
                effects: '微风感，云影',
                typography: '',
                colorMood: '清新绿，天蓝。草绿与天蓝 (Fresh Green & Sky Blue)'
            },
            technical: {
                aspectRatio: '16:9',
                model: '--niji 6',
                quality: 'high quality, detailed'
            },
            negative: 'dark, gloomy, scary'
        }
    },
    {
        id: 'scene-cyberpunk-city',
        name: '场景_赛博朋克都市夜景',
        description: '高对比度、霓虹闪烁的未来都市',
        category: 'scene',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '雨夜的未来都市街道，飞行汽车穿梭',
            spatialRelationship: "飞行器在建筑间穿梭，形成动态视觉引导",
            environment: '高耸入云的摩天大楼，全息广告牌',
            theme: '高科技低生活 (High Tech Low Life)',
            style: '赛博朋克概念艺术 (Cyberpunk Concept Art)',
            modifiers: {
                lighting: '各种霓虹灯光，反射',
                visualLayers: "",
                composition: '仰视镜头 (Low Angle)，强调建筑高度',
                details: '湿漉漉的地面反射，蒸汽',
                effects: '雨丝，故障艺术效果 (Glitch)',
                typography: '汉字霓虹招牌',
                colorMood: '赛博朋克色板 (Cyberpunk Palette)。紫罗兰与激光红 (Violet & Laser Red)'
            },
            technical: {
                quality: 'ray tracing, octane render'
            },
            negative: 'sunny, clean, nature'
        }
    },
    {
        id: 'scene-fantasy-world',
        name: '场景_奇幻世界探索',
        description: '充满想象力的异世界景观',
        category: 'scene',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '漂浮的天空岛屿，瀑布从边缘倾泻而下',
            spatialRelationship: "岛屿群悬浮于云海之上，高低错落",
            environment: '云海之上，巨大的彩虹',
            theme: '探索未知',
            style: '幻想插画 (Fantasy Illustration)',
            modifiers: {
                lighting: '梦幻柔光',
                visualLayers: "",
                composition: '鸟瞰视角 (Aerial View)',
                details: '飞龙，古老的神庙',
                effects: '云雾缭绕，魔法光尘',
                typography: '',
                colorMood: '粉紫色的云彩。梦幻粉与蓝 (Pastel Pink & Blue)'
            },
            technical: {
                aspectRatio: '16:9',
                quality: 'masterpiece, best quality'
            },
            negative: 'realistic, gritty'
        }
    },
    {
        id: 'scene-interior-design',
        name: '场景_室内设计效果图',
        description: '现代简约风格的室内装修参考',
        category: 'scene',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '现代极简客厅',
            spatialRelationship: "室内空间与窗外森林通过落地窗形成视觉连接",
            environment: '落地窗，透过窗户看到森林',
            theme: '舒适与格调',
            style: '建筑可视化渲染 (ArchViz)',
            modifiers: {
                lighting: '漫射自然光，柔和',
                visualLayers: "",
                composition: '一点透视 (One-point Perspective)',
                details: '设计师家具，大理石纹理',
                effects: '极简',
                typography: '',
                colorMood: '米色与原木色 (Beige & Wood)。温暖中性色 (Warm Neutrals)'
            },
            technical: {
                quality: 'photorealistic, 8k, interior design'
            },
            negative: 'messy, dark, cluttered'
        }
    },

    // --- 三、产品与商业类 (Product & Commercial) ---
    {
        id: 'product-poster',
        name: '设计_品牌营销海报',
        description: '具有视觉冲击力的商业海报设计',
        category: 'product',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '新款运动鞋，悬浮在空中，正在解体或组装',
            spatialRelationship: "鞋子部件呈爆炸视分解构，悬浮分布",
            environment: '动态的几何背景',
            theme: '速度与创新',
            style: '商业广告设计 (Commercial Advertisement)',
            modifiers: {
                lighting: '高调摄影，边缘光',
                visualLayers: "",
                composition: '中心构图，留白给文案',
                details: '鞋带飞舞，材质细节',
                effects: '速度线，爆炸效果',
                typography: '预留标题位置',
                colorMood: '品牌主色调。活力橙与黑 (Energetic Orange & Black)'
            },
            technical: {
                aspectRatio: '3:4',
                quality: 'high end'
            },
            negative: 'text, watermark, low quality'
        }
    },
    {
        id: 'product-concept',
        name: '设计_产品概念渲染',
        description: '工业设计风格的概念草图渲染',
        category: 'product',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '未来的透明智能手机，展示正反面',
            spatialRelationship: "产品悬空展示，正反面并通过镜像呈现",
            environment: '深色极简背景',
            theme: '极简未来主义',
            style: '工业设计渲染 (Industrial Design Render)',
            modifiers: {
                lighting: '演播室灯光，反射光',
                visualLayers: "",
                composition: '45度角展示',
                details: '内部芯片结构隐约可见',
                effects: '焦散，光泽',
                typography: '',
                colorMood: '玻璃质感，金属色。银白与通透 (Silver & Transparent)'
            },
            technical: {
                quality: 'keyshot, blender, octane'
            },
            negative: 'rough, sketch'
        }
    },
    {
        id: 'product-book-cover',
        name: '设计_极简主义书封',
        description: '抽象、富有哲理的书籍封面',
        category: 'product',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '一个孤独的几何图形（圆或方），漂浮在虚空中',
            spatialRelationship: "几何体悬浮于绝对的虚空之中",
            environment: '大面积留白',
            theme: '哲学与思考',
            style: '极简平面设计 (Minimalist Graphic Design)',
            modifiers: {
                lighting: '平光',
                visualLayers: "",
                composition: '极简构图，负空间',
                details: '纸张纹理',
                effects: '微妙的阴影',
                typography: '优雅的衬线体标题',
                colorMood: '单色或双色搭配。克莱因蓝与白 (Klein Blue & White)'
            },
            technical: {
                aspectRatio: '2:3',
                quality: 'vector style'
            },
            negative: 'complex, busy, photo'
        }
    },
    {
        id: 'product-fashion',
        name: '设计_时尚大片平拍',
        description: '高端服装或饰品的平铺摄影',
        category: 'product',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '整套丝绸睡衣与配饰，艺术地摆放在平面上',
            spatialRelationship: "物品按几何规律精心摆放，俯视平面布局",
            environment: '大理石台面或丝绒布背景',
            theme: '奢华生活',
            style: '时尚平拍 (Fashion Flat Lay)',
            modifiers: {
                lighting: '柔光箱，无阴影',
                visualLayers: "",
                composition: '俯视全景 (Top Down View)',
                details: '布料褶皱，金属光泽',
                effects: '',
                typography: '',
                colorMood: '柔和的高级灰。香槟金与珍珠白 (Champagne & Pearl)'
            },
            technical: {
                camera: '50mm',
                quality: 'high fashion, detailed'
            },
            negative: 'mannequin, body'
        }
    },
    {
        id: 'product-3c',
        name: '设计_3C产品白底图',
        description: '电商专用的干净白底产品图',
        category: 'product',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '无线降噪耳机，悬浮展示',
            spatialRelationship: "产品居中悬浮，底部有轻微倒影",
            environment: '纯白背景 (Pure White Background)',
            theme: '电商主图',
            style: '电商产品摄影 (E-commerce Photography)',
            modifiers: {
                lighting: '通透的布光，强调质感',
                visualLayers: "",
                composition: '居中，完整展示',
                details: '高光，材质纹理',
                effects: '无杂质',
                typography: '',
                colorMood: '白色与产品本色。黑与白 (Black & White)'
            },
            technical: {
                aspectRatio: '1:1',
                quality: 'studio shot, 4k'
            },
            negative: 'shadows, grey background, reflection'
        }
    },

    // --- 四、风格化与艺术类 (Style & Art) ---
    {
        id: 'art-ink',
        name: '艺术_新中式水墨意境',
        description: '结合现代审美的传统水墨画',
        category: 'art',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '一叶扁舟，行驶在烟雨江南',
            spatialRelationship: "孤舟位于画面留白处，渺小而点睛",
            environment: '层叠的远山，留白的江水',
            theme: '禅意与自然',
            style: '中国水墨画 (Chinese Ink Wash Painting)',
            modifiers: {
                lighting: '散点透视，无特定光源',
                visualLayers: "",
                composition: '留白 (Negative Space)，气韵生动',
                details: '墨色的晕染，笔触',
                effects: '宣纸纹理',
                typography: '书法落款',
                colorMood: '黑白灰与朱砂红点缀。墨黑与朱红 (Ink Black & Cinnabar)'
            },
            technical: {
                model: '--niji 6',
                quality: 'best quality, traditional art'
            },
            negative: 'photo, realistic, 3d'
        }
    },
    {
        id: 'art-retro-scifi',
        name: '艺术_复古科幻杂志插画',
        description: '70-80年代科幻小说封面风格',
        category: 'art',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '复古宇航员，在异星探索',
            spatialRelationship: "人物渺小，位于前景，仰望巨大的外星植物",
            environment: '巨大的外星植物，双月同天',
            theme: '黄金时代科幻',
            style: '复古科幻插画 (Retro Sci-Fi Illustration)',
            modifiers: {
                lighting: '鲜艳的色彩，高饱和',
                visualLayers: "",
                composition: '充满画面',
                details: '喷枪质感 (Airbrush)',
                effects: '老旧纸张纹理',
                typography: '',
                colorMood: '复古色调。复古橙与青 (Retro Orange & Teal)'
            },
            technical: {
                quality: 'detailed'
            },
            negative: 'modern, 3d render, cg'
        }
    },
    {
        id: 'art-ghibli',
        name: '艺术_吉卜力风格场景',
        description: '宫崎骏风格的清新动画手绘',
        category: 'art',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '充满了魔法道具的小房间，阳光洒在桌面上',
            spatialRelationship: "拥挤而温馨的室内布局，充满生活痕迹",
            environment: '温馨杂乱的魔法工坊',
            theme: '童话与生活',
            style: '吉卜力工作室风格 (Studio Ghibli Style)',
            modifiers: {
                lighting: '美丽的自然光，透视',
                visualLayers: "",
                composition: '充满生活气息的细节',
                details: '细腻的手绘线条',
                effects: '水彩笔触',
                typography: '',
                colorMood: '丰富的水彩质感。水彩系 (Watercolors)'
            },
            technical: {
                model: '--niji 6',
                quality: 'best quality, anime style'
            },
            negative: 'photorealistic, dark'
        }
    },
    {
        id: 'art-pixel',
        name: '艺术_低保真像素艺术',
        description: '8-bit 或 16-bit 像素风格画作',
        category: 'art',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '赛博朋克街机厅，闪烁的屏幕',
            spatialRelationship: "街道建筑呈等轴测排列 (Isometric)",
            environment: '昏暗的街道角落',
            theme: '复古游戏',
            style: '像素艺术 (Pixel Art)',
            modifiers: {
                lighting: '像素化的光影',
                visualLayers: "",
                composition: '等轴测视角 (Isometric)',
                details: '方块感',
                effects: '抖动 (Dithering)',
                typography: '像素字体',
                colorMood: '有限色盘 (Limited Palette)。霓虹像素 (Neon Pixel)'
            },
            technical: {
                quality: '8-bit, 16-bit'
            },
            negative: 'smooth, blur, vector, high res'
        }
    },
    {
        id: 'art-dark-sculpture',
        name: '艺术_暗黑神话雕塑感',
        description: '充满张力的暗黑风格雕塑材质',
        category: 'art',
        recommendedPlatform: 'midjourney',
        structure: {
            subject: '堕落天使雕像，痛苦地挣扎',
            spatialRelationship: "雕像孤独矗立于黑暗虚空中心",
            environment: '虚无的黑暗',
            theme: '痛苦与救赎',
            style: '暗黑神话 (Dark Fantasy), 雕塑摄影',
            modifiers: {
                lighting: '顶光，强烈的明暗对比 (Chiaroscuro)',
                visualLayers: "",
                composition: '庄严，对称',
                details: '大理石纹理，破碎的翅膀',
                effects: '烟雾',
                typography: '',
                colorMood: '单色，从黑到白。黑曜石与大理石 (Obsidian & Marble)'
            },
            technical: {
                camera: 'telephoto',
                quality: 'zbrush style, 3d scan'
            },
            negative: 'color, happy, anime'
        }
    }
];
