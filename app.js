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
    await mongoose.connect('mongodb+srv://meryem:BOaAiEHM3pt6Caxv@cluster0.f4x6p2r.mongodb.net/?retryWrites=true&w=majority');
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


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalıştırıldı.`);
});
