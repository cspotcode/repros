workflow "Run main" {
  on = "push"
  resolves = ["Run main"]
}

action "Run main" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  runs = "/bin/bash"
  args = "./.github/run.sh"
}
