import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar is-primary" color="blue" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              LatexTablePaste
            </a>
        </div>
      </nav>

      <h2 className="app-title">LatexTablePaste</h2>
      <br/>
      <p>Submit your shitty table to instantly have it for your Latex assignment!</p>

        <div class="field input-table">
          <div class="control ">
            <textarea className="textarea is-primary" type="text" placeholder="Paste your table here..."></textarea>
          </div>
        </div>

        {/* <a className="button is-rounded">Submit!</a> */}
        <div class="field">
          <div class="control">
            <button class="button is-rounded is-primary">Convert!</button>
          </div>
        </div>




        <h4 className="app-title">Result</h4>
        <div class="field result-table">
          <div class="control">
            <textarea className="textarea is-primary" type="text" placeholder="Latex result here..."></textarea>
          </div>
        </div>

      </div>
     
    );
  }
}
