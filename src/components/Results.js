import React from 'react';
import {Link} from "react-router-dom"
import {Table } from 'reactstrap';

const Results = (props) => {
	if (props.data === null) {
		return (
			<></>
		)
	} else {
		return (
			<Table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Stars</th>
						<th>Owner</th>
					</tr>
				</thead>
				<tbody>
					{props.data.map(result => {
						return <tr key={result.id}>
							<td>
								<Link
									to={{
										pathname: "/detail",
										data: result // your data array of objects
									}}
								 >
									 {result.name}
								 </Link>
							 </td>
							<td>{result.stargazers_count}</td>
							<td>{result.owner.login}</td>
						</tr>
					})} 
				</tbody>
			</Table>
		)
	
	}
}

export default Results;