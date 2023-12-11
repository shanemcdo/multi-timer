import { For, createSignal } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { TimerObject } from './TimerObject'
import Timer from './Timer'
import './App.css'

function App() {
  const [timers, setTimers] = createStore<TimerObject[]>([])
  let timerCount = 0;
  return (
    <div class='grid'>
      <For each={timers}>{(timer, _i) =>
        <Timer {...timer} />
      }</For>
      <button onClick={() => {
        const id = ++timerCount
        const [name, setName] = createSignal(`Timer ${id}`)
        setTimers(produce(list => list.push({
          id,
          name,
          setName,
          remove: () => setTimers(timers.filter(x => x.id !== id))
        })))
      }}>+</button>
    </div>
  )
}

export default App
