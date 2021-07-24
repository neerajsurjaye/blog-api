exports.addPost = (req, res) => {
    if (!req.user) {
        res.json({
            err: "not logged in"
        })
        return
    }

    res.json({
        success: "Post Added",
        data: req.user
    })
}