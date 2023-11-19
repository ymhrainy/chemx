/**
 * 名词解释
 * Alcohol: 醇
 * Ether: 醚
 * Alkane: 烷
 * AlcoholEther: **醇**醚 比如脂肪醇聚氧乙烯醚
 * EO: 环氧乙烷(C2H4O)
 * PO: 环氧丙烷(C3H6O)
 */

/**
 * 醇 包含分子式和分子量
 */
export type Alcohol = {
  formula: string;
  weight: number;
};

export type AlcoholEther = {
  alcohol: Alcohol;
  eoNum: number;
  poNum: number;
  weight: number; // 由上面三个属性推导可计算出分子量
};

export const AXIS_TYPE = {
  alcohol: "alcohol",
  eo: "eo",
  po: "po",
} as const;
export type AxisType = (typeof AXIS_TYPE)[keyof typeof AXIS_TYPE];

export const AXIS_TAG = {
  h: "横轴",
  v: "纵轴",
  z: "Z轴",
} as const;
export type AxisTag = (typeof AXIS_TAG)[keyof typeof AXIS_TAG];

export type Axis = {
  type: "alcohol" | "eo" | "po";
  min: number;
  max: number;
  step: number;
};

export type AlcoholEtherRow = AlcoholEther[];
export type AlcoholEtherTable = AlcoholEtherRow[];
export type AlcoholEtherCube = AlcoholEtherTable[];

/**
 * 一个EO的分子量
 */
export const EO_WEIGHT = 44.03;

/**
 * 一个PO的分子量
 */
export const PO_WEIGHT = 58.04;

const C4H10O_WEIGHT = 74.1216;
const C1H2_WEIGHT = 14.0266;

/**
 * 计算醇的分子量
 * @param carbonNum 碳原子数
 * @returns C(n)H(2n+2)O的分子量
 */
function calAlcoholMolecularWeight(carbonNum: number) {
  return C4H10O_WEIGHT + (carbonNum - 4) * C1H2_WEIGHT;
}

/**
 * 生成醇的分子式
 * @param carbonNum 碳原子数
 * @returns C(n)H(2n+2)O
 */
function generateAlcoholMolecularFormula(carbonNum: number) {
  return `C${carbonNum}H${carbonNum * 2 + 2}O`;
}

export function getDefaultAxisRange(at: AxisType) {
  if (at === AXIS_TYPE.alcohol) {
    return {
      min: 6,
      max: 10,
    };
  } else {
    return {
      min: 0,
      max: 10,
    };
  }
}

export function createAlcohol(carbonNum: number): Alcohol {
  return {
    formula: generateAlcoholMolecularFormula(carbonNum),
    weight: calAlcoholMolecularWeight(carbonNum),
  };
}

function setAlcohoEtherWeight(ae: AlcoholEther): void {
  ae.weight = ae.alcohol.weight + ae.eoNum * EO_WEIGHT + ae.poNum * PO_WEIGHT;
}

function generateAlcoholEther(carbonNum: number, eoNum: number, poNum: number) {
  const alcohol = createAlcohol(carbonNum);
  const ae: AlcoholEther = {
    alcohol,
    eoNum,
    poNum,
    weight: 0,
  };
  setAlcohoEtherWeight(ae);
  return ae;
}

/**
 *
 * @param horizontalAxis
 * @param verticalAxis
 * @param zAxis
 * @returns
 */
export function generateAlcoholEtherCube(
  horizontalAxis: Axis,
  verticalAxis: Axis,
  zAxis: Axis,
): AlcoholEtherCube {
  const cube: AlcoholEtherCube = [];
  for (let zNum = zAxis.min; zNum <= zAxis.max; zNum += zAxis.step) {
    const table: AlcoholEtherTable = [];
    for (let rowNum = verticalAxis.min; rowNum <= verticalAxis.max; rowNum += verticalAxis.step) {
      const row: AlcoholEtherRow = [];
      for (
        let colNum = horizontalAxis.min;
        colNum <= horizontalAxis.max;
        colNum += horizontalAxis.step
      ) {
        let carbonNum = 0;
        let eoNum = 0;
        let poNum = 0;
        if (horizontalAxis.type === AXIS_TYPE.alcohol) carbonNum = colNum;
        else if (horizontalAxis.type === AXIS_TYPE.eo) eoNum = colNum;
        else poNum = colNum;

        if (verticalAxis.type === AXIS_TYPE.alcohol) carbonNum = rowNum;
        else if (verticalAxis.type === AXIS_TYPE.eo) eoNum = rowNum;
        else poNum = rowNum;

        if (zAxis.type === AXIS_TYPE.alcohol) carbonNum = zNum;
        else if (zAxis.type === AXIS_TYPE.eo) eoNum = zNum;
        else poNum = zNum;

        row.push(generateAlcoholEther(carbonNum, eoNum, poNum));
      }
      table.push(row);
    }
    cube.push(table);
  }
  return cube;
}

export function generatePoEoTable(
  maxPo: number,
  maxEo: number,
  carbonNum: number,
): AlcoholEtherTable {
  const cube = generateAlcoholEtherCube(
    {
      type: AXIS_TYPE.po,
      min: 0,
      max: maxPo,
      step: 1,
    },
    {
      type: AXIS_TYPE.eo,
      min: 0,
      max: maxEo,
      step: 1,
    },
    {
      type: AXIS_TYPE.alcohol,
      min: carbonNum,
      max: carbonNum,
      step: 1,
    },
  );
  return cube[0];
}

export function generateAlcoholEoTable(
  maxCarbonNum: number,
  maxEo: number,
  poNum: number = 0,
): AlcoholEtherTable {
  const cube = generateAlcoholEtherCube(
    {
      type: AXIS_TYPE.alcohol,
      min: 6,
      max: maxCarbonNum,
      step: 1,
    },
    {
      type: AXIS_TYPE.eo,
      min: 0,
      max: maxEo,
      step: 1,
    },
    {
      type: AXIS_TYPE.po,
      min: poNum,
      max: poNum,
      step: 1,
    },
  );
  return cube[0];
}
