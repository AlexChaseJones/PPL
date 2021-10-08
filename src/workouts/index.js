export default {
	push: [
		{
			key: "press",
			displayName: "chest press",
			supportedTypes: ["dumbbell", "barbell", "machine", "cable"]
		},
		{
			key: "inclinePress",
			displayName: "incline chest press",
			supportedTypes: ["dumbbell", "barbell", "machine", "cable"],
			categories: ["compound", "chest", "triceps"]
		},
		{
			key: "declinePress",
			displayName: "decline chest press",
			supportedTypes: ["dumbbell", "barbell", "machine", "cable"],
		},
		{
			key: "shoulderPress",
			displayName: "shoulder press",
			supportedTypes: ["dumbbell", "barbell", "machine", "cable"],
		},
		{
			key: "tricepExtensions",
			displayName: "tricep extensions",
			supportedTypes: ["dumbbell", "cable", "plate"],
		},
		{
			key: "skullCrusher",
			displayName: "skull crushers",
			supportedTypes: ["dumbbell", "barbell"],
		},
		{
			key: "dips",
			displayName: "dips",
			supportedTypes: ["body weight", "machine"]
		},
		{
			key: "lateralRaises",
			displayName: "lateral raises",
			supportedTypes: ["dumbbell", "machine", "cable"]
		},
		{
			key: "frontRaises",
			displayName: "front raises",
			supportedTypes: ["dumbbell", "kettlebell", "cable", "plate"]
		}
	],
	pull: [
		{
			key: "oneArmRows",
			displayName: "one arm rows",
			supportedTypes: ["dumbbell", "machine", "cable"]
		},
		{
			key: "closeGripRows",
			displayName: "close grip rows",
			supportedTypes: ["dumbbell", "barbell", "machine", "cable"]
		},
		{
			key: "wideGripRows",
			displayName: "wide grip rows",
			supportedTypes: ["dumbbell", "barbell", "machine", "cable"]
		},
		{
			key: "rows",
			displayName: "rows",
			supportedTypes: ["dumbbell", "barbell", "machine", "cable"]
		},
		{
			key: "latPulldown",
			displayName: "lateral pulldown",
			supportedTypes: ["machine", "cable"]
		},
		{
			key: "deadlifts",
			displayName: "deadlifts",
			supportedTypes: ["barbell"]
		}, {
			key: "trapRaises",
			displayName: "trap raises",
			supportedTypes: ["dumbbell", "barbell", "machine"]
		},
		{
			key: "curls",
			displayName: "curls",
			supportedTypes: ["dumbbell", "barbell", "machine", "cable"]
		}
	],
	legs: [
		{
			key: "squats",
			displayName: "squats",
			supportedTypes: ["barbell", "dumbbell", "machine"],
		},
		{
			key: "sldl",
			displayName: "straight leg deadlifts",
			supportedTypes: ["barbell", "dumbbell"]
		},
		{
			key: "legCurls",
			displayName: "leg curls",
			supportedTypes: ["lying", "seated", "dumbbell"]
		},
		{
			key: "legExtensions",
			displayName: "leg extensions",
			supportedTypes: ["machine"]
		},
		{
			key: "calfPress",
			displayName: "calf press",
			supportedTypes: ["machine", "body weight", "smith machine"]
		}
	]	
}