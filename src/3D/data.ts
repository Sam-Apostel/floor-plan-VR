const WALL_HEIGHT = 2.5;
const WALL_WIDTH = 0.1;
const DOOR_WIDTH = 0.9;
const DOOR_HEIGHT = 2.1;

export const rooms = [
	{
		name: 'slaapkamer 2',
		floor: {
			points: [
				{
					x: -0.51 - 1.28 - (3.04 - 1.28),
					y: 3.15 + 3.68,
				},
				{
					x: -0.51 - 1.28 - (3.04 - 1.28),
					y: 3.1 + (3.68 - 3.07),
				},
				{
					x: -0.51 - 1.28,
					y: 3.1 + (3.68 - 3.07),
				},
				{
					x: -0.51 - 1.28,
					y: 3.1,
				},
				{
					x: -0.41,
					y: 3.1,
				},
				{
					x: -0.41,
					y: 3.15 + 3.68,
				},
				{
					x: -0.51 - 1.28 - (3.04 - 1.28),
					y: 3.15 + 3.68,
				},
			],
		},
		walls: [
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
			{
				height: WALL_HEIGHT,
				width: 0.19,
				start: {
					x: -0.46 - 1.28 - WALL_WIDTH - (3.04 - 1.28),
					y: 3.15 + 3.68,
				},
				end: {
					x: -0.41,
					y: 3.15 + 3.68,
				},
				door: {
					distance: 0.8,
					width: 1.93,
					height: DOOR_HEIGHT,
				},
			},
		],
	},
	{
		name: 'slaapkamer 1',
		floor: {
			points: [
				{
					x: -0.41,
					y: 3.1,
				},
				{
					x: -0.41 + 1.2,
					y: 3.1,
				},
				{
					x: -0.41 + 1.2,
					y: 3.1 - 0.34,
				},
				{
					x: -0.41 + 1.2 + 1.98 + WALL_WIDTH,
					y: 3.1 - 0.34,
				},
				{
					x: -0.41 + 1.2 + 1.98 + WALL_WIDTH,
					y: 3.1,
				},
				{
					x: -0.41 + 1.2 + 1.98 + WALL_WIDTH + 0.7,
					y: 3.1,
				},
				{
					x: -0.41 + 1.2 + 1.98 + WALL_WIDTH + 0.7,
					y: 3.15 + 3.68,
				},

				{
					x: -0.41,
					y: 3.15 + 3.68,
				},
				{
					x: -0.41,
					y: 3.1,
				},
			],
		},
		walls: [
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.36,
					y: 3.1,
				},
				end: {
					x: -0.36 + 1.2 - WALL_WIDTH,
					y: 3.1,
				},
				door: {
					distance: 0,
					width: DOOR_WIDTH,
					height: DOOR_HEIGHT,
				},
			},
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.41 + 1.2,
					y: 3.15,
				},
				end: {
					x: -0.41 + 1.2,
					y: 3.15 - 0.34,
				},
			},
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.46 + 1.2,
					y: 3.1 - 0.34,
				},
				end: {
					x: -0.36 + 1.2 + 1.98,
					y: 3.1 - 0.34,
				},
			},
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.31 + 1.2 + 1.98,
					y: 3.05 - 0.34,
				},
				end: {
					x: -0.31 + 1.2 + 1.98,
					y: 3.05,
				},
			},
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.36 + 1.2 + 1.98,
					y: 3.1,
				},
				end: {
					x: -0.36 + 1.2 + 1.98 + 0.7,
					y: 3.1,
				},
			},
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.31 + 1.2 + 1.98 + 0.7,
					y: 3.05,
				},
				end: {
					x: -0.31 + 1.2 + 1.98 + 0.7,
					y: 3.05 + 3.68 + 0.1,
				},
			},
			{
				height: WALL_HEIGHT,
				width: 0.19,
				start: {
					x: -0.41,
					y: 3.15 + 3.68,
				},
				end: {
					x: -0.41 + 4.03,
					y: 3.15 + 3.68,
				},
				door: {
					distance: 1.08,
					width: 1.93,
					height: DOOR_HEIGHT,
				},
			},
		],
	},
	{
		name: 'inkomhal',
		floor: {
			points: [
				{
					x: -0.51 - 1.28 - (3.04 - 1.28),
					y: 3.1 + (3.68 - 3.07),
				},
				{
					x: -0.51 - 1.28,
					y: 3.1 + (3.68 - 3.07),
				},
				{
					x: -0.51 - 1.28,
					y: 3.1,
				},
				{
					x: -0.41 + 1.2,
					y: 3.1,
				},
				{
					x: -0.41 + 1.2,
					y: 3.1 - 2.82 - WALL_WIDTH,
				},
				{
					x: -0.41 + 1.2 - 1.05,
					y: 3.1 - 2.82 - WALL_WIDTH,
				},
				{
					x: -0.41 + 1.2 - 1.05,
					y: 3.1 - 1.35,
				},
				{
					x: -0.51 - 1.28 - (3.04 - 1.28),
					y: 3.1 - 1.35,
				},
				{
					x: -0.51 - 1.28 - (3.04 - 1.28),
					y: 3.1 + (3.68 - 3.07),
				},
			],
		},
		walls: [
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.51 - 1.28 - (3.04 - 1.28),
					y: 3.15 + (3.68 - 3.07),
				},
				end: {
					x: -0.51 - 1.28 - (3.04 - 1.28),
					y: 3.15 + (3.68 - 3.07) - 1.85 - 0.2,
				},
				door: {
					distance: 0.1,
					width: DOOR_WIDTH + 0.1,
					height: DOOR_HEIGHT,
				},
			},
			{
				height: WALL_HEIGHT,
				width: 0.19,
				start: {
					x: -0.51 - 1.28 - (3.04 - 1.28) - 0.2,
					y: 3.15 + (3.68 - 3.07) - 1.85 - 0.19,
				},
				end: {
					x: -0.51 - 1.28 - (3.04 - 1.28) + 3.35,
					y: 3.15 + (3.68 - 3.07) - 1.85 - 0.19,
				},
				door: {
					distance: 2.5,
					width: DOOR_WIDTH,
					height: DOOR_HEIGHT,
				},
			},
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.51 - 1.28 - (3.04 - 1.28) + 3.3,
					y: 3.15 + (3.68 - 3.07) - 1.85 - 0.19 - 0.095,
				},
				end: {
					x: -0.51 - 1.28 - (3.04 - 1.28) + 3.3,
					y: 3.15 - 2.82 - 0.11,
				},
			},
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.51 - 1.28 - (3.04 - 1.28) + 3.3 - 0.05,
					y: 3.1 - 2.82 - 0.11,
				},
				end: {
					x: -0.51 + 1.35,
					y: 3.1 - 2.82 - 0.11,
				},
				door: {
					distance: 0.1,
					width: DOOR_WIDTH,
					height: DOOR_HEIGHT,
				},
			},
			{
				height: WALL_HEIGHT,
				width: WALL_WIDTH,
				start: {
					x: -0.51 + 1.3,
					y: 3.1 - 2.82 - 0.11,
				},
				end: {
					x: -0.51 + 1.3,
					y: 3.1 - 0.34,
				},
				door: {
					distance: 0.1,
					width: DOOR_WIDTH,
					height: DOOR_HEIGHT,
				},
			},
		],
	},
];

// toilet
// {
// 					x: -0.41 + 1.2,
// 					y: 3.1 - 0.34,
// 				},
// 				{
// 					x: -0.41 + 1.2 + 1.98 + WALL_WIDTH,
// 					y: 3.1 - 0.34,
// 				},
