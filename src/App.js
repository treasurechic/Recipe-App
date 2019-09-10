import React, {Component} from 'react';
import './App.css';
import {recipes} from './tempList'
import RecipeList from './components/recipeList';
import RecipeDetail from './components/recipeDetail';

class App extends Component {
  state = {
    recipes:recipes,
    url:'https://www.food2fork.com/api/search?key=1d3e7afdd52955a85e6b3343ecb8d6ee',
    base_url:'https://www.food2fork.com/api/search?key=1d3e7afdd52955a85e6b3343ecb8d6ee',
    details_id:35382,
    pageIndex:1,
    search:'',
    query:'&q=',
    error:''
  };

  async getRecipes(){
    try{
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      if(jsonData.recipes.length === 0){
        this.setState(()=>{
          return{
            error:'sorry, your serach did not return any results'
          }
        })
      }else{
          this.setState({
            recipes:jsonData.recipes
          });
        }
        }catch (error){
          console.log(error);
    }
  }

  componentDidMount(){
    this.getRecipes()
  }
  displayPage = index =>{
    switch(index){
      default:
        case 1:
          return<RecipeList recipes={this.state.recipes} handleDetails = {this.handleDetails} value={this.state.search} handleChange={this.handleChange} handleSubmit ={this.handleSubmit} error={this.state.error}/>;
          case 0:
            return <RecipeDetail id={this.state.details_id} handleIndex = {this.handleIndex}/>
    }
  };
  handleIndex = index =>{
    this.setState({
      pageIndex:index
    })
  }
  handleDetails = (index, id) =>{
    this.setState({
      pageIndex:index,
      details_id:id
    })
  };
  handleChange = (e) =>{
    this.setState({
      search:e.target.value
    })
  };
  handleSubmit = (e) =>{
    e.preventDefault();
    const{base_url,query,search} =this.state;
    this.setState(()=>{
      return{
        url:`${base_url}${query}${search}`,
        search:''
      };
    }, ()=>{
      this.getRecipes();
    })
  }
  render(){
  return (
   <>
    {this.displayPage(this.state.pageIndex)}
   </>
  );
  }
}

export default App;
