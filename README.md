可圈可点的几个点
1.使用navigator.mediaDevices.getUserMedia调用摄像头,将视频流推到页面上的video标签
2.使用canvas截取video的视频帧
3.navigator.mediaDevices.getUserMedia方法中可以控制调用的是前置摄像头还是后置摄像头
4.图片的base64转文件流上传
5.video宽度超过body时,即使给body设置overflow:hidden,在移动端页面仍会跟随手指移动,解决方法:  给body设置
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
