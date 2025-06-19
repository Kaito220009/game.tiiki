// まちこうばダンジョン - ゲームデータ定義

// 調整.txtファイルからデータを読み込む機能
let adjustmentData = null;

// 調整データを読み込む関数
export const loadAdjustmentData = async () => {
  if (adjustmentData) return adjustmentData;
  
  try {
    const response = await fetch('/adjustment.txt');
    const text = await response.text();
    adjustmentData = parseAdjustmentData(text);
    return adjustmentData;
  } catch (error) {
    console.warn('調整.txtファイルの読み込みに失敗しました。デフォルト値を使用します。', error);
    return getDefaultAdjustmentData();
  }
};

// 調整データをパースする関数
const parseAdjustmentData = (text) => {
  const data = {
    weapons: {},
    enemies: {},
    dungeons: {},
    constants: {}
  };
  
  const lines = text.split('\n');
  let currentSection = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    
    if (trimmed.includes('武器データ')) {
      currentSection = 'weapons';
    } else if (trimmed.includes('敵データ')) {
      currentSection = 'enemies';
    } else if (trimmed.includes('ダンジョンデータ')) {
      currentSection = 'dungeons';
    } else if (trimmed.includes('数値調整用定数')) {
      currentSection = 'constants';
    } else if (trimmed.includes(',')) {
      const parts = trimmed.split(',');
      
      if (currentSection === 'weapons' && parts.length >= 8) {
        const [id, name, attribute, weightClass, rarity, baseAttack, critRate, effect, image] = parts;
        data.weapons[id] = {
          id,
          name,
          attribute,
          weightClass,
          rarity,
          baseAttack: parseInt(baseAttack),
          critRate: parseFloat(critRate),
          effect: effect || null,
          image
        };
      } else if (currentSection === 'enemies' && parts.length >= 9) {
        const [id, name, attribute, maxHp, attack, defense, exp, isBoss, image, imageClass] = parts;
        data.enemies[id] = {
          id,
          name,
          attribute,
          maxHp: parseInt(maxHp),
          attack: parseInt(attack),
          defense: parseInt(defense),
          exp: parseInt(exp),
          isBoss: isBoss === 'true',
          image,
          imageClass
        };
      } else if (currentSection === 'dungeons' && parts.length >= 6) {
        const [id, name, attribute, recommendedAttribute, enemiesStr, image] = parts;
        data.dungeons[id] = {
          id,
          name,
          attribute,
          recommendedAttribute,
          enemies: enemiesStr.split('|'),
          image
        };
      } else if (currentSection === 'constants' && parts.length >= 2) {
        const [key, value] = parts;
        data.constants[key] = parseFloat(value);
      }
    }
  }
  
  return data;
};

// デフォルト調整データを取得する関数
const getDefaultAdjustmentData = () => ({
  constants: {
    RARITY_N_MULTIPLIER: 0.9,
    RARITY_R_MULTIPLIER: 1.0,
    RARITY_SR_MULTIPLIER: 1.1,
    RARITY_UR_MULTIPLIER: 1.3,
    WEIGHT_LIGHT_MULTIPLIER: 0.8,
    WEIGHT_MEDIUM_MULTIPLIER: 1.0,
    WEIGHT_HEAVY_MULTIPLIER: 1.3,
    ATTRIBUTE_ADVANTAGE_MULTIPLIER: 2.0,
    ATTRIBUTE_DISADVANTAGE_MULTIPLIER: 0.5,
    ATTRIBUTE_NEUTRAL_MULTIPLIER: 1.0,
    BASE_EXP_MULTIPLIER: 50,
    LEVEL_EXP_POWER: 2,
    MAX_LEVEL: 50,
    BASE_STAMINA_COST: 3,
    MAX_STAMINA: 100,
    STAMINA_POTION_RECOVERY: 100,
    CRITICAL_DAMAGE_MULTIPLIER: 2.0,
    DAMAGE_STAMINA_COST: 2
  }
});

