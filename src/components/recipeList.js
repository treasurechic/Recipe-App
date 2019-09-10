import React, { Component } from 'react';
import Recipe from './recipe';
import RecipeSearch from './recipeSearch';

export default class recipeList extends Component {
  render() {
    const {recipes, handleDetails, value, handleChange, handleSubmit, error} = this.props;
    return (
      <>
        <RecipeSearch value={value} handleChange={handleChange} handleSubmit={handleSubmit}/>
        <div className='container my-5'>
            <div className='row'>
                <div className='col-10 mx-auto col-md-6 text-center text-uppercase mb-3'>
                    <h1 className='text-slanted'>Recipe list</h1>
                </div>
            </div>

            <div className='row'>
              {error ? (<h1 className='text-danger text-slanted'>{error}</h1>) :( 
                
                    recipes.map(recipe =>{
                        return(
                            <Recipe key={recipe.recipe_id}
                            recipe={recipe} handleDetails= {()=>handleDetails(0,recipe.recipe_id)}/>
                        )
                    })
                
              )}
            </div>
        </div>
      </>
    )
  }
}
