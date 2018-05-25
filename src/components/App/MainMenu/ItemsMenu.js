import ConfigModal from '../../Config/ConfigModal'
import DeniDlg from 'deni-react-dialog'

class ItemsMenu {

  static getAll() {
    return [
      {
        id: 1,
        text: 'Under construction item  01',
        fn: _underConstructionMenuItemClick
      },
      {
        id: 2,
        text: 'Under construction item  02',
        fn: _underConstructionMenuItemClick
      },
      {
        id: 3,
        text: 'Under construction item  03',
        fn: _underConstructionMenuItemClick
      },
      {
        id: 4,
        text: 'Under construction item  04',
        fn: _underConstructionMenuItemClick
      },
      {
        id: 5,
        text: 'Under construction item  05',
        fn: _underConstructionMenuItemClick
      },
      {
        id: 6,
        text: 'Under construction item  06',
        fn: _underConstructionMenuItemClick,
      },
      {
        id: 7,
        text: 'Configurações',
        fn: () => {
          let configModal = new ConfigModal();
          configModal.show();
        },
        separator: true
      }
    ]
  }

}

export default ItemsMenu;

function _underConstructionMenuItemClick() {
  DeniDlg.ghost('Main menu is still under construction!', DeniDlg.Constant.MESSAGE_TYPE.INFO);
}
