/**
 * @param {Position} position
 * @param {Tank} owner
 * @constructor
 */
function Bullet(id, position, owner) {
  this.id = id
  this.position = position
  this.owner = owner
  this.exists = true
}

Bullet.speed = 5

/**
 * @param {World} world
 */
Bullet.prototype.nextPosition = function(world) {
  const result = {
    point: {
      x: this.position.point.x,
      y: this.position.point.y,
    },
    direction: this.position.direction,
  }

  const nextPoint = new Point(
    this.position.point.x + Bullet.speed * Math.cos(this.position.direction),
    this.position.point.y + Bullet.speed * Math.sin(this.position.direction)
  )

  for (let i = 0; i < world.blocks.length; i++) {
    if (world.blocks[i].contains(nextPoint)) {
      // collision = true
      this.exists = false
      break
    }
  }

  if (this.exists) {
    for (let i = 0; i < world.tanks.length; i++) {
      if (world.tanks[i].id !== this.owner.id && world.tanks[i].contains(nextPoint)) {
        this.owner.hits++
        world.tanks[i].injuries++
        // hit = true
        this.exists = false
        break
      }
    }

    if (this.exists) {
      result.point = nextPoint
    }
  }

  this.position = result
}
