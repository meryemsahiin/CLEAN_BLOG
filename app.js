const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');
const path = require('path');
const app = express();

const pageControllers = require('./controllers/pageContollers');
const blogControllers = require('./controllers/blogControllers');


// mongoose.set("strictQuery", false);
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/clean-blog-test-db');
  }
main()

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method', {
  methods: ['POST', 'GET'],
}))

// ROUTES
app.get('/', blogControllers.getAllBlog);
app.get("/blogs/:id", blogControllers.getBlog);
app.put('/blogs/:id', blogControllers.editBlog);
app.delete('/blog/:id', blogControllers.deleteBlog);
app.post('/add_post', blogControllers.createBlog);

app.get('/about', pageControllers.getAboutPage);
app.get('/add_post', pageControllers.getAddPage);
app.get('/blog/:id', pageControllers.getBlogPage);
app.get('/edit/:id', pageControllers.getEditPage);


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalıştırıldı.`);
});
