const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  // res.send('Hello express!')
  res.render("index", {
    title: "Weather App",
    name: "Esraa Farhat",
  });
});

app.get("/help", (req, res) => {
  res.send("help page!");
});

app.get("/about", (req, res) => {
  // res.send('<h1>About page!</h1>')
  res.render("about", {
    title: "About me",
    name: "Esraa Farhat",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address term!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error,
          });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("*", (req, res) => {
  // res.send('My 404 page');
  res.render("404", {
    title: "404",
    name: "Esraa Farhat",
    errorMessage: "Page Not Found",
  });
});


app.listen(port, () => {
  console.log(`server is up on port ${port}.`);
});
