import * as fs from "fs";
import * as os from "os";

const nextVersion = fs.readFileSync("./GitVersion.yml", "utf-8").split(os.EOL)[0].replace("next-version: ", "");

export default "__GitVersion.SemVer__".replace("GitVersion.SemVer", nextVersion).replace(/__/g, "");
