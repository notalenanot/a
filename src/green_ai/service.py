from fastapi import FastAPI
from fastapi.responses import Response
from prometheus_client import Counter, generate_latest, CONTENT_TYPE_LATEST
from . import telemetry, actions, agent
import yaml
import asyncio

with open('config.yaml', 'r') as f:
    CONFIG = yaml.safe_load(f)

app = FastAPI(title="Green AI Scheduler")
policy = agent.GreenMind()
STEP_COUNTER = Counter('scheduler_steps_total', 'Number of scheduler steps')

async def agent_step(obs: dict) -> actions.Action:
    action_values, _, _ = policy.compute_actions([list(obs.values())])
    gpu_pl = int(action_values[0][0]) if len(action_values) else 0
    return actions.Action(node=CONFIG['racks'][0]['name'], gpu_pl=gpu_pl, job_hint='')

@app.post('/step')
async def step():
    metrics = await telemetry.poll(CONFIG['prometheus']['endpoint'], CONFIG['prometheus']['metrics'])
    action = await agent_step(metrics)
    actions.apply(action)
    STEP_COUNTER.inc()
    return {'action': action._asdict()}

@app.get('/metrics')
def metrics() -> Response:
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)
