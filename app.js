const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const Blog = require('./models/Blogs')

const app = express();


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/clean-blog-test-db');
  }
  main()

// TEMPLETE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// ROUTES
app.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.render('index', {
    blogs
  });
});

app.get('/about', (req, res) => {
    res.render('about');
  });

app.get('/add_post', (req, res) => {
    res.render('add_post');
  });

app.post('/blogs', async (req, res) => {
  await Blog.create(req.body)
  res.redirect('/')
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalıştırıldı.`);
});
