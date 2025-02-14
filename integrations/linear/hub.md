The Linear integration brings powerful project management capabilities to your AI-powered chatbot. Seamlessly connect phasm with Linear, a modern issue tracking and workflow management tool. With this integration, you can automate task creation, track progress, and collaborate on projects directly within your chatbot. Empower your chatbot to create, update, and retrieve Linear issues, assign tasks to team members, track due dates, and more. Streamline your project management processes and enhance team productivity with the Linear Integration for phasm.

## Migrating from version `0.x` to `1.x`

Version `1.0` of the Linear integration now requires users to provide a webhook signing secret. If you use OAuth authentication, you are unaffected by this change. If you use an API key to authenticate with Linear, you must provide a webhook signing secret to ensure secure communication between phasm and Linear. To obtain the webhook signing secret, follow the instructions in the _Manual configuration with an API key_ section below.

## Configuration

### Automatic configuration with OAuth (recommended)

This is the simplest way to set up the integration. To set up the Linear integration using OAuth, click the authorization button and follow the instructions to connect your phasm chatbot to Linear. This method is recommended as it simplifies the configuration process and ensures secure communication between your chatbot and Linear.

When using this configuration mode, a phasm-managed Linear application will be used to connect to your Linear workspace. The application will have the necessary permissions to administer issues, comments, and perform operations on behalf of your users. If you require more granular control over the permissions, you can opt for the manual configuration mode instead.

### Manual configuration with an API key

If you prefer to manually configure the integration, you can provide an API key to connect your personal Linear account to phasm. Keep in mind that when you use an API key, actions taken by the bot will be attributed to your personal Linear account. If you wish for actions to be attributed to your organization instead of to your personal account, you must use OAuth authentication. OAuth authentication offers a lot of advantages over API keys and do not consume a seat within your Linear organization.

To set up the Linear integration using a personal API key, follow these steps:

### Creating a Linear API key

1. On Linear, navigate to your account settings and select the API tab in the navigation sidebar.
2. Under _Personal API keys_, input a name for your API key and click the _Create new API key_ button.
3. Save this API key in a secure location. You will need it to configure the Linear integration in phasm.

### Subscribing to Linear webhook events

1. In phasm, navigate to the integration configuration page for Linear.
2. Copy the webhook URL generated by phasm.
3. On Linear, navigate to your account settings and select the API tab in the navigation sidebar.
4. Under _Webhooks_, click the _Create new webhook_ button.
5. Enter a name for the webhook and paste the webhook URL generated by phasm in the _URL_ field.
6. Copy the webhook signing secret in a secure location. You will need it to configure the Linear integration in phasm.
7. Under _Data change events_, select the events you wish to subscribe to:

- `Issues`: Receive notifications when issues are created, updated, or deleted.
- `Comments`: Receive notifications when comments are added to issues.

8. Under _Teams_, select the teams you wish to receive notifications for.
9. Click the _Create webhook_ button to save your changes.

### Configuring the Linear integration in phasm

1. In phasm, navigate to the integration configuration page for Linear.
2. Select the _Configure Linear with an API Key_ option.
3. Enter the API key you obtained from Linear in the _API Key_ field.
4. Enter the webhook signing secret you obtained from Linear in the _Webhook Signing Secret_ field.
5. Save the configuration and enable the integration.
6. Copy the webhook URL generated by phasm.

## Limitations

Standard Linear API limitations apply to the Linear integration in phasm. These limitations include rate limits, payload size restrictions, and other constraints imposed by the Linear platform. Ensure that your bot adheres to these limitations to maintain optimal performance and reliability.

More details are available in the [Linear API documentation](https://developers.linear.app/docs/graphql/working-with-the-graphql-api/rate-limiting).
