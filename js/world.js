/**
 * @param {number} x
 * @param {number} y
 * @constructor
 */
function Point(x, y) {
  this.x = x
  this.y = y
}

/**
 * @param {Point} point
 * @param {number} direction
 * @constructor
 */
function Position(point, direction) {
  this.point = point
  this.direction = direction
}

/**
 * @param {Block[]} blocks
 * @param {Tank[]} tanks
 * @param {Bullet[]} bullets
 * @constructor
 */
function World(blocks, tanks, bullets) {
  this.blocks = blocks
  this.tanks = tanks
  this.bullets = bullets
}

World.width = 800
World.height = 600

function PointGameObject(point) {
  this.point = point
}

function DirectedGameObject(position) {
  this.position = position
}

function LineGameObject(pointA, pointB) {
  this.pointA = pointA
  this.pointB = pointB
}

function Sensor(gameObjects) {
  this.gameObjects = gameObjects
}
