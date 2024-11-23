const jwt = require('jsonwebtoken');
const { User } = require('../models/models');


exports.register = async (req, res) => {
  try {
    const { code, username, email, phone, password } = req.body;

    const newUser = await User.create({ code, username, email, phone, password });
    
    res.status(201).json({
      message: "Utilisateur créé avec succès",
      user: newUser
    });
  } catch (err) {
    res.status(400).json({
      message: "Impossible de créé l'utilisateur",
      error: err
    });
  }
}

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    //console.log({ "user": user.password });
    //console.log({ "valid pass": await user.validPassword(password) });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    const isPasswordValid = await user.validPassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Génère un token JWT avec l'ID de l'utilisateur
    const token = jwt.sign(
      { id: user.id, username: user.username }, // Payload du token
      process.env.JWT_SECRET, // Clé secrète pour signer le token
      { expiresIn: '15d' } // Durée de validité du token
    );

    res.status(200).json({ message: 'Connexion réussie', user, token });
  } catch (err) {
    res.status(400).json({ message: "Une erreur s'est produite pendant la connexion", error: err.message });
  }
}
