import XLSX from "xlsx";

function Workbook() {
  if (!(this instanceof Workbook)) return new Workbook();

  this.SheetNames = [];

  this.Sheets = {};
}

const download = (url, name) => {
  let a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();

  window.URL.revokeObjectURL(url);
};

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);

  const view = new Uint8Array(buf);

  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;

  return buf;
}

const exportToExcel = (trainings) => {
  const wb = new Workbook();

  let convertedTrainings = [];
  const series = ["variant", 1, 2, 3, 4, 5, 6, 7, 8];
  if (trainings.length > 0)
    trainings.forEach((training) => {
      const exercises = training.singleSet.map((item) => {
        return new Array(
          item.exercise.name,
          item.exercise.variant,
          ...item.quantity.map((series) => {
            const kg = series.kg > 0 ? " x " + series.kg + "kg " : "";

            const seriesData = series.quantity + kg;

            return seriesData;
          })
        );
      });

      const convertedTraining = [
        [training.date, ...series.map((series) => series)],
        ...exercises,

        [],
        [],
      ];
      convertedTrainings.push(...convertedTraining);
    });

  console.log(convertedTrainings);

  const ws = XLSX.utils.aoa_to_sheet([...convertedTrainings]);

  wb.SheetNames.push("");
  wb.Sheets[""] = ws;

  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: true,
    type: "binary",
  });

  let url = window.URL.createObjectURL(
    new Blob([s2ab(wbout)], { type: "application/octet-stream" })
  );

  download(url, "Trainings.xlsx");
};

export default exportToExcel;