// レアリティ定義
export const RARITY = {
  N: { name: 'N', color: '#888888', multiplier: 0.9 },
  R: { name: 'R', color: '#4CAF50', multiplier: 1.0 },
  SR: { name: 'SR', color: '#2196F3', multiplier: 1.1 },
  UR: { name: 'UR', color: '#FF9800', multiplier: 1.3 }
};

// 重量クラス定義
export const WEIGHT_CLASS = {
  LIGHT: { name: '軽量', multiplier: 0.8 },
  MEDIUM: { name: '中量', multiplier: 1.0 },
  HEAVY: { name: '重量', multiplier: 1.3 }
};

// 属性定義
export const ATTRIBUTE = {
  CUTTING: { name: '切削', strongAgainst: 'WELDING', weakAgainst: 'POLISHING' },
  WELDING: { name: '溶接', strongAgainst: 'POLISHING', weakAgainst: 'CUTTING' },
  POLISHING: { name: '研磨', strongAgainst: 'CUTTING', weakAgainst: 'WELDING' }
};

// 武器データ（調整.txtから読み込み、またはデフォルト値）
export const WEAPONS = {
  // 切削武器（軽量）
  cutting_light_N: {
    id: 'cutting_light_N',
    name: '軽量カッター (N)',
    attribute: 'CUTTING',
    weightClass: 'LIGHT',
    rarity: 'N',
    baseAttack: 50,
    critRate: 0.05,
    effect: null,
    image: '/image/weapon/cutting/cutting_light_N_flipped.png'
  },
  cutting_light_R: {
    id: 'cutting_light_R',
    name: '軽量カッター (R)',
    attribute: 'CUTTING',
    weightClass: 'LIGHT',
    rarity: 'R',
    baseAttack: 80,
    critRate: 0.08,
    effect: null,
    image: '/image/weapon/cutting/cutting_light_R_flipped.png'
  },
  cutting_light_SR: {
    id: 'cutting_light_SR',
    name: '軽量カッター (SR)',
    attribute: 'CUTTING',
    weightClass: 'LIGHT',
    rarity: 'SR',
    baseAttack: 120,
    critRate: 0.12,
    effect: 'defense_down',
    image: '/image/weapon/cutting/cutting_light_SR_flipped.png'
  },
  cutting_light_UR: {
    id: 'cutting_light_UR',
    name: '軽量カッター (UR)',
    attribute: 'CUTTING',
    weightClass: 'LIGHT',
    rarity: 'UR',
    baseAttack: 180,
    critRate: 0.15,
    effect: 'stamina_drain',
    image: '/image/weapon/cutting/cutting_light_UR_flipped.png'
  },
  // 研磨武器（軽量）
  polishing_light_N: {
    id: 'polishing_light_N',
    name: '軽量ポリッシャー (N)',
    attribute: 'POLISHING',
    weightClass: 'LIGHT',
    rarity: 'N',
    baseAttack: 45,
    critRate: 0.06,
    effect: null,
    image: '/image/weapon/polishing/polishing_light_N.png'
  },
  polishing_light_R: {
    id: 'polishing_light_R',
    name: '軽量ポリッシャー (R)',
    attribute: 'POLISHING',
    weightClass: 'LIGHT',
    rarity: 'R',
    baseAttack: 75,
    critRate: 0.09,
    effect: null,
    image: '/image/weapon/polishing/polishing_light_R.png'
  },
  polishing_light_SR: {
    id: 'polishing_light_SR',
    name: '軽量ポリッシャー (SR)',
    attribute: 'POLISHING',
    weightClass: 'LIGHT',
    rarity: 'SR',
    baseAttack: 110,
    critRate: 0.13,
    effect: 'accuracy_up',
    image: '/image/weapon/polishing/polishing_light_SR.png'
  },
  polishing_light_UR: {
    id: 'polishing_light_UR',
    name: '軽量ポリッシャー (UR)',
    attribute: 'POLISHING',
    weightClass: 'LIGHT',
    rarity: 'UR',
    baseAttack: 170,
    critRate: 0.16,
    effect: 'multi_strike',
    image: '/image/weapon/polishing/polishing_light_UR.png'
  }
};

