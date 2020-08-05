import React, { Component } from "react";
import CardLayout from "../../components/CardLayout/CardLayout";
import LeftRail from "../../components/LeftRail/LeftRail";
import TopRail from "../../components/TopRail/TopRail";
import { Image } from "semantic-ui-react";
import "./Home.css";
import API from "../../lib/API";

class HomePage extends Component {

  state = {
    recipes: [],
    reviews: [],
    err: "",
  };

  componentDidMount() {
    let recipes
    let reviews
    API.Recipes.all()
      .then((response) => {
        recipes = response.data
        console.log(recipes)
        // this.setState({ recipes: response.data, err: "" });
      })
      .then(
        API.Reviews.all()
        .then((resp) => {
          reviews = resp.data
          this.setState({ recipes: recipes, reviews: reviews, err: "" })
          console.log(this.state)
        })
      )
      .catch((err) => this.setState({ err: err.message }));
  }  

    filteredList = newList => {
    console.log(newList)
      this.setState({recipes: newList})
    
  }

  //Define function then pass the function into leftRail and then within leftRail do the callback. Parameter that represents array
  //console.log the array parameter to see if its passed in properly. Then can pass it into the state of the homepage (will have to make a state in homepage). Then pass new array into cardLayout.
  render() {
    return (
      <div>
        <Image centered src={require("../../assets/images/megabitesLogo.png")}/>
        <div className="bgStyle">
          <TopRail filteredList={this.filteredList}/>
          <LeftRail filteredList={this.filteredList}/>
          <CardLayout recipes={this.state.recipes} reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}

export default HomePage;
