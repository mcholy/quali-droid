export default function ErrorSection({error}: ErrorSectionProps) {
    const style = { color: "red" };
    return (<>
        {error ? <ul style={style}>
          {<li>{error}</li>}
        </ul> : null}
    </>);
}

//{props.errors.map((error, i) => <li key={i}>{error}</li>)}
interface ErrorSectionProps {
    error?: string
}