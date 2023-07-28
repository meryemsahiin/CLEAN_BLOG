const Blog = require('../models/Blogs');

exports.getAboutPage = (req, res) => {
    res.render('about');
}


exports.getAddPage = (req, res) => {
    res.render('add_post');
}

exports.getBlogPage = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blog', {
        blog,
    });
}

exports.getEditPage = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
    res.render('edit', {
        blog
    })
}