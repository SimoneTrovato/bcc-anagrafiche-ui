import React, { Component } from "react";
import { getFiliali } from "../services/filialiService";
import RicercaClientiForm from "./ricercaClientiForm";
import { getClienti } from "../services/clientiService";

class RicercaClienti extends Component {
  state = {
    filiali: [],
    cliente: {
      branch: "",
      nag: "",
      customerName: "",
      birthDate: "",
    },
    clienti: [],
  };

  async getAllFiliali() {
    const { data: filiali } = await getFiliali();
    this.setState({ filiali });
  }

  async componentDidMount() {
    await this.getAllFiliali();
  }
  async SearchClienti(data) {
    const { branch, nag, customerName, birthDate } = data;
    console.log(customerName);
    console.log(birthDate);
    let dataModificata = "" + birthDate;
    if (dataModificata !== "") {
      dataModificata = dataModificata.replace(/-/g, "/");
    }

    const { data: clienti } = await getClienti(
      branch,
      nag,
      customerName,
      dataModificata
    );
    console.log(dataModificata);
    this.setState({ clienti });
  }

  handleSearch = async (cliente) => {
    this.SearchClienti(cliente);
  };

  render() {
    const { filiali } = this.state;
    const { clienti } = this.state;
    return (
      <div id="container">
        <RicercaClientiForm
          filiali={filiali}
          onSearchClick={this.handleSearch}
          clienti={clienti}
        />
      </div>
    );
  }
}

export default RicercaClienti;
