import { successResponse, errorResponse } from "../../utils/customResponses.js"

const adminTestController = (req, res) => {
    try {
        const user = {name:"Ahsan Anees"}
        return successResponse(res, "Admin Route is working", user);
    } catch (error) {
        return errorResponse(res, error.message, 500);
    }
}

export {
    adminTestController
}