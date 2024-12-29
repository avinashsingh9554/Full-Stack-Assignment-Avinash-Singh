const Layout = require('../models/layoutModel');

exports.saveLayout = async (req, res) => {
  const { userId } = req.user; // Extracted from middleware
  const { cardOrder } = req.body;

  let layout = await Layout.findOne({ userId });
  if (!layout) layout = new Layout({ userId, cardOrder });
  else layout.cardOrder = cardOrder;

  await layout.save();
  res.status(200).json({ message: 'Layout saved successfully' });
};

exports.getLayout = async (req, res) => {
  const { userId } = req.user; // Extracted from middleware

  const layout = await Layout.findOne({ userId });
  if (!layout) return res.status(404).json({ message: 'Layout not found' });

  res.status(200).json(layout);
};
