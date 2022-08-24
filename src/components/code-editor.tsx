import {useRef} from 'react'
import MonacoEditor, {EditorDidMount} from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'

interface CodeEditorProps {
	intitialValue: string
	onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({onChange, intitialValue}) => {
	const editorRef = useRef<any>()
	const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
		editorRef.current = monacoEditor
		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue())
		})
		monacoEditor.getModel()?.updateOptions({tabSize: 2})
	}
	const onFormatClick = () => {
		const unformatted = editorRef.current.getModel().getValue()
		const formatted = prettier.format(unformatted, {
			parser: 'babel',
			plugins: [parser],
			useTabs: false,
			semi: true,
			singleQuote: true
		})
		editorRef.current.setValue(formatted)
	}

	return (
		<div>
			<button className="button button-format is-primary is-small" onClick={onFormatClick}>Format</button>
			<MonacoEditor
				options={{
					wordWrap: 'on',
					minimap: {
						enabled: false
					},
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true
				}}
				height="500px"
				language="javascript"
				theme="dark"
				value={intitialValue}
				editorDidMount={onEditorDidMount}
			/>
		</div>
	)
}

export default CodeEditor