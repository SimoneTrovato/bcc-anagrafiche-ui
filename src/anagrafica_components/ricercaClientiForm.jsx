import React, { Component } from "react";

import { getClienti } from "../services/clientiService";
import Modals from "./common/modals";
import "./../ricercaClientiForm.css";

import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
class RicercaClientiForm extends Component {
  state = {
    filiale: {
      cab: "",
      codice: "",
      id: "",
      lastModify: "",
      nomeFiliale: "",
    },
    filiali: [],
    clienti: [],
    cliente: {
      branch: "",
      nag: "",
      customerName: "",
      birthDate: "",
    },
    tabellaVisibile: false,
    modal: false,
    header: false,
    pageSize: 4,
    currentPage: 1,
    errors: {},
  };

  constructor() {
    super();
    this.baseState = this.state;
  }
  resetForm = () => {
    this.setState(this.baseState);
  };
  nag = React.createRef();

  validate = () => {
    const errors = {};
    if (this.state.cliente.nag.trim() === "") errors.nag = "Inserire Nag";
    if (
      this.state.cliente.birthDate.trim() === "" &&
      this.state.cliente.customerName !== ""
    )
      errors.data = "Inserire Data";

    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const errors = this.validate();
    console.log(errors);
    this.setState({ errors: errors || {} });

    if (errors) return;

    console.log(this.state.cliente);
    this.props.onSearchClick(this.state.cliente);
    this.state.tabellaVisibile = true;

    console.log(getClienti(this.state.cliente.branch, this.state.cliente.nag));
    this.setState({ header: true });
  };
  validateProperty = (input) => {
    if (input.name === "nag") {
      if (input.value.trim() === "") return "Inserire Nag";
    }
    if (input.name === "birthDate") {
      if (input.value.trim() === "") return "Inserire Data";
    }
  };
  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e);
    if (errorMessage) errors[e.name] = errorMessage;
    else delete errors[e.name];

    const cliente = { ...this.state.cliente };
    cliente[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ cliente, errors });
    console.log(e.target.value);
  };

  handleDettagli = (cliente) => {
    console.log(cliente);
    this.setState({ cliente: cliente });

    this.setState({ modal: true });
  };

  handleClose() {
    this.state.modal = !this.state.modal;
  }

  renderTableData(cl) {
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEE" + this.props.clienti.length);

    return cl.map((cliente, index) => {
      //  const { id, name, age, email } = student //destructuring
      if (cliente) {
        let newDate = cliente.dataNascita.replace(/-/g, "/");
        newDate.split("/");

        return (
          <tr key={cliente.id}>
            <td>{cliente.nome}</td>
            <td>{cliente.nag}</td>
            <td>{cliente.cab}</td>
            <td>
              {newDate[8] +
                newDate[9] +
                "/" +
                newDate[5] +
                newDate[6] +
                "/" +
                newDate[0] +
                newDate[1] +
                newDate[2] +
                newDate[3]}
            </td>
            <td
              onClick={() => this.handleDettagli(cliente)}
              style={{ cursor: "pointer" }}
            >
              {(!cliente.confermato && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              )) || (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-window"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                  <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm13 2v2H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zM2 14a1 1 0 0 1-1-1V6h14v7a1 1 0 0 1-1 1H2z" />
                </svg>
              )}
            </td>
          </tr>
        );
      } else return <td key={999999}>NESSUN CLIENTE</td>;
    });
  }
  handleClose = () => {
    this.setState({ modal: false });
  };

  handlePageChange = (page) => {
    console.log(page);
    this.setState({ currentPage: page });
  };
  render() {
    const { modal, cliente, header, pageSize, currentPage } = this.state;

    const cl = paginate(this.props.clienti, currentPage, pageSize);

    return (
      <div>
        <Modals cliente={cliente} show={modal} hideModal={this.handleClose} />
        <div className="segment">
          <h1 className="titolo">Ricerca clienti</h1>
        </div>
        <form className="bd-example" onSubmit={this.handleSubmit}>
          <div className="bd-example">
            <fieldset>
              <div className="row g-2">
                <div className="col-md">
                  <label htmlFor="select">Filiali</label>

                  <p>
                    <select
                      value={this.state.cliente.nomeFiliale}
                      id="select"
                      name="branch"
                      onChange={this.handleChange}
                    >
                      <option value="">Ricerca filiali</option>

                      {this.props.filiali.map(function (filiale) {
                        return (
                          <option
                            name="branch"
                            value={`${filiale.id}`}
                            key={`${filiale.id}`}
                          >
                            {" "}
                            {filiale.nome}
                          </option>
                        );
                      })}
                    </select>
                  </p>
                </div>
                <div className="col-md">
                  <p>
                    <label htmlFor="input">NAG</label>
                    <input
                      value={this.state.cliente.nag}
                      type="text"
                      id="nag"
                      name="nag"
                      placeholder="Inserire NAG"
                      onChange={this.handleChange}
                    />{" "}
                    {this.state.errors.nag && (
                      <div className="alert alert-danger">
                        {this.state.errors.nag}
                      </div>
                    )}
                  </p>
                </div>
                <div className="col-md">
                  <p>
                    <label htmlFor="input">Nome</label>
                    <input
                      value={this.state.cliente.nomeCliente}
                      name="customerName"
                      type="text"
                      id="nome"
                      placeholder="Inserire nome"
                      onChange={this.handleChange}
                    />
                  </p>
                </div>
                <div className="col-md">
                  <p>
                    <label htmlFor="date">Data di nascita</label>
                    <input
                      name="birthDate"
                      type="date"
                      id="data"
                      onChange={this.handleChange}
                    />
                    {this.state.errors.data && (
                      <div className="alert alert-danger">
                        {this.state.errors.data}
                      </div>
                    )}
                  </p>
                </div>
                <div className="col-md">
                  <p>
                    <button className="unit" type="submit">
                      Cerca
                    </button>
                  </p>
                </div>
              </div>
            </fieldset>
          </div>
        </form>
        <table className="table table-striped">
          <tbody>
            {header && (
              <tr>
                <td className="h">Nome</td>
                <td className="h">Nag</td>
                <td className="h">Cab</td>
                <td className="h">Data di nascita</td>
                <td className="h">Dettagli</td>
              </tr>
            )}

            {this.renderTableData(cl)}
          </tbody>
        </table>
        <Pagination
          itemsCount={this.props.clienti.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default RicercaClientiForm;
