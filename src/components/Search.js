import React, {useEffect, useState} from "react";
import API from "../utils/API";
import { Row, Col, Button, Form, FormGroup, Label, Input, Spinner  } from 'reactstrap';
import Results from "./Results";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searching, setSearching] =useState(false);
	const [results, setResults] = useState(null);
	const [resultFilter, setResultFilter] = useState();
	const [active, setActive] = useState("name");
	const [initialResults, setInitialResults] = useState(null);
	const [languages, setLanguages] = useState(["Select Language"]);

	const processSearch = (e) => {
		e.preventDefault();
		setSearching(true);
		search('name');
	}

	function search(val) {
		API.search(searchTerm, val)
		.then(res => {
			setSearching(false);
			setResults(res.items);
			setInitialResults(res.items);
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
				if (language === null) {
					language = "null"
				}
				if (languageArray.indexOf(language) === -1) {
					languageArray.push(language)
				}
			}
			languageField.classList.remove('hidden');
		}
		setLanguages(languageArray);
	}

	function filterResults(e) {
		setResultFilter(e.target.value);
	}
	function processFilter() {
		let selected = document.getElementById('language-filter').value;
		if (selected === "Select Language") {
			setResults(initialResults);
		} else {
			const filteredData = results.filter(i => i.language === selected)
			setResults(filteredData)
		}
	}
	useEffect(() => {
		processFilter();
	}, [resultFilter]);

	function handleSortChange(val) {
		setResultFilter("Select Language");
		setActive(val);
		setSearching(true);
		search(val);
	};

	return (
		<>
			<Form onSubmit={processSearch}>
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
						<Input type="select" name="language-filter" id="language-filter" value={resultFilter} onChange={(e) => filterResults(e)}>
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
				<Results data={results} active={active} onChange={handleSortChange} />
			)}
			
		</>
	)		
}

export default Search;