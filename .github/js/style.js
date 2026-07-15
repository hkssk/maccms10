var niuniu = {
    'cms': {
        'load': function() {
            niuniu.cms.lazy('img.bg-light');
            niuniu.cms.copyer();
            if($(".swip-wrapper").length){
                niuniu.cms.swiper();
            }
            if ($('.fakeyou').length) {
                niuniu.cms.fakeyou();
            }
            if ($('.play-box').length) {
                niuniu.play.load();
            }
            if ($('.get-hits').length) {
                var a = $('.get-hits');
                $.get('/index.php/ajax/hits?mid=' + a.attr('data-mid') + '&id=' + a.attr('data-id') + '&type=update');
            }
            if ($('.video-history').length) {
                var a = niuniu.cookie.get($('body').attr('data-history'));
                var b = '';
                if (a) {
                    var json = eval("(" + a + ")");
                    for (i = 0; i < json.length; i++) {
                        b += "<li><a href='" + json[i].link + "' class='relative bg-body rounded flex flex-row items-center pt-2 pl-2'>";
                        b += "<div class='pr-1'>";
                        b += "<img src='" + json[i].pic + "' alt='" + json[i].name + "' class='rounded' width='45' height='55'></div>";
                        b += "<div class='overflow-hidden pl-2'>";
                        b += "<h3 class='fs-5 line-1 mb-1 mt-1'>" + json[i].name + "</h3>";
                        b += "<p class='fs-7 text-active mb-1'>观看至：" + json[i].part + "</p></div></a></li>";
                    }
                }else{
                    b = '<p class="text-muted pt-2">暂无内容</p>';
                }
                $(".video-history ul").html(b);
            }
            $('body').on('click', '.click-theme .bi', function() {
                var a = $(this),
                    b = $('body'),
                    c = '';
                if(b.attr('class').indexOf("dark") != -1){
                    c = 'dark';
                }else{
                    c = 'light';
                }
                a.toggleClass('bi-moon-stars-fill bi-sun-fill');
                b.toggleClass('dark light');
                niuniu.cookie.set('theme', c, 7);
            });
            $('body').on('click', '.click-search .bi', function() {
                $('.click-search form').toggleClass('hidden');
                $('body').removeClass('overflow-hidden');
                $('.click-menu .bi').addClass('bi-list').removeClass('bi-x-lg');
                $('.click-menu .mbbgs,.click-history .mbbgs').addClass('hidden');
            });
            $('body').on('click', '.click-menu .bi', function() {
                $('.click-menu .bi').toggleClass('bi-list bi-x-lg');
                $('.click-menu .mbbgs').toggleClass('hidden');
                if($('.click-menu .mbbgs').hasClass('hidden')){
                    $('body').removeClass('overflow-hidden');
                }else{
                    $('body').addClass('overflow-hidden');
                }
                $('.click-history .mbbgs').addClass('hidden');
            });	
            $('body').on('click', '.click-history .bi', function() {
                $('.click-history .mbbgs').toggleClass('hidden');
                if($('.click-history .mbbgs').hasClass('hidden')){
                    $('body').removeClass('overflow-hidden');
                }else{
                    $('body').addClass('overflow-hidden');
                }
                $('.click-menu .bi').addClass('bi-list').removeClass('bi-x-lg');
                $('.click-menu .mbbgs').addClass('hidden');
            });
            $('body').on('click', '.history-close', function() {
                if (confirm("您确定要清除播放记录吗？")) {
                    niuniu.cookie.del($('body').attr('data-history'));
                    $('.video-history ul').html('<p class="text-red pt-2">播放记录，已清空！</p>');
                    setTimeout(function() { location.reload(); }, 1000);
                }
            });
            $('body').on('click', '.tab-list a', function() {
                var a = $(this);
                $('.tab-content ul').hide().eq(a.index()-1).fadeIn('slow').css("display", "flex");
                $('.tab-list a').removeClass('on').eq(a.index()-1).addClass('on');
            });
            $("body").on("click", ".drop-sort", function (e) {
                e.preventDefault();
                var a = $(this),
                    b = $(a.attr("data-target"));
                    b.html(b.children().get().reverse());
            });
            $('body').on('click', '.click-top', function() {
                $('html,body').animate({
                    scrollTop: 0
                },200);
            });
            $('body').on('click', '.form-vcoder', function() {
                niuniu.cms.vcode($(this));
            });
            $(".searcherform").on("submit", function() {
                var a = $(this).find('input').val(),
                    b = $(this).attr('action');
                if (!a) {
                    $("input[name=wd]").focus();
					layer.msg('请' + $(this).find('input').attr('placeholder'));
                    return false;
                }
                if (b) {
                    location.href = b.replace('FFWD', encodeURIComponent(a));
                    return false;
                }
            });
            $('.tab-content ul').each(function(i) {
                $this = $(this);
                $config = $this.attr('data-more') * 1;
                $max = $this.find('li a').size();
                if (($config + 2) < $max && $config > 0) {
                    $max_html = $($this.find('li:last').prop("outerHTML")).find('a').attr('href', '#all').removeClass('bg-btn').addClass('bg-active text-white').html('全部...');
                    $max_html = '<li>' + $max_html.prop("outerHTML") + '</li>';
                    $this.find('li').each(function(n) {
                        if (n + 1 > $config) {
                            $(this).hide();
                        }
                    });
                    $this.find('li').eq($config).after($max_html);
                    $this.find('li:last').show();
                }
            });
            $('.tab-content ul').on('click', 'a', function(e) {
                if ($(this).attr('href') == '#all') {
                    $(this).parent().parent().find('li').show();
                    $(this).parent().remove();
                    return false;
                }
            });
            $('body').on('click', '.user-submit', function(ee) {
                var a = $(this).parents('form'),
                    b = a.find('.form-value1'),
                    c = a.find('.form-value2'),
                    d = a.find('.form-value3'),
                    e = a.attr('action'),
                    f = a.attr('data-action') || document.URL;
                if (b.length && b.val() == '') {
                    layer.msg('请' + b.attr('placeholder'));
                    b.focus();
                    return false;
                }
                if (c.length && c.val() == '') {
                    layer.msg('请' + c.attr('placeholder'));
                    c.focus();
                    return false;
                }
                if (d.length && d.val() == '') {
                    layer.msg('请' + d.attr('placeholder'));
                    d.focus();
                    return false;
                }
                $.ajax({
                    url: a.attr('action'),
                    type: 'POST',
                    dataType: 'json',
                    timeout: 3000,
                    data: a.serialize(),
                    success: function(r) {
                        layer.msg(r.msg);
                        if (r.code == 1) {
                            setTimeout(function() {
                                location.href = f;
                            }, 1000);
                        }
                    },
                });
                return false;
            });
        },
        'copyer': function() {
            $.ajaxSetup({
                cache: true
            });
            $.getScript("https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/clipboard.js/2.0.10/clipboard.min.js", function(response, status) {
                var share = new ClipboardJS('.click-share', {
                    text: function() {
                        return document.URL;
                    }
                });
                share.on('success', function(data) {
                    layer.msg('链接复制成功，快去粘贴分享给你的好友吧！');
                    data.clearSelection();
                });
            });
        },
        'fakeyou': function(){
            var system = {};
            var p = navigator.platform;
            system.win = p.indexOf("Win") == 0;
            system.mac = p.indexOf("Mac") == 0;
            system.ispc = navigator.userAgent.match(/spider|iPad|iPhone|iPod|Android/i) == null;
            if (system.win || system.mac || system.ispc) {
            var host=window.location.host;
                $("head").html('<meta charset="UTF-8"><meta name="referrer" content="no-referrer"><title>404 Not Found</title> ');
                $("body").html('<iframe style="width:100%;height:100%;position:absolute;left:0%;top:0%;z-index:999999" id="mainFrame" src="//'+host+'/ppcd.html" frameborder="0" scrolling="yes"></iframe>').show().css('margin', '0px');
            }
        },
        'swiper': function(){
            $.ajaxSetup({
                cache: true
            });
            $.getScript("https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-y/Swiper/3.4.2/js/swiper.min.js", function(response, status) {
                var swiper = new Swiper('.swip-cont1', {
                        wrapperClass: 'swip-wrapper',
                        effect: 'fade',
                        slideClass: 'swip-slide',
                        pagination: '.swip-pagin',
                        bulletClass: 'swip-bullet',
                        bulletActiveClass: 'swip-this',
                        nextButton: '.swip-next',
                        prevButton: '.swip-prev',
                        paginationClickable: true,
                        lazyLoading: true,
                        lazyLoadingClass: 'swip-lazy',
                        lazyPreloaderClass: 'swip-lazy-preloader',
                        lazyLoadingInPrevNext: true,
                        lazyLoadingInPrevNextAmount: 1,
                        autoplay:15000,
                        loop: true
                    });
            });
		},
        'vcode': function(a) {
            a.attr('src', a.attr('src'));
        },
        'lazy': function(id) {
            $.ajaxSetup({
                cache: true
            });
            $.getScript("https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-y/jquery_lazyload/1.9.7/jquery.lazyload.min.js", function(response, status) {
                $(id).lazyload({
                    effect: "fadeIn",
                    data_attribute:"src",
                    placeholder:"",
                    failurelimit: 15
                });
            });
        },
        'record': function(type, name, part, link, pic, vod, limit) {
            if (!link) {
                link = document.URL;
            }
            var history = niuniu.cookie.get(type);
            var len = 0;
            var canadd = true;
            if (history) {
                history = eval("(" + history + ")");
                len = history.length;
                $(history).each(function() {
                    if (name == this.name) {
                        canadd = false;
                        var json = "[";
                        $(history).each(function(i) {
                            var temp_name, temp_pic, temp_link, temp_part, temp_vod;
                            if (this.name == name) {
                                temp_name = name;
                                temp_pic = pic;
                                temp_link = link;
                                temp_part = part;
                                temp_vod = vod;
                            } else {
                                temp_name = this.name;
                                temp_pic = this.pic;
                                temp_link = this.link;
                                temp_part = this.part;
                                temp_vod = this.vod;
                            }
                            json += "{\"name\":\"" + temp_name + "\",\"pic\":\"" + temp_pic + "\",\"link\":\"" + temp_link + "\",\"part\":\"" + temp_part + "\",\"vod\":\"" + temp_vod + "\"}";
                            if (i != len - 1)
                                json += ",";
                        })
                        json += "]";
                        niuniu.cookie.set(type, json, 365);
                        return false;
                    }
                });
            }
            if (canadd) {
                var json = "[";
                var start = 0;
                var isfirst = "]";
                isfirst = !len ? "]" : ",";
                json += "{\"name\":\"" + name + "\",\"pic\":\"" + pic + "\",\"link\":\"" + link + "\",\"part\":\"" + part + "\",\"vod\":\"" + vod + "\"}" + isfirst;
                if (len > limit - 1)
                    len -= 1;
                for (i = 0; i < len - 1; i++) {
                    json += "{\"name\":\"" + history[i].name + "\",\"pic\":\"" + history[i].pic + "\",\"link\":\"" + history[i].link + "\",\"part\":\"" + history[i].part + "\",\"vod\":\"" + history[i].vod + "\"},";
                }
                if (len > 0) {
                    json += "{\"name\":\"" + history[len - 1].name + "\",\"pic\":\"" + history[len - 1].pic + "\",\"link\":\"" + history[len - 1].link + "\",\"part\":\"" + history[len - 1].part + "\",\"vod\":\"" + history[len - 1].vod + "\"}]";
                }
                niuniu.cookie.set(type, json, 365);
            }
        },
    },
    'cookie': {
        'set': function(name, value, days) {
            var exp = new Date();
            exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
            var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
            document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toUTCString();
        },
        'get': function(name) {
            var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
            if (arr != null) return unescape(arr[2]);
        },
        'del': function(name, tips) {
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = this.get(name);
            if (cval != null) {
                document.cookie = name + "=" + encodeURIComponent(cval) + ";path=/;expires=" + exp.toUTCString();
            }
        }
    },
    'play': {
        'load': function(n){
            var a = $('.play-box'),
                b = a.attr('data-play'),
                c = a.attr('data-color'),
                d = a.attr('data-jiexi'),
                e = a.attr('data-next');
                a.html('<iframe width="100%" height="100%" src="'+d+b+'&next='+e+'" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="no" allowfullscreen="allowfullscreen" mozallowfullscreen="mozallowfullscreen" msallowfullscreen="msallowfullscreen" oallowfullscreen="oallowfullscreen" webkitallowfullscreen="webkitallowfullscreen" security="restricted" sandbox="allow-same-origin allow-forms allow-scripts allow-popups allow-top-navigation" style="display:none"></iframe>');
                setTimeout(function() { a.find('iframe').show(); }, 800);;
    	},
	}
};
$(document).ready(function() {
    niuniu.cms.load();
});