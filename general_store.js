const apiUrl='https://crudcrud.com/api/54a94f91fd2448aebbc2ef2e5ee5706a/candies';
  
  async function addCandy(name, description, price, quantity) {
    const candyData = {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
    };
  
    try {
      await axios.post(apiUrl, candyData);
      displayCandies();
    } catch (error) {
      console.error('Error adding candy:', error);
    }
  }
  function displayCandies() {
    axios.get(apiUrl)
      .then((response) => {
        console.log(response.data);
        const data = response.data;
        const candyList = document.getElementById('candy-list');
        candyList.innerHTML = '';
  
        data.forEach((candy) => {
          const candyItem = document.createElement('div');
          candyItem.innerHTML = `
            <div>
              <h2>${candy.name}</h2>
              <p>${candy.description}</p>
              <p>Price: ${candy.price} rs</p>
              <p>Quantity: <span id="quantity-${candy._id}">${candy.quantity}</span></p>
              <button onclick="buyCandy('${candy._id}', '${candy.name}', '${candy.description}', 1, '${candy.quantity}')">Buy 1</button>
              <button onclick="buyCandy('${candy._id}', '${candy.name}', '${candy.description}', 2, '${candy.quantity}')">Buy 2</button>
              <button onclick="buyCandy('${candy._id}', '${candy.name}', '${candy.description}', 3, '${candy.quantity}')">Buy 3</button>
            </div>
          `;
  
          candyList.appendChild(candyItem);
        });
      })
      .catch((error) => {
        console.error('Error fetching candies:', error);
      });
  }
  
  function buyCandy(id, name, description, quantityToBuy, currentQuantity) {
    const updatedQuantity = currentQuantity - quantityToBuy;
  
    if (updatedQuantity >= 0) {
      axios.put(`${apiUrl}/${id}`, { quantity: updatedQuantity, name: name, description: description })
        .then(() => {
          const quantityElement = document.getElementById(`quantity-${id}`);
          if (quantityElement) {
            quantityElement.textContent = updatedQuantity;
          }
        })
        .catch((error) => {
          console.error('Error updating candy quantity:', error);
        });
    } else {
      alert('Item not available.');
    }
  }
  
  
  displayCandies();
  