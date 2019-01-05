import { fromJS, List } from 'immutable';

export interface SizeRecord {
  compressed: number;
  normal: number;
}

interface PrettySizeOptions {
  // Don't print a space
  nospace: boolean;
  // Only print a one character
  one: boolean;
  // Number of decimal places to return
  places: number;
}

export function generateMDTable(headers: string[], body: string[][]) {
  const tableHeaders = [headers.join(' | '), headers.map(() => ' --- ').join(' | ')];

  const tablebody = fromJS(body).map((r: List<string>) => r && r.join(' | '));
  return tableHeaders.join('\n') + '\n' + tablebody.join('\n');
}

function prettysize(size: number, options: PrettySizeOptions): string {
  let mysize;
  const sizes = ['Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'];

  sizes.forEach((unit, id) => {
    if (options.one) {
      unit = unit.slice(0, 1);
    }
    const s = Math.pow(1024, id);
    let fixed;
    if (size >= s) {
      fixed = String((size / s).toFixed(options.places));
      if (fixed.indexOf('.0') === fixed.length - 2) {
        fixed = fixed.slice(0, -2);
      }
      mysize = fixed + (options.nospace ? '' : ' ') + unit;
    }
  });

  // zero handling
  // always prints in Bytes
  if (!mysize) {
    const unit = options.one ? sizes[0].slice(0, 1) : sizes[0];
    mysize = '0' + (options.nospace ? '' : ' ') + unit;
  }

  return mysize;
}

function generateSizeCell(source: SizeRecord) {
  const prettyOpts = {
    places: 2,
    nospace: true,
    one: true,
  };

  const html = `<div title="Compressed: ${prettysize(source.compressed, prettyOpts)}">${prettysize(
    source.normal,
    prettyOpts
  )} (${prettysize(source.compressed, prettyOpts)})</div>`;
  return html;
}

function generateChangeCell(master: SizeRecord, branch: SizeRecord) {
  const normalDiff = ((branch.normal - master.normal) / master.normal) * 100;
  const normalDiffStr =
    normalDiff === 0
      ? 'No Change'
      : normalDiff > 0
      ? `+${normalDiff.toFixed(2)}%`
      : `${normalDiff.toFixed(2)}%`;
  const compressedDiff = ((branch.compressed - master.compressed) / master.compressed) * 100;
  const compressedDiffStr =
    compressedDiff === 0
      ? 'No Change'
      : compressedDiff > 0
      ? `+${compressedDiff.toFixed(2)}%`
      : `${compressedDiff.toFixed(2)}%`;

  return `<div title="Compressed Diff: ${compressedDiffStr}">${normalDiffStr}</div>`;
}

export function generateRow(filename: string, master: SizeRecord, branch: SizeRecord): string[] {
  return [
    filename,
    (typeof master === 'object' && generateSizeCell(master)) || '',
    (typeof branch === 'object' && generateSizeCell(branch)) || '',
    (typeof master === 'object' &&
      typeof branch === 'object' &&
      generateChangeCell(master, branch)) ||
      '',
  ];
}
