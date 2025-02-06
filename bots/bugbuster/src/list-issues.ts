import type * as ps from ".phasm";

type GithubIssue =
	ps.integrations.github.actions.findTarget.output.Output["targets"][number];
export const listIssues = async (
	props: ps.EventHandlerProps | ps.MessageHandlerProps,
): Promise<GithubIssue[]> => {
	const { client } = props;
	const {
		output: { targets: githubIssues },
	} = await client.callAction({
		type: "github:findTarget",
		input: {
			channel: "issue",
			repo: "phasm",
			query: "",
		},
	});
	return githubIssues;
};
