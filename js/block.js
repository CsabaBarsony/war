/**
 * @param {Point} point
 * @param {number} length
 * @param {boolean} vertical
 * @constructor
 */
function Block(point, length, vertical) {
  this.point = point
  this.length = length
  this.vertical = vertical
}

Block.width = 20

/**
 * @param {Point} point
 * @param {number} [radius=0]
 * @returns {boolean}
 */
Block.prototype.contains = function(point, radius) {
  const r = radius || 0

  const containsHorizontally = point.y >= this.point.y - r && point.y <= this.point.y + (this.vertical ? this.length : Block.width) + r
  const containsVertically   = point.x >= this.point.x - r && point.x <= this.point.x + (this.vertical ? Block.width : this.length) + r

  return containsHorizontally && containsVertically
}
