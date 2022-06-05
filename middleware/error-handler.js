const { StatusCodes } = require("http-status-codes")
const { CustomErrorAPI } = require("../errors")

const errorHandlerMiddleware = (err,req,res,next)=>{

    if( err instanceof CustomErrorAPI)
    {
        return res.status(err.statusCode).json({msg:err.message})
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:'Internal Server Error'})
}

module.exports = errorHandlerMiddleware;