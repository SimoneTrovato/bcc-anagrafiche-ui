import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { customerMarkAsEdited } from "./../../services/clientiService";

class Modals extends Component {
  state = {
    check: {
      email: false,
      telefono: false,
      p1: false,
      p2: false,
      p3: false,
      p4: false,
      p5: false,
      p6: false,
      firma: false,
      id: 0,
    },
    messaggioConferma: false,
  };

  campi = [
    { id: 1, value: "email", isChecked: false },
    { id: 2, value: "telefono", isChecked: false },
    { id: 3, value: "p1", isChecked: false },
    { id: 4, value: "p2", isChecked: false },
    { id: 5, value: "p3", isChecked: false },
    { id: 6, value: "p4", isChecked: false },
    { id: 7, value: "p5", isChecked: false },
    { id: 8, value: "p6", isChecked: false },
    { id: 9, value: "firma", isChecked: false },
  ];

  handlePrivacy(p) {
    if (p === true) {
      return "si";
    } else {
      return "no";
    }
  }

  handleCheck(campo, valore) {
    console.log(this.campi[1].id);
    console.log(campo.id);
    this.campi.find((c) => c.id === campo.id).isChecked =
      campo.isChecked === true ? false : true;

    this.setState({
      campi: !this.state.campi,
    });

    //  console.log(this.state.campi);
    if (campo.isChecked) {
      console.log("check");
      console.log(valore);
      console.log(campo.id);
    } else {
      console.log("uncheck");
    }
  }

  aggiorna() {
    this.setState({ messaggioConferma: false });
  }

  async handleConferma() {
    console.log("CONFERMA");
    console.log(this.campi);
    console.log(this.props.cliente.id);
    const { data: post } = await customerMarkAsEdited(
      this.campi,
      this.props.cliente.id
    );
    console.log(post);
    console.log("Il codice cliente è: " + this.props.cliente.codice);
    //   this.handleClose();
    this.setState({ messaggioConferma: false });
  }
  handleClose = () => {
    this.setState({ messaggioConferma: false });
    console.log("CHIUSO");
    console.log("MESSAGGiO" + this.state.messaggioConferma);
    this.campi.map((campo) => (campo.isChecked = false));
  };

  handleMessaggio() {
    this.setState({ messaggioConferma: true });
    console.log("MESSAGGiO" + this.state.messaggioConferma);
  }

  handleIndietro() {
    this.setState({ messaggioConferma: false });
  }

  render() {
    const { cliente, show } = this.props;
    const { messaggioConferma } = this.state;
    switch (cliente.confermato) {
      case true:
        return (
          <div>
            <Modal show={show} onHide={this.handleClose}>
              <Modal.Header
                closeButton
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.props.hideModal();
                }}
              >
                <h4 className="conferma">ATTENZIONE.</h4>
              </Modal.Header>
              <Modal.Body>
                <p className="conferma">
                  L'anagrafica del cliente {cliente.nome} è già stata
                  confermata. Il codice univoco assegnato è {cliente.codice}
                </p>
              </Modal.Body>
            </Modal>
          </div>
        );

