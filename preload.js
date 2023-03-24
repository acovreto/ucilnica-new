const { contextBridge, ipcRenderer } = require("electron");
const node = () => process.versions.node;
const displaySomething = (data) => {
  ipcRenderer.invoke("proba", data);
};
contextBridge.exposeInMainWorld("versions", {
  node: node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  writeFile: (data1) => ipcRenderer.invoke("writeFile", data1),
  readData: (file) => ipcRenderer.invoke("readFile", file),
  checkFileExist: (file) => ipcRenderer.invoke("checkFile", file),
  // we can also expose variables, not just functions
});
