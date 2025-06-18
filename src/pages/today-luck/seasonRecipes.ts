export interface Recipe {

title: string;

description: string;

}

export type SeasonRecipes = {

[season: string]: Recipe[];

};

const seasonRecipes: SeasonRecipes = {

spring: [

{

title: '春笋炒肉',

description: '春季鲜笋正当季，富含膳食纤维和维生素，搭配瘦肉提供优质蛋白，助您春季养肝健脾。'

},

{

title: '香椿拌豆腐',

description: '香椿是春季特有的食材，与豆腐搭配，清香爽口，富含植物蛋白和钙质，适合春季养肝。'

},

{

title: '荠菜春卷',

description: '荠菜富含维生素和矿物质，包裹在酥脆的春卷皮中，是春季不可错过的时令美食。'

},

{

title: '韭菜炒虾仁',

description: '韭菜温补阳气，虾仁高蛋白低脂肪，两者搭配是春季提升活力的理想选择。'

},

{

title: '清蒸鲈鱼',

description: '春季鲈鱼肉质鲜美，清蒸做法保留原汁原味，富含优质蛋白和不饱和脂肪酸。'

}

],

summer: [

{

title: '苦瓜炒蛋',

description: '苦瓜清热解暑，富含维生素C，搭配鸡蛋提供优质蛋白，是夏季消暑的绝佳选择。'

},

{

title: '凉拌黄瓜',

description: '黄瓜清脆爽口，富含水分和钾元素，简单凉拌即可成为夏季开胃的清凉小菜。'

},

{

title: '绿豆薏米汤',

description: '绿豆清热解毒，薏米利湿消肿，是夏季祛湿解暑的传统养生汤品。'

},

{

title: '酸梅汤',

description: '乌梅生津止渴，山楂开胃消食，是夏季解渴消暑的传统饮品。'

},

{

title: '蒜蓉空心菜',

description: '空心菜是夏季时令蔬菜，富含膳食纤维和维生素，蒜蓉清炒，清爽可口。'

}

],

autumn: [

{

title: '冰糖雪梨',

description: '秋梨润肺生津，搭配冰糖慢炖，滋润喉咙，缓解秋燥，特别适合干燥的秋季。'

},

{

title: '板栗烧鸡',

description: '板栗香甜软糯，鸡肉温补，是秋季滋养脾胃、补充能量的美味佳肴。'

},

{

title: '银耳莲子羹',

description: '银耳滋阴润肺，莲子养心安神，是秋季润燥养颜的经典甜品。'

},

{

title: '山药排骨汤',

description: '山药健脾益胃，排骨提供优质蛋白，是秋季温补养生的理想汤品。'

},

{

title: '蟹黄豆腐',

description: '秋季螃蟹肥美，蟹黄与豆腐的搭配，鲜美滑嫩，富含蛋白质和钙质。'

}

],

winter: [

{

title: '羊肉萝卜汤',

description: '羊肉温补驱寒，萝卜顺气消食，冬日里一碗热汤，暖身暖心，增强抵抗力。'

},

{

title: '红烧肉',

description: '五花肉肥而不腻，慢火炖煮入味，是冬季补充能量的经典家常菜。'

},

{

title: '姜母鸭',

description: '老姜驱寒暖身，鸭肉滋阴补虚，特别适合寒冷冬季的温补药膳。'

},

{

title: '八宝粥',

description: '多种谷物豆类混合熬煮，营养丰富易消化，是冬季早餐的温暖选择。'

},

{

title: '火锅',

description: '冬季围炉火锅，自选新鲜食材，暖身又美味，是冬季聚餐的极佳选择。'

}

]

};

export default seasonRecipes;