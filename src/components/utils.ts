const EO = 44.03;
const PO = 58.04;

export interface FattyAlcohol {
  mass: number;
}

export const FATTY_ALCOHOLS: Record<string, FattyAlcohol> = {
  C6H14O: {
    mass: 102.1,
  },
  C7H16O: {
    mass: 116.2,
  },
  C8H18O: {
    mass: 130.14,
  },
  C9H20O: {
    mass: 144.15,
  },
  C10H22O: {
    mass: 158.17,
  },
  C11H24O: {
    mass: 172.18,
  },
  C12H26O: {
    mass: 186.2,
  },
  C13H28O: {
    mass: 200.36,
  },
  C14H30O: {
    mass: 214.39,
  },
  C15H32O: {
    mass: 228.41,
  },
  C16H34O: {
    mass: 242.44,
  },
  C17H36O: {
    mass: 256.47,
  },
  C18H40O: {
    mass: 270.49,
  },
};


type TableCellData = string | number;

type TableCell = {
  data: TableCellData;
  isChem: boolean;
  near?: boolean;
};

function getFACellData(fa: FattyAlcohol, neo: number, npo: number): TableCellData {
  return fa.mass + neo * EO + npo * PO;
}

function getCell(data: TableCellData, isChem: boolean, searchMass?: number): TableCell {
  const cell: TableCell = {
    data,
    isChem,
  };
  if (isChem && typeof data === "number" && searchMass) {
    cell.near = Math.abs(data - searchMass) < 2;
  }
  return cell;
}

export function getFATable(fa: FattyAlcohol, searchMass: number, nEo: number, nPo: number) {
  const rowHeader: TableCell[] = [getCell("", false)];
  for (let i = 0; i < nPo; i++) {
    rowHeader.push(getCell(`${i}PO`, false));
  }
  const table: TableCell[][] = [rowHeader];

  for (let neo = 0; neo < nEo; neo++) {
    const row: TableCell[] = [getCell(`${neo}EO`, false)];
    for (let npo = 0; npo < nPo; npo++) {
      row.push(getCell(getFACellData(fa, neo, npo), true, searchMass));
    }
    table.push(row);
  }
  return table;
}
