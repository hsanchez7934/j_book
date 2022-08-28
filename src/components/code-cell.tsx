import {useState, useEffect} from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import bundler from '../bundler/index'
import Resizable from './resizable'

const CodeCell = () => {
	const [code, setCode] = useState('')
	const [input, setInput] = useState('')
	const [err, setErr] = useState('')
	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundler(input)
		setCode(output.code)
		setErr(output.err)
		}, 750)
		return () => {
			clearTimeout(timer)
		}
	}, [input])

	return (
		<Resizable direction="vertical">
			<div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
				<Resizable direction='horizontal'>
					<CodeEditor
						intitialValue={'const a = 1'}
						onChange={(value) => setInput(value)}
					></CodeEditor>
				</Resizable>
				<Preview code={code} err={err}></Preview>
			</div>
		</Resizable>
	)
}

export default CodeCell
