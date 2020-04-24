// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require('fs')
const Compressor = require('compressorjs')

const eleUpImg = document.querySelector('#upload-image')
eleUpImg.addEventListener('change', event => {
    const file = event.target.files[0]
    new Compressor(file, {
        success(blob) {
            blob.arrayBuffer().then(arrBuf => {
                const buf = new Uint8Array(arrBuf)
                fs.writeFile('xaxx.png', buf, err => {
                    if (err) {
                        alert('压缩失败！')
                    }
                })
            })
        },
        error(err) {
            alert(err.message)
        },
    })
})
