module.exports=(req,res,next)=>{
    res.header('Content-Range', 'billtbl 0-20/20')
    next()
}