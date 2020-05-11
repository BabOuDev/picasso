const readSingleFile = (file: File) => {
  if (!file) {
    return;
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      const contents = e?.target?.result;
      resolve(contents);
    };

    try {
      reader.readAsText(file);
    } catch (err) {
      reject("");
    }
  });
};

export default readSingleFile;
