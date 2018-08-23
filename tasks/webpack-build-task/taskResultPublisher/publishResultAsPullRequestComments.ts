import tl = require("vsts-task-lib/task");
import IMessage from "./IMessage";
import * as vstsApi from "vso-node-api";
import parseTsLintLoaderMessage from "./parseTsLintLoaderMessage";
import parseTsLoaderMessage from "./parseTsLoaderMessage";
import { CommentThreadStatus, GitPullRequestCommentThread, CommentType } from "vso-node-api/interfaces/GitInterfaces";
import { GitApi } from "vso-node-api/GitApi";

const threadEqualsToMessage = (thread: GitPullRequestCommentThread, message: IMessage) => (
    thread.threadContext
    && thread.threadContext.filePath === message.filePath
    && thread.threadContext.rightFileStart
    && message.start
    && thread.threadContext.rightFileStart.line === message.start.line
    && thread.threadContext.rightFileStart.offset === message.start.offset
);

const parseMessages = (taskDisplayName: string, messagesToParse: string[], isError: boolean) => {
    const parsedMessages: IMessage[] = [];

    for (const item of messagesToParse) {
        let parsedMessage = parseTsLoaderMessage(item);

        if (!parsedMessage) {
            parsedMessage = parseTsLintLoaderMessage(item);
        }

        if (parsedMessage) {
            parsedMessage.message = `${ isError ? "Error" : "Warning" } from task '${taskDisplayName}':\r\n${parsedMessage.message}"}`;

            parsedMessages.push(parsedMessage);
        }
    }

    return parsedMessages;
};

const getGitApi = async () => {
    try {
        const accessToken = tl.getVariable("System.AccessToken");

        if (!accessToken) {
            console.log("Please allow scripts to access OAuth token in the additional optionts of the agent phase.");

            return null;
        }

        const collectionUri = tl.getVariable("System.TeamFoundationCollectionUri");

        const authHandler = vstsApi.getBearerHandler(accessToken);
        const connection = new vstsApi.WebApi(collectionUri, authHandler);

        return await connection.getGitApi();
    } catch (err) {
        console.log("Could not connect to VSTS API.");

        throw err;
    }
};

const getThreads = async (gitApi: GitApi, project: string, repositoryId: string, pullRequestId: number) => {
    const pullRequestIterations = await gitApi.getPullRequestIterations(repositoryId, pullRequestId, project);
    const lastIterationId = pullRequestIterations[pullRequestIterations.length - 1].id;

    return await gitApi.getThreads(repositoryId, pullRequestId, project, lastIterationId, lastIterationId);
};

const getParsedMessagesToPublish = (parsedMessages: IMessage[], threads: GitPullRequestCommentThread[]) => {
    const parsedMessagesToPublish: IMessage[] = [];

    for (const parsedMessage of parsedMessages) {
        if (!threads.find((thread) => threadEqualsToMessage(thread, parsedMessage))) {
            parsedMessagesToPublish.push(parsedMessage);
        }
    }

    return parsedMessagesToPublish;
};

const getThreadsToClose = (parsedMessagesToPublish: IMessage[], threads: GitPullRequestCommentThread[]) => {
    const threadsToClose: GitPullRequestCommentThread[] = [];

    for (const thread of threads) {
        if (parsedMessagesToPublish.find((parsedMessageToPublish) => threadEqualsToMessage(thread, parsedMessageToPublish))) {
            thread.status = CommentThreadStatus.Closed;
            threadsToClose.push(thread);
        }
    }

    return threadsToClose;
};

const publishResultAsPullRequestComments = async (
    enablePullRequestComments: boolean,
    taskDisplayName: string,
    errorsArray: string[],
    warningsArray: string[]) => {

        const project = tl.getVariable("System.TeamProjectId");
        const repositoryId = tl.getVariable("Build.Repository.Name");
        const pullRequestId = Number(tl.getVariable("System.PullRequest.PullRequestId"));

        if (!enablePullRequestComments || !pullRequestId) {
            return;
        }

        const errorsAndWarningsArray = [...errorsArray, ...warningsArray];

        if (errorsAndWarningsArray.length === 0) {
            return;
        }

        let parsedMessages = parseMessages(taskDisplayName, errorsArray, true);
        parsedMessages = [...parsedMessages, ...parseMessages(taskDisplayName, warningsArray, false)];

        const gitApi = await getGitApi();
        const threads = await getThreads(gitApi, project, repositoryId, pullRequestId);

        const parsedMessagesToPublish: IMessage[] = getParsedMessagesToPublish(parsedMessages, threads);

        for (const parsedMessageToPublish of parsedMessagesToPublish) {
            const threadToCreate: GitPullRequestCommentThread = {
                comments: [
                    {
                        commentType: CommentType.System,
                        content: parsedMessageToPublish.message,
                        _links: null,
                        id: null,
                        isDeleted: false,
                        parentCommentId: null,
                        usersLiked: null,
                        publishedDate: null,
                        lastUpdatedDate: null,
                        lastContentUpdatedDate: null,
                        author: null
                    }
                ],
                threadContext: {
                    filePath: parsedMessageToPublish.filePath,
                    rightFileStart: {
                        line: parsedMessageToPublish.start.line,
                        offset: parsedMessageToPublish.start.offset
                    },
                    rightFileEnd: {
                        line: parsedMessageToPublish.end.line,
                        offset: parsedMessageToPublish.end.offset
                    },
                    leftFileStart: null,
                    leftFileEnd: null
                },
                _links: null,
                id: null,
                isDeleted: false,
                lastUpdatedDate: null,
                properties: null,
                publishedDate: null,
                pullRequestThreadContext: null,
                status: null
            };

            gitApi.createThread(threadToCreate, repositoryId, pullRequestId, project);
        }

        const threadsToUpdate: GitPullRequestCommentThread[] = getThreadsToClose(parsedMessagesToPublish, threads);

        for (const threadToUpdate of threadsToUpdate) {
            gitApi.updateThread(threadToUpdate, repositoryId, pullRequestId, threadToUpdate.id, project);
        }
};

export default publishResultAsPullRequestComments;
