
# AUTOSHIP Contribution Guide

Welcome to the AUTOSHIP contribution guide! This document will help you understand how to extend the game by creating
new cell types and bullet types. AUTOSHIP's modular architecture makes it easy to add new game elements without
requiring you to run the full codebase locally.

## Table of Contents

- [Overview](#overview)
- [Using the Sandbox](#using-the-sandbox)
- [Creating a New Cell Type](#creating-a-new-cell-type)
    - [Cell Type Structure](#cell-type-structure)
    - [Step-by-Step Guide for New Cell Types](#step-by-step-guide-for-new-cell-types)
    - [Cell Type Example](#cell-type-example)
- [Creating a New Bullet Type](#creating-a-new-bullet-type)
    - [Bullet Type Structure](#bullet-type-structure)
    - [Step-by-Step Guide for New Bullet Types](#step-by-step-guide-for-new-bullet-types)
    - [Bullet Type Example](#bullet-type-example)
- [Testing Your Contribution](#testing-your-contribution)
- [Submitting Your Contribution](#submitting-your-contribution)
- [Best Practices](#best-practices)

## Overview

AUTOSHIP is a spaceship battle simulation game with customizable ships built from different types of cells. The game
uses an entity-based design system that allows for easy extension and modification.

The two main extensible components are:

1. **Cell Types**: The building blocks of ships (Core, Hull, Thruster, Gun, etc.)
2. **Bullet Types**: Projectiles fired by gun cells

This guide focuses on creating new versions of these components to extend the game's functionality.

## Using the Sandbox

Instead of requiring a full local setup, AUTOSHIP provides an in-browser sandbox environment where you can develop and
test new cell types:

1. Visit the [AUTOSHIP Sandbox](https://autoship.space/sandbox)
2. Use the code editor tab to paste your custom cell module
3. Compile your module to test it in the simulated battle environment
4. Experiment with different ship configurations using your custom cells

The sandbox provides a complete testing environment without needing to set up the repository locally.

## Creating a New Cell Type

### Cell Type Structure

Each cell type needs several components to function properly in the game:

- `type` - A unique identifier string for your cell type
- `create` - Factory function to create new instances of the cell
- `update` - Logic for updating the cell each frame
- `damage` - Handles damage application and destruction
- `render` - Rendering code for the cell
- `onCollision` - Collision handling logic (optional)

### Step-by-Step Guide for New Cell Types

#### 1. Define the cell type and interface

```javascript
// First, define the cell type constant
exports.type = 'my-cell'; // Unique identifier

// Cell creation function
exports.create = function(seed, rarity = 1) {
	const r = giveRNG(seed);

	return {
		id: `my-cell-${r.randomString(8)}`,
		type: 'my-cell',
		seed,
		pos: { x: -1, y: -1 }, // To be set when placed in ship
		rarity,

		// Base properties
		mass: 5,
		maxHealth: 10 * rarity,
		health: 10 * rarity,
		color: '#ff00ff', // Your cell color

		// Custom properties
		specialProperty: rarity * 2,

		// Flags
		damaged: false,
		destroyed: false,
	};
}
```

#### 2. Implement the update function

```javascript
// Update function - runs every frame
exports.update = function(cell, shipId, battleState) {
	// Skip if destroyed
	if (cell.destroyed) return;

	// Your update logic here
	// This runs every frame for each cell of this type
}
```

#### 3. Implement the damage handler

```javascript
// Damage function
exports.damage = function(cell, amount, shipId, battleState) {
	// Skip if already destroyed
	if (cell.destroyed) return;

	// Apply damage
	cell.health -= amount;
	cell.damaged = true;

	// Check if destroyed
	if (cell.health <= 0) {
		exports.destroy(cell, shipId, battleState);
	}
}

// Destruction handler
exports.destroy = function(cell, shipId, battleState) {
	// Mark as destroyed
	cell.destroyed = true;
	cell.health = 0;

	// Create explosion effect if needed
	console.log(`Cell ${cell.id} destroyed`);
}
```

#### 4. Implement the render function

```javascript
// Render function
exports.render = function(ctx, cell, shipRot) {
	const cellSize = 10; // SHIP_CELL_SIZE

	// Calculate health percentage
	const healthPercent = cell.health / cell.maxHealth;

	// Draw cell
	ctx.fillStyle = cell.color;
	ctx.fillRect(
		-cellSize * 0.4,
		-cellSize * 0.4,
		cellSize * 0.8,
		cellSize * 0.8
	);

	// Add details specific to your cell type
}
```

#### 5. Implement collision handling (optional)

```javascript
// Collision handler (optional)
exports.onCollision = function(cell, otherCell, shipId, otherShipId, battleState) {
	// Your collision handling logic
}
```

### Cell Type Example

Let's examine a simple example of a Shield Cell that provides protection:

```javascript
// Define shield cell type
exports.type = 'shield';

// Create function
exports.create = function(seed, rarity = 1) {
	const r = giveRNG(seed);
	const maxEnergy = 20 * rarity;

	return {
		id: `shield-${r.randomString(8)}`,
		type: 'shield',
		seed,
		pos: { x: -1, y: -1 },
		rarity,

		// Base properties
		mass: 3,
		maxHealth: 5 * rarity,
		health: 5 * rarity,
		color: '#4287f5',

		// Shield properties
		energy: maxEnergy,
		maxEnergy,
		rechargeRate: 0.1 * rarity,
		active: false,

		// Flags
		damaged: false,
		destroyed: false,
	};
}

// Update function
exports.update = function(cell, shipId, battleState) {
	if (cell.destroyed) return;

	// Recharge shield energy
	if (cell.energy < cell.maxEnergy) {
		cell.energy = Math.min(cell.maxEnergy, cell.energy + cell.rechargeRate);
	}

	// Activate shield when enemy bullets are nearby
	cell.active = false;
	for (const bullet of battleState.bullets) {
		if (bullet.shipId !== shipId) {
			// Get ship
			const ship = battleState.ships[shipId];
			if (!ship) continue;

			// Calculate distance to bullet
			const dx = bullet.pos.x - ship.pos.x;
			const dy = bullet.pos.y - ship.pos.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			// Activate shield if bullet is close
			if (distance < 30) {
				cell.active = true;
				break;
			}
		}
	}
}

// Damage function
exports.damage = function(cell, amount, shipId, battleState) {
	if (cell.destroyed) return;

	// If shield is active and has energy, reduce damage
	if (cell.active && cell.energy > 0) {
		const energyUsed = Math.min(cell.energy, amount);
		cell.energy -= energyUsed;
		amount = Math.max(0, amount - energyUsed);
	}

	// Apply remaining damage
	cell.health -= amount;
	cell.damaged = true;

	// Check if destroyed
	if (cell.health <= 0) {
		exports.destroy(cell, shipId, battleState);
	}
}

// Destroy function
exports.destroy = function(cell, shipId, battleState) {
	cell.destroyed = true;
	cell.health = 0;
}

// Render function
exports.render = function(ctx, cell, shipRot) {
	const cellSize = 10; // SHIP_CELL_SIZE

	// Draw base cell
	ctx.fillStyle = cell.color;
	ctx.fillRect(
		-cellSize * 0.35,
		-cellSize * 0.35,
		cellSize * 0.7,
		cellSize * 0.7
	);

	// Draw shield effect if active
	if (cell.active) {
		ctx.beginPath();
		ctx.arc(0, 0, cellSize * 0.5, 0, Math.PI * 2);
		ctx.strokeStyle = `rgba(66, 135, 245, ${cell.energy / cell.maxEnergy})`;
		ctx.lineWidth = 2;
		ctx.stroke();
	}
}
```

## Creating a New Bullet Type

### Bullet Type Structure

Bullet types follow a similar structure to cell types but with fewer required functions:

- `type` - A unique identifier string for your bullet type
- `create` - Factory function to create new bullet instances
- `update` - Logic for updating the bullet each frame
- `render` - Rendering code for the bullet
- `onCollision` - Collision handling logic (optional)

### Step-by-Step Guide for New Bullet Types

The process for creating a bullet type is similar to creating a cell type. Use the sandbox to test your bullet type
implementation.

### Bullet Type Example

Here's a simple example of a Laser Bullet that penetrates multiple cells:

```javascript
// Define bullet type
exports.type = 'laser';

// Create function
exports.create = function(shipId, pos, dir, speed, damage, battleState) {
	const r = battleState.rng;

	const vel = {
		x: Math.cos(dir) * speed,
		y: Math.sin(dir) * speed,
	};

	return {
		id: `laser-${shipId}-${battleState.frame}-${r.randomString(4)}`,
		type: 'laser',
		shipId,
		pos: { ...pos },
		vel,
		dir,
		speed,
		damage: damage * 0.7, // Less damage but penetrates
		ttl: 90,
		size: 1.5,
		color: '#ff0000',
		destroyed: false,
		penetration: 3, // Can hit up to 3 cells
		hitCells: [], // IDs of cells already hit
	};
}

// Update function
exports.update = function(bullet, battleState) {
	// Skip destroyed bullets
	if (bullet.destroyed) return;

	// Update position
	bullet.pos.x += bullet.vel.x;
	bullet.pos.y += bullet.vel.y;

	// Decrement TTL
	bullet.ttl--;

	// Check if expired
	if (bullet.ttl <= 0) {
		bullet.destroyed = true;
		return;
	}

	// Handle boundary wrapping
	if (bullet.pos.x < 0) {
		bullet.pos.x = 250 + (bullet.pos.x % 250);
	} else if (bullet.pos.x > 250) {
		bullet.pos.x = bullet.pos.x % 250;
	}

	if (bullet.pos.y < 0) {
		bullet.pos.y = 250 + (bullet.pos.y % 250);
	} else if (bullet.pos.y > 250) {
		bullet.pos.y = bullet.pos.y % 250;
	}
}

// Render function
exports.render = function(ctx, bullet) {
	// Skip destroyed bullets
	if (bullet.destroyed) return;

	// Draw laser as a line
	ctx.strokeStyle = bullet.color;
	ctx.lineWidth = bullet.size;

	// Calculate line endpoint based on velocity
	const endX = bullet.pos.x - bullet.vel.x * 2;
	const endY = bullet.pos.y - bullet.vel.y * 2;

	ctx.beginPath();
	ctx.moveTo(bullet.pos.x, bullet.pos.y);
	ctx.lineTo(endX, endY);
	ctx.stroke();
}

// Collision handler
exports.onCollision = function(bullet, cell, shipId, battleState) {
	// Skip if bullet belongs to this ship
	if (bullet.shipId === shipId) return;

	// Skip if already hit this cell
	if (bullet.hitCells.includes(cell.id)) return;

	// Add to hit cells
	bullet.hitCells.push(cell.id);

	// Apply damage
	// Note: damage function would be called by the game engine

	// Reduce penetration
	bullet.penetration--;

	// Destroy if no more penetration
	if (bullet.penetration <= 0) {
		bullet.destroyed = true;
	}
}
```

## Testing Your Contribution

The sandbox environment provides a complete testing environment for your custom cell or bullet types:

1. **Paste your code** in the code editor tab
2. **Compile your module** to register it with the testing environment
3. **Switch to the test environment tab** to use your cell in ship designs
4. **Start the simulation** to see how your cell performs in battle
5. **Make refinements** and iterate on your design

## Submitting Your Contribution

Once you're ready to submit:

1. **Save your code** in a file with a descriptive name
2. **Create a Pull Request** to the AUTOSHIP repository with your new cell/bullet type
3. **Include in your PR description**:
    - What your new cell/bullet type does
    - Any new mechanics it introduces
    - Technical details or considerations
    - A screenshot or video of the cell/bullet in action (if applicable)

## Best Practices

- **Follow existing patterns**: Look at the provided examples for guidance
- **Balance gameplay**: New cell types should be balanced for fairness
- **Optimize performance**: Avoid computationally expensive operations
- **Document your code**: Add comments explaining complex logic
- **Handle edge cases**: Consider what happens when cells interact in unexpected ways
- **Use deterministic methods**: Always use the provided RNG functions for randomness

---

Thank you for contributing to AUTOSHIP! With your help, we can create an exciting variety of cells and bullets that make
the game more diverse and engaging.
