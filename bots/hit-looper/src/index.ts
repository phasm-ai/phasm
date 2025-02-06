import type { Conversation } from "@phasm/client";
import { MessageSender } from "./api-utils";
import * as ps from ".phasm";

type ConversationType = "customer" | "support";
const getConversationType = (conversation: Conversation): ConversationType => {
	return conversation.integration === "zendesk" ? "support" : "customer";
};

const bot = new ps.Bot({
	actions: {
		initiateSupport: {
			title: "Initiate Support",
			input: {
				schema: ps.z.object({
					userId: ps.z.string(),
					conversationId: ps.z.string(),
					reason: ps.z.string(),
				}),
			},
		},
		endSupport: {
			title: "End Support",
			input: {
				schema: ps.z.object({
					conversationId: ps.z.string(),
				}),
			},
		},
	},
});

bot.on.message("*", async (props) => {
	const type = getConversationType(props.conversation);
	if (type !== "support") {
		return;
	}

	const messageSender = MessageSender.create(props);
	await messageSender.sendMessage({
		conversation: props.conversation.id,
		content: "Support chat is currently unavailable.",
	});
});

bot.on.message("*", async (props) => {
	const type = getConversationType(props.conversation);
	if (type !== "customer") {
		return;
	}

	const messageSender = MessageSender.create(props);

	if (props.message.type === "text") {
		const text = props.message.payload.text.trim();

		if (text === "/help") {
			await bot.actionHandlers.initiateSupport({
				...props,
				input: {
					userId: props.user.id,
					conversationId: props.conversation.id,
					reason: "Customer requested support",
				},
			});

			await messageSender.sendMessage({
				conversation: props.conversation.id,
				content: "Connecting you with support...",
			});
			return;
		}

		if (text === "/end") {
			await bot.actionHandlers.endSupport({
				...props,
				input: {
					conversationId: props.conversation.id,
				},
			});

			await messageSender.sendMessage({
				conversation: props.conversation.id,
				content: "Support session ended.",
			});
			return;
		}
	}

	await messageSender.sendMessage({
		conversation: props.conversation.id,
		content: [
			"Welcome! 👋",
			"I am your virtual assistant.",
			"Type /help to connect with support.",
			"Type /end to end a support session.",
		].join("\n"),
	});
});

export default bot;
