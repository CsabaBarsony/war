/**
 * @param {number} id
 * @param {Position} position
 * @constructor
 */
function Tank(id, position) {
  this.id = id
  this.position = position
  this.sensor = new Sensor()
  this.isMoving = false
  this.isShooting = false
  this.rotationState = Tank.rotationStates.NOT_ROTATING
  this.hits = 0
  this.shots = 0
  this.injuries = 0
  this.moves = 0
}

Tank.radius = 10
Tank.motionSpeed = 2
Tank.rotationSpeed = 3
Tank.rotationStates = {
  NOT_ROTATING: 'NOT_ROTATING',
  ROTATING_LEFT: 'ROTATING_LEFT',
  ROTATING_RIGHT: 'ROTATING_RIGHT',
}
Tank.bulletIdCount = 0

/**
 * @param {World} world
 */
Tank.prototype.nextPosition = function(world) {
  const result = {
    point: {
      x: this.position.point.x,
      y: this.position.point.y,
    },
    direction: this.position.direction,
  }

  if (this.isMoving) {
    let collision = false
    const nextPoint = new Point(
      this.position.point.x + Tank.motionSpeed * Math.cos(this.position.direction),
      this.position.point.y + Tank.motionSpeed * Math.sin(this.position.direction)
    )

    for (let i = 0; i < world.blocks.length; i++) {
      if (world.blocks[i].contains(nextPoint, Tank.radius)) {
        collision = true
        break
      }
    }

    if (!collision) {
      this.moves++
      result.point = nextPoint
    }
  }

  switch (this.rotationState) {
    case Tank.rotationStates.ROTATING_LEFT:
      result.direction = this.position.direction -= (Math.PI / 180) * Tank.rotationSpeed
      break
    case Tank.rotationStates.ROTATING_RIGHT:
      result.direction = this.position.direction += (Math.PI / 180) * Tank.rotationSpeed
      break
  }

  this.position = result
}

/**
 * @param {Point} point
 * @returns {boolean}
 */
Tank.prototype.contains = function(point) {
  return utils.distance(point, this.position.point) <= Tank.radius
}

Tank.prototype.shoot = function() {
  return new Bullet(Tank.bulletIdCount++, new Position(new Point(this.position.point.x, this.position.point.y), this.position.direction), this)
}
