from typing import Any
import numpy as np

try:
    from ray.rllib.policy import Policy
    from gymnasium import spaces
except Exception:  # pragma: no cover - optional heavy deps
    class Policy:  # type: ignore
        pass
    class spaces:  # type: ignore
        class Box:
            def __init__(self, low=0, high=1, shape=(1,), dtype=None):
                self.low = low
                self.high = high
                self.shape = shape
                self.dtype = dtype

class GreenMind(Policy):
    """Minimal RL policy placeholder."""

    def __init__(self, obs_space: Any | None = None, action_space: Any | None = None, config: dict | None = None):
        self.observation_space = obs_space or spaces.Box(low=0, high=100, shape=(3,), dtype=np.float32)
        self.action_space = action_space or spaces.Box(low=0, high=400, shape=(1,), dtype=np.float32)
        self.config = config or {}

    def compute_actions(self, obs_batch, **kwargs):  # type: ignore[override]
        # Return zero power-caps as a safe default
        batch_size = len(obs_batch)
        actions = np.zeros((batch_size,) + self.action_space.shape, dtype=np.float32)
        return actions, [], {}
