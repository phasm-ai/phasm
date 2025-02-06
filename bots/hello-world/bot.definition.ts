import * as sdk from '@phasm/sdk'
import * as env from './.genenv'
import logger from './ps_modules/logger'
import telegram from './ps_modules/telegram'
import webhook from './ps_modules/webhook'

export default new sdk.BotDefinition({
  actions: {
    greetUser: {
      title: 'Greet User',
      description: 'Sends a personalized greeting message',
      input: {
        schema: sdk.z.object({
          name: sdk.z.string().optional(),
          language: sdk.z.enum(['en', 'es', 'fr']).optional(),
        }),
      },
      output: {
        schema: sdk.z.object({
          message: sdk.z.string(),
          timestamp: sdk.z.number(),
        }),
      },
    },
    getWeather: {
      title: 'Get Weather',
      description: 'Retrieves current weather for a location',
      input: {
        schema: sdk.z.object({
          city: sdk.z.string(),
          country: sdk.z.string().optional(),
        }),
      },
      output: {
        schema: sdk.z.object({
          temperature: sdk.z.number(),
          conditions: sdk.z.string(),
        }),
      },
    },
  },
})
  .addIntegration(telegram, {
    enabled: true,
    configuration: {
      botToken: env.HELLO_WORLD_TELEGRAM_BOT_TOKEN,
      webhookUrl: 'https://api.example.com/webhook',
    },
  })
  .addIntegration(webhook, {
    enabled: true,
    configuration: {
      port: 3000,
      endpoint: '/api/webhook',
    },
  })
  .addPlugin(logger, {
    configuration: {
      level: 'info',
      format: 'json',
    },
    interfaces: {
      console: true,
      file: true,
    },
  })
