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

	// Activated by form submission. Sets searching to true which starts the spinner and processes the search
	const processSearch = (e) => {
		e.preventDefault();
		setSearching(true);
		search('name');
	};

	// Search accepts an argument that will be used to determine the sort in the query
	function search(val) {
		API.search(searchTerm, val)
		.then(res => {
			setSearching(false);
			setResults(res.items);
			setInitialResults(res.items);
		})
	};

	// Once the API call returns data useEffect will fire the function that gathers language information on each file to create dynamic select options
	useEffect(() => {
		getLanguages();
	}, [results]);

	// When sort filters are updated the filters are fired
	useEffect(() => {
		processFilter();
	}, [resultFilter]);

	// Generates select options
	const getLanguages = () => {
		const languageField = document.getElementById('language');
		let languageArray = []
		if (results !== null) {
			for (let i = 0; i < results.length; i++) {
				let language = results[i].language;
				if (language !== null && languageArray.indexOf(language) === -1) {
					languageArray.push(language)
				}
			}
			languageField.classList.remove('hidden');
		}
		setLanguages(languageArray);
	};

	// Sets filter on filter change, which triggers the useEffect
	function filterResults(e) {
		setResultFilter(e.target.value);
	};

	// Function that processes a filter when filter is set
	function processFilter() {
		let selected = document.getElementById('language-filter').value;
		if (selected === "Select Language") {
			setResults(initialResults);
		} else {
			const filteredData = results.filter(i => i.language === selected)
			setResults(filteredData)
		}
	};
	
	// Receives callback from sort in results
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