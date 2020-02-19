import { Plugin, Action } from "@fivethree/billy-core";
import simplegit from "simple-git/promise";
// @App() // uncomment to test the plugin
@Plugin("Git Plugin for billy")
export class GitPlugin {
  @Action("git checkout")
  async git_checkout(checkoutWhat: string | string[], gitRepoPath?: string) {
    const git = simplegit(gitRepoPath);
    return git.checkout(checkoutWhat);
  }

  /**
   * Clone a git repository into working directory or specify a local path
   *
   * @param {string} repoPath url of the repository that will be cloned
   * @param {string} [localPath] clone to path
   * @returns
   * @memberof GitPlugin
   */
  @Action("Clone a repo")
  async git_clone(repoPath: string, localPath?: string) {
    const git = simplegit();
    return git.clone(repoPath, localPath);
  }

  @Action("git commit")
  async git_commit(
    message: string,
    gitRepoPath?: string,
    files?: string | string[],
    options?: simplegit.Options
  ) {
    const git = simplegit(gitRepoPath);
    return git.commit(message, files, options);
  }

  @Action("git push")
  async git_push(
    gitRepoPath?: string,
    remote?: string,
    branch?: string,
    options?: simplegit.Options
  ) {
    const git = simplegit(gitRepoPath);
    return git.push(remote, branch, options);
  }

  @Action("git pull")
  async git_pull(
    gitRepoPath?: string,
    remote?: string,
    branch?: string,
    options?: simplegit.Options
  ) {
    const git = simplegit(gitRepoPath);
    return git.pull(remote, branch, options);
  }

  @Action("Checks if git status is clean")
  async git_porcelain(gitRepoPath?: string) {
    const git = simplegit(gitRepoPath);
    const status = await git.status();
    return status.isClean();
  }

  @Action("get git status")
  async git_status(gitRepoPath?: string) {
    const git = simplegit(gitRepoPath);
    return git.status();
  }

  @Action("git tag")
  async git_tag(args?: string[], gitRepoPath?: string) {
    const git = simplegit(gitRepoPath);
    return git.tag(args);
  }
}
