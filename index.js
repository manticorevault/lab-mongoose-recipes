const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    console.log("Connect to MongoDB")

    return Recipe.create({
      title: 'Vegan Kjottbullar',
      level: 'Easy Peasy',
      ingredients: ['Vegan meatballs', 'sauce'],
      cuisine: 'Swedish',
      dishType: 'main_course',
      duration: 180,
      creator: 'Artur Serra'
    });
  })
  .then((recipe) => {
    console.log("Your recipe was added to the database:", recipe.title)

    return Recipe.insertMany(data);
  })
  .then((recipe) => {
    for(recipeTitle of recipe) {
      console.log("This recipe is called:", recipeTitle.title);
    }

    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100});
  })
  .then((recipe) => {
    console.log("Your recipe was successfully updated!")

    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((recipe) => {
    console.log("Recipe successfully deleted!")

    return mongoose.disconnect();
  })
  .then(() => {
    console.log("Disconnected from MongoDB")
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
