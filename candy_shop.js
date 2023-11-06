const apiUrl = 'https://crudcrud.com/api/cd12e5592b5a49e9af3d443e5c23f33d/candies'; // Replace with your API endpoint

function addCandy() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('des').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

  const candyData = {
    name: name,
    description: description,
    price: price,
    quantity: quantity,
  };

  axios.post(apiUrl, candyData)
    .then((response) => {
        console.log('Candy added:', response.data);     

            displayCandies();
    })
    .catch((error) => {
      console.error('Error adding candy:', error);
    });
}


function displayCandies() {
    axios.get(apiUrl)
      .then((response) => {
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
              <button onclick="buyCandy('${candy._id}', 1, '${candy.quantity}')">Buy 1</button>
              <button onclick="buyCandy('${candy._id}', 2, '${candy.quantity}')">Buy 2</button>
              <button onclick="buyCandy('${candy._id}', 3, '${candy.quantity}')">Buy 3</button>
            </div>
          `;
  
          candyList.appendChild(candyItem);
        });
      })
      .catch((error) => {
        console.error('Error fetching candies:', error);
      });
  }
  
  function buyCandy(id, quantityToBuy, currentQuantity) {
    const updatedQuantity = currentQuantity - quantityToBuy;
  
    if (updatedQuantity >= 0) {
      axios.put(`${apiUrl}/${id}`, { quantity: updatedQuantity })
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
  
  displayCandies(); // Initial display of candies when the page loads
  
