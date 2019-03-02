# Title

Description

```bash
# repro code goes here
git status

cat $GITHUB_EVENT_PATH
```

*The script above is extracted, executed in docker, and logs are inserted below.  All the magic happens in ./.github/run.sh*

[Logs](https://github.com/cspotcode/repros/runs/71544141)

```output
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

	modified:   .github/run.sh
	modified:   README.md

no changes added to commit (use "git add" and/or "git commit -a")
```