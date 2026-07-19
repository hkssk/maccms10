<!DOCTYPE html>
<html>
<head>
<title>Artplayer播放器</title>
<meta name="keywords" content="Artplayer播放器" />
<meta name="description" content="Artplayer播放器" />
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=11" />
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" id="viewport" name="viewport">
<script src="artplayer.min.js"></script>
<script src="hls.min.js"></script>
<script src="flv.min.js"></script>
<script src="jquery.min.js"></script>
<style type="text/css">html,body{height:100%;margin:0;padding:0;overflow:hidden;text-align:center;background:#000}#player {position: absolute;left: 0px;right: 0px;top: 0px;bottom: 0px;width:100%;height:100%;}.hide,.art-contextmenu-version{display:none!important;}.show{display:block}.art-poster {background-size: 100%!important;}@media (max-width:760px){.art-controls .art-control{min-width:20px;}.art-controls .art-control .art-icon{width:35px;}}</style>
</head>
<body>
<div id="player"></div>
<script type="text/javascript">
var vid = "<?php echo $_GET['url'];?>";
var art = new Artplayer({
	container: '#player',
	url: vid,
	autoplay: true,
	autoSize: false,
	loop: false,
	mutex: true,
	poster: '',// 封面
	screenshot: true, // 是否开启截图功能
	hotkey: true, // 是否开启视频快捷键  
	pip: true, // 是否支持画中画
	autoMini: true, // 是否支持迷你模式  
	setting: true,
	flip: true,//是否显示视频翻转功能，目前只出现在 设置面板 和 右键菜单 里
	playbackRate: true,//是否显示视频播放速度功能，会出现在 设置面板 和 右键菜单 里
	aspectRatio: true,//是否显示视频长宽比功能，会出现在 设置面板 和 右键菜单 里
	theme: '#FF9900',
	fullscreen: true,
	fullscreenWeb: false,
	airplay: true,//是否显示 airplay 按钮，当前只有部分浏览器支持该功能
	lock: true, //是否在移动端显示一个 锁定按钮 ，用于隐藏底部 控制栏
	fastForward: true,//是否在移动端添加长按视频快进功能
	autoOrientation: false,//是否在移动端的网页全屏时，根据视频尺寸和视口尺寸，旋转播放器
	miniProgressBar: true,//迷你进度条，只在播放器失去焦点后且正在播放时出现
moreVideoAttr:{'webkit-playsinline':true,playsInline:true,'x5-video-player-type':'h5','x5-video-player-fullscreen':false,'x5-video-orientation':'portraint',preload:"metadata"},
contextmenu:[{name:'xingchenfm.cc',html:'xingchenfm.cc - Artplayer',click:function(...args){window.open('https://www.xingchenfm.cc');art.contextmenu.show=false},},],
customType:{m3u8:function(video,url){const hlsConfig={maxBufferLength:1800,maxMaxBufferLength:3600,maxBufferSize:6e7,};if(Hls.isSupported()){const hls=new Hls(hlsConfig);hls.loadSource(url);hls.attachMedia(video)}else if(video.canPlayType('application/vnd.apple.mpegurl')){video.src=url}else{art.notice.show='不支持播放格式：m3u8'}},flv:function(video,url){if(flvjs.isSupported()){if(art.flv)art.flv.destroy();const flv=flvjs.createPlayer({type:'flv',url});flv.attachMediaElement(video);flv.load();art.flv=flv;art.on('destroy',()=>flv.destroy())}else{art.notice.show='Unsupported playback format: flv'}},},});
function formatSeconds(value){var theTime=parseInt(value);var theTime1=0;var theTime2=0;if(theTime>60){theTime1=parseInt(theTime/60);theTime=parseInt(theTime%60);if(theTime1>60){theTime2=parseInt(theTime1/60);theTime1=parseInt(theTime1%60)}var result=""+prefixInteger(parseInt(theTime),2)+""}else{var result="00:"+prefixInteger(parseInt(theTime),2)+""}if(theTime1>0){result=""+prefixInteger(parseInt(theTime1),2)+":"+result}if(theTime2>0){result=""+prefixInteger(parseInt(theTime2),2)+":"+result}return result}function prefixInteger(num,n){return(Array(n).join(0)+num).slice(-n)}var cookie={'set':function(name,value,days){var exp=new Date();exp.setTime(exp.getTime()+days*24*60*60*1000);var arr=document.cookie.match(new RegExp('(^| )'+name+'=([^;]*)(;|$)'));document.cookie=name+'='+escape(value)+';path=/;expires='+exp.toUTCString()},'get':function(name){var arr=document.cookie.match(new RegExp('(^| )'+name+'=([^;]*)(;|$)'));if(arr!=null)return unescape(arr[2])},'put':function(urls){var cookie=urls.replace(/[^a-z]+/ig,'');var cookie=cookie.substring(cookie.length-32);return cookie}};var cc=cookie.get(vid);var ss=Math.ceil(cc);$('#player').append('<div id="tips" class="hide"></div><style type="text/css">#tips{position:absolute; z-index:209910539; right:3%; bottom:25%; background: #000000a6; font-size:15px; color:#FFF; padding:8px; border-radius:4px;}#go{color: #66CCCC}#tips a{cursor:pointer;}</style>');art.on('video:loadeddata',()=>{if(cc>0){$('#tips').html('<a id="xx">X　</a>'+"上次看到 "+formatSeconds(ss)+' <a id="go">继续</a>');$('#tips').removeClass("hide");setTimeout(function(){$('#tips').addClass("hide")},20000)}});art.on('video:timeupdate',()=>{if(cookie)cookie.set(vid,art.currentTime,30)});$('#player').on("click",'#xx',function(e){art.play();$('#tips').addClass("hide")});$('#player').on("click",'#go',function(e){art.currentTime=ss;art.play();$('#tips').addClass("hide")});if(window.parent!==window&&parent.MacPlayer.PlayLinkNext!=''){art.on('video:ended',function(){top.location.href=parent.MacPlayer.PlayLinkNext;window.location.reload()})};
</script>
</body>
</html>