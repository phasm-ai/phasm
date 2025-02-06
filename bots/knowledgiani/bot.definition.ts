import * as sdk from '@phasm/sdk'
import * as env from './.genenv'
import knowledge from './ps_modules/knowledge'
import openai from './ps_modules/openai'
import personality from './ps_modules/personality'
import telegram from './ps_modules/telegram'

type OpenAiModel = sdk.z.infer<typeof openai.definition.entities.modelRef.schema>
const openAiLLM = openai.definition.interfaces['llm<modelRef>']

export default new sdk.BotDefinition({})
  .addIntegration(telegram, {
    enabled: true,
    configuration: {
      botToken: env.KNOWLEDGIANI_TELEGRAM_BOT_TOKEN,
    },
  })
  .addIntegration(openai, {
    enabled: true,
    configuration: {},
  })
  .addPlugin(personality, {
    configuration: {
      model: 'gpt-3.5-turbo-0125' satisfies OpenAiModel['id'],
      personality: 'Respond as if you were Mario the famous video game character of Nintendo',
    },
    interfaces: {
      llm: {
        id: openai.id,
        name: openai.name,
        version: openai.version,
        entities: openAiLLM.entities,
        actions: openAiLLM.actions,
        events: openAiLLM.events,
        channels: openAiLLM.channels,
      },
    },
  })
  .addPlugin(knowledge, {
    configuration: {},
    interfaces: {
      llm: {
        id: openai.id,
        name: openai.name,
        version: openai.version,
        entities: openAiLLM.entities,
        actions: openAiLLM.actions,
        events: openAiLLM.events,
        channels: openAiLLM.channels,
      },
    },
  })
