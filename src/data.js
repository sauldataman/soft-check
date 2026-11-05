/** @typedef {'same'|'split'|'none'|'tbd'} Ans */
/** @typedef {'commit'|'mode'|'warn'} Cat */

/** @type {{ value: Ans, label: string }[]} */
export const ansOptions = [
  { value: 'same', label: '同一个人' },
  { value: 'split', label: '不同的人' },
  { value: 'none', label: '暂无' },
  { value: 'tbd', label: '还在想' },
];

/** 词典规模：初版精选 30；现已扩到 93 */
export const TERM_COUNT = 93;

/** @type {{ en: string, zh: string, tip: string, cat: Cat, vibe: string, formality: 1|2|3 }[]} */
export const terms = [
  { en: 'Exclusive', zh: '排他性接触', tip: '还没叫男女朋友，但承诺不睡别人', cat: 'commit', vibe: '轻承诺' , formality: 2 },
  { en: 'Relationship', zh: '正式关系', tip: '有名分、期望与承诺；可对家长介绍', cat: 'commit', vibe: '经典打包' , formality: 3 },
  { en: 'Open Relationship', zh: '开放式关系', tip: '在一起，性可与他人发生（需共识）', cat: 'commit', vibe: '规则型' , formality: 2 },
  { en: 'Polyamory', zh: '多角恋', tip: '同时爱多人，且各方知情同意', cat: 'commit', vibe: '多中心' , formality: 2 },
  { en: 'Platonic', zh: '柏拉图', tip: '精神亲密，无肉体', cat: 'commit', vibe: '心近身远' , formality: 2 },
  { en: 'Married', zh: '已婚', tip: '法律婚姻：权利义务打包最完整', cat: 'commit', vibe: '法律顶配' , formality: 3 },
  { en: 'Divorced', zh: '离异', tip: '游戏重置，标签从已婚回到可选项', cat: 'commit', vibe: '重置' , formality: 3 },
  { en: 'Expiration Date', zh: '保质期关系', tip: '一开始就知道会结束（毕业、签证等）', cat: 'commit', vibe: '有时限' , formality: 2 },
  { en: 'On a Break', zh: '暂时分开', tip: '未正式分手；常是分手序曲', cat: 'commit', vibe: '灰色地带' , formality: 2 },
  { en: 'It\'s Complicated', zh: '情况复杂', tip: 'FB 老状态：一言难尽的混合体', cat: 'commit', vibe: '说不清', formality: 1 },
  { en: 'Soulmate', zh: '灵魂伴侣', tip: '高度契合、懂你的一切（常被浪漫化）', cat: 'commit', vibe: '理想型' , formality: 2 },
  { en: 'Twin Flame', zh: '双生火焰', tip: '灵魂镜像：爱得猛，也常痛得猛', cat: 'commit', vibe: '高燃' , formality: 1 },
  { en: 'Sugar Arrangement', zh: '糖爹 / 糖宝', tip: '金钱与陪伴的明确交换安排', cat: 'commit', vibe: '交易框' , formality: 2 },
  { en: 'Customization-ship', zh: '定制关系', tip: '按需求设计的非传统结构', cat: 'commit', vibe: '量身定做' , formality: 1 },
  { en: 'Formalization-ship', zh: '形式关系', tip: '有外在结构，内在连接未必跟得上', cat: 'commit', vibe: '有壳' , formality: 2 },
  { en: 'Probationship', zh: '试用期关系', tip: '先试用，再决定要不要转正', cat: 'commit', vibe: '试用中' , formality: 1 },
  { en: 'Negotiationship', zh: '协商关系', tip: '不断谈界限与条件的结构型相处', cat: 'commit', vibe: '条款党' , formality: 2 },
  { en: 'Crush', zh: '暗恋', tip: '脑内已过完一生；对方未必知道你', cat: 'mode', vibe: '单机剧' , formality: 2 },
  { en: 'Talking', zh: '聊着呢', tip: '高频聊天，尚未确立其他', cat: 'mode', vibe: '热身中' , formality: 1 },
  { en: 'Textationship', zh: '短信关系', tip: '几乎只活在微信/短信里', cat: 'mode', vibe: '云端恋' , formality: 1 },
  { en: 'Situationship', zh: '情况关系', tip: '比朋友多、比恋人少；无名分', cat: 'mode', vibe: '模糊美' , formality: 1 },
  { en: 'FWB', zh: '炮友', tip: '朋友以上，恋人未满；偏性', cat: 'mode', vibe: '身体优先' , formality: 1 },
  { en: 'Booty Call', zh: '深夜召唤', tip: '常常夜里十一点后才出现', cat: 'mode', vibe: '夜猫' , formality: 1 },
  { en: 'Vacationship', zh: '假期关系', tip: '只在旅行/度假时强烈存在', cat: 'mode', vibe: '度假限定' , formality: 1 },
  { en: 'Long Distance', zh: '异地恋', tip: '主要靠网络与机票维持', cat: 'mode', vibe: '航空局友好' , formality: 2 },
  { en: 'Work Spouse', zh: '办公室夫妻', tip: '职场极信任，通常非浪漫', cat: 'mode', vibe: '工位搭子' , formality: 1 },
  { en: 'Soft Launch', zh: '软发布', tip: '只发手、背影或两杯咖啡', cat: 'mode', vibe: '半官宣' , formality: 1 },
  { en: 'Hard Launch', zh: '硬官宣', tip: '正脸合照：This is mine', cat: 'mode', vibe: '全公开' , formality: 2 },
  { en: 'Flirtationship', zh: '调情关系', tip: '见面就互撩，火花四溅却不升级', cat: 'mode', vibe: '火花党' , formality: 1 },
  { en: 'Curionship', zh: '好奇关系', tip: '因好奇这类型而试；好奇没了就走', cat: 'mode', vibe: '尝鲜' , formality: 1 },
  { en: 'Sneaky Link', zh: '地下情', tip: '见面默契保密，谁都不说', cat: 'mode', vibe: '偷偷的' , formality: 1 },
  { en: 'Instagram Official', zh: 'IG 官宣', tip: '在社交媒体承认对方存在', cat: 'mode', vibe: '社媒官宣' , formality: 2 },
  { en: 'Facebook Official', zh: 'FB 官宣', tip: '改状态 In a Relationship，老派正式', cat: 'mode', vibe: '老派官宣' , formality: 2 },
  { en: 'Entanglement', zh: '纠缠', tip: '剪不断理还乱，常牵第三方', cat: 'mode', vibe: '乱线团' , formality: 1 },
  { en: 'Placeholder', zh: '占位符', tip: '骑驴找马：真爱出现前的凑合位', cat: 'mode', vibe: '暂代' , formality: 1 },
  { en: 'The One That Got Away', zh: '白月光', tip: '最爱却得不到或已失去的那个人', cat: 'mode', vibe: '漏网之鱼' , formality: 2 },
  { en: 'Kitationship', zh: '猫咪式关系', tip: '想来就来、想走就走；亲近但不被养', cat: 'mode', vibe: '猫系' , formality: 1 },
  { en: 'Cuffing', zh: '铐住季', tip: '天冷找人铐一起过冬，春天常解开', cat: 'mode', vibe: '季节限定' , formality: 1 },
  { en: 'Thirst Trap', zh: '渴求陷阱', tip: '发撩人照钓关注/回应（未必要关系）', cat: 'mode', vibe: '钓鱼' , formality: 1 },
  { en: 'Benchtationship', zh: '板凳关系', tip: '长期坐冷板凳却还在队里的关系形态', cat: 'mode', vibe: '替补恋' , formality: 1 },
  { en: 'Stationship', zh: '车站关系', tip: '固定通勤相遇的微妙陌生人连结', cat: 'mode', vibe: '站台缘' , formality: 1 },
  { en: 'Conversationship', zh: '纯聊关系', tip: '聊得很好，但不发展到其他层', cat: 'mode', vibe: '只动嘴' , formality: 2 },
  { en: 'Workationship', zh: '工作暧昧', tip: '工作场合介于专业与私人之间', cat: 'mode', vibe: '工位粉红' , formality: 1 },
  { en: 'Waitationship', zh: '等待关系', tip: '一方干等另一方做决定', cat: 'mode', vibe: '干等' , formality: 1 },
  { en: 'Locationship', zh: '定位关系', tip: '主要靠网络维持的远距连结', cat: 'mode', vibe: '坐标恋' , formality: 1 },
  { en: 'Educationship', zh: '师生式关系', tip: '一方总在教导另一方', cat: 'mode', vibe: '上课中' , formality: 2 },
  { en: 'Procrastinationship', zh: '拖延关系', tip: '双方都推迟定义关系', cat: 'mode', vibe: '再说吧' , formality: 1 },
  { en: 'Imaginationship', zh: '幻想关系', tip: '感情主要活在脑内戏', cat: 'mode', vibe: '脑补' , formality: 1 },
  { en: 'Navigationship', zh: '摸索关系', tip: '还在找相处方式的探索期', cat: 'mode', vibe: '导航中' , formality: 1 },
  { en: 'Expirationship', zh: '临期关系', tip: '双方都知道有明确结束日', cat: 'mode', vibe: '临期特卖' , formality: 1 },
  { en: 'Celebrationship', zh: '庆祝关系', tip: '只在聚会/特殊场合才互动', cat: 'mode', vibe: '局限定' , formality: 1 },
  { en: 'Hibernationship', zh: '冬眠关系', tip: '长期低互动但未结束', cat: 'mode', vibe: '冬眠' , formality: 1 },
  { en: 'Quantum-superpositionship', zh: '量子叠加关系', tip: '同时存在又不存在的薛定谔状态', cat: 'mode', vibe: '叠加态' , formality: 1 },
  { en: 'Hesitationship', zh: '犹豫关系', tip: '两人都不确定要不要再往前', cat: 'mode', vibe: '卡住前进键' , formality: 1 },
  { en: 'Accelerationship', zh: '加速关系', tip: '发展过快、地基不稳', cat: 'mode', vibe: '油门到底' , formality: 1 },
  { en: 'Improvisationship', zh: '即兴关系', tip: '没计划、随性往前滚', cat: 'mode', vibe: '即兴戏' , formality: 1 },
  { en: 'Notification-ship', zh: '通知关系', tip: '互动基本限于点赞评论/消息提醒', cat: 'mode', vibe: '红点恋' , formality: 1 },
  { en: 'Habituationship', zh: '习惯关系', tip: '靠日常惯性维持，激情不多', cat: 'mode', vibe: '惯性' , formality: 2 },
  { en: 'App-proximationship', zh: '应用关系', tip: '主要通过约会软件维持的浅互动', cat: 'mode', vibe: 'App 里' , formality: 1 },
  { en: 'Virtualization-ship', zh: '虚拟关系', tip: '主要活在数字世界', cat: 'mode', vibe: '线上人' , formality: 1 },
  { en: 'Incubationship', zh: '孵化关系', tip: '潜力还在温床里的早期阶段', cat: 'mode', vibe: '孵化器' , formality: 1 },
  { en: 'Explorationship', zh: '探索关系', tip: '一起发现新体验与可能性', cat: 'mode', vibe: '探险队' , formality: 1 },
  { en: 'Recommendation-ship', zh: '推荐关系', tip: '朋友介绍而非自然相遇', cat: 'mode', vibe: '内推' , formality: 2 },
  { en: 'Activation-ship', zh: '激活关系', tip: '只有特定触发条件才互动', cat: 'mode', vibe: '按需开机' , formality: 1 },
  { en: 'Karmic', zh: '业力关系', tip: '互相折磨，像在还债', cat: 'mode', vibe: '还债局' , formality: 1 },
  { en: 'Breadcrumbing', zh: '撒面包屑', tip: '偶尔给甜头，不进也不放', cat: 'warn', vibe: '吊着' , formality: 1 },
  { en: 'Benching', zh: '坐冷板凳', tip: '备胎位；首发受伤才上场', cat: 'warn', vibe: '替补席' , formality: 1 },
  { en: 'Cushioning', zh: '加垫子', tip: '恋着 A 同时撩 B，为分手软着陆', cat: 'warn', vibe: '双线' , formality: 1 },
  { en: 'Ghosting', zh: '人间蒸发', tip: '突然消失，像死了一样', cat: 'warn', vibe: '蒸发' , formality: 1 },
  { en: 'Zombie-ing', zh: '诈尸', tip: '消失几个月后突然 Hey', cat: 'warn', vibe: '诈尸' , formality: 1 },
  { en: 'Orbiting', zh: '卫星环绕', tip: '不靠近也不离开，在动态区转悠', cat: 'warn', vibe: '轨道上' , formality: 1 },
  { en: 'Haunting', zh: '幽灵缠身', tip: '分手不联系，却狂看动态点旧照', cat: 'warn', vibe: '阴魂不散' , formality: 1 },
  { en: 'Relationshit', zh: '糟糕关系', tip: '像屎一样的关系，有毒却分不开', cat: 'warn', vibe: '有毒' , formality: 1 },
  { en: 'Rebound', zh: '反弹', tip: '刚分手为了忘掉前任的替代品', cat: 'warn', vibe: '止痛药' , formality: 2 },
  { en: 'Pseudo-commitment', zh: '伪承诺', tip: '口头承诺，行动对不上', cat: 'warn', vibe: '空头支票' , formality: 2 },
  { en: 'Stagflationship', zh: '停滞关系', tip: '不进展也不结束，高压低成长', cat: 'warn', vibe: '卡住了' , formality: 1 },
  { en: 'Simulationship', zh: '模拟关系', tip: '表面像一段关系，实质空心', cat: 'warn', vibe: '空壳' , formality: 1 },
  { en: 'Dead End', zh: '死胡同', tip: '没有未来，走一步等撞墙', cat: 'warn', vibe: '撞墙' , formality: 2 },
  { en: 'Love Bombing', zh: '爱情轰炸', tip: '前期过度甜蜜灌输，常为控制铺垫', cat: 'warn', vibe: '糖衣炮弹' , formality: 2 },
  { en: 'Slow Fade', zh: '慢消失', tip: '回得越来越少，用冷淡完成分手', cat: 'warn', vibe: '渐隐' , formality: 1 },
  { en: 'Calculationship', zh: '计算关系', tip: '基于利益而非感情的战略连结', cat: 'warn', vibe: '算计' , formality: 1 },
  { en: 'Monetization-ship', zh: '变现关系', tip: '把关系导向经济利益', cat: 'warn', vibe: '变现' , formality: 1 },
  { en: 'Over-idealizationship', zh: '理想化关系', tip: '对对方抱不切实际期望', cat: 'warn', vibe: '滤镜碎' , formality: 1 },
  { en: 'Ghost-and-reincarnationship', zh: '轮回消失', tip: '反复失踪又突然回归', cat: 'warn', vibe: '轮回鬼' , formality: 1 },
  { en: 'Validationship', zh: '验证关系', tip: '主要为了求认可而维持', cat: 'warn', vibe: '刷存在' , formality: 1 },
  { en: 'Examination-ship', zh: '检验关系', tip: '不断测试对方底线或承诺', cat: 'warn', vibe: '测谎仪' , formality: 1 },
  { en: 'Polarization-ship', zh: '极化关系', tip: '在极端情绪间快速切换', cat: 'warn', vibe: '过山车' , formality: 1 },
  { en: 'Continuation-ship', zh: '惯性续命', tip: '本该结束却靠惯性拖着', cat: 'warn', vibe: '拖尸' , formality: 1 },
  { en: 'Frustrationship', zh: '挫折关系', tip: '充满障碍仍不放弃，苦多于甜', cat: 'warn', vibe: '硬撑' , formality: 1 },
  { en: 'Micro-flaketionship', zh: '小鸽子关系', tip: '常放鸽子但关系还在续', cat: 'warn', vibe: '鸽子精' , formality: 1 },
  { en: 'Echo-chamberationship', zh: '回音室关系', tip: '只互相强化已有观点', cat: 'warn', vibe: '回音室' , formality: 1 },
  { en: 'Disassociationship', zh: '疏离关系', tip: '情感上刻意保持距离的保护模式', cat: 'warn', vibe: '关机脸' , formality: 1 },
  { en: 'Interpretationship', zh: '过度解读', tip: '常误解或过度分析彼此言行', cat: 'warn', vibe: '读心过度' , formality: 1 },
];

