import logo from './logo.svg';
import React,{Component} from 'react';
import './App.css';
import MovieRow from './MovieRow.js'
import $ from 'jquery'

class App extends Component {
  constructor(props){
    super(props);
    this.state={}
  //   const movies=[
  //     {id: 1,title: 'Avengers',overview:'Its a good movie'},
  //     {id:2,title: 'Spiderman',overview: 'Its okay'}
  //   ]
  //   var movieRows=[]
  //   movies.forEach((movie)=> {
  //     var movieRow=<MovieRow movie={movie}/>
  //     movieRows.push(movieRow)
  // })
  //   this.state={rows: movieRows}
  }
  performSearch(searchTerm)
  {
    console.log("Fetched dATA")
    const urlString="https://api.themoviedb.org/3/search/movie?api_key=0a6f2b992dd30af3c7e457a4b20b3659&query="+searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults)=> {
        const results=searchResults.results
        var movieRows=[]
        results.forEach((movie)=>{
          movie.poster_src="http://image.tmdb.org/t/p/w185"+movie.poster_path
          var movieRow=<MovieRow movie={movie}/>
          movieRows.push(movieRow)
        })
        this.setState({rows: movieRows})
      },
      error: (xhr,status,arr)=> {
        console.error("Failure")
      }
    })
  }
  eventChangeHandler(event)
  {
    const boundObject=this
    const searchTerm=event.target.value
    boundObject.performSearch(searchTerm)
  }
  render() {
  return (
    <div className="App">
      <table className="Header">
        <tbody>
          <tr>
            <td>
              <h1>Movie searcher</h1>
            </td>
            <td>
              (by suhaas)
            </td>
          </tr>
        </tbody>
      </table>
      <input placeholder="Enter Movie Name" className="Search-bar" onChange={this.eventChangeHandler.bind(this)}/>
      {this.state.rows}
    </div>
  );
  };
}

export default App;
