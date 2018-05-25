import React from 'react'
import './MainMenu.scss'
import ItemsMenu from './ItemsMenu'

class MainMenu extends React.Component {

  constructor(props) {
    super(props);

    this.elementId = this._generateElementId();
    this.state = {
      show: false
    }
    this.mousedownFn = () => {
      if (!this._clickedInsideElement(event.target)) {
        this.hide();
      }
    }
    document.addEventListener('mousedown', this.mousedownFn);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.mousedownFn);
  }

  _getElement() {
    return document.getElementById(this.elementId);
  }

  _isSameElement(element1, element2) {
    return ((element1.parentElement === element2.parentElement) && (element1.className === element2.className));
  }

  _clickedInsideElement(clickedElement) {
    let newClickedElement = clickedElement;
    let element = this._getElement();
    while (newClickedElement) {
      if (this._isSameElement(newClickedElement, element)) {
        return true;
      }
      newClickedElement = newClickedElement.parentElement;
    }
    return false;
  }

  _generateElementId() {
    let date = new Date();
    return 'MainMenu-' + date.getTime();
  }

  show() {
    this.props.buttonCaller.classList.add('pressed');
    this.setState({
      show: true
    })
  }

  hide() {
    this.props.buttonCaller.classList.remove('pressed');
    this.setState({
      show: false
    })
  }

  toggle() {
    if (this.state.show) {
      this.hide();
    } else {
      this.show();
    }
  }

  menuItemClick(itemMenu) {
    this.hide();
    if (itemMenu.fn) {
      setTimeout(() => {
        itemMenu.fn();
      });
    }
  }

  render() {
    return (
      <div id={ this.elementId } className="main-menu-container">
        {
          this.state.show ? (
            <div className="main-menu">
              {
                ItemsMenu.getAll().map(itemMenu => {
                  return (
                    <div key={ itemMenu.id } className={ 'main-menu-item' + (itemMenu.separator ? ' with-separator' : '') } onClick={ this.menuItemClick.bind(this, itemMenu) }>
                      {
                        itemMenu.text
                      }
                    </div>
                  )
                })
              }
            </div>
          ) : null
        }
      </div>
    )
  }

}

export default MainMenu;
