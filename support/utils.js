import fs from 'fs';
import path from 'path';

export function  mergeFixedColumnWithTable(fixedRows, tableRows) {
    return tableRows.map((row, index) => [
      fixedRows[index],
      ...row
    ]);
  }


export function saveDataToCSV(headers, rows, filePath) {
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const csv = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    fs.writeFileSync(filePath, csv);
  }


export function writeToCsv(fileName, headers, rows) {
  const outputDir = path.join(process.cwd(), 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, fileName);

  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(header => `"${row[header] || ''}"`).join(',')
    )
  ].join('\n');

  fs.writeFileSync(filePath, csvContent, 'utf8');
  return filePath;
}