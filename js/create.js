// 全局变量
var myindex = 0;
var myarr = [];
var h = 0;
var w = 0;
var a = 1;
var b = 1;

// 图片创建
function createDiv(myId) {
    var myData1 = [];
    var myWrap = document.getElementsByClassName('wrap')[0];
    myWrap.innerHTML = '';
    $.ajax({
        url: 'https://rate.tmall.com/list_detail_rate.htm?itemId='+myId+'&spuId=811914664&sellerId=1751864252&order=3&currentPage=1&append=0&content=1&tagId=&posi=&picture=1&ua=098%23E1hvk9vovL%2BvUQCkvvvvvjiPPL5pzjtWn2cytjEUPmPvQj3Rn2LOtj18R2MvljYWRLsOdphvhIpCGSNjvvC82AZNLXcXrb8qKLyCvvpvvhCvRphvCvvvphvtvpvhvvCvpUwCvvpv9hCvvphvC9mvphvvvbyCvm9vvhCfvvvvvvvvBGwvvUjrvvCj1Qvvv3QvvhNjvvvmF9vvBGwvvv8RuphvmvvvpoH5aJn8kphvC9hvpy2O6vyCvhQmMerdjc7ZHd8raAugQfutnCpDNr3lDC4655DEtRv7RqJ6EvLvqbVQKfE9xJFE%2BFuTRogRD76Xe4TJnDeDyBvOHdUf8w1l5FKzrmph2QhvCPMMvvvtvpvhvvCvp8wCvvpvvhHhCQhvCYsw7DdNzgArvpvp9QREF%2B9vv2x0%2BoYC6XZzRu6CvvyvvFGzLpvvPWGjvpvEjn147rGhWIy89phvHnQwj7WLzYswzWlL7%2FGWzCqwqHiI&isg=Amhox7Zjpl8Pmorbl46_TsBjOV-6OQt3rcJzaSKZLOPNfQnnyKNfK-f_CSN2&needFold=0&_ksTS=1515475328740_1237',
        dataType: 'jsonp',
        success: function (data) {
            var myData = data.rateDetail['rateList'];
            myData1 = [];
            for (var i = 0; i < myData.length; i++) {
                myData1[i] = {};
                myData1[i].rateContent = myData[i].rateContent
                myData1[i].rateDate = myData[i].rateDate
                myData1[i].pics = myData[i].pics
                myData1[i].displayUserNick = myData[i].displayUserNick
            }

            for (var j = 0; j < myData1.length; j++) {
                var mydiv = document.createElement('div');
                var mybox = document.createElement('div');
                var p1 = document.createElement('p');
                var p2 = document.createElement('p');
                var p1Text = myData1[j].rateDate + '：' + myData1[j].displayUserNick + ' 评论';
                p1.innerHTML = p1Text;
                p2.innerHTML = myData1[j].rateContent;
                mybox.appendChild(p1);
                mybox.appendChild(p2);
                for (var i = 0; i < myData1[j].pics.length; i++) {
                    var img = document.createElement('img');
                    img.className = 'myimg';
                    var newImg = new Image();
                    newImg.src = 'http:' + myData1[j].pics[i]
                    // img.src = 'http:' + myData1[j].pics[i];
                    img.setAttribute('data-original','http:' + myData1[j].pics[i]);
                    img.setAttribute('data-index2', i);
                    img.setAttribute('data-index1', j);
                    img.setAttribute('data-num', myData1[j].pics.length);
                    img.setAttribute('onclick', 'showImgDiv');
                    var bili = 276 / newImg.width;
                    console.log(bili)
                    img.style.width = 276 + 'px';
                    // img.style.height = newImg.height * bili + 'px';
                    img.style.height = 376 + 'px';
                    mybox.appendChild(img);
                    // console.log(newImg.width);
                    // console.log(newImg.height);
                }
                mybox.className = 'mybox';
                mybox.id = 'mybox';
                mydiv.className = 'mydiv';
                mydiv.appendChild(mybox);
                myWrap.appendChild(mydiv);
            }
            showImgDiv();
            $("img").lazyload();
        }
    })

}

