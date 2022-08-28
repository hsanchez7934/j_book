import 'bulmaswatch/superhero/bulmaswatch.min.css'
import ReactDOM from 'react-dom'
// import CodeCell from './components/code-cell'
import TextEditor from './components/text-editor'

const App = () => {
	return (
		<div>
			{/* <CodeCell></CodeCell> */}
			<TextEditor></TextEditor>
		</div>
	)
}

ReactDOM.render(<App />, document.querySelector('#root'))
