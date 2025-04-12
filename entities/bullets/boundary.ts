import { BasicBullet } from './basic';
import { ARENA_SIZE } from '../../types/Constants';

export function handleBulletBoundary(bullet: BasicBullet): void {
	// X boundaries wraparound
	if (bullet.pos.x < 0) {
		bullet.pos.x = ARENA_SIZE + (bullet.pos.x % ARENA_SIZE);
	} else if (bullet.pos.x > ARENA_SIZE) {
		bullet.pos.x = bullet.pos.x % ARENA_SIZE;
	}

	// Y boundaries wraparound
	if (bullet.pos.y < 0) {
		bullet.pos.y = ARENA_SIZE + (bullet.pos.y % ARENA_SIZE);
	} else if (bullet.pos.y > ARENA_SIZE) {
		bullet.pos.y = bullet.pos.y % ARENA_SIZE;
	}
}
