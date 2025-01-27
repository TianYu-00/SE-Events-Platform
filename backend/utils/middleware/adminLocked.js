const { clerkClient, getAuth } = require("@clerk/express");

const adminLocked = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);

    const user = await clerkClient.users.getUser(userId);

    if (user.publicMetadata?.role !== "admin") {
      const error = new Error("Access Denied");
      error.code = "ACCESS_DENIED";
      return next(error);
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminLocked;
