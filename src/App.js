// import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import Admin from './components/Admin';
import OneMovie from './components/OneMovie';
import Genres from './components/Genres';
import OneGenre from './components/OneGenre';
import EditMovie from './components/EditMovie';

export default function App() {
  return (
    <Router>
      <div className="container">

        <div className="row">
          <h1 className="mt-3">
            Go Watch a Movie!
          </h1>
          <hr className="mb-3"></hr>
        </div>

        <div className="row">
          <div className="col-md-2">
            <nav>
              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/">Home</Link>
                </li>
              </ul>

              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/movies">Movies</Link>
                </li>
              </ul>

              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/genres">Genres</Link>
                </li>
              </ul>

              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/admin/movie/0">Add Movie</Link>
                </li>
              </ul>

              <ul className="list-group">
                <li className="list-group-item">
                  <Link to="/admin">Manage Catalogue</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="col-md-10">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <Route exact path="/movies">
                <Movies />
              </Route>

              <Route path="/movies/:id" component={OneMovie}/>

              {/* <Route path="/movies/:id">
                <Movie />
              </Route> */}

              <Route exact path="/genres">
                <Genres />
              </Route>

              <Route path="/genres/:id" component={OneGenre}/>

              <Route path="/admin/movie/:id" component={EditMovie}/>

              <Route path="/admin">
                <Admin />
              </Route>
            </Switch>
          </div>
        </div>

      </div>
    </Router>
  );
}

// function Movie() {
//   let { id } = useParams();

//   return <h2>Movie id {id}</h2>
// }