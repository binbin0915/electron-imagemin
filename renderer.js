// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const fs = require('fs')
const Compressor = require('compressorjs')

const eleUpImg = document.querySelector('#upload-image')
const eleDoCompress = document.querySelector('#doCompress')
const eleFileName = document.querySelector('#file-name')
const eleQuality = document.querySelector('#quality')

let files
eleUpImg.addEventListener('change', event => {
    files = event.target.files
    eleFileName.innerHTML = ''
    for (let index = 0; index < files.length; index++) {
        const file = files[index]
        if (index < 10) {
            eleFileName.innerHTML += `<li>${file.name}</li>`
            if (index === 9) {
                eleFileName.innerHTML += `<li>...</li>`
            }
        }
    }
})
eleDoCompress.addEventListener('click', () => {
    if (!files) {
        alert('请先上传文件')
        return
    }
    for (let file of files) {
        compress(file, eleQuality.value, file.path.replace(file.name, 'compressed-' + file.name))
    }
    eleFileName.innerHTML = '未上传图片'
    files = null
    alert('完成！')
})

function compress(file, quality, path) {
    new Compressor(file, {
        quality,
        success(blob) {
            blob.arrayBuffer().then(arrBuf => {
                const buf = new Uint8Array(arrBuf)
                fs.writeFile(path, buf, err => {
                    if (err) {
                        alert(path + '压缩失败！')
                    }
                })
            })
        },
        error(err) {
            alert(err.message)
        },
    })
}

//联系作者
const eleContact = document.querySelector('#contact')
const eleContactCtt = document.querySelector('#contact-content')
eleContact.addEventListener('click', () => {
    if (eleContactCtt.classList.contains('is-hidden')) {
        eleContactCtt.classList.remove('is-hidden')
    } else {
        eleContactCtt.classList.add('is-hidden')
    }
})