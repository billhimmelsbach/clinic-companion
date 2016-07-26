function index(req, res) {
  res.json({
    message: "Clinic Companion",
    documentation_url: "https://github.com/billhimmelsbach/clinic-companion/blob/master/README.md",
    base_url: "",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes available endpoints"}
    ]
  });
}

module.exports.index = index;
