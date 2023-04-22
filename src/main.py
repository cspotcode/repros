import functools

legitimate_typechecking_issue: int = "legitimate typechecking issue"

class Foo:
#   If you put your cursor over `property` and hit F12, VSCode will open
#   `builtins.pyi`
    @property
    def bar(self):
        return 123

def foo(a: int):
    pass

foo("another legitimate typechecking issue")

# When debugging and learning, I often use "go to definition."
# Put your cursor over `partial` and hit F12 to see the implementation in
# python's `Lib/functools.py`
functools.partial(foo, 1)

# I want to see this issue in the problems pane, not obscured by lint errors
# that I cannot fix.
import pathlib # ruff: E402
pathlib.Path()