import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import './EditMovie.css';
import Input from './form-components/Input';
import TextArea from './form-components/TextArea';
import Select from './form-components/Select';
import Alert from './ui-components/Alert';

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
            errors: [],
            alert: {
                type: "d-none",
                message: "",
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (evt) => {
        // console.log("Form was submitted");
        evt.preventDefault();

        //----------------------------------------------------------------
        // client side validation
        //----------------------------------------------------------------
        let errors = [];
        if (this.state.movie.title === "") {
            errors.push("title");
        }

        this.setState({errors: errors});

        if (errors.length > 0) {
            return false;
        }
        //----------------------------------------------------------------

        const data = new FormData(evt.target);
        const payload = Object.fromEntries(data.entries()); // convert data to payload, and get all form data
        console.log(payload);

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
        }

        fetch('http://localhost:8080/v1/admin/editmovie', requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                if (data.error) {
                    alert(data.error.message);
                    this.setState({
                        alert: { type: "alert-danger", message: data.error.message },
                    });
                } else {
                    // this.setState({
                    //     alert: { type: "alert-success", message: "Changes saved!" },
                    // });
                    this.props.history.push({
                        pathname: "/admin",
                    });
                }
            })
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

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    confirmDelete = (evt) => {
        // console.log("would delete movie id", this.state.movie.id);

        confirmAlert({
            title: 'Delete Movie?',
            message: 'Are you sure?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                    fetch("http://localhost:8080/v1/admin/deletemovie/" + this.state.movie.id, {method: "GET"})
                        .then(response => response.json)
                        .then(data => {
                            if (data.error) {
                                this.setState({
                                    alert: {type: "alert-danger", message: data.error.message}
                                })
                            } else {
                                this.props.history.push({
                                    pathname: "/admin",
                                })
                            }
                        })
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ]
          });
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
                    <Alert
                        alertType={this.state.alert.type}
                        alertMessage={this.state.alert.message}
                    />
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
                            className={this.hasError("title") ? "is-invalid" : ""}
                            type={"text"}
                            name={"title"}
                            value={movie.title}
                            handleChange={this.handleChange}
                            errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                            errorMsg={"Please enter a title"}
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
                        <Link to="/admin" className="btn btn-warning ms-1">
                            Cancel
                        </Link>
                        {movie.id > 0 && (
                            <a href="#!" onClick={() => this.confirmDelete()}
                            className="btn btn-danger ms-1">
                                Delete
                            </a>
                        )}
                    </form>
    
                    <div className="mt-3">
                        <pre>{JSON.stringify(this.state, null, 3)}</pre>
                    </div>
                </Fragment>
            );     
        }

    }
}