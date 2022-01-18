import React, { Component, Fragment } from 'react'
import './EditMovie.css';


export default class EditMovie extends Component {
    state = {
        movie: {},
        isLoaded: false,
        error: null,
    }

    render() {
        let {movie} = this.state;

        return (
            <Fragment>
                <h2>Add/Edit Movie</h2>
                <hr />
                <form method="post">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={movie.title}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="release_date" className="form-label">
                            Release Date
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="release_date"
                            name="release_date"
                            value={movie.release_date}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="runtime" className="form-label">
                            Runtime
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="runtime"
                            name="runtime"
                            value={movie.runtime}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="mpaa_rating" className="form-label">
                            MPAA Rating
                        </label>
                        <select className="form-select" value={movie.mpaa_rating}>
                            <option className="form-select">Choose...</option>
                            <option className="form-select" value="G">G</option>
                            <option className="form-select" value="PG">PG</option>
                            <option className="form-select" value="PG13">PG13</option>
                            <option className="form-select" value="R">R</option>
                            <option className="form-select" value="NC17">NC17</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="rating" className="form-label">
                            Rating
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="rating"
                            name="rating"
                            value={movie.rating}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea className="form-control" id="description" name="description" rows="3">
                            {movie.description}
                        </textarea>
                    </div>

                    <hr />

                    <button className="btn btn-primary">Save</button>
                </form>
            </Fragment>
        )
    }
}