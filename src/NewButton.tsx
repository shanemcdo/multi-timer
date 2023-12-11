export default function NewButton(props: { callback: () => void } ) {
    return <button onClick={props.callback}>+</button>

}