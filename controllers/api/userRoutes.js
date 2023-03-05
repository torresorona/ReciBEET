const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { recipe } = req.body;

  try {
    const updatedRecipe = await Recipe.update(recipe, { where: { id } });

    if (updatedRecipe[0] === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(200).json({ message: 'Recipe updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to update recipe' });
  }
});


router.delete('/recipes/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.destroy({ where: { id } });

    if (deletedRecipe === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to delete recipe' });
  }
});

module.exports = router;
