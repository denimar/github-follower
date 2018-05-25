import { DeniReactModal, Button, Position } from '../../../src/deni-react-modal/deni-react-modal'

class MeuModal extends DeniReactModal {

  handleMyButtonClick(button, modalBody) {
    console.log(button)
    alert('Clicked on the myButton... see console log');
    //this.close();
  }

  getConfig() {
    return {
      title: 'My Modal title here',
      width: '650px',
      //height: '300px',
      buttons: [
        {
          value: 'mybutton',
          text: 'Meu Botão',
          style: {
            float: 'left'
          },
          onClick: this.handleMyButtonClick.bind(this)
        },
        Button.CANCEL,
        Button.OK
      ], //YES, NO, OK, CANCEL, CLOSE
      //position: Position.TOP_RIGHT //TOP_LEFT, TOP_CENTER, TOP_RIGHT, CENTER_LEFT, CENTER, CENTER_RIGHT, BOTTOM_LEFT, BOTTOM_CENTER, BOTTOM_RIGHT
      listeners: {
        onShow: (modalBody) => {
          console.log(modalBody);
          //alert('onshow');
        },
        onClose: (modalBody) => {
          console.log(modalBody);
          //alert('onclose');
        }
      }
    }
  }

  render() {
    return (
      <div>
        <fieldset>
          <legend>Informações do Usuário</legend>
          <label for="name">Nome:</label>
          <input type="text" name="name" autoFocus />
          <br />
          <label for="mail">E-mail:</label>
          <input type="email" name="mail" size="40" />
          <br />
          <label for="address">Endereço:</label>
          <input type="text" name="address" size="40" />
        </fieldset>
      </div>
    )
  }

}

export default MeuModal;
