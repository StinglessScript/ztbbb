export default function (req, res, next) {
    if (req.url === "/logo-lvs.png") {
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    }
    next();
  }
  