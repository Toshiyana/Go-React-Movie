import React, { Component, Fragment } from 'react'
import './EditMovie.css';
import Input from './form-components/Input';
import TextArea from './form-components/TextArea';
import Select from './form-components/Select';

export default class EditMovie extends Component {
    // You can remove the below state code,
    // because you set default value in costructor(){}
    // state = {
    //     movie: {},
    //     isLoaded: false,
    //     error: null,
    // }

    constructor(props) {
        super(props);
        // set default value
        this.state = {
            movie: {
                id: 0,
                title: "",
                release_date: "",
                runtime: "",
                mpaa_rating: "",
                rating: "",
                description: "",
            },
            mpaaOptions: [
                {id: "G", value: "G"},
                {id: "PG", value: "PG"},
                {id: "PG13", value: "PG13"},
                {id: "R", value: "R"},
                {id: "NC17", value: "NC17"},
            ],
            isLoaded: false,
            error: null,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (evt) => {
        console.log("Form was submitted");
        evt.preventDefault();
    }

    handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState((prevState) => ({
            movie: {
                ...prevState.movie,
                [name]: value,
            }
        }))
    }

    componentDidMount() {
        // this.setState({
        //     movie: {
        //         title: "The Godfather",
        //         mpaa_rating: "R",
        //     }
        // });

        const id = this.props.match.params.id;
        if (id > 0) {
            fetch("http://localhost:8080/v1/movie/" + id)
                .then((response) => {
                    if (response.status !== "200") {
                        let err = Error;
                        err.Message = "Invalid response code: " + response.status;
                        this.setState({error: err});
                    }
                    return response.json();
                })
                .then((json) => {
                    const releaseDate = new Date(json.movie.release_date);
                    
                    this.setState(
                        {
                            movie: {
                                id: id,
                                title: json.movie.title,
                                release_date: releaseDate.toISOString().split("T")[0],
                                runtime: json.movie.runtime,
                                mpaa_rating: json.movie.mpaa_rating,
                                rating: json.movie.rating,
                                description: json.movie.description,
                            },
                            isLoaded: true,
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error: error,
                            })
                        }
                    )
                })
        } else {
            this.setState({ isLoaded: true });
        }
    }

    render() {
        let { movie, isLoaded, error } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (
                <Fragment>
                    <h2>Add/Edit Movie</h2>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={movie.id}
                            onChange={this.handleChange}
                        />
    
    
                        {/* <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={movie.title}
                                onChange={this.handleChange}
                            />
                        </div> */}
    
                        <Input
                            title={"Title"}
                            type={"text"}
                            name={"title"}
                            value={movie.title}
                            handleChange={this.handleChange}
                        />
    
                        {/* <div className="mb-3">
                            <label htmlFor="release_date" className="form-label">
                                Release Date
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="release_date"
                                name="release_date"
                                value={movie.release_date}
                                onChange={this.handleChange}
                            />
                        </div> */}
    
                        <Input
                            title={"Release Date"}
                            type={"date"}
                            name={"release_date"}
                            value={movie.release_date}
                            handleChange={this.handleChange}
                        />
    
                        {/* <div className="mb-3">
                            <label htmlFor="runtime" className="form-label">
                                Runtime
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="runtime"
                                name="runtime"
                                value={movie.runtime}
                                onChange={this.handleChange}
                            />
                        </div> */}
    
                        <Input
                            title={"Runtime"}
                            type={"text"}
                            name={"runtime"}
                            value={movie.runtime}
                            handleChange={this.handleChange}
                        />
    
                        {/* <div className="mb-3">
                            <label htmlFor="mpaa_rating" className="form-label">
                                MPAA Rating
                            </label>
                            <select name="mpaa_rating" className="form-select" value={movie.mpaa_rating} onChange={this.handleChange}>
                                <option className="form-select">Choose...</option>
                                <option className="form-select" value="G">G</option>
                                <option className="form-select" value="PG">PG</option>
                                <option className="form-select" value="PG13">PG13</option>
                                <option className="form-select" value="R">R</option>
                                <option className="form-select" value="NC17">NC17</option>
                            </select>
                        </div> */}
    
                        <Select
                            title={"MPAA Rating"}
                            name={"mpaa_rating"}
                            options={this.state.mpaaOptions}
                            value={movie.mpaa_rating}
                            handleChange={this.handleChange}
                            placeholder={"Choose..."}
                        />
    
                        {/* <div className="mb-3">
                            <label htmlFor="rating" className="form-label">
                                Rating
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="rating"
                                name="rating"
                                value={movie.rating}
                                onChange={this.handleChange}
                            />
                        </div> */}
    
                        <Input
                            title={"Rating"}
                            type={"text"}
                            name={"rating"}
                            value={movie.rating}
                            handleChange={this.handleChange}
                        />
    
                        {/* <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description
                            </label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                rows="3"
                                value={movie.description}
                                onChange={this.handleChange}
                            />
                        </div> */}
    
                        <TextArea
                            title={"Description"}
                            name={"description"}
                            value={movie.description}
                            rows={"3"}
                            handleChange={this.handleChange}
                        />
    
                        <hr />
    
                        <button className="btn btn-primary">Save</button>
                    </form>
    
                    <div className="mt-3">
                        <pre>{JSON.stringify(this.state, null, 3)}</pre>
                    </div>
                </Fragment>
            );     
        }

    }
}