// 敵データ（調整.txtから読み込み、またはデフォルト値）
export const ENEMIES = {
  // 溶接ダンジョン
  welding_normal: {
    id: 'welding_normal',
    name: 'マグマスライム',
    attribute: 'WELDING',
    maxHp: 200,
    attack: 40,
    defense: 20,
    exp: 50,
    isBoss: false,
    image: '/image/enemy/溶接/溶接_雑魚.png',
    imageClass: 'welding-minion'
  },
  welding_boss: {
    id: 'welding_boss',
    name: '溶接マスター',
    attribute: 'WELDING',
    maxHp: 800,
    attack: 80,
    defense: 40,
    exp: 300,
    isBoss: true,
    image: '/image/enemy/溶接/溶接_ボス.png',
    imageClass: 'welding-boss'
  },
  // 切削ダンジョン
  cutting_normal: {
    id: 'cutting_normal',
    name: '鋼鉄ゴーレム',
    attribute: 'CUTTING',
    maxHp: 250,
    attack: 45,
    defense: 25,
    exp: 60,
    isBoss: false,
    image: '/image/enemy/切削/切削_雑魚.png',
    imageClass: 'cutting-minion'
  },
  cutting_boss: {
    id: 'cutting_boss',
    name: '機械工マスター',
    attribute: 'CUTTING',
    maxHp: 900,
    attack: 85,
    defense: 45,
    exp: 350,
    isBoss: true,
    image: '/image/enemy/切削/切削_ボス.png',
    imageClass: 'cutting-boss'
  },
  // 研磨ダンジョン
  polishing_normal: {
    id: 'polishing_normal',
    name: 'クリスタルスライム',
    attribute: 'POLISHING',
    maxHp: 180,
    attack: 35,
    defense: 15,
    exp: 45,
    isBoss: false,
    image: '/image/enemy/研磨/研磨_雑魚.png',
    imageClass: 'polishing-minion'
  },
  polishing_boss: {
    id: 'polishing_boss',
    name: '研磨職人マスター',
    attribute: 'POLISHING',
    maxHp: 750,
    attack: 75,
    defense: 35,
    exp: 280,
    isBoss: true,
    image: '/image/enemy/研磨/研磨_ボス.png',
    imageClass: 'polishing-boss'
  }
};

// ダンジョンデータ（調整.txtから読み込み、またはデフォルト値）
export const DUNGEONS = {
  welding: {
    id: 'welding',
    name: '溶接工場',
    attribute: 'WELDING',
    recommendedAttribute: 'CUTTING',
    enemies: ['welding_normal', 'welding_boss'],
    image: '/image/dungeon/溶接ダンジョン外観.png'
  },
  cutting: {
    id: 'cutting',
    name: '切削工場',
    attribute: 'CUTTING',
    recommendedAttribute: 'POLISHING',
    enemies: ['cutting_normal', 'cutting_boss'],
    image: '/image/dungeon/切削ダンジョン外観.png'
  },
  polishing: {
    id: 'polishing',
    name: '研磨工場',
    attribute: 'POLISHING',
    recommendedAttribute: 'WELDING',
    enemies: ['polishing_normal', 'polishing_boss'],
    image: '/image/dungeon/研磨ダンジョン外観.png'
  }
};

// レベル計算関数
export const calculateLevelMultiplier = (level) => {
  return Math.pow(2, (level - 1) / 49);
};

export const calculateRequiredExp = (level) => {
  return 50 * Math.pow(level, 2);
};

export const calculateTotalExpForLevel = (targetLevel) => {
  let total = 0;
  for (let i = 1; i < targetLevel; i++) {
    total += calculateRequiredExp(i);
  }
  return total;
};

