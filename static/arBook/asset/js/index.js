$(function () {
        if (window.location.href != 'https://www.maaee.com:6443/arBook/') {
            // if (window.location.href != 'https://172.16.2.128:6443/arBook/') {
            document.querySelector('#sharePage').style.display = 'block';
            document.querySelector('#start').style.position = 'absolute'
            document.querySelector('#stop').style.position = 'absolute'
        } else {
            document.querySelector('#openCamera').click()
        }
    }
);