/**
 * @param {Ans} live
 * @param {Ans} kid
 * @param {Ans} sleep
 * @param {Ans} play
 */
export function reading(live, kid, sleep, play) {
  const vals = [live, kid, sleep, play];
  const splitN = vals.filter((v) => v === 'split').length;
  const sameN = vals.filter((v) => v === 'same').length;
  const noneN = vals.filter((v) => v === 'none').length;
  const tbdN = vals.filter((v) => v === 'tbd').length;

  if (tbdN >= 3) {
    return {
      lead: '还在描线',
      body: '先填最在意的那一项就好，不必急着贴标签。',
      tone: 'info',
    };
  }
  if (sameN === 4) {
    return {
      lead: '经典全能打包',
      body: '四个功能都在同一个人——确认这是你主动选的。',
      tone: 'success',
    };
  }
  if (splitN >= 2) {
    return {
      lead: '功能已拆开',
      body: '住、养、睡、玩不必捆死；重点是知情同意与规则写清。',
      tone: 'info',
    };
  }
  if (splitN === 1 && sameN >= 2) {
    return {
      lead: '主打包 + 一点分流',
      body: '大部分还在一人身上，把分流那一项说清楚即可。',
      tone: 'info',
    };
  }
  if (noneN >= 2) {
    return {
      lead: '空位还不少',
      body: '空着不是失败；先补最痒的那一格。',
      tone: 'warning',
    };
  }
  return {
    lead: '混合搭配中',
    body: '已经不是单一模板——看看下面推给你的词是否贴身。',
    tone: 'info',
  };
}

