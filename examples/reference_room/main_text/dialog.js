'use strict'

class Dialog {
                          
  constructor(props){
    //Rendered text
    this.dtext     = props.dtext;

    //Conditional alignment and size properties modeled after similar CSS props`
    this.position = props.position;
    this.right    = props.right;
    this.left     = props.left;
    this.top      = props.top;
    this.bottom   = props.bottom;
    this._visible = false;
  }

  //TODO: Validate and fill defaults from properties passed or not in the constructor
  create(){

  }

  //TODO: Draw code
  render(){
    //
        this._visible = true;
  }

  //TODO: Hide the dialog, but do not destroy the object. This would also be a good place to put some smooth animation code.
  hide(){
    //Do some hide animation
    this._visible = false;
  }

  get visible() {
      return this._visible;
  }

  set visible(value) {
      if (value!==true || value !==false) {
          console.log("We do not support quantum dialogs. Boolean values please.");
      }
      else if (value) {
        render();
      }
      else {
        hide();
      }
  }

  //TODO: Hide the dialog and do our best to reclam memory from this object as ES6 doesn't do garbage collection and programmers are lazy
  destroy(){

    //First hide the dialog
    hide();

      //TODO: Memory cleanup.
  }

}
