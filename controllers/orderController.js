const Order = require('../schema/orderSchema');
const Product = require('../schema/productSchema');


/******************************************************
 * @Order Product
 * @route http://localhost:8000/api/orders/orderproduct
 * @description orderProduct Controller to order product
 * @parameters productname, count, user as id, address, phoneNumber, amount, coupon, transactionId
 * @returns success massage
 ******************************************************/
const orderProduct = async (req, res) => {
    try {
        const { productId, count, transactionId } = req.body;
        if (!(productId, count)) {
            return res.status(400).json({ message: "All filed required " });
        }
        const product = await Product.findById({ _id: productId });


        // make the order
        const order = await Order.create({
              productId : productId,
              productName: product.name,
              catagory: product.catagory,
              userName : req.user.name,
              count,
              userId: req.user._id,
              address: req.user.address,
              phoneNumber: req.user.phone,
              amount: product.price,
              zip: req.user.zip,
              state: req.user.state,
              transactionId 
            })
        if (!order) {
            return res.status(400).json({ message: "order faild", order });
        }

        return res.status(200).json({ message: "Success", order });


    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}


/******************************************************
 * @Update Order Product
 * @route http://localhost:8000/api/orders/updateorder/:status/:orderId
 * @description updateOrder Controller update the order status
 * @parameters status
 * @returns success massage
 ******************************************************/
const updateOrder = async (req, res) => {
    try {
        const { status, orderId } = req.params;
        const updateStatus = await Order.findOneAndUpdate({ _id: orderId }, { status })

        if (updateStatus) {
            return res.status(200).json({ message: "Success", updateOrder });
        }

        return res.status(400).json({ message: "Update order faild", updateOrder });

    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}

/******************************************************
 * @Delete Order details
 * @route http://localhost:8000/api/orders/deleteorder/${orderId}
 * @description deleteOrder Controller Delete order record/details
 * @parameters orderId
 * @returns success massage
 ******************************************************/
const deleteOrder = async (req, res) => {
    try {
        const deleteorder = await Order.findByIdAndDelete({ _id: req.params.orderId })
        if (deleteorder) {
            return res.status(200).json({ message: "Success", deleteorder });
        }

        return res.status(400).json({ message: "Delete order faild", deleteOrder });
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}


/******************************************************
 * @All Order details
 * @route http://localhost:8000/api/orders/allorders
 * @description allOrders Controller for to admin to sell all roders
 * @parameters 
 * @returns all orders as a singal object
 ******************************************************/
const allOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        return res.status(200).json({ orders });
    } catch (err) {
        console.log(err);
        console.log(err.message);
    }
}

module.exports = { orderProduct, updateOrder, deleteOrder, allOrders };