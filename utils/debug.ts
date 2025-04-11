export enum DebugLevel {
	NONE  = 0,
	ERROR = 1,
	WARN  = 2,
	INFO  = 3,
	DEBUG = 4,
}

export let currentDebugLevel = DebugLevel.NONE;

export const setDebugLevel = (level: DebugLevel) => {
	currentDebugLevel = level;
	console.log(`Debug level set to: ${DebugLevel[level]}`);
};

export const debug = (message: string, level: DebugLevel = DebugLevel.DEBUG) => {
	if (level <= currentDebugLevel) {
		const prefix = `[${DebugLevel[level]}]: `;

		switch (level) {
			case DebugLevel.ERROR:
				console.error(prefix + message);
				break;
			case DebugLevel.WARN:
				console.warn(prefix + message);
				break;
			default:
				console.log(prefix + message);
		}
	}
};