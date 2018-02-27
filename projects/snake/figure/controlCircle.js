class ControlCircle extends Circle{
  constructor(name, x, y, radius, color, father){
    super(name, x, y, radius, color);
    this.aroundCircle = new Circle("Around", x, y+0.5, 50, "red");
    console.log(this.aroundCircle.name);
  }

  updatePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();
    this.x = e.clientX - rect.left;
    this.y = e.clientY - rect.top;
    var pos = this.toMaxCoord();
    return pos;
  }

  draw(canvas) {
    this.aroundCircle.draw(canvas);
    super.draw(canvas);
  }

  toMaxCoord() {
    var side = ["center", "center"];

    var mx = this.x - this.aroundCircle.x;
    var my = this.y - this.aroundCircle.y;
    if (mx > 0 && my > 0) {side[0] = "right"; side[1] = "down";}
    else if (mx > 0 && my < 0) {side[0] = "right"; side[1] = "top";}
    else if (mx < 0 && my > 0) {side[0] = "left"; side[1] = "down";}
    else if (mx < 0 && my < 0) {side[0] = "left"; side[1] = "top";}
    else {side = ["center", "center"];}
    var result = this.countCatet(mx,my,side);
    return result;
  }

  countCatet(mx, my, side) {
    var radius = this.aroundCircle.radius-this.radius;
    if (my > radius) my = radius;
    else if (my < -radius) my = -radius;
    if (mx > radius) mx = radius;
    else if (mx < -radius) mx = -radius;
    // if (side[0] == "left") {x = -x;}
    // if (side[1] == "top") {y = -y;}
    // if (side[0] == "center") {x = 0;}
    // if (side[1] == "center") {y = 0;}
    this.x = mx + this.aroundCircle.x;
    this.y = my + this.aroundCircle.y;
    // console.log(mx,my)
    return [mx,my];
  }

}
