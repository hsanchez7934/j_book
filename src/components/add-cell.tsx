import './add-cell.css'
import {useActions} from '../hooks/use-actions'

interface AddCellProps {
	nextCellID: string | null
	forceVisible?: boolean
}

const AddCell: React.FC<AddCellProps> = ({nextCellID, forceVisible}) => {
	const {insertCellBefore} = useActions()
	return (
		<div className={`add-cell ${forceVisible && 'force-visible'}`}>
			<div className="add-buttons">
				<button
					className="button is-rounded is-primary is-small"
					onClick={() => insertCellBefore(nextCellID, 'code')}
				>
					<span className="icon is-small">
						<i className="fas fa-plus"></i>
					</span>
					<span>Code</span>
				</button>
				<button
					className="button is-rounded is-primary is-small"
					onClick={() => insertCellBefore(nextCellID, 'text')}
				>
					<span className="icon is-small">
						<i className="fas fa-plus"></i>
					</span>
					<span>Text</span>
				</button>
			</div>
			<div className="divider"></div>
		</div>
	)
}

export default AddCell
