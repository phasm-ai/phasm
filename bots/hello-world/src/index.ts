import * as ps from ".phasm";
import { BotApi } from "./api";

const formatResponse = (text: string, maxChars = 100): string => {
	return text.length > maxChars ? text.substring(0, maxChars) + "..." : text;
};

const bot = new ps.Bot({
	actions: {
		greetUser: async ({ input, user }) => {
			const name = input?.name || user?.name || "friend";
			const time = new Date().getHours();
			let greeting = "Hello";

			if (time < 12) greeting = "Good morning";
			else if (time < 18) greeting = "Good afternoon";
			else greeting = "Good evening";

			return { message: `${greeting}, ${name}!`, timestamp: Date.now() };
		},

		getWeather: async ({ input }) => {
			const city = input?.city || "Unknown";
			// Mock weather data
			return {
				temperature: Math.floor(Math.random() * 30),
				conditions: ["Sunny", "Cloudy", "Rainy"][Math.floor(Math.random() * 3)],
			};
		},
	},
});

bot.on.message("*", async (args) => {
	const api = BotApi.create(args);
	const { message, user } = args;

	if (message.type === "text") {
		const command = message.payload.text.toLowerCase();

		if (command.includes("weather")) {
			const weather = await bot.actionHandlers.getWeather({
				...args,
				input: { city: "Default City" },
			});
			await api.sendResponse({
				messageType: "text",
				content: `Current weather: ${weather.temperature}°C, ${weather.conditions}`,
			});
		} else {
			const response = await bot.actionHandlers.greetUser({
				...args,
				input: {},
			});
			await api.sendResponse({
				messageType: "text",
				content: response.message,
			});
		}
	}
});

bot.on.event("*", async ({ event }) => {
	const eventType = event.type || "unknown";
	const timestamp = new Date().toISOString();
	console.info(`Event received [${timestamp}]: ${eventType}`);
});

export default bot;
