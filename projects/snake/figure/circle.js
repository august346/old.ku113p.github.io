class Circle extends Figure {

  constructor(name, x, y, radius, color) {
    super(name, x, y, color);
    this.radius = radius;
  }

  draw(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
