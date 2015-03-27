// ==UserScript==
// @name         hack the course
// @namespace    https://github.com/HelloCodeMing/HackCourse
// @version      0.1
// @description  hack the Soochow university network public course
// @author       huanming wong
// @match        http://kczx.suda.edu.cn/G2S/Learning/Learning.htm?*
// @grant        none
// ==/UserScript==

$(document).ready(function() {
    jwplayer('div_play').onPlay(hackIt);
    setTimeout(hackIt, 10 * 1000);
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
}
