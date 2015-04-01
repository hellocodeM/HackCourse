// ==UserScript==
// @name         网络公选课
// @namespace    http://your.homepage/
// @version      0.1
// @description  enter something useful
// @author       You
// @match        http://kczx.suda.edu.cn/G2S/Learning/Learning.htm?*
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    jwplayer('div_play').onPlay(hackIt);
    setTimeout(hackIt, 1 * 1000);
});

function hackIt() {
    console.log('hack the class');
    var endTime = parseInt($(".item_odd1").attr("videotime"));

    jwplayer('div_play').seek(endTime);
    $.ajax({ url: 'StudentLearning.ashx?action=GetG2SSetStageLearnPartStudent&fPlanID=' +
            $(".item_odd1").attr("fbi") +
            '&fPartID=' + $(".item_odd1").attr("kid") +
            "&fSecond=" + endTime, 
            cache: false,
            success: function(data) {
                console.log('succeed');
            }
           });
    // 资料
    ShowTabs(2);
    $('#dataList').children().each(function() {
        var link = $(this).children().first();
        $.ajax({ url: 'StudentLearning.ashx?action=GetG2SSetStageLearnPartStudentFiles&fPlanID=' +
                link.attr("PlanID") +
                '&fPartID=' +
                link.attr("PartID") +
                "&fFileIDS=" +
                link.attr("kid"), 
                cache: false, async: false,
                success: function(data) {
                    console.log('finish ' + link.attr('title'));
                }
               });
    });
    alert("本课已经完成，请刷新页面跳到下一课");
}