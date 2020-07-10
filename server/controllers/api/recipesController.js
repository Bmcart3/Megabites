const recipesController = require("express").Router();

const db = require("../../models");
const { JWTVerifier } = require("../../lib/passport");
const jwt = require("jsonwebtoken");

// Route to retrieve all recipes in db
recipesController.get("/all", (req, res) => {
    db.Recipe.findAll({}, { include: [{ model: db.Category, as: "categories" }, { model: db.Ingredient, as: "ingredients" }] })
        .then(recipe => res.json(recipe))
        .catch(err => res.json(err));
});

// Route to create a new recipe
recipesController.post("/", JWTVerifier, (req, res) => {
    const { title, image, description, prepTime, cookTime, servings, directions, categories, ingredients } = req.body;
    const users = req.user.id;

    // Create the entry in Recipe table
    db.Recipe.create(
        { title, image, description, prepTime, cookTime, servings, directions, categories, ingredients, createdBy: req.user.username, users },
        { include: [{ model: db.Category, as: "categories" }, { model: db.Ingredient, as: "ingredients" }, { model: db.User, as: "users" }] }
    )

    req.user.addRecipe(
        
    )
});

module.exports = recipesController;
