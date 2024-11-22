const router = require("express").Router();
const db = require("../services/db");


router.post('/add-new', async (req, res) => {
    const { category_name } = req.body;
    let query = "INSERT INTO categories (category_name) VALUES (?)";
    
    await db.execute(query, [category_name], (err, results) => {
      if (err) {
        return next(createError(500, 'Failed to add category', { original: err }));
      }
      res.status(200).json({ id: results.insertID, category_name});
    });
});

module.exports = router;