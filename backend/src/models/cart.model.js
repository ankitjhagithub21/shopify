import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", 
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1, 
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: false,versionKey:false }
);

// Middleware to update totalPrice before saving
cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  next();
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
