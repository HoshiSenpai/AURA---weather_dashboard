import Papa from 'papaparse';

export const fetchCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: (result) => resolve(result.data),
      error: (error) => reject(error),
    });
  });
};
