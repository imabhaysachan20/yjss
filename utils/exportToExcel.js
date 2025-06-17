import * as XLSX from 'xlsx';

export const exportToExcel = (data, fileName) => {
  try {
    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create workbook and add the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Entries');

    // Auto-size columns
    const maxWidth = 50;
    const colWidths = {};
    data.forEach(row => {
      Object.keys(row).forEach(key => {
        const value = String(row[key] || '');
        colWidths[key] = Math.min(
          maxWidth,
          Math.max(colWidths[key] || 0, value.length + 2)
        );
      });
    });

    // Apply column widths
    worksheet['!cols'] = Object.keys(colWidths).map(key => ({
      wch: colWidths[key]
    }));

    // Generate & download file
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  } catch (error) {
    console.error('Export failed:', error);
    alert('Failed to export data. Please try again.');
  }
};
