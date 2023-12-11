import { Show, createSignal } from 'solid-js'
import { TimerObject } from './TimerObject';

function validateNumberInput(this: HTMLInputElement) {
    const val = parseInt(this.value)
    const min = parseInt(this.min)
    const max = parseInt(this.max)
    if(val < min) this.value = min.toString()
    if(val > max) this.value = max.toString()
}

export default function Timer(props: TimerObject) {
    let intervalId: number | null = null;
    const [active, setActive] = createSignal(false)
    const commonInputProps = {
        min: '0',
        max: '59',
        value: '0',
        type: 'number',
        onKeyPress: validateNumberInput,
        onChange: validateNumberInput,
    }
    const hours = <input class="hours" {...commonInputProps} max="" /> as HTMLInputElement
    const minutes = <input class="minutes" {...commonInputProps} value="5" /> as HTMLInputElement
    const seconds = <input class="seconds" {...commonInputProps} /> as HTMLInputElement
    const [time, setTime] = createSignal<{h: number, m: number, s: number}>({h: 0, m: 0, s: 0})
    const startTimer = () => {
        setActive(true)
        const h = parseInt(hours!.value) * 60 * 60 * 1000;
        const m = parseInt(minutes!.value) * 60 * 1000;
        const s = parseInt(seconds!.value) * 1000;
        const totalMs  = h + m + s;
        const start = Date.now();
        intervalId = setInterval(() => {
            const now = Date.now()
            const diff = (start + totalMs) - now
            if(diff <= 0) {
                stopTimer();
            }
            setTime({
                h: Math.floor(diff / 60 / 60 / 1000),
                m: Math.floor(diff / 60 / 1000 % 60),
                s: Math.floor(diff / 1000 % 60)
            })
        }, 50)
    }
    const stopTimer = () => {
        setActive(false)
        if(intervalId !== null) clearInterval(intervalId)
    }
    return <div>
        <input type="text" value={props.name()} onChange={event => props.setName(event.target.value)} />
        <button onClick={props.remove}>X</button>
        <br />
        <Show 
            when={active()}
            fallback={
                <>
                    {hours}
                    {minutes}
                    {seconds}
                    <button onClick={startTimer}>Start Timer</button>
                </>
            }
        >
            <p class="digital clock">{time().h}:{time().m}:{time().s}</p>
            <button onClick={stopTimer}>Stop Timer</button>
        </Show>
    </div>
}