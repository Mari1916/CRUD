const { Router } = require("express")
const userController = require("../controllers/userController");
 
const router = Router();
 
router.post("/usuario", (request, response) => {
    userController.create(request, response)
});

router.get("/usuarios", (request, response) => {
    userController.read(request, response);
});

router.put("/usuario/:id", (request, response) => {
    userController.update(request, response);
});

router.delete("/usuario/:id", (request, response) => {
    userController.delete(request, response);
});
 
module.exports = router;