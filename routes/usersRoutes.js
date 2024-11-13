const router = require("express").Router();
const db = require("../services/db");

//GET USER 
router.get('/', async (req, res) => {
    try {
      const [results] = await db.execute('SELECT * FROM users');
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching users', message: err.message });
    }
  });

module.exports = router;