import * as listener from '../listeners'
import type * as ps from '.phasm'

export const handleNewIssue: ps.EventHandlers['github:issueOpened'] = async (props): Promise<void> => {
  const githubIssue = props.event.payload

  console.info('Received GitHub issue', githubIssue)

  const message = [
    'The following issue was just created in GitHub:',
    githubIssue.issue.name,
    githubIssue.issue.body,
  ].join('\n')

  await listener.notifyListeners(props, {
    type: 'text',
    payload: {
      text: message,
    },
  })
}
