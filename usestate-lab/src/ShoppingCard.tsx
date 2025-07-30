import { useReducer } from "react";


const cartReducer = (state:any, action:any) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.items.find(
        (item:any) => item.id === action.payload.id
      );

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item:any) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: action.payload.price + state.total,
        };
      }

    case "REMOVE_ITEM":
      const itemToRemove = state.items.find(
        (item:any) => item.id === action.payload
      );
      return {
        ...state,
        items: state.items.filter((item:any) => item.id !== action.payload.id),
        total: state.total - itemToRemove.price * itemToRemove.quantity,
      };

    case "UPDATE_QUANTITY":
      const oldItem = state.items.find((item:any) => item.id === action.payload.id);
      const priceDifference =
        (action.payload.quantity - oldItem.quantity) * oldItem.price;

      return {
        ...state,
        items: state.items.map((item:any) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + priceDifference,
      };

    case "CLEAR_CART":
      return { items: [], total: 0 };

    default:
      return state;
  }
};

export function ShoppingCard() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addToCart = (product:unknown) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  return (
    <div>
      <h2>Cart Total: ${cart.total.toFixed(2)}</h2>
      {cart.items.map((item:any) => (
        <div key={item.id}>
          {item.name} - Qty: {item.quantity}
          <button
            onClick={() =>
              dispatch({
                type: "UPDATE_QUANTITY",
                payload: { id: item.id, quantity: item.quantity + 1 },
              })
            }
          >
            +
          </button>
        </div>
      ))}
    </div>
  );
}

