import { BotApi } from './api'
import { bot } from './bot'
import { markdown } from './markdown'

const PIZZA = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg'
const MOZART = 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Wolfgang_Amadeus_Mozart_-_Symphony_No._40_in_G_minor%2C_K._550_-_1._Molto_allegro.ogg'

bot.on.event('*', async (args) => {
  console.info('event received:', {
    conversationId: args.event.conversationId,
    userId: args.event.userId,
  })

  if (args.event.type === 'chat:custom') {
    console.info('custom event payload:', args.event.payload)
    await args.client.callAction({
      type: 'chat:sendEvent',
      input: args.event.payload,
    })
  }
})

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

bot.on.message('*', async (args) => {
  console.info('message received:', args.message)

  const api = BotApi.create(args)
  if (args.message.type !== 'text') {
    await api.sendResponse({ messageType: 'text', content: 'Sorry, I can only process text messages' })
    return
  }

  const command = args.message.payload.text.toLowerCase()
  switch (command) {
    case 'hello': {
      await api.sendResponse({ messageType: 'text', content: 'Hey! How can I help you today?' })
      break
    }

    case 'docs': {
      await api.sendResponse({
        messageType: 'markdown',
        content: markdown,
      })
      break
    }

    case 'food': {
      await api.sendResponse({
        messageType: 'image',
        content: { imageUrl: PIZZA }
      })
      break
    }

    case 'where': {
      await api.sendResponse({
        messageType: 'location',
        content: {
          latitude: 37.7749,
          longitude: -122.4194
        }
      })
      break
    }

    case 'document': {
      await api.sendResponse({
        messageType: 'file',
        content: { fileUrl: 'https://cdn.phasm.org/docs.pdf' }
      })
      break
    }

    case 'data': {
      await api.sendResponse({
        messageType: 'file',
        content: { fileUrl: 'https://cdn.phasm.org/dataset.csv' }
      })
      break
    }

    case 'stream': {
      await api.sendResponse({
        messageType: 'video',
        content: { videoUrl: 'https://cdn.phasm.org/demo.mp4' }
      })
      break
    }

    case 'music': {
      await api.sendResponse({
        messageType: 'audio',
        content: { audioUrl: MOZART }
      })
      break
    }

    case 'select': {
      await api.sendResponse({
        messageType: 'choice',
        content: {
          text: 'What would you like to do?',
          options: [
            { label: 'View Documentation', value: 'docs' },
            { label: 'Get Support', value: 'support' },
            { label: 'See Examples', value: 'examples' },
          ]
        }
      })
      break
    }

    case 'menu': {
      await api.sendResponse({
        messageType: 'dropdown',
        content: {
          text: 'Choose a category:',
          options: [
            { label: 'Getting Started', value: 'start' },
            { label: 'Tutorials', value: 'tutorials' },
            { label: 'API Reference', value: 'api' },
            { label: 'Examples', value: 'examples' },
            { label: 'Support', value: 'support' }
          ]
        }
      })
      break
    }

    case 'info': {
      await api.sendResponse({
        messageType: 'card',
        content: {
          title: 'Welcome to Phasm',
          subtitle: 'Next-gen Conversational AI',
          imageUrl: PIZZA,
          actions: [
            { action: 'url', label: 'Visit Website', value: 'https://phasm.org' },
            { action: 'say', label: 'Get Help', value: 'help' }
          ]
        }
      })
      break
    }

    case 'gallery': {
      await api.sendResponse({
        messageType: 'carousel',
        content: {
          items: [
            {
              title: 'Phasm Platform',
              subtitle: 'Build amazing conversational experiences',
              imageUrl: PIZZA,
              actions: [
                { action: 'url', label: 'Learn More', value: 'https://phasm.org/platform' }
              ]
            },
            {
              title: 'Phasm Studio',
              subtitle: 'Design conversations visually',
              imageUrl: PIZZA,
              actions: [
                { action: 'url', label: 'Try Now', value: 'https://phasm.org/studio' }
              ]
            }
          ]
        }
      })
      break
    }

    case 'website': {
      await api.sendResponse({
        messageType: 'text',
        content: '[Visit Phasm](https://phasm.org)'
      })
      break
    }

    case 'empty_options': {
      await api.sendResponse({
        messageType: 'choice',
        content: {
          text: 'No options available at the moment',
          options: []
        }
      })
      break
    }

    case 'simple_card': {
      await api.sendResponse({
        messageType: 'card',
        content: {
          title: 'Phasm AI',
          subtitle: 'Powering conversations',
          actions: []
        }
      })
      break
    }

    case 'group': {
      await api.sendResponse({
        messageType: 'bloc',
        content: {
          items: [
            {
              type: 'text',
              payload: { text: 'Welcome to Phasm!' }
            },
            {
              type: 'image',
              payload: { imageUrl: PIZZA }
            },
            {
              type: 'audio',
              payload: { audioUrl: MOZART }
            }
          ]
        }
      })
      break
    }

    case 'countdown': {
      for (let i = 5; i >= 0; i--) {
        await delay(1000)
        await api.sendResponse({
          messageType: 'text',
          content: `Launch in: ${i}`
        })
      }
      break
    }

    default: {
      const { name } = args.user
      const greeting = name ? `Hi ${name}` : 'Hi there'
      await api.sendResponse({
        messageType: 'text',
        content: `${greeting}! I received your message: "${command}". How can I help?`
      })
      break
    }
  }
})

export default bot
