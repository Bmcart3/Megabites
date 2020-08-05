import React, { Component } from "react";
import { Grid, Header, Responsive, Image } from "semantic-ui-react";
import FullRecipeCard from "../../components/FullRecipeCard/FullRecipeCard";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import ReviewForm from "../../components/ReviewForm/ReviewForm";
import "./FullRecipe.css";
import API from "../../lib/API";
import AuthContext from "../../contexts/AuthContext";



class FullRecipe extends Component {
  static contextType = AuthContext;

  state = {
    recipe: [],
    reviews: [],
    err: ""
  }

  componentDidMount() {

    API.Recipes.byId(this.props.match.params.id)
      .then((recipe) => {
        this.setState({ recipe: recipe.data[0], err: "" })
      })

      .catch((err) => this.setState({ err: err.message }))

      window.scrollTo(0, 0)
  }



  render() {
    
    return (
      <div>
        <Image centered src={require("../../assets/images/megabitesLogo.png")} />
        <Responsive maxWidth="1035">
          <Grid>
            <Grid.Row>
              <Grid.Column width={1}></Grid.Column>
              <Grid.Column width={14}>
                <FullRecipeCard
                  recipeNum={this.state.recipe.id}
                  image={this.state.recipe.image}
                  cookTime={this.state.recipe.cookTime}
                  prepTime={this.state.recipe.prepTime}
                  servings={this.state.recipe.servings}
                />
                
                <div className="bg2">
                  <Header as="h3" className="bg2" style={{ fontSize: "2em" }}>
                    Ingredients
                  </Header>
                  <div style={{ fontSize: "1.33em" }}>
                    <ul>
                      {this.state.recipe.ingredients ? this.state.recipe.ingredients.map((ingredient) => {
                        return <li key={ingredient.id}>{ingredient.ingredient}</li>
                      }) : "Loading"}
                    </ul>
                  </div>
                </div>
                <div className="bg">
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    {this.state.recipe.title}
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    {this.state.recipe.directions}
                  </p>
                </div>
                <ReviewCard reviews={this.state.recipe.Reviews ? this.state.recipe.Reviews : []} />
                <ReviewForm RecipeId={this.state.recipe.id}/>
              </Grid.Column>
              <Grid.Column width={1}></Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive minWidth="1034">
          <Grid>
            <Grid.Row>
              <Grid.Column width={3}></Grid.Column>
              <Grid.Column width={5}>
                <FullRecipeCard
                  recipeNum={this.state.recipe.id}
                  image={this.state.recipe.image}
                  cookTime={this.state.recipe.cookTime}
                  prepTime={this.state.recipe.prepTime}
                  servings={this.state.recipe.servings}
                />
                <ReviewCard reviews={this.state.recipe.Reviews ? this.state.recipe.Reviews : []} />
                <ReviewForm RecipeId={this.state.recipe.id}/>
              </Grid.Column>
              <Grid.Column width={5}>
                <div className="bg">
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    Ingredients
                  </Header>
                  <div style={{ fontSize: "1.33em" }}>
                    <ul>
                      {this.state.recipe.ingredients ? this.state.recipe.ingredients.map((ingredient) => {
                        return <li key={ingredient.id}>{ingredient.ingredient}</li>
                      }) : "Loading"}
                    </ul>
                  </div>
                </div>
                <div className="bg">
                  <Header as="h3" style={{ fontSize: "2em" }}>
                    {this.state.recipe.title}
                  </Header>
                  <p style={{ fontSize: "1.33em" }}>
                    {this.state.recipe.directions}
                  </p>
                </div>
              </Grid.Column>
              <Grid.Column width={3}></Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </div>

    )
  }

}
export default FullRecipe;