/**
 * 根据四个功能答案，匹配可能贴在身上的关系词。
 * @param {Ans} live
 * @param {Ans} kid
 * @param {Ans} sleep
 * @param {Ans} play
 * @returns {{ term: typeof terms[number], why: string }[]}
 */
export function matchTerms(live, kid, sleep, play) {
  const vals = [live, kid, sleep, play];
  const splitN = vals.filter((v) => v === 'split').length;
  const sameN = vals.filter((v) => v === 'same').length;
  const noneN = vals.filter((v) => v === 'none').length;
  const tbdN = vals.filter((v) => v === 'tbd').length;

  /** @type {Map<string, string>} */
  const map = new Map();

  /** @param {string} en @param {string} why */
  const add = (en, why) => {
    if (!map.has(en)) map.set(en, why);
  };

  if (sameN === 4) {
    add('Relationship', '四个功能都在同一个人：正式关系模板');
    add('Married', '全能打包常对应法律婚姻顶配');
    add('Exclusive', '功能未拆，排他性通常也在');
    add('Hard Launch', '四合一时，官宣往往也是硬发布');
    add('Soulmate', '全能打包时，人们常会喊出灵魂伴侣');
  }

  if (sleep === 'split' || splitN >= 2) {
    add('Open Relationship', '性或多项功能分给不同人：开放式结构');
    add('Polyamory', '多中心亲密，且需各方知情同意');
    add("It's Complicated", '功能拆开后，状态栏常显示情况复杂');
  }
  if (sleep === 'split') {
    add('FWB', '睡觉已分流：身体关系可能单独存在');
    add('Booty Call', '性功能分出去时，深夜召唤很常见');
    add('Sneaky Link', '分流的性线，常常是默契保密的');
  }

  if (sleep === 'none' && (play === 'same' || live === 'same')) {
    add('Platonic', '有陪伴或同居，但没有性：偏柏拉图');
    add('Conversationship', '无性有聊：更像纯聊关系');
  }

  if (noneN >= 2) {
    add('Situationship', '多个功能空着：比朋友多、比恋人少');
    add('Talking', '格子还空：更像还在聊的阶段');
    add('Simulationship', '空位多却像有一段关系：小心空壳感');
    add('Kitationship', '空位多、来去自由：猫系亲近感');
  }

  if (live === 'none' && sleep === 'same') {
    add('FWB', '不同居但有性：典型炮友结构');
    add('Booty Call', '不住一起、夜里才来：深夜召唤感');
    add('Vacationship', '生活不重叠、身体偶遇：也像假期限定');
    add('Sneaky Link', '不同居的身体线，常走地下');
  }

  if (kid === 'split' || (live === 'split' && sleep === 'same')) {
    add('Polyamory', '亲权分流，或分居却同睡：多中心可能');
    add('Open Relationship', '结构已拆：常走开放式规则');
  }

  if (tbdN >= 2) {
    add('Crush', '多项还在想：脑内戏可能比现实快');
    add('Talking', '尚未定型：仍在聊天热身');
    add('Soft Launch', '不确定时，最多只敢软发布');
    add('Hesitationship', '还在想：典型犹豫关系');
    add('Imaginationship', '未填格时，幻想往往先跑起来');
  }

  if (splitN === 1 && sameN >= 2) {
    add('Relationship', '主功能仍在一人：仍像正式关系底板');
    if (sleep === 'split') {
      add('Open Relationship', '唯一分流在睡觉：开放式性规则');
      add('FWB', '性单独分出：可能另有炮友线');
    }
    if (play === 'split') {
      add('Work Spouse', '玩/陪伴分流：常见办公室搭子');
      add('Platonic', '陪伴另找人：可偏柏拉图支线');
      add('Flirtationship', '陪伴分流时，常停在互撩不升级');
    }
    if (live === 'split') {
      add('Long Distance', '同居分流：生活空间不在一处');
      add('Locationship', '不同住：靠定位与网络维持');
      add('Open Relationship', '不同住但其他功能仍打包：结构已开口');
    }
    if (kid === 'split') {
      add('Polyamory', '亲权分流：抚养与亲密不必同一人');
      add('Open Relationship', '家庭功能已拆：规则要写清');
    }
  }

  if (live === 'none' && play === 'same' && sleep !== 'same') {
    add('Textationship', '不共建生活、主要靠聊：偏短信关系');
    add('Long Distance', '生活不重叠时，陪伴常靠网络');
    add('Notification-ship', '不共建生活时，互动常缩成通知与点赞');
  }

  if (tbdN === 4) {
    add('Crush', '四个都还在想：先从暗恋/脑内戏说起也行');
    add('Talking', '尚未勾选：默认还在聊天区');
    add('Procrastinationship', '四个都还在想：也是一种拖延定义');
  }

  const out = [];
  for (const [en, why] of map) {
    const term = terms.find((t) => t.en === en);
    if (term) out.push({ term, why });
  }
  return out.slice(0, 10);
}

