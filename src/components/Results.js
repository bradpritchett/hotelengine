import React from 'react';
import {Link} from "react-router-dom"
import {Table } from 'reactstrap';

const Results = (props) => {
	
	function handleSortChange(event) {
		const buttons = document.getElementsByClassName('buttons');
		console.log(event, buttons)
        props.onChange(event)
    }

	if (props.data === null) {
		return (
			<></>
		)
	} else {
		return (
			<Table>
				<thead>
					<tr>
						<th>
							<button type="button" onClick={() => handleSortChange('name')} className="buttons">
								Name
							</button>
						</th>
						<th>
						<button type="button" onClick={() => handleSortChange('stars')} className="button">
							Stars
						</button>
						</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map(result => {
						return <tr key={result.id}>
							<td>
								<Link
									to={{
										pathname: "/detail",
										data: result 
									}}
								 >
									 {result.name}
								 </Link>
							 </td>
							 
							<td>{result.stargazers_count}</td>
						</tr>
					})} 
				</tbody>
			</Table>
		)
	
	}
}

export default Results;