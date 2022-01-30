import React, {useEffect, useState, Fragment} from 'react';
import { Link } from "react-router-dom";

// MoviesFunc.js is the same as Movies.js.
// MoviesFunc.js is written with react hook.
function MoviesFunc(props) {

    // role: state
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    // role: componentDidMount()
    useEffect(() => {
        fetch("http://localhost:8080/v1/movies")
            .then((response) => {
                if (response.status !== 200) {
                    setError("Invalid response code: ", response.status);
                } else {
                    setError(null);
                }
                return response.json();
            })
            .then((json) => {
                setMovies(json.movies);
            })
    }, []);// useEffect() must set default value.

    if (error !== null) {
        return <div>Error: {error.message}</div>
    } else {
        return (
            <Fragment>
                <h2>Choose a movie</h2>

                <div className="list-group">
                    {movies.map( (m) => (
                        <Link
                            key={m.id}
                            to={`/movies/${m.id}`}
                            className="list-group-item list-group-item-action"
                        >
                            {m.title}
                        </Link>
                    ))}
                </div>
            </Fragment>
        );
    }
}

export default MoviesFunc;