//图片显示 & 遮罩
function showImgAndMask() {
    var createImg = $(`<div class="showImg" id="showImg">
                        <img id='show-img' src="" alt="">
                            <span class="show-index" id="show-index">1 / 4</span>
                            <span class="prev btn1" id="prev"><img src="./images/prev.png" alt=""></span>
                            <span class="next btn1" id="next"><img src="./images/next.png" alt=""></span>
                        </div>`)
    var createMask= $(`<div class="mask" id="mask"></div>`)
    $('body').append(createImg,createMask)
}

// 展示大图
function showImgDiv() {
    var myImgs = document.getElementsByClassName('myimg');
    for (var i = 0; i < myImgs.length; i++) {
        myImgs[i].addEventListener('click', function (e) {
            var childs = this.parentNode.getElementsByTagName('img');
            myarr = [];
            for (var i = 0; i < childs.length; i++) {
                myarr[i] = childs[i].getAttribute('src');
            }
            myindex = this.getAttribute('data-index2');
            e.stopPropagation();
            $('#mask').fadeIn();
            $('#showImg').fadeIn();
            hideScroll()
            a = this.getAttribute('data-index2') - 0 + 1;
            b = this.getAttribute('data-num') - 0;
            $('#show-index').html(a + ' / ' + b);
            var img1 = new Image();
            img1.src = this.getAttribute('src');
            h = img1.height;
            w = img1.width;
            $('#show-img').attr('src', this.getAttribute('src'));

            changeImgSize($('#showImg'), h, w, $('#prev'), $('#next'));
        })
    }
}

// 自适应大小
function changeImgSize(par,h,w,prev,next) {
    // console.log(h)
    // 判断图片大小
    if (h > w) {
        if(h >= 2500) {
            h = h * 0.255;
            w = w * 0.255;
        }
        else if(h >= 1500) {
            h = h * 0.555;
            w = w * 0.555;
        }
        else if(h >= 1280) {
            h = h * 0.655;
            w = w * 0.655;
        }
        else if (h >= 1000) {
            h = h * 0.755;
            w = w * 0.755;
        } else if (h >= 700) {
            h = h * 0.9;
            w = w * 0.9;
        }

        showImgChangePos(par, h, w, prev, next)
    } else {
        if(w >= 2500) {
            h = h * 0.355;
            w = w * 0.355;
        }
        else if(w >= 1500) {
            h = h * 0.85;
            w = w * 0.85;
        }
        else if (w >= 1000) {
            w = w * 0.75;
            h = h * 0.75;
        } else if (w >= 700) {
            w = w * 0.95;
            h = h * 0.95;
        }

        showImgChangePos(par, h, w, prev, next)
    }
}

function showImgChangePos(ele, h, w, p, n) {
    ele.css({
        height: h,
        width: w,
        marginTop: -h / 2 + 'px',
        marginLeft: -w / 2 + 'px'
    });
    p.css({
        lineHeight: h
    })
    n.css({
        lineHeight: h
    })
}

// 隐藏滚动条
function hideScroll() {
    $('body')[0].style.overflow = 'hidden';
    $('body')[0].style.height = '100%';
}

// 显示滚动条
function showScroll() {
    $('body')[0].style.overflow = 'auto';
    $('body')[0].style.height = 'auto';
}


// 事件
$('#showImg').on('click', function (e) {
    e.stopPropagation();
})
$('body').on('click', function (e) {
    e.stopPropagation();
    $('#mask').fadeOut();
    $('#showImg').fadeOut();
    showScroll();
})
$('#next').on('click', function () {
    if (myindex < myarr.length-1) {
        myindex++;
        a = myindex+1;
        clickBtn();
    }
})
$('#prev').on('click', function () {
    if (myindex > 0) {
        myindex--;
        a = myindex+1;
        clickBtn();
    }
})

// 点击函数
function clickBtn() {
    var img1 = new Image();
    img1.src = myarr[myindex];
    h = img1.height;
    w = img1.width;
    $('#show-index').html(a + ' / ' + b);
    $('#show-img').attr('src', myarr[myindex]);
    changeImgSize($('#showImg'), h, w, $('#prev'), $('#next'))
}function clickBtn() {
    var img1 = new Image();
    img1.src = myarr[myindex];
    h = img1.height;
    w = img1.width;
    $('#show-index').html(a + ' / ' + b);
    $('#show-img').attr('src', myarr[myindex]);
    changeImgSize($('#showImg'), h, w, $('#prev'), $('#next'))
}


