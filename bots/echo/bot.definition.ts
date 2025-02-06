import * as sdk from '@phasm/sdk'
import chat from './ps_modules/chat'

export default new sdk.BotDefinition({
  integrations: {},
  states: {},
  events: {},
  recurringEvents: {},
}).addIntegration(chat, { enabled: true, configuration: {} })