/** 类别短标签 */
export function catLabel(cat) {
  if (cat === 'commit') return '承诺';
  if (cat === 'mode') return '互动';
  return '警示';
}

/** 类别完整说明 */
export function catBlurb(cat) {
  if (cat === 'commit') return '有没有名分 / 规则 / 法律框';
  if (cat === 'mode') return '日常怎么发生（聊、炮、异地…）';
  return '操纵与空心关系信号';
}

/** 类别完整标题（用于全表分组） */
export function catTitle(cat) {
  if (cat === 'commit') return '承诺（结构）';
  if (cat === 'mode') return '互动（形态）';
  return '警示（风险）';
}

export function labelFor(value) {
  return ansOptions.find((o) => o.value === value)?.label ?? '';
}

/** 正式度：3 正式 / 2 中性 / 1 轻松 */
export function formalityLabel(n) {
  if (n >= 3) return '正式';
  if (n === 2) return '中性';
  return '轻松';
}

/** 分类权重：承诺靠前，互动居中，警示靠后 */
function catOrder(cat) {
  if (cat === 'commit') return 0;
  if (cat === 'mode') return 1;
  return 2;
}

/**
 * 正式 → 不正式：同类内 formality 高者靠前；类序承诺→互动→警示
 * @param {typeof terms} list
 */
export function sortByFormality(list) {
  return [...list].sort((a, b) => {
    const c = catOrder(a.cat) - catOrder(b.cat);
    if (c !== 0) return c;
    const f = (b.formality ?? 1) - (a.formality ?? 1);
    if (f !== 0) return f;
    return a.zh.localeCompare(b.zh, 'zh-Hans');
  });
}
