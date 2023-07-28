const Blog = require('../models/Blogs');

exports.getAllBlog = async (req, res) => {
    const blogs = await Blog.find({})
    res.render('index', {
      blogs
    })
};

exports.getBlog = async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      
      if (!blog) {
        return res.status(404).send("Blog not found");
      }
      res.render('blog', {
        blog
      });
    } catch (err) {
      console.error("Veritabanından veri alınamadı:", err);
      res.status(500).send("Sunucu hatası");
    }
};

// exports.editBlog = async (req, res) => {
//     const blog = await Blog.findOne({_id: req.params.id})
//     blog.title = req.body.title
//     blog.description = req.body.description
//     blog.save()
  
//     res.redirect(`/blogs/${req.params.id}`)
// };

exports.editBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({_id: req.params.id});
        blog.title = req.body.title;
        blog.description = req.body.description;
        await blog.save();
        res.redirect(`/blogs/${req.params.id}`);
    } catch (err) {
        console.error("Blog güncellenirken hata oluştu:", err);
        res.status(500).send("Sunucu hatası");
    }
};


exports.deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).send("Blog not found");
        }
        res.redirect('/');
    } catch (err) {
        console.error("Blog silinirken hata oluştu:", err);
        res.status(500).send("Sunucu hatası");
    }
};
  
// exports.createBlog = async (req, res) => {
//     await Blog.create(req.body);
//     res.redirect('/');
//   };

exports.createBlog = async (req, res) => {
    try {
      const { title, description } = req.body;
      await Blog.create({ title, description });
      res.redirect('/');
    } catch (err) {
      console.error("Blog oluşturulurken hata oluştu:", err);
      res.status(500).send("Sunucu hatası");
    }
  };