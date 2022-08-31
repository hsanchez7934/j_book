import {useTypedSelector} from './use-typed-selector'

export const useCumulativeCode = (cellID: string) => {
	return useTypedSelector((state) => {
		const {data, order} = state.cells
		const orderedCells = order.map((id) => data[id])
		const showFunction = `
			import _React from 'react'
			import _ReactDOM from 'react-dom'
			var show = (value) => {
				const root = document.querySelector('#root')
				if (typeof value === 'object') {
					if (value.$$typeof && value.props) {
						ReactDOM.render(value, root)
					} else {
						root.innerHTML = JSON.stringify(value);
					}
				} else {
					root.innerHTML = value;
				}
			}
		`
		const showFunctionNoop = 'var show = () => {}'
		const cumulativeCode = []
		for (let c of orderedCells) {
			if (c.type === 'code') {
				if (c.id === cellID) {
					cumulativeCode.push(showFunction)
				} else {
					cumulativeCode.push(showFunctionNoop)
				}
				cumulativeCode.push(c.content)
			}
			if (c.id === cellID) break
		}
		return cumulativeCode
	}).join('\n')
}
