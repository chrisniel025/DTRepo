const products = [
  { id: 1, name: "LG Laptop", category: "Computers", quantity: 13, price: 28000 },
  { id: 2, name: "Realme Android Phone", category: "Mobile devices", quantity: 34, price: 13000 },
  { id: 3, name: "Samsung Android Phone", category: "Mobile devices", quantity: 30, price: 25000 },
  { id: 4, name: "HP Laptop", category: "Computers", quantity: 18, price: 30000 },
  { id: 5, name: "Panasonic CCTV Camera", category: "Security cameras", quantity: 25, price: 23100 },
  { id: 6, name: "A4Tech Webcam", category: "Peripherals", quantity: 50, price: 3500 },
  { id: 7, name: "Dell Server", category: "Servers", quantity: 5, price: 22500 },
  { id: 8, name: "ZKTeco Biometric Device", category: "Other devices", quantity: 16, price: 17000 },
  { id: 9, name: "TP-Link Router", category: "Routers", quantity: 12, price: 2500 },
  { id: 10, name: "Canon Scanner", category: "Printers and scanners", quantity: 20, price: 23800 },
  { id: 11, name: "Motorola Handheld Radio", category: "Other devices", quantity: 9, price: 6700 },
  { id: 12, name: "Kingston USB Flashdrive - 64GB", category: "Peripherals", quantity: 111, price: 1500 },
  { id: 13, name: "Kingston USB Flashdrive - 32GB", category: "Peripherals", quantity: 137, price: 1000 },
  { id: 14, name: "Epson Printer", category: "Printers and scanners", quantity: 23, price: 12300 },
  { id: 15, name: "Logitech Mouse", category: "Peripherals", quantity: 65, price: 500 }
];

function displayProducts() {
  const filterBy = document.getElementById("filterBy").value;
  const sortBy = document.getElementById("sortBy").value;

  const filtered = products.filter(product => {
    if (filterBy === "All" || product.category === filterBy) {
      return product;
    }
  });

  const sorted = filtered.reduce((acc, product) => {
    const index = acc.findIndex(x => {
      if (sortBy === "name") {
        return product.name < x.name;
      }

      if (sortBy === "quantity") {
        return product.quantity < x.quantity;
      }

      if (sortBy === "price") {
        return product.price < x.price;
      }

      return false;
    });

    if (index === -1) {
      acc.push(product);
    } else {
      acc.splice(index, 0, product);
    }

    return acc;
  }, []);

  const rowsHTML = sorted.map(product => {
    return `<tr>
              <td>${product.id}</td>
              <td>${product.name}</td>
              <td>${product.category}</td>
              <td>${product.quantity}</td>
              <td>${product.price}</td>
            </tr>`;
  }).join("");

  const dataTable = document.querySelector("#dataTable tbody");
  dataTable.innerHTML = rowsHTML;
}

displayProducts();

document.getElementById("filterBy").addEventListener("change", displayProducts);
document.getElementById("sortBy").addEventListener("change", displayProducts);