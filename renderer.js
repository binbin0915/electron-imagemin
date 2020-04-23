// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const {ipcRenderer} = require('electron')
const eleUpImg = document.querySelector('#upload-image')
eleUpImg.addEventListener('change', event => {
    ipcRenderer.send('uploadFile', {payload: event.target.files[0]})
    console.log(event)
})
ipcRenderer.on('uploadFileSuccess', (event, arg) => {
    const {msg, code} = arg
    console.log('上传成功', msg, code)
})