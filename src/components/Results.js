import React, {useEffect} from 'react';
import {Link} from "react-router-dom"
import {Table } from 'reactstrap';

const Results = (props) => {
	function processActive(props) {
		let buttons = document.getElementsByClassName('buttons');
		for(var i = 0; i < buttons.length; i++)
		{
			buttons[i].classList.remove('active');
		}
		let active = props.active;
		let classes = document.getElementById(active)
		if (classes !== null) {
			classes.classList.add('active')
		}
	}

	function handleSortChange(event) {
        props.onChange(event)
    }
	useEffect(() => {
		processActive(props);
	}, [])
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
							<button type="button" id="name" onClick={() => handleSortChange('name')} className="buttons active">
								Name
							</button>
						</th>
						<th>
						<button type="button" id="stars" onClick={() => handleSortChange('stars')} className="buttons">
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