// src/entities/cells/basic-thruster/physics.ts
import { ThrusterCell } from './types';
import { Ship } from '../../../types/Ship';
import { MAX_ANGULAR_VELOCITY, MAX_SHIP_VELOCITY, SHIP_SIZE } from '../../../types/Constants';
import { dv } from '../../../utils/determinism';


export function applyThrusterForce(cell: ThrusterCell, ship: Ship): void {
	// Skip if basic-thruster isn't firing
	if (!cell.firing) return;

	// Calculate basic-thruster direction in local coordinates
	const thrusterAngle = cell.dir * 2 * Math.PI;

	// Thrust direction vector (negative because thrust is in opposite direction)
	const thrustDirection = {
		x: -Math.cos(thrusterAngle),
		y: -Math.sin(thrusterAngle),
	};

	// Calculate force magnitude
	const forceMagnitude = cell.power;

	// Calculate local force vector
	const localForce = {
		x: thrustDirection.x * forceMagnitude,
		y: thrustDirection.y * forceMagnitude,
	};

	// Transform to world coordinates
	const worldForce = dv.rotate(localForce, ship.rot);

	// Get physics properties from ship
	const { totalMass, centerOfMass, momentOfInertia } = ship.physicsProperties || {
		totalMass:       1,
		centerOfMass:    { x: 0, y: 0 },
		momentOfInertia: 1,
	};

	// Calculate cell position relative to center of mass
	const centerCoord = Math.floor(SHIP_SIZE / 2);
	const relPos      = {
		x: cell.pos.x - centerCoord - centerOfMass.x,
		y: cell.pos.y - centerCoord - centerOfMass.y,
	};

	// Calculate torque (r × F)
	const torque = relPos.x * localForce.y - relPos.y * localForce.x;

	// Calculate linear acceleration (F = ma, so a = F/m)
	const acceleration = {
		x: worldForce.x / totalMass,
		y: worldForce.y / totalMass,
	};

	// Calculate angular acceleration (τ = Iα, so α = τ/I)
	const angularAcceleration = torque / momentOfInertia;

	// Update velocities - directly mutating the ship object
	ship.vel.x += acceleration.x;
	ship.vel.y += acceleration.y;
	ship.angVel += angularAcceleration;

	// Cap velocities at maximum values
	const velocityMagnitude = Math.sqrt(ship.vel.x * ship.vel.x + ship.vel.y * ship.vel.y);
	if (velocityMagnitude > MAX_SHIP_VELOCITY) {
		const scaleFactor = MAX_SHIP_VELOCITY / velocityMagnitude;
		ship.vel.x *= scaleFactor;
		ship.vel.y *= scaleFactor;
	}

	if (Math.abs(ship.angVel) > MAX_ANGULAR_VELOCITY) {
		ship.angVel = Math.sign(ship.angVel) * MAX_ANGULAR_VELOCITY;
	}
}
