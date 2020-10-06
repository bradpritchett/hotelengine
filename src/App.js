import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
		<Container>
			<h1>Github Query</h1>		
		  <Switch>	
			  <Route exact path="/" component={Home} />
			  <Route path ="/detail" component={Detail} />
		  </Switch>
		</Container>
    </Router>
  );
}

export default App;
