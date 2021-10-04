import Main from '../main/main';

function App(props: {
  title: string,
  genre: string,
  release: number,
}): JSX.Element {
  return <Main title={props.title} genre={props.genre} release={props.release}/>;
}

export default App;
