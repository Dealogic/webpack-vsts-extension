import { TaskMockRunner } from "vsts-task-lib/mock-run";
import * as path from "path";

const createTaskMockRunner = () => {
    return new TaskMockRunner(path.join(__dirname, "../../../index.js"));
};

export default createTaskMockRunner;
