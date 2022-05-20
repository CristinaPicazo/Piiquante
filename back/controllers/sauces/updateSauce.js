const { Product } = require('../../models/Product.js');
// const { sendClientResponse } = require("./getSauceById");
const { makePayload } = require("./deleteSauce");
const { userRouter } = require('../../routes/userRouter.js');
const { User } = require('../../models/User.js');
const { makeImageUrl } = require('./createSauce');
const fs = require('fs');
const { deleleteImage } = require('./deleteSauce');

function updateSauce(req, res) {
    const {
        params: { id }
    } = req;
    const hasNewImage = req.file != null
    // const payload = makePayload(hasNewImage, req);

    Product.findByIdAndUpdate(id, req.body, (error, data) => {
        if (error) {
            return res.status(500).send(error);
        }
        if (data == null) {
            return res.status(404).send({ message: "Sauce not found" });
        }
        if (id == data._id) {
            if (!req.file) {
                return res.status(200).send(data);
            } else {
                console.log('data:', data)
                console.log('data.imageUrl:', data.imageUrl)
                // deleleteImage(data)
                data.imageUrl = makeImageUrl(req, req.file.filename);
                console.log('data.imageUrl2:', data.imageUrl)
                console.log('data:', data)
                
                    return res.status(200).send(data);
                // });
            }
        }
        // if(req.file.filename == data.imageUrl){
        //     deleteImage(req.file.filename);
        //         data.imageUrl = makeImageUrl(req, req.file.filename);
        //     return res.status(200).send(data);
        // } else {
        //     return res.send({ message: "User doesn't own this sauce" });
        // }

    });
}


function deleteImage(product) {
    console.log('product:', product)
    if (product == null) return
    console.log('imageToDelete:', imageToDelete)
    const imageToDelete = product.split('/').at(-1);
    console.log('imageToDelete splited:', imageToDelete)
    return unlink(`images/${imageToDelete}`);
}

module.exports = { updateSauce };