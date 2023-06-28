import { useState } from "react";
import Button from "./UI/Button";

function AddContact({ onAddContact, onAddressBook }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (
      [firstName, lastName, address, postalCode, city].some(
        (value) => value === ""
      )
    )
      return;

    const id = Date.now();
    const newAddress = {
      firstName,
      lastName,
      address,
      postalCode,
      city,
      id,
    };
    onAddressBook(newAddress);
    onAddContact(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-add-contact">
        <label htmlFor="firstName">First first</label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label htmlFor="address">Address</label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="postalCode">Postal code</label>
        <input
          id="postalCode"
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button className="button">Add</Button>
        <Button
          type="button"
          className="button-outline"
          onClick={(e) => onAddContact(false)}
        >
          Close
        </Button>
      </div>
    </form>
  );
}

export default AddContact;
