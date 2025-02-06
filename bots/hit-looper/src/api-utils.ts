import type { MessageHandlerProps } from ".phasm";

export class MessageSender {
	constructor(private readonly props: MessageHandlerProps) {}

	static create(props: MessageHandlerProps) {
		return new MessageSender(props);
	}

	async sendMessage(options: {
		conversation: string;
		content: string;
		sender?: string;
		metadata?: Record<string, unknown>;
	}) {
		const { conversation, content, sender, metadata = {} } = options;

		return this.props.client.createMessage({
			conversationId: conversation,
			userId: this.props.ctx.botId,
			tags: metadata,
			type: "text",
			payload: {
				text: content,
				userId: sender,
			},
		});
	}

	async sendTypingIndicator(conversationId: string, durationMs = 1000) {
		await this.props.client.createMessage({
			conversationId,
			userId: this.props.ctx.botId,
			tags: {},
			type: "typing",
			payload: {
				value: true,
				durationMs,
			},
		});
	}
}
