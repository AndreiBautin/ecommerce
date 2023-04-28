import React from "react";

function Cart() {
  var cartData = localStorage.getItem("cart");
  var markup = <div>{cartData}</div>;
  return markup;
}

export default Cart;
