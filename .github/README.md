Write reproduction scripts in a README, with an explanation.  They'll be automatically extracted and executed by CI. (GitHub Actions)
The logs will inserted into the same README, with a link to the raw CI logs.

To create a new reproduction, create a branch and commit your changes to README.md.  

Create a branch via ./.github/new.sh

Push the branch via ./.github/push.sh.  This is a convenience; it deals with rebasing your changes on top of the commits
made by CI.
