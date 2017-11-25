var rotate_factor = 0;

function rotateMe(e) {
    rotate_factor += 1;
    var rotate_angle = (180 * rotate_factor) % 360;
    $(e).rotate({angle:rotate_angle});
}