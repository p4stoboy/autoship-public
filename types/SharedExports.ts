import { domProps as gunDomProps } from '../entities/cells/basic-gun';
import { domProps as thrusterDomProps } from '../entities/cells/basic-thruster';
import { domProps as coreDomProps } from '../entities/cells/basic-core';
import { domProps as hullDomProps } from '../entities/cells/basic-hull';
import { CellDomProps } from './Cell';


const props = [
	coreDomProps,
	hullDomProps,
	thrusterDomProps,
	gunDomProps,
];

export const domProps: Record<string, CellDomProps> = props.reduce((map, prop) => {
	map[prop.type] = prop;
	return map;
}, {} as Record<string, CellDomProps>);