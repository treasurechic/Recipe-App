import React, { Component } from 'react'
import {recipeDetails} from '../tempDetails'

export default class recipeDetail extends Component {
  // constructor(props){
  //   super(props)

  //   this.state ={
  //     recipe:recipeDetails,
  //     url:`https://www.food2fork.com/api/get?key=1d3e7afdd52955a85e6b3343ecb8d6ee&rId=${this.props.id}`
  //   }
  // }

  // async componentDidMount(){
    // try{
    //   const data = await fetch(this.state.url);
    //   const jsonData = await data.json();
    //   this.setState({
    //     recipe:jsonData.recipe
    //   });console.log(this.state.recipe);
    // }catch (error){
    //   console.log(error);
    // }
  // }
  
  // we can as well use this method to get our props.id instead of using the contructor method above
  state ={
    recipe :recipeDetails
  };
  async componentDidMount(){
    const id = this.props.id;
    const url =`https://www.food2fork.com/api/get?key=1d3e7afdd52955a85e6b3343ecb8d6ee&rId=${id}`
    try{
      const data = await fetch(url);
      const jsonData = await data.json();
      this.setState({
        recipe:jsonData.recipe
      });
    }catch (error){
      console.log(error);
    }
  }

  render() {
    const {
      image_url,
      publisher,
      publisher_url,
      source_url,
      title,
      ingredients
    } = this.state.recipe;
    const {handleIndex} = this.props;
    return (
      <>
      <div className="container">
        <div className="row">
          <div className='col-10 mx-auto col-md-6 my-3'>
              <button type="button" className="btn btn-warning mb-5" onClick={()=>handleIndex(1)}>
                back to recipe list
              </button>
              <img src={image_url} className="d-block w-100" alt ="recipe"/>
          </div>
          <div className="col-10 mx-auto col-md-6 my-3">
            <h6 className="uppercase">{title}</h6>
            <h6 className="text-warning text-capitalize text-slanted">
              provided by {publisher}
            </h6>
            <a href={publisher_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">publisher webpage</a>
            <a href={source_url} target="_blank" rel="noopener noreferrer" className="btn btn-success mt-2">Recipe URL</a>
            <ul className='list-group mt-4'>
              <h2 className='mt-3 text-capitalize mb-4'>ingredients</h2>
              {
                ingredients.map((item,index)=>{
                  return[
                    <li key={index} className='list-group-item text-slanted'>
                      {item}
                    </li>
                  ]
                })
              }
            </ul>
          </div>
        </div>
      </div>
      </>
    )
  }
}
