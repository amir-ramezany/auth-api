export const getAdminExample = (req, res) =>
  res.status(200).json({
    message: 'Admin access granted',
    authenticatedUser: req.user,
  });
