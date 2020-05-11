const areParametersValid = (objToExport: object, exportName: string) => {
  const isValidObject = typeof objToExport === "object";
  const hasValidName = exportName && exportName.length > 0;

  return isValidObject && hasValidName;
};

const downloadObjectAsJson = (objToExport: object, exportName: string) => {
  if (!areParametersValid(objToExport, exportName)) {
    return;
  }

  const encodedData = encodeURIComponent(JSON.stringify(objToExport));
  const href = `data:text/json;charset=utf-8,${encodedData}`;

  const downloadAnchorNode = document.createElement("a");
  const fileName = `${exportName}.json`;

  downloadAnchorNode.setAttribute("download", fileName);
  downloadAnchorNode.setAttribute("href", href);

  document.body.appendChild(downloadAnchorNode);

  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};

export default downloadObjectAsJson;
