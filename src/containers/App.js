import React, { Component } from 'react';
import CardList from '../components/CardList.js';
import Searchbox from '../components/Searchbox.js';
import './App.css';
import ErrorBoundary from '../components/ErrorBoundary.js';
import Scroll from '../components/Scroll.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchfield: '',
        };
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then((response) => response.json())
            .then((users) => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value });
    };
    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter((robot) => {
            return robot.name.toLowerCase().includes(searchfield.toLowerCase());
        });
        if (!robots.length) {
            return <h1 className="f1 tc">Loading</h1>;
        } else {
            return (
                <div className="tc">
                    <h1 className="f1">Robo Friends</h1>
                    <Searchbox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;
