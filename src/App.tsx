import { For } from 'solid-js'
import { createStore } from 'solid-js/store'
import Timer from './Timer'
import NewButton from './NewButton'
import './App.css'

function App() {
  const [timers, setTimers] = createStore<string[]>([])
  return (<>
    <For each={timers}>{(timer, i) => 
      <Timer name={timer} />
    }</For>
    <NewButton callback={() => {}} />
  </>
  )
}

export default App
