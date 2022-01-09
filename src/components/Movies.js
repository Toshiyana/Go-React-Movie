import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

export default class Movies extends Component {

    state = { movies: [] };

    componentDidMount() {
        // execute after the component is rendered to the screen
        this.setState({
            movies: [
                {id: 1, title: "The Shawshank", runtime: 142},
                {id: 2, title: "The God Father", runtime: 152},
                {id: 3, title: "The Dark Knight", runtime: 162},
            ]
        })
    }

    render() {
        return (
            <Fragment>
                <h2>Choose a movie</h2>

                <ul>
                    {this.state.movies.map( (m) => (
                        <li key={m.id}>
                            <Link to={`/movies/${m.id}`}>{m.title}</Link>
                        </li>
                    ))}
                </ul>
            </Fragment>
        );
    }
}