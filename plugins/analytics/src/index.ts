import * as ps from '.phasm'

const plugin = new ps.Plugin({
  actions: {
    track: async ({ input, client }) => {
      return await client.trackAnalytics({ name: input.name, count: input.count })
    },
  },
})

export default plugin
