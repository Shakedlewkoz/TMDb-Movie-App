import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import MovieDetails from "./MovieDetails";

var myApi = 'aae712b84d3b57a35cbaf2e4ae652d4c';
var popularMoviesURL = 'https://api.themoviedb.org/3/movie/popular?api_key=' + myApi + '&language=en-US&page=';

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            loading: false,
            currentPage: 0,
            search: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getMovies() {
        this.setState({
            loading: true
        });
        if (this.state.search == '') {
            axios.get(popularMoviesURL+(this.state.currentPage+1).toString()).then(
                (res) => this.setState({
                    loading: false,
                    movies: [...this.state.movies, ...res.data.results],
                    currentPage: this.state.currentPage + 1
                })
            )
        }
        else {
            axios.get('https://api.themoviedb.org/3/search/movie?query=%home&api_key='+myApi).then(
                (res) => this.setState({
                    loading: false,
                    movies: res.data.results,
                    currentPage: this.state.currentPage + 1
                })
            )
        }
    }

    getMoviePicture(backdrop_path) {
        let picURL = 'https://image.tmdb.org/t/p/w500' + backdrop_path;
        return picURL;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.getMovies();
        console.log('more users');
        return false;
    }

    componentDidMount() {
        this.getMovies();
    }

    searchDebounce = null;

    async onSearch(value) {
        this.setState({
            search: value
        })
        clearTimeout(this.searchDebounce);
        this.searchDebounce = setTimeout(async ()=> {
            this.setState({
                search: value
            })
        },300)
    }

    changeSeacrch() {
        if (this.state.search !== '') {
            axios.get('https://api.themoviedb.org/3/search/movie?query=%'+this.state.search+'&api_key=aae712b84d3b57a35cbaf2e4ae652d4c'+'&language=en-US&page=1').then(
                (res) => this.setState({
                    loading: false,
                    movies: res.data.results,
                })
            )
        }
    }

    returnHome() {
        window.location.reload(false);
    }

    render() {
        return (
            <div className="App">
                {this.changeSeacrch()}
            <link rel="stylesheet" href="https://bootswatch.com/5/superhero/bootstrap.min.css"/>
                <h2 className="title" onClick={this.returnHome}>The Movie App </h2>
                <input type="search" placeholder="Search Movie..." onInput={(e ) => this.onSearch(e.target.value)}/>
                {this.state.loading ? 'Loading...' : this.state.movies.map(row => (
                    <div>
                        <div>
                            <Router>
                                <Route path={"/MovieDetails/"} exact component={MovieDetails}/>
                                <Route path={"/MovieDetails/:id"} component={MovieDetails}/>
                                    <Switch>
                                    <Route path={"/MovieDetails/:id"} component={MovieDetails}>  </Route>
                                    <Link to={"/MovieDetails/"+row.id}>
                                        <img src={this.getMoviePicture(row.backdrop_path)} alt="loading"></img>
                                        <h2 className="name">{row.title.toString()} </h2>
                                    <h4 className="name">vote average: {row.vote_average}</h4>
                                </Link>
                                    </Switch>
                        </Router>
                        </div>
                        </div>
                ))}
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" value="Load More..."/>
                </form>
            </div>
        );
    }
};



export default App;

