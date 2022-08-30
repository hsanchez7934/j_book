import {useState, useEffect} from 'react'
import CodeEditor from './code-editor'
import Preview from './preview'
import bundler from '../bundler/index'
import Resizable from './resizable'
import {Cell} from '../state'
import {useActions} from '../hooks/use-actions'

interface CodeCellProps {
	cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
	const {updateCell} = useActions()

	const [code, setCode] = useState('')
	const [err, setErr] = useState('')

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundler(cell.content)
		setCode(output.code)
		setErr(output.err)
		}, 750)
		return () => {
			clearTimeout(timer)
		}
	}, [cell.content])

	return (
		<Resizable direction="vertical">
			<div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
				<Resizable direction='horizontal'>
					<CodeEditor
						intitialValue={cell.content}
						onChange={(value) => updateCell(cell.id, value)}
					></CodeEditor>
				</Resizable>
				<Preview code={code} err={err}></Preview>
			</div>
		</Resizable>
	)
}

export default CodeCell
