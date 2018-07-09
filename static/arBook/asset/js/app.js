const webAR = new WebAR(1000, '/webar/recognize');

const threeHelper = new ThreeHelper();

var videoIndex = 0;

var videoLength;

var videoArr = [];

document.querySelector('#openCamera').addEventListener('click', function () {

    document.getElementById('video').play()
    document.getElementById('littleV').play()

    const videoSetting = {width: 480, height: 360};

    const video = document.querySelector('#video');
    const videoDevice = document.querySelector('#videoDevice');

    const openCamera = (video, deviceId, videoSetting) => {
        webAR.openCamera(video, deviceId, videoSetting)
            .then((msg) => {
                // 打开摄像头成功
                // 将视频铺满全屏(简单处理)
                let videoWidth = video.offsetWidth;
                let videoHeight = video.offsetHeight;

                if (window.innerWidth < window.innerHeight) {
                    // 竖屏
                    if (videoHeight < window.innerHeight) {
                        video.setAttribute('height', window.innerHeight.toString() + 'px');
                    }
                } else {
                    // 横屏
                    if (videoWidth < window.innerWidth) {
                        video.setAttribute('width', window.innerWidth.toString() + 'px');
                    }
                }
            })
            .catch((err) => {
                alert(err);
                alert('打开视频设备失败');
            });
    };

    // 列出视频设备
    webAR.listCamera(videoDevice)
        .then(() => {
            openCamera(video, videoDevice.value, videoSetting);
            // videoDevice.onchange = () => {
            //     openCamera(video, videoDevice.value, videoSetting);
            // };

            // document.querySelector('#start').style.display = 'inline-block';
        })
        .catch((err) => {
            console.info(err);
            alert('没有可使用的视频设备');
        });
}, false);

document.querySelector('#start').addEventListener('click', () => {
    document.querySelector('#start').style.display = 'none';
    document.querySelector('#stop').style.display = 'inline-block';
    webAR.startRecognize((msg) => {
        // 识别成功后，msg=地址
        console.log('地址', msg);

        var param = {
            "method": 'getARBookItemByEasyARId',
            "targetId": msg,
        };
        WebServiceUtil.requestLittleAntApi(true, JSON.stringify(param), {
            onResponse: result => {
                if (result.msg == '调用成功' || result.success) {
                    // threeHelper.loadObject('asset/model/trex_v3.fbx');
                    var arr = result.response.video.split(',');
                    if (arr.length != 1) {
                        arr.splice(0, 1)
                    }

                    if (arr[0].substr(arr[0].length - 3, arr[0].length - 1) == 'pdf') {
                        buildPdf(arr[0])
                    } else {
                        buildVideo(arr)
                    }

                }
            },
            onError: function (error) {

            }
        });


        // 加载本地模型
        // threeHelper.loadObject('asset/model/trex_v3.fbx');
        // webAR.trace('加载模型');

    });
}, false);

document.querySelector('#stop').addEventListener('click', () => {
    document.querySelector('#start').style.display = 'inline-block';
    document.querySelector('#stop').style.display = 'none';
    webAR.stopRecognize();
}, false);

/*document.querySelector('#right').addEventListener('click', () => {

    videoIndex += 1;

    // document.querySelector('#left').style.display = 'inline-block';
    if (videoIndex + 1 == videoLength) {
        document.querySelector('#right').style.display = 'none';
    }

    var videoSrc = videoArr[videoIndex];//新的视频播放地址
    document.getElementById("littleV").src = videoSrc;
    document.getElementById("littleV").play();

}, false)*/

/*document.querySelector('#left').addEventListener('click', () => {

    videoIndex -= 1;

    document.querySelector('#right').style.display = 'inline-block';
    if (videoIndex == 0) {
        document.querySelector('#left').style.display = 'none';
    }

    var videoSrc = videoArr[videoIndex];//新的视频播放地址
    document.getElementById("littleV").src = videoSrc;
    document.getElementById("littleV").play();

}, false)*/

document.querySelector('#close').addEventListener('click', () => {

    var video = document.getElementById('littleV');
    video.pause(); //暂停控制
    document.querySelector('#videoDiv').style.display = 'none'
    document.querySelector('.footer').style.display = 'none';

    document.querySelector('#start').style.display = 'inline-block';
    document.querySelector('#stop').style.display = 'none';
    document.querySelector('#myList').style.display = 'none';
    document.querySelector('#close').style.display = 'none';

    document.querySelector('#littleV').style.display = 'none';

}, false)

/**
 * 构建video标签
 * @param data
 */
function buildVideo(data) {

    document.querySelector('#videoDiv').style.display = 'block';
    document.querySelector('#start').style.display = 'none';
    document.querySelector('#stop').style.display = 'none';
    document.querySelector('#myList').style.display = 'block';

    document.querySelector('#littleV').style.display = 'inline-block';

    var arr = []

    data.forEach(function (v, i) {
        var pptURL = v.replace("60.205.111.227", "www.maaee.com");
        pptURL = pptURL.replace("60.205.86.217", "www.maaee.com");
        if (pptURL.indexOf("https") == -1 && pptURL.indexOf("http") != -1) {
            pptURL = pptURL.replace("http", "https");
        }
        arr.push(pptURL)
    });

    videoLength = arr.length;

    videoArr = arr;

    var videoSrc = arr[0];//新的视频播放地址
    document.getElementById("littleV").src = videoSrc;
    document.getElementById("littleV").play();

    document.querySelector('#close').style.display = 'inline-block';
    document.querySelector('.footer').style.display = 'none';


    if (videoLength > 1) {
        // document.querySelector('#right').style.display = 'inline-block';
    }

    buildTags(videoArr)

}

function buildTags(videoArr) {
    var imgs = '<div class="teach_title">相关教材</div><div class="myList_cont"><div class="myList_cont_div">'

    for (var i = 0; i < videoArr.length; i++) {
        imgs += '<li><img onclick="imgOnClick(videoArr[' + i + '])" class="videoArr" src="./asset/imgs/icon-bg.png"></li>'
    }

    imgs += '</div></div>'

    document.getElementById("myList").innerHTML = imgs
}

function imgOnClick(src) {
    var videoSrc = src;//新的视频播放地址
    document.getElementById("littleV").src = videoSrc;
    document.getElementById("littleV").play();
}

function buildPdf(src) {

    var pdfURL = src.replace("60.205.111.227", "www.maaee.com");
    pdfURL = pdfURL.replace("60.205.86.217", "www.maaee.com");
    if (pdfURL.indexOf("https") == -1 && pdfURL.indexOf("http") != -1) {
        pdfURL = pdfURL.replace("http", "https");
    }

    var src = 'https://www.maaee.com/Excoord_For_Education/js/pdfjs/web/viewer.html?file=' + pdfURL
    $('#pdf_iframe')[0].src = src
}
