import './preview.css'
import {useEffect, useRef} from 'react'

interface PreviewProps {
	code: string;
	err: string;
}

const html = `
		<html>
			<head>
				<style>html {background-color: #fff;}</style>
			</head>
			<body>
				<div id="root">
					<script>
						const handleError = (err) => {
							const root = document.querySelector('#root');
							root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
						}
						window.addEventListener('error', (event) => {
							event.preventDefault();
							handleError(event.error);
						})
						window.addEventListener('message', (event) => {
							try {
								eval(event.data);
							} catch(err) {
								handleError(err);
							}
						}, false)
					</script>
				</div>
			</body>
		</html>
	`

const Preview: React.FC<PreviewProps> = ({code, err}) => {
	const iframe = useRef<any>()
	useEffect(() => {
		iframe.current.srcdoc = html
		setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, '*')
		}, 50)
	}, [code])

	return (
		<div className='preview-wrapper'>
			<iframe
				ref={iframe}
				srcDoc={html}
				sandbox="allow-scripts"
				title="preview"
			></iframe>
			{err && <div className='preview-error'>{err}</div>}
		</div>
	)
}

export default Preview
