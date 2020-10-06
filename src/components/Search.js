import React, {useEffect, useState} from "react";
import API from "../utils/API";
import { Row, Col, Button, Form, FormGroup, Label, Input, Spinner  } from 'reactstrap';
import Results from "./Results";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searching, setSearching] =useState(false);
	const [results, setResults] = useState(null);
	const [languages, setLanguages] = useState(["Select Language"]);

	const search = (e) => {
		e.preventDefault();
			setSearching(true)
			API.search(searchTerm)
				.then(res => {
					setSearching(false)
					setResults(res.items)
				})
		}

		useEffect(() => {
			getLanguages();
		}, [results])

		const getLanguages = () => {
			const languageField = document.getElementById('language');
			let languageArray = []
			if (results !== null) {
				for (let i = 0; i < results.length; i++) {
					let language = results[i].language;
					if (languageArray.indexOf(language) === -1) {
						languageArray.push(language)
					}
				}
				languageField.classList.remove('hidden');
			}
			
			setLanguages(languageArray);
		}

		function filterResults() {
			let selected = document.getElementById('language-filter').value;
			const filteredData = results.filter(i => i.language === selected)
			setResults(filteredData)
		}

	



	return (
		<>
			<Form onSubmit={search}>
				<FormGroup row>
					<Label for="search-term" md={2}>Search Terms:</Label>
					<Col md={10}>
						<Input 
							type="text" 
							name="search-term" 
							id="search-term" 
							onChange={event => setSearchTerm(event.target.value)} />
					</Col>
				</FormGroup>
				<FormGroup row className="hidden" id="language">
					<Label for="language-filter" md={2}>Language</Label>
					<Col md={10}>
						<Input type="select" name="language-filter" id="language-filter" onChange={() => filterResults()}>
							<option>Select Language</option>
						{languages.map(v => {
							return <option key={v} value={v}>{v}</option>;
						})}
						</Input>
					</Col>
				</FormGroup> 
				<Row>
					<Col>
						<Button color="primary">Submit</Button>
					</Col>
				</Row>
			</Form>
			{searching ? (
				<Spinner color="primary" />
			) : (
				<Results data={results} />
			)}
			
		</>
	)		
}

export default Search;