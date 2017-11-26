var ANI_TIME = 500

function open_big_circle() {
    mid = $("#mid_circle")
    if (!mid.hasClass("flag_open")) {
        return 0;
    } else {
        mid.addClass('big_circle_open')
    }
}


function change_title(s) {
    $(".title h3").css("opacity", "0")
    $(".title h3").text(s)

    $(".title h3").animate({
        opacity: 1,
        ANI_TIME
    })

}

function change_foot(s) {
    $(".foot").css("opacity", "0")
    $(".foot").text(s)

    $(".foot").animate({
        opacity: 1,
        ANI_TIME
    })

}

function initial_to_recording() {
    $("#mid_circle").addClass("mid_circle_open")
    $("#mid_circle").removeClass("mid_circle_close")

    $("#big_circle").addClass("big_circle_open")
    $("#big_circle").removeClass("big_circle_close")

    $(".microphone").show()


    change_title("Tell me")
    change_foot("What inspires you")

    stop_shake()


}

function recording_to_loading() {

    $(".microphone").hide(ANI_TIME)
    $(".bar_container").show(ANI_TIME)

    $(".bar1").addClass("bar1_move")
    $(".bar2").addClass("bar2_move")
    $(".bar3").addClass("bar3_move")
    $(".bar4").addClass("bar4_move")

    change_title("Refining")
    change_foot("")



}

function loading_to_play() {

    change_title("Artist Name")
    change_foot("song name")

    $(".bar_container").hide(ANI_TIME)

    $(".bar1").removeClass("bar1_move")
    $(".bar2").removeClass("bar2_move")
    $(".bar3").removeClass("bar3_move")
    $(".bar4").removeClass("bar4_move")

    $(".mid_circle_shadow").show()
    $(".mid_circle_shadow").addClass("mid_circle_shadow_open")

    $("#mid_circle").removeClass("mid_circle_open")
    $("#mid_circle").addClass("mid_circle_close")

    $("#big_circle").removeClass("big_circle_open")
    $("#big_circle").addClass("big_circle_close")
    //    start_shake();


}

function initial_to_loading() {
    $("#mid_circle").addClass("mid_circle_open")
    $("#mid_circle").removeClass("mid_circle_close")

    $("#big_circle").addClass("big_circle_open")
    $("#big_circle").removeClass("big_circle_close")

    $(".bar_container").show()

    $(".bar1").addClass("bar1_move")
    $(".bar2").addClass("bar2_move")
    $(".bar3").addClass("bar3_move")
    $(".bar4").addClass("bar4_move")
    stop_shake()
    change_title("Refining")
    change_foot("")
}

function play_to_loading() {
    $("#mid_circle").addClass("mid_circle_open")
    $("#mid_circle").removeClass("mid_circle_close")

    $("#big_circle").addClass("big_circle_open")
    $("#big_circle").removeClass("big_circle_close")

    $(".mid_circle_shadow").removeClass("mid_circle_shadow_open")
    $(".mid_circle_shadow").hide()

    $(".bar_container").show()

    $(".bar1").addClass("bar1_move")
    $(".bar2").addClass("bar2_move")
    $(".bar3").addClass("bar3_move")
    $(".bar4").addClass("bar4_move")

    change_title("Refining")
    change_foot("")
}

function play_to_initial() {

    $(".mid_circle_shadow").removeClass("mid_circle_shadow_open")
    $(".mid_circle_shadow").hide()

    change_title("Inspiration")
    change_foot("")
    start_shake()

}


function transition(old_, new_) {
    console.log("transition " + old_ + "->" + new_)
    if (old_ == 0 & new_ == 1) {
        initial_to_recording()
        return new_
    } else if (old_ == 1 & new_ == 2) {
        recording_to_loading()
        return new_
    } else if (old_ == 2 & new_ == 3) {
        loading_to_play()
        return new_
    } else if (old_ == 0 & new_ == 2) {
        initial_to_loading()
        return new_
    } else if (old_ == 3 & new_ == 2) {
        play_to_loading()
        return new_
    } else if (old_ == 3 & new_ == 0) {
        play_to_initial()
        return new_
    }
    return old_

}


function shake(e) {
    var x_last = 0;
    var y_last = 0;
    var z_last = 0;
    var x_new = 0;
    var y_new = 0;
    var z_new = 0;
    var stop = false;
    window.addEventListener('devicemotion', function (e) {
        var c = e.accelerationIncludingGravity;
        x_new = c.x;
        y_new = c.y;
        z_new = c.z;

    }, false);

    setInterval(function (e) {
        if ($(".mid_circle_position").hasClass("flag_open")) {

            var change = Math.abs(x_new - x_last) + Math.abs(y_new - y_last) + Math.abs(z_new - z_last)
            var dir = Math.sign(x_new + y_new + z_new)
            if (change > 30) {

                // HARD CODE!!!!!!
                if (get_s() == 0) {
                    set_s(transition(0, 2))
                    stop_shake()
                    //                    $(".foot").text("" + change)
                } else if (get_s() == 3) {
                    set_s(transition(3, 2))
                    stop_shake()
                }
                //$(".foot").text("" + change)
            } else {
                $(".mid_circle_position").css("left", "" + change / 30 * 100 + "%")
                //$(".foot").text("" + change)
            }
        }

    }, 20)

}

function start_shake() {
    $(".mid_circle_position").addClass("flag_open")
}

function stop_shake() {
    $(".mid_circle_position").removeClass("flag_open")
    $(".mid_circle_position").css("left", "50%")
}

function set_s(num) {
    $("body").removeClass("s_0")
    $("body").removeClass("s_1")
    $("body").removeClass("s_2")
    $("body").removeClass("s_3")
    $("body").addClass("s_" + num)

}

function get_s() {
    num0 = $("body").hasClass("s_0")
    num1 = $("body").hasClass("s_1")
    num2 = $("body").hasClass("s_2")
    num3 = $("body").hasClass("s_3")
    if (num0) {
        return 0
    }
    if (num1) {
        return 1
    }
    if (num2) {
        return 2
    }
    if (num3) {
        return 3
    }
}

$(document).ready(function () {
    console.log("welcome")

    set_s(0)

    if (get_s() == 0) {
        start_shake()
    }



    

    $("body").on("vmousedown", function () {
        console.log("mouse down")
        if (get_s() == 0) {
            set_s(transition(0, 1))
        }
        
        /*after loading*/
        if (get_s() == 2) {
            set_s(transition(2, 3))
        }
    })

//    $("body").on("vmouseup vmousecancel vmouseout", function () {
    $("body").on("vmouseup", function () {
        if (get_s() == 1) {
            set_s(transition(1, 2))
        }
    })


    $(".mid_circle").click(function () {
        if (get_s() == 3) {
            set_s(transition(3, 0))
        }
    })

    shake()




});
