import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage'

const fileCache = localForage.createInstance({
	name: 'filecache'
})

export const fetchPlugin = (inputCode: string) => {
	return {
		name: 'fetch-plugin',
		setup: (build: esbuild.PluginBuild) => {
			build.onLoad({filter: /(^index\.js$)/}, () => {
				return {
					loader: 'jsx',
					contents: inputCode
				}
			})

			build.onLoad({filter: /.*/}, async (args: any) => {
				const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)
				if (cachedResult) {
					return cachedResult
				}
			})

			build.onLoad({filter: /.css$/}, async (args) => {
				const {data, request} = await axios.get(args.path)
				const escaped = data
					// new lines have been removed
					.replace(/\n/g, '')
					// double quotes have been escaped
					.replace(/"/g, '\\"')
					// all single quotes have been escaped
					.replace(/'/, "\\'")
				const contents = `
				const style = document.createElement('style');
				style.innerText = '${escaped}';
				document.head.appendChild(style);`
				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents,
					resolveDir: new URL('./', request.responseURL).pathname
				}

				await fileCache.setItem(args.path, result)
				return result
			})

			build.onLoad({filter: /.*/}, async (args: any) => {
				const {data, request} = await axios.get(args.path)
				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname
				}

				// if its not, cache it
				await fileCache.setItem(args.path, result)
				return result
			})
		}
	}
}
