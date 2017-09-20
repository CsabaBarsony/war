let battleground

function renderTank(tank) {
  let tankDomElement

  if (document.getElementById('tank' + tank.id)) {
    tankDomElement = document.getElementById('tank' + tank.id)
  } else {
    tankDomElement = document.createElement('div')
    tankDomElement.id = 'tank' + tank.id
    tankDomElement.className = 'tank'

    const directionMarker = document.createElement('div')
    directionMarker.className = 'directionMarker'

    tankDomElement.appendChild(directionMarker)
    battleground.appendChild(tankDomElement)
  }

  tankDomElement.style.left = tank.position.point.x + 'px'
  tankDomElement.style.top = tank.position.point.y + 'px'
  tankDomElement.style.transform ='translate(-10px, -10px) rotate(' + (tank.position.direction * 180 / Math.PI) + 'deg)'
}

function renderBullet(bullet) {
  let bulletDomElement

  if (document.getElementById('bullet' + bullet.id) && bullet.exists) {
    bulletDomElement = document.getElementById('bullet' + bullet.id)
  } else if (document.getElementById('bullet' + bullet.id) && !bullet.exists) {
    battleground.removeChild(document.getElementById('bullet' + bullet.id))
    return
  } else if (!bullet.exists) {
    return
  } else {
    bulletDomElement = document.createElement('div')
    bulletDomElement.id = 'bullet' + bullet.id
    bulletDomElement.className = 'bullet'
    battleground.appendChild(bulletDomElement)
  }

  bulletDomElement.style.left = bullet.position.point.x + 'px'
  bulletDomElement.style.top  = bullet.position.point.y + 'px'
}

function renderWorld(world) {
  battleground = document.getElementById('battleground')

  world.blocks.forEach(block => {
    const blockDiv = document.createElement('div')

    blockDiv.className = 'block'
    blockDiv.style.width  = (block.vertical ? Block.width : block.length) + 'px'
    blockDiv.style.height = (block.vertical ? block.length : Block.width) + 'px'
    blockDiv.style.left = block.point.x + 'px'
    blockDiv.style.top = block.point.y + 'px'

    battleground.appendChild(blockDiv)
  })

  world.tanks.forEach(tank => {
    renderTank(tank)
  })
}

const tankOne = new Tank(1, new Position(new Point(250, 250), Math.PI * 0.3))
const tankTwo = new Tank(2, new Position(new Point(300, 300), Math.PI * 0.3))
const tanks = [tankOne, tankTwo]

const world = new World(
  [
    // Walls
    new Block(new Point(-1 * Block.width, 0), World.height, true),
    new Block(new Point(World.width, 0), World.height, true),
    new Block(new Point(-1 * Block.width, -1 * Block.width), World.width + 2 * Block.width, false),
    new Block(new Point(-1 * Block.width, World.height), World.width + 2 * Block.width, false),

    // Other blocks
    new Block(new Point(100, 100), 200, false),
    new Block(new Point(200, 50), 200, true),
  ],
  tanks,
  [],
)

renderWorld(world)

setInterval(function() {
  world.tanks.forEach(tank => {
    if (tank.isMoving || tank.rotationState !== Tank.rotationStates.NOT_ROTATING) {
      tank.nextPosition(world)
      renderTank(tank)
    }
  })

  const bulletIndexesToDelete = []

  world.bullets.forEach((bullet, i) => {
    bullet.nextPosition(world)

    if (!bullet.exists) {
      bulletIndexesToDelete.push(i)
    }

    renderBullet(bullet)
  })

  world.bullets = world.bullets.filter((bullet, bulletIndex) => {
    let keep = true

    for(let i = 0; i < bulletIndexesToDelete.length; i++) {
      if (bulletIndex === bulletIndexesToDelete[i]) {
        keep = false
        break
      }
    }

    return keep
  })
}, 16)

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp':
      tankOne.isMoving = true
      break
    case 'ArrowLeft':
      tankOne.rotationState = Tank.rotationStates.ROTATING_LEFT
      break
    case 'ArrowRight':
      tankOne.rotationState = Tank.rotationStates.ROTATING_RIGHT
      break
    case ' ':
      world.bullets.push(tankOne.shoot())
      break
  }
})

document.addEventListener('keyup', e => {
  switch (e.key) {
    case 'ArrowUp':
      tankOne.isMoving = false
      break
    case 'ArrowLeft':
    case 'ArrowRight':
      tankOne.rotationState = Tank.rotationStates.NOT_ROTATING
      break
  }
})