      case false:
        return (
          <>
            <Modal show={show} onHide={this.handleClose} className="modale">
              <Modal.Header
                closeButton
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.props.hideModal();
                }}
              >
                <Modal.Title className="conferma">{cliente.nome}</Modal.Title>
              </Modal.Header>
              {!messaggioConferma && (
                <div>
                  <Modal.Body className="modalBody2">
                    <table className="table">
                      <>
                        <tr>
                          <td className="tabMod">NAG: {cliente.nag}</td>
                        </tr>
                      </>
                      <>
                        <tr>
                          <td className="tabMod">Nome: {cliente.nome}</td>
                        </tr>
                      </>
                      <>
                        <tr>
                          <td className="tabMod">
                            Data di nascita: {cliente.dataNascita}
                          </td>
                        </tr>
                      </>
                      <>
                        <tr>
                          <td className="tabMod">
                            Telefono: {cliente.telefono}
                          </td>
                          <td className="tabMod">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="name1"
                              onChange={() =>
                                this.handleCheck(
                                  this.campi[1],
                                  cliente.telefono
                                )
                              }
                              checked={this.campi[1].isChecked}
                            />
                          </td>
                        </tr>
                      </>

                      <>
                        <tr>
                          <td className="tabMod">Email: {cliente.email}</td>
                          <td className="tabMod">
                            <input
                              className="checkbox"
                              type="checkbox"
                              onChange={() =>
                                this.handleCheck(this.campi[0], cliente.email)
                              }
                              checked={this.campi[0].isChecked}
                            />
                          </td>
                        </tr>
                      </>

                      <>
                        <tr>
                          <td className="tabMod">
                            privacy1: {this.handlePrivacy(cliente.p1)}{" "}
                          </td>
                          <td className="tabMod">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="name1"
                              onChange={() =>
                                this.handleCheck(this.campi[2], cliente.p1)
                              }
                              checked={this.campi[2].isChecked}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="tabMod">
                            privacy2: {this.handlePrivacy(cliente.p2)}{" "}
                          </td>
                          <td className="tabMod">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="name1"
                              onChange={() =>
                                this.handleCheck(this.campi[3], cliente.p2)
                              }
                              checked={this.campi[3].isChecked}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="tabMod">
                            privacy3: {this.handlePrivacy(cliente.p3)}{" "}
                          </td>
                          <td className="tabMod">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="name1"
                              onChange={() =>
                                this.handleCheck(this.campi[4], cliente.p3)
                              }
                              checked={this.campi[4].isChecked}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="tabMod">
                            privacy4: {this.handlePrivacy(cliente.p4)}{" "}
                          </td>
                          <td className="tabMod">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="name1"
                              onChange={() =>
                                this.handleCheck(this.campi[5], cliente.p4)
                              }
                              checked={this.campi[5].isChecked}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="tabMod">
                            privacy5: {this.handlePrivacy(cliente.p5)}{" "}
                          </td>
                          <td className="tabMod">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="name1"
                              onChange={() =>
                                this.handleCheck(this.campi[6], cliente.p5)
                              }
                              checked={this.campi[6].isChecked}
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="tabMod">
                            privacy6: {this.handlePrivacy(cliente.p6)}{" "}
                          </td>
                          <td className="tabMod">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="name1"
                              onChange={() =>
                                this.handleCheck(this.campi[7], cliente.p6)
                              }
                              checked={this.campi[7].isChecked}
                            />
                          </td>
                        </tr>
                      </>
                      <>
                        <tr className="tabMod">
                          <td className="tabMod">
                            Firma grafometrica:{" "}
                            {this.handlePrivacy(cliente.firma)}
                          </td>
                          <td className="tabMod">
                            <input
                              className="checkbox"
                              type="checkbox"
                              name="name1"
                              onChange={() =>
                                this.handleCheck(this.campi[8], cliente.firma)
                              }
                              checked={this.campi[8].isChecked}
                            />
                          </td>
                        </tr>
                      </>
                    </table>
                  </Modal.Body>
                </div>
              )}
              {!messaggioConferma && (
                <Modal.Footer>
                  <Button
                    className="bottoneModale1"
                    onClick={() => {
                      this.handleMessaggio();
                    }}
                  >
                    Conferma
                  </Button>
                </Modal.Footer>
              )}

              {messaggioConferma && (
                <div className="conferma">
                  <div className="conferma2">confermare?</div>
                  <Button
                    className="bottone2"
                    onClick={() => {
                      this.handleConferma();
                      this.props.hideModal();
                    }}
                  >
                    Conferma
                  </Button>
                  <Button
                    className="bottone3"
                    onClick={() => {
                      this.handleIndietro();
                    }}
                  >
                    Indietro
                  </Button>
                </div>
              )}
            </Modal>
          </>
        );
    }
    return null;
  }
}
export default Modals;
