const fs = require("fs");

// List all libraries dynamically from the "projects" folder
const projectsPath = "projects";
const libraries = fs.readdirSync(projectsPath).filter((dir) => {
  return fs.statSync(`${projectsPath}/${dir}`).isDirectory();
});

// Generate npm plugin configurations dynamically
const angularLibraryPlugins = libraries.map((lib) => {
  return ["@semantic-release/npm", { pkgRoot: `app/dist/devcrate/${lib}` }];
});

const packagesPath = "packages";
const packages = fs.readdirSync(packagesPath).filter((dir) => {
  return fs.statSync(`${packagesPath}/${dir}`).isDirectory();
});

// Generate npm plugin configurations dynamically
const nodeLibraryPlugins = packages.map((lib) => {
  return ["@semantic-release/npm", { pkgRoot: `packages/dist/${lib}` }];
});

module.exports = {
  branches: ["main", { name: 'next', prerelease: true }],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/changelog", {
      changelogFile: "CHANGELOG.md"
    }],
    ...angularLibraryPlugins, // Libraries for Angular
    ...nodeLibraryPlugins, // Libraries for Node
    ["@semantic-release/git", {
      "assets": ["CHANGELOG.md", "package.json"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    "@semantic-release/github"
  ]
};
