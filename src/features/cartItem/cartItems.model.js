// export default class CartItemModel {
//   constructor(productID, userID, quantity, id) {
//     this.productID = productID;
//     this.userID = userID;
//     this.quantity = quantity;
//     this.id = id;
//   }

//   static add(productID, userID, quantity) {
//     const cartItem = new CartItemModel(productID, userID, quantity);
//     cartItem.id = Math.floor(Math.random() * 10000);
//     cartItems.push(cartItem);
//     return cartItem;
//   }

//   static getUserCartItem(userID) {
//     return cartItems.filter((i) => i.userID == userID);
//   }

//   static delete(cartItemID, userID) {
//     const cartItemIndex = cartItems.findIndex((i) => i.id == cartItemID && i.userID==userID);
//     if (cartItemIndex == -1) {
//       return "Item not found";
//     } else {
//       cartItems.splice(cartItemIndex, 1);
//     }
//   }
// }

// const cartItems = [new CartItemModel(1, 2, 1), new CartItemModel(1, 1, 2)];
