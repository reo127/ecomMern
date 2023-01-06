const Order = require('../schema/orderSchema');

/******************************************************
 * @Order Product
 * @route http://localhost:8000/api/orders/orderproduct
 * @description orderProduct Controller to order product
 * @parameters productname, count, user as id, address, phoneNumber, amount, coupon, transactionId
 * @returns success massage
 ******************************************************/
exports.orderProduct = async (req, res) => {
    try {
        const { productname, count, user, address, phoneNumber, amount, coupon, transactionId } = req.body;
        if(!(productname, count, user, address, phoneNumber, amount, transactionId)){
            return res.status(400).json({message: "All filed required"});
        }

        // make the order
        const order = await Order.create({productname, count, user, address, phoneNumber, amount, transactionId, coupon})
        if(!order){
            return res.status(400).json({message: "order faild", order});
        }

         res.status(200).json({message: "success", order});
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}

