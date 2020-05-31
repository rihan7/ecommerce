var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/ecommerce",
   { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => { console.log("DataBase Connected") })
   .catch((error) => { console.log("DataBase Not Connected" + error) });

var info = {
   imagePath: 'https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_1280.jpg',
   title: 'Product 1',
   description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aenean commodo ligula eget dolor.Aenean massa.Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.Donec quam felis, ultricies nec, pellentesque',
   price: 100
};

const seeding = async () => {
   for (let i = 0; i < 20; i++) {
      info.title = `Product ${i + 1}`
      await new Product(info).save();
   }
   exit();
}

seeding();


function exit() {
   mongoose.disconnect();
   console.log('disconnect')
}

