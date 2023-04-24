# PDM endless loop on install

Reproduction:

Assume python3 and pip are installed, so that `python --version` is python3.

```shell
pip install pdm

python --version
python -m pip --version
python -m pdm install

# Observe that it hands indefinitely
# Terminate with Ctrl+C, then try the following:

python -m pdm install -v

# Observe the endless loop, attempting to add a conflicting dependency
# The conflicting dependency is *not* a PDM bug.

# However, the PDM bug is when PDM loops indefinitely and does not report this
# conflict to the user.
```

```
~/repros$ python --version
Python 3.8.10
~/repros$ python -m pip --version
pip 20.0.2 from /usr/lib/python3/dist-packages/pip (python 3.8)
~/repros$ python -m pdm install
Lock file does not exist
Updating the lock file...
⠏ Resolving: new pin coverage 6.5.0

... hangs here ...

KeyboardInterrupt
~/repros$ python -m pdm install -v
Lock file does not exist
Updating the lock file...
STATUS: Resolving dependencies
pdm.termui: ======== Start resolving requirements ========
pdm.termui:   pytest-cov
pdm.termui:   coveralls
pdm.termui:   python>=3.8
pdm.termui:   Adding requirement pytest-cov
pdm.termui:   Adding requirement coveralls
pdm.termui:   Adding requirement python>=3.8
pdm.termui: ======== Starting round 0 ========
STATUS: Resolving: new pin python>=3.8
pdm.termui: Pinning: python None
pdm.termui: ======== Ending round 0 ========
pdm.termui: ======== Starting round 1 ========
pdm.termui:   Adding requirement coverage!=6.0.*,!=6.1,!=6.1.1,<7.0,>=4.1(from coveralls 3.3.1)
pdm.termui:   Adding requirement docopt>=0.6.1(from coveralls 3.3.1)
pdm.termui:   Adding requirement requests>=1.0.0(from coveralls 3.3.1)
STATUS: Resolving: new pin coveralls 3.3.1
pdm.termui: Pinning: coveralls 3.3.1
pdm.termui: ======== Ending round 1 ========
pdm.termui: ======== Starting round 2 ========
pdm.termui:   Adding requirement pytest>=4.6(from pytest-cov 4.0.0)
pdm.termui:   Adding requirement coverage[toml]>=5.2.1(from pytest-cov 4.0.0)
STATUS: Resolving: new pin pytest-cov 4.0.0
pdm.termui: Pinning: pytest-cov 4.0.0
pdm.termui: ======== Ending round 2 ========
pdm.termui: ======== Starting round 3 ========
STATUS: Resolving: new pin coverage 6.5.0
pdm.termui: Pinning: coverage 6.5.0
pdm.termui: ======== Ending round 3 ========
pdm.termui: ======== Starting round 4 ========
pdm.termui:   Adding requirement tomli; python_full_version <= "3.11.0a6"(from coverage 7.2.3)
pdm.termui:   Adding requirement coverage==7.2.3(from coverage 7.2.3)
pdm.termui: Candidate rejected: coverage@7.2.3 because it introduces a new requirement coverage==7.2.3 that conflicts with other requirements:
    coverage!=6.0.*,!=6.1,!=6.1.1,<7.0,>=4.1 (from coveralls@3.3.1)
pdm.termui:   Adding requirement tomli; python_full_version <= "3.11.0a6"(from coverage 7.2.3)
pdm.termui:   Adding requirement coverage==7.2.3(from coverage 7.2.3)
pdm.termui: Candidate rejected: coverage@7.2.3 because it introduces a new requirement coverage==7.2.3 that conflicts with other requirements:
    coverage!=6.0.*,!=6.1,!=6.1.1,<7.0,>=4.1 (from coveralls@3.3.1)
pdm.termui:   Adding requirement tomli; python_full_version <= "3.11.0a6"(from coverage 7.2.3)
pdm.termui:   Adding requirement coverage==7.2.3(from coverage 7.2.3)
pdm.termui: Candidate rejected: coverage@7.2.3 because it introduces a new requirement coverage==7.2.3 that conflicts with other requirements:
    coverage!=6.0.*,!=6.1,!=6.1.1,<7.0,>=4.1 (from coveralls@3.3.1)
pdm.termui:   Adding requirement tomli; python_full_version <= "3.11.0a6"(from coverage 7.2.3)
pdm.termui:   Adding requirement coverage==7.2.3(from coverage 7.2.3)

... loops indefinitely ...
```
