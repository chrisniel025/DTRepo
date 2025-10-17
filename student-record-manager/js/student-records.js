let dataArray = [];
const dataForm = document.getElementById("dataForm");

dataForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const { firstNameVal, middleNameVal, lastNameVal, phoneNumberVal, addressVal } = dataForm;
  const firstName = firstNameVal.value.trim();
  const middleName = middleNameVal.value.trim();
  const lastName = lastNameVal.value.trim();
  const phoneNumber = phoneNumberVal.value.trim();
  const address = addressVal.value.trim();

  if (!firstName || !middleName || !lastName || !phoneNumber || !address) {
    alert("Please complete all fields.");
    return;
  }

  const dataObject = { firstName, middleName, lastName, phoneNumber, address };
  dataArray = [...dataArray, dataObject];

  dataForm.reset();

  showData();
});

function showData() {
  const dataTable = document.querySelector("#dataTable tbody");
  dataTable.innerHTML = "";

  dataArray.forEach(({ firstName, middleName, lastName, phoneNumber, address }) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${firstName}</td>
                      <td>${middleName}</td>
                      <td>${lastName}</td>
                      <td>${phoneNumber}</td>
                      <td>${address}</td>`;
    dataTable.appendChild(row);
  });
}