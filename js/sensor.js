function Sensor(triggerEvent) {
  this.triggerEvent = triggerEvent
}

Sensor.prototype.sense = function(oldWorld, newWorld) {

}

function Sector() {
  this.permanent = 0
  this.movable = 0
  this.directed = 0
  this.hazardous = 0
  this.good = 0
}

Sector.types = {
  PERMANENT: 'permanent',
  MOVABLE: 'movable',
  DIRECTED: 'directed',
  HAZARDOUS: 'hazardous',
  GOOD: 'good',
}

Sector.prototype.increase = function(type) {
  this[type]++
}

Sector.prototype.decrease = function(type) {
  this[type]--
}
