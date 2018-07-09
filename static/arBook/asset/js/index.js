$(function () {
        if (window.location.href != 'https://www.maaee.com:6443/arBook/') {
            // if (window.location.href != 'https://172.16.2.128:6443/arBook/') {
            document.querySelector('#sharePage').style.display = 'block';
            document.querySelector('#start').style.position = 'absolute'
            document.querySelector('#stop').style.position = 'absolute'
        } else {
            document.querySelector('#openCamera').click()
        }
        var phoneType = navigator.userAgent;

        if (phoneType.indexOf('iPhone') > -1 || phoneType.indexOf('iPad') > -1) {
            if (phoneType.indexOf('MicroMessenger') > -1) {
                document.querySelector('.openBrowser').style.display = 'block';
            }
        }
    }
);
