/**
 * Created by yuyou on 14/10/29.
 */
var slide = null;
var imgIndex = 0;		//当前图片

function check(index_1,index_2){
    if(result[index_1].result == index_2){
        show(result[index_1].info,true);
    }else{
        //回答错误
        show(result[index_1].info,false);
    }
}
function show(info,isRight){
    var _result = "";

    $("#result").animate({opacity:0},0).show();
    if(isRight){
        _result = "回答正确：<br />&nbsp;&nbsp;&nbsp;&nbsp;" + info;
        $("#result").html(_result);
        $("#result").animate({opacity:1},300).animate({opacity:1},1000).animate({opacity:0},300,function(){
            $(this).hide();
            slide.playNext();
        });
    }else{
        _result = "回答错误：<br />&nbsp;&nbsp;&nbsp;&nbsp;" + info;
        $("#result").html(_result);
        $("#result").animate({opacity:1},300).animate({opacity:1},1000).animate({opacity:0},300,function(){
            //触发错误和分享逻辑
        });
    }
}
function init(n){
    var lis = $("li.features");
    var _li = lis[n];
    var items = $(_li).find("article");
    var height = $(_li).find("span").height();
    flyTo($(items[0]),{x:10,y:height + 5},"center",600,200);
    flyTo($(items[1]),{x:10,y:height + 80},"center_right",600,200);
    flyTo($(items[2]),{x:10,y:height + 155},"center",600,200);
    flyTo($(items[3]),{x:10,y:height + 230},"center_right",600,200);


}
function init_1(){


    for(var i = 0 ; i < result.length ; i ++){
        var _item = result[i];
        var _title = _item.title;
        var _answers = _item.answers;
        var _li = $("<li></li>").addClass("features").addClass("mountain");
        $("<span></span>").html(_title).appendTo(_li);
        for(var j = 0 ; j < _answers.length ; j ++){
            $("<article></article>").html(_answers[j]).appendTo(_li);
        }
        $(_li).appendTo("ul.cf");

        $("<div></div>").addClass("layer").attr("data-depth","0.1").html('<img src="images/m2.png" width="240" height="120" class="m4">').appendTo(_li);
        $("<div></div>").addClass("layer").attr("data-depth","0.2").html('<img src="images/m2.png" width="200" height="100" class="m3">').appendTo(_li);
        $("<div></div>").addClass("layer").attr("data-depth","0.3").html('<img src="images/m1.png" width="300" height="150" class="m2">').appendTo(_li);
        $("<div></div>").addClass("layer").attr("data-depth","0.4").html('<img src="images/m1.png" width="200" height="100" class="m1">').appendTo(_li);
    }
    slide = new Slide("slide","slide_ul");
    slide.init();
    window.onresize = function(){
        slide.resize();
    }
    var scene = document.getElementById('slide');
    var parallax = new Parallax(scene);
    $("#loading").hide();
    var items = $("#page_1").find("img");
    var _cx = pageWidth() / 2;
    flyTo($(items[0]),{x:_cx - 130,y:10},"center",400,100);
    flyTo($(items[1]),{x:70,y:110},"center",400,300);
    flyTo($(items[2]),{x:10,y:210},"center",400,500);
    $("#debug").click(function(e){
        $(this).animate({opacity:0},300).hide();
        slide.playNext();
        return false;
    });

    $("li > article").click(function(e) {
        check($(this).parent().index() - 1,$(this).index() - 1);
    });
}