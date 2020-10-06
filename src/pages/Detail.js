import React, {useState, useEffect} from "react";
import { Container, Row, Col, Button } from 'reactstrap';
const Detail = (props) => {
	const [detail, setDetail] = useState({
		name: "",
		owner: {
			login: "",
			avatar_url: ""
		} 
	});
	useEffect(() => {
		if (props.location.data) {
			setDetail(props.location.data)
		}
	}, [])
	
	const imgStyle = {
		maxHeight: 70,
		maxWidth: 70
	  }
	
function descriptionCheck() {
	let desc;
	if (detail.description === null) {
		return desc = "No description given"
	}
	else {
		return desc = detail.description
	}
}

	if (props.location.data) {
		return (
			<Container className="detail">
				<Row>
					<Col>	
						<Button color="link" onClick={() => props.history.goBack()}>
							New Search
						</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<h4>Project: <a href={detail.html_url}  target="_blank" rel="noopener noreferrer">{detail.name}</a></h4>
					</Col>
				</Row>
				<Row>
					<Col>
						<p>
							Created By: <a href={detail.owner.html_url} target="_blank" rel="noopener noreferrer">{detail.owner.login}</a>
							<img src={detail.owner.avatar_url} style={imgStyle} alt={detail.owner.name} />
						</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<p>Desription: {descriptionCheck()}</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<p>
							Stars: {detail.stargazers_count}
						</p>
					</Col>
				</Row>
				<Row>
					<Col>
						<p>
							Language: {detail.language}
						</p>
					</Col>
				</Row>
			</Container>
			)
	} else {
		return (
			<a href="/">
				New Search 
			</a>
		)
	}
	
}

export default Detail;