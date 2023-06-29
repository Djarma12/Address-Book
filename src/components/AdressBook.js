// import { toBeChecked } from "@testing-library/jest-dom/matchers";
import { useState } from "react";
import Button from "./UI/Button";

function AddressBook({
  search,
  addressBook,
  sortBy,
  activeAddress,
  onActiveAddress,
  onEditAddressBook,
  onDeleteAddressBook,
}) {
  // Sort by search
  const sortedBook = addressBook.filter(
    (address) =>
      address.firstName?.toLowerCase().startsWith(search.toLowerCase()) ||
      address.lastName?.toLowerCase().startsWith(search.toLowerCase())
  );

  // Sort by specific order
  let sortedBookByOrder;
  if (sortBy === "noOrder") {
    sortedBookByOrder = sortedBook;
  } else {
    const sortOrder = sortBy === "ascending" ? 1 : -1;
    sortedBookByOrder = sortedBook
      .slice()
      .sort(
        (a, b) =>
          sortOrder *
          a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase())
      );
  }

  return (
    <div className="addressbook">
      <ul>
        {sortedBookByOrder.map((address, i) => (
          <Address
            address={address}
            i={i}
            key={address.id}
            activeAddress={activeAddress}
            onActiveAddress={onActiveAddress}
            onEditAddressBook={onEditAddressBook}
            onDeleteAddressBook={onDeleteAddressBook}
          />
        ))}
      </ul>
    </div>
  );
}

export default AddressBook;

function Address({
  address,
  i,
  activeAddress,
  onActiveAddress,
  onEditAddressBook,
  onDeleteAddressBook,
}) {
  const isActive = activeAddress?.id === address.id;

  function handleActiveAddress() {
    onActiveAddress(address);
  }

  return (
    <li className="addressbook">
      <span className="running-number">{i < 9 ? `0${i + 1}` : i}</span>
      <h3>
        {address.lastName}, {address.firstName}
      </h3>
      <p>{address.address}</p>
      <p>
        {address.postalCode} {address.city}
      </p>
      <input
        type="checkbox"
        name="address"
        checked={isActive}
        onChange={handleActiveAddress}
      />
      {isActive && (
        <EditContact
          address={address}
          onEditAddressBook={onEditAddressBook}
          onDeleteAddressBook={onDeleteAddressBook}
        />
      )}
    </li>
  );
}

function EditContact({ address, onEditAddressBook, onDeleteAddressBook }) {
  const [Address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onEditAddressBook({
      ...address,
      address: Address || address.address,
      postalCode: postalCode || address.postalCode,
      city: city || address.city,
    });
  }

  function handleDelete() {
    onDeleteAddressBook(address.id);
  }

  return (
    <div className="form-edit-contact-container">
      <form onSubmit={handleSubmit}>
        <div className="form-edit-contact">
          <label htmlFor="changeAddress">Address</label>
          <input
            id="changeAddress"
            type="text"
            placeholder={address.address}
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="change">City</label>
          <input
            id="change"
            type="text"
            placeholder={address.city}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label htmlFor="changePostalCode">Postal code</label>
          <input
            id="changePostalCode"
            type="text"
            placeholder={address.postalCode}
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
          <Button className="button">Save</Button>
        </div>
        <div className="delete">
          <Button
            type="button"
            className="button-outline"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
}
