import { useState } from "react";
import "./index.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import AddressBook from "./components/AdressBook";
import Footer from "./components/Footer";
import AddContact from "./components/AddContact";

const addressBookArr = [
  {
    id: 118836,
    lastName: "Markovic",
    firstName: "Marko",
    address: "Smederevska 60",
    city: "Beograd",
    postalCode: 101801,
  },
  {
    id: 115636,
    lastName: "Knezevic",
    firstName: "Tanja",
    address: "Futoska 57 A",
    city: "Novi Sad",
    postalCode: 400107,
  },
  {
    id: 112836,
    lastName: "Jelena",
    firstName: "Garcia",
    address: "Obrenovićeva ulica 25",
    city: "Niš",
    postalCode: 28840,
  },
  {
    id: 198336,
    lastName: "Stefan",
    firstName: "Ilić",
    address: "Karađorđeva ulica 10",
    city: "Kragujevac",
    postalCode: 10810,
  },
  {
    id: 196936,
    lastName: "Milica",
    firstName: "Benjamin",
    address: "Trg Republike 7",
    city: "Subotica",
    postalCode: 24000,
  },
];

export default function App() {
  const [addressBook, setAddressBook] = useState(addressBookArr);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("noOrder");
  const [addContact, setAddContact] = useState(false);
  const [activeAddress, setActiveAddress] = useState(null);

  function handleSearch(val) {
    setSearch(val);
  }

  function handleSort(val) {
    setSortBy(val);
    setActiveAddress(null);
  }
  function handleAddContact(val) {
    setAddContact(val);
    setActiveAddress(null);
  }

  function handleAddressBook(newAddress) {
    setAddressBook((addresses) => [...addresses, newAddress]);
  }

  function handleActiveAddress(activeAddress) {
    setActiveAddress((address) =>
      address?.id === activeAddress.id ? null : activeAddress
    );
    setAddContact(false);
  }

  function handleEditAddressBook(editAddress) {
    setAddressBook((addressBook) =>
      addressBook.map((address) =>
        address.id === editAddress.id ? editAddress : address
      )
    );
    setActiveAddress(null);
  }

  function handleDeleteAddressBook(id) {
    setAddressBook((addressBook) =>
      addressBook.filter((address) => address.id !== id)
    );
  }

  return (
    <div className="container">
      <Header />
      {addContact ? (
        <AddContact
          onAddContact={handleAddContact}
          onAddressBook={handleAddressBook}
        />
      ) : (
        <SearchBar
          onSearch={handleSearch}
          onSort={handleSort}
          onAddContact={handleAddContact}
        />
      )}

      <AddressBook
        search={search}
        addressBook={addressBook}
        sortBy={sortBy}
        activeAddress={activeAddress}
        onActiveAddress={handleActiveAddress}
        onEditAddressBook={handleEditAddressBook}
        onDeleteAddressBook={handleDeleteAddressBook}
      />
      <Footer />
    </div>
  );
}
