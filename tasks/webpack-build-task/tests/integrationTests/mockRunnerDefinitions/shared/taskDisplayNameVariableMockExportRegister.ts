import { TaskMockRunner } from "vsts-task-lib/mock-run";

const registerTaskDisplayNameVariableMockExport = (taskMockRunner: TaskMockRunner, taskDisplayName: string) => {
    taskMockRunner.registerMockExport("getVariable", (variableName: string) => {
        if (variableName === "task.displayname") {
            return taskDisplayName;
        }

        return "";
    });
};

export default registerTaskDisplayNameVariableMockExport;
