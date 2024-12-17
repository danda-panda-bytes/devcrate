/**
 * @param {string} libName Either repository name or library being made
 * @returns versionrc config
 */
module.exports = function versionStandardShared(
  libName,
) {
  return {
    noVerify: true,
    tagPrefix: `${libName}@`,
    header: `# ${libName}\n`,
    types: [
      { type: 'feat', section: 'Features' },
      { type: 'feature', section: 'Features' },
      { type: 'fix', section: 'Bug Fixes' },
      { type: 'hotfix', section: 'Hotfixes' },
      { type: 'chore', hidden: true },
      { type: 'docs', hidden: true },
      { type: 'lint', hidden: true },
      { type: 'style', hidden: true },
      { type: 'refactor', hidden: true },
      { type: 'perf', hidden: true },
      { type: 'test', hidden: true },
    ],
    // TODO: Add this to link to jira?
    // issueUrlFormat: 'https://jiraIssueUrl/{{id}}',
  }
}
