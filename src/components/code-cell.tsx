import {useState} from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import bundler from '../bundler/index'
import Resizable from './resizable'

const CodeCell = () => {
	const [code, setCode] = useState('')
	const [input, setInput] = useState('')

	const onClick = async () => {
		const ouput = await bundler(input)
		setCode(ouput)
	}

	return (
		<Resizable direction='vertical'>
			<div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
				<CodeEditor intitialValue={'const a = 1'} onChange={(value) => setInput(value)}></CodeEditor>
				<Preview code={code}></Preview>
			</div>
		</Resizable>
	)
}

export default CodeCell
