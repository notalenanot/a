from typing import NamedTuple
import subprocess

class Action(NamedTuple):
    node: str
    gpu_pl: int
    job_hint: str


def apply(action: Action) -> None:
    """Apply the action by setting GPU power limit and sending scheduler hints.

    This implementation is a placeholder and only invokes `nvidia-smi` with the
    requested power limit. Integration with Kubernetes should be added here.
    """
    if action.gpu_pl:
        try:
            subprocess.run([
                "nvidia-smi",
                "-i",
                action.node,
                "-pl",
                str(action.gpu_pl),
            ], check=False)
        except FileNotFoundError:
            # nvidia-smi not available in test environments
            pass