// スタミナ計算関数
export const calculateStaminaCost = (weapon, baseCost = 3) => {
  const weightMultiplier = WEIGHT_CLASS[weapon.weightClass].multiplier;
  const rarityMultiplier = RARITY[weapon.rarity].multiplier;
  return Math.ceil(baseCost * weightMultiplier * rarityMultiplier);
};

// 属性相性によるダメージ倍率（調整可能）
export const getAttributeMultiplier = async (attackerAttribute, defenderAttribute) => {
  const adjustData = await loadAdjustmentData();
  const constants = adjustData.constants || getDefaultAdjustmentData().constants;
  
  if (ATTRIBUTE[attackerAttribute].strongAgainst === defenderAttribute) {
    return constants.ATTRIBUTE_ADVANTAGE_MULTIPLIER || 2.0;
  } else if (ATTRIBUTE[attackerAttribute].weakAgainst === defenderAttribute) {
    return constants.ATTRIBUTE_DISADVANTAGE_MULTIPLIER || 0.5;
  }
  return constants.ATTRIBUTE_NEUTRAL_MULTIPLIER || 1.0;
};

// 最終ダメージ計算（調整可能）
export const calculateDamage = async (weapon, playerLevel, enemyAttribute, isCritical = false) => {
  const adjustData = await loadAdjustmentData();
  const constants = adjustData.constants || getDefaultAdjustmentData().constants;
  
  const levelMultiplier = calculateLevelMultiplier(playerLevel);
  const attributeMultiplier = await getAttributeMultiplier(weapon.attribute, enemyAttribute);
  const critMultiplier = isCritical ? (constants.CRITICAL_DAMAGE_MULTIPLIER || 2.0) : 1.0;
  
  return Math.floor(weapon.baseAttack * levelMultiplier * attributeMultiplier * critMultiplier);
};

// 調整データでゲームデータを更新する関数
export const updateGameDataFromAdjustment = async () => {
  const adjustData = await loadAdjustmentData();
  
  // 武器データの更新
  if (adjustData.weapons) {
    Object.assign(WEAPONS, adjustData.weapons);
  }
  
  // 敵データの更新
  if (adjustData.enemies) {
    Object.assign(ENEMIES, adjustData.enemies);
  }
  
  // ダンジョンデータの更新
  if (adjustData.dungeons) {
    Object.assign(DUNGEONS, adjustData.dungeons);
  }
  
  // 定数の更新
  if (adjustData.constants) {
    // レアリティ倍率の更新
    if (adjustData.constants.RARITY_N_MULTIPLIER !== undefined) {
      RARITY.N.multiplier = adjustData.constants.RARITY_N_MULTIPLIER;
    }
    if (adjustData.constants.RARITY_R_MULTIPLIER !== undefined) {
      RARITY.R.multiplier = adjustData.constants.RARITY_R_MULTIPLIER;
    }
    if (adjustData.constants.RARITY_SR_MULTIPLIER !== undefined) {
      RARITY.SR.multiplier = adjustData.constants.RARITY_SR_MULTIPLIER;
    }
    if (adjustData.constants.RARITY_UR_MULTIPLIER !== undefined) {
      RARITY.UR.multiplier = adjustData.constants.RARITY_UR_MULTIPLIER;
    }
    
    // 重量クラス倍率の更新
    if (adjustData.constants.WEIGHT_LIGHT_MULTIPLIER !== undefined) {
      WEIGHT_CLASS.LIGHT.multiplier = adjustData.constants.WEIGHT_LIGHT_MULTIPLIER;
    }
    if (adjustData.constants.WEIGHT_MEDIUM_MULTIPLIER !== undefined) {
      WEIGHT_CLASS.MEDIUM.multiplier = adjustData.constants.WEIGHT_MEDIUM_MULTIPLIER;
    }
    if (adjustData.constants.WEIGHT_HEAVY_MULTIPLIER !== undefined) {
      WEIGHT_CLASS.HEAVY.multiplier = adjustData.constants.WEIGHT_HEAVY_MULTIPLIER;
    }
  }
}; 