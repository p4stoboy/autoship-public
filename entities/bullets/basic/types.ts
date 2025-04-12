// src/entities/bullets/basic/types.ts
import { BaseBullet } from '../../../types/Bullet.ts';

export const BASIC_BULLET = 'basic';

export interface BasicBullet extends BaseBullet {
	type: typeof BASIC_BULLET;
	// Basic bullet specific properties (if any)
}
