import type * as ps from ".phasm";

type MessageArgs = ps.ClientInputs["createMessage"];
type ResponsePayload = {
    content: string | Record<string, any>;
    messageType: MessageArgs["type"];
};

export type BotProps = ps.MessageHandlerProps | ps.EventHandlerProps;

export class BotApi {
    private constructor(private props: BotProps) {}

    public static create(props: BotProps): BotApi {
        return new BotApi(props);
    }

    public async sendResponse(response: ResponsePayload) {
        const { content, messageType } = response;

        const targetConversation = "message" in this.props
            ? this.props.message.conversationId
            : this.props.event.payload.conversationId;

        await this.props.client.createMessage({
            conversationId: targetConversation,
            userId: this.props.ctx.botId,
            tags: {},
            type: messageType,
            payload: typeof content === 'string'
                ? { text: content }
                : content
        });
    }
}
