import { useState, useEffect } from "react";
import Cart from "./cart";

function App() {
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(0);
  const [page, setPage] = useState(1);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getDummyData = async () => {
      const getTheData = await fetch(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      const json = await getTheData.json();
      const { products, total } = json;
      setData(products);
      setTotalData(total / 10);
    };
    getDummyData();
  }, [page]);

  const handlePage = (pageNumber) => {
    if (page !== pageNumber) {
      setPage(pageNumber);
    }
  };

  const leftArrow = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const rightArrow = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const addtocart = (addcart) => {
    setCart((prevCart) => [...prevCart, addcart]);
  };

  const changeQty = (data) => {
    const updateData = cart.filter((item) => {
      return item.id === data.id ? (item.qty = data.qty) : item.qty;
    });

    setCart(updateData);
  };

  console.log(cart);

  return (
    <div className="main_page">
      <div className="main">
        <h2>Pagination</h2>

        <div className="main_container">
          {data.map((item) => {
            const { title, thumbnail, id } = item;
            return (
              <div className="child_container" key={id}>
                <img src={thumbnail} alt={title} />
                <p>{title}</p>
                {cart.some((p) => p.id === item.id) ? (
                  <button
                    style={{
                      padding: 5,
                      margin: 10,
                      border: 0,
                      borderRadius: 5,
                      backgroundColor: "#e53935",
                      color: "white",
                    }}
                  >
                    Remove from cart
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      addtocart({
                        ...item,
                        qty: 1,
                      })
                    }
                    style={{
                      padding: 5,
                      margin: 10,
                      border: 0,
                      borderRadius: 5,
                      backgroundColor: "green",
                      color: "white",
                    }}
                  >
                    Add To Cart
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="pagination">
          <span onClick={leftArrow} className={page > 1 ? "arrow" : "left"}>
            &larr;
          </span>
          {[...Array(totalData)].map((_, index) => {
            return (
              <span
                onClick={() => handlePage(index + 1)}
                className={
                  page === index + 1 ? "page_number page_match" : "page_number"
                }
              >
                {index + 1}
              </span>
            );
          })}
          <span
            onClick={rightArrow}
            className={page < totalData ? "arrow" : "right"}
          >
            &rarr;
          </span>
        </div>
      </div>
      <div
        style={{
          width: "30%",
        }}
      >
        <h3
          style={{
            textAlign: "center",
          }}
        >
          MY CART
        </h3>
        <Cart incrementItem={changeQty} mycart={cart} />
      </div>
    </div>
  );
}

export default App;
