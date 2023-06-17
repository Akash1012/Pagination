import { useEffect, useState } from "react";

const Cart = ({ mycart, incrementItem }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let totalValue = mycart.reduce((acc, curr) => {
      return acc + Number(curr.price) * curr.qty;
    }, 0);
    setTotal(totalValue);
  }, [mycart]);

  const changeCartQty = (data) => {
    incrementItem(data);
  };

  return (
    <div>
      <h2>Total : {total}</h2>
      {mycart.map((item) => {
        const { title, thumbnail, id, price, qty } = item;
        return (
          <div
            key={id}
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <div
              style={{
                width: "200px",
              }}
            >
              <img
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "cover",
                }}
                src={thumbnail}
                alt={title}
              />
              <p>{title}</p>
              <p>rs - {price}</p>
            </div>

            <div>
              <button
                onClick={() => {
                  changeCartQty({
                    id,
                    qty: qty + 1,
                  });
                }}
              >
                +
              </button>

              <button
                onClick={() => {
                  changeCartQty({
                    id,
                    qty: qty - 1,
                  });
                }}
                style={{
                  marginLeft: "10px",
                }}
              >
                -
              </button>
              <p>
                {price} * {qty} = {price * qty}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
