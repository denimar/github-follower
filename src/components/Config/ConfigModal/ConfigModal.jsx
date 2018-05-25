import { DeniReactModal, Button, Position } from 'deni-react-modal'
import React from 'react'
import './ConfigModal.scss'

class ConfigModal extends DeniReactModal {

  handleMyButtonClick(button, modalBody) {
    console.log(button)
    alert('Clicked on the myButton... see console log');
    //this.close();
  }

  getConfig() {
    return {
      title: 'Configurações do Git Follower',
      width: '650px',
      buttons: [
        Button.CANCEL,
        Button.OK
      ],
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
      <div className="config-modal-container">
        <fieldset>
          <legend>General</legend>
          <label>Field 01:</label>
          <input className="field01" type="number" min="0" step="1" value="10" autoFocus />
        </fieldset>
        <fieldset>
          <legend>Other fields</legend>
          <label>Field 02:</label>
          <input className="field02" type="text" />
        </fieldset>
        <fieldset>
          <legend>Third fieldset</legend>
          <label className="third-field">
            <input type="checkbox" checked="true" />
            Field 02 - testing checkbox
          </label>

        </fieldset>
      </div>
    )
  }

}

export default ConfigModal;
