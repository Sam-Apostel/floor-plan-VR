const WALL_HEIGHT = 2.5;
const WALL_WIDTH = 0.1;
const DOOR_WIDTH = 0.9;
const DOOR_HEIGHT = 2.1;
const sizes = {
	wall: 0.1,
	door: 0.9,
};

export const walls = [
	{
		height: WALL_HEIGHT,
		width: WALL_WIDTH,
		start: {
			x: -0.41,
			y: 3.15,
		},
		end: {
			x: -0.41,
			y: 3.15 + 3.68,
		},
	},
	{
		height: WALL_HEIGHT,
		width: WALL_WIDTH,
		start: {
			x: -0.56 - 1.28,
			y: 3.1,
		},
		end: {
			x: -0.36,
			y: 3.1,
		},
		door: {
			distance: 0.385,
			width: DOOR_WIDTH,
			height: DOOR_HEIGHT,
		},
	},
	{
		height: WALL_HEIGHT,
		width: WALL_WIDTH,
		start: {
			x: -0.41 - 1.28 - WALL_WIDTH,
			y: 3.15 + (3.68 - 3.07),
		},
		end: {
			x: -0.41 - 1.28 - WALL_WIDTH,
			y: 3.15,
		},
	},
	{
		height: WALL_HEIGHT,
		width: WALL_WIDTH,
		start: {
			x: -0.46 - 1.28 - WALL_WIDTH - (3.04 - 1.28),
			y: 3.1 + (3.68 - 3.07),
		},
		end: {
			x: -0.46 - 1.28 - WALL_WIDTH,
			y: 3.1 + (3.68 - 3.07),
		},
	},
	{
		height: WALL_HEIGHT,
		width: WALL_WIDTH,
		start: {
			x: -0.41 - 1.28 - WALL_WIDTH - (3.04 - 1.28),
			y: 3.15 + 3.68,
		},
		end: {
			x: -0.41 - 1.28 - WALL_WIDTH - (3.04 - 1.28),
			y: 3.15 + (3.68 - 3.07),
		},
	},
];
