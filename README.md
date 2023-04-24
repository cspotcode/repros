# PDM endless loop on install

Reproduction:

Assume python3 and pip are installed, so that `python --version` is python3.

```shell
pip install pdm
python -m pdm install
```
