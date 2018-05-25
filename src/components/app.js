import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: '',
      numberCols: 4,
      latexData: ''
    };
  }

  onColumnsChange(numberCols) {
    this.setState({ numberCols });
  }

  onDataChange(tableData) {
    this.setState({ tableData });
  }

  convertToChunckedData(data) {
    const { numberCols } = this.state;
    let columnsLeft = numberCols;
    return data.reduce((acc, x) => {
      if (columnsLeft === 0) {
        columnsLeft = numberCols - 1;
        acc.push([x]);
      } else {
        --columnsLeft;
        acc[acc.length - 1].push(x);
      } return acc;
    }, [[]]);
  }

  convertToLatex(data) {
    let result = '';
    data.forEach(row => {
      row.forEach(value => { result += `${value} & ` });
      result = result.slice(0, -2);
      result += '\\\\ \\hline\n';
    }); return result.slice(0, -1);
  }

  onGenerateOutputTable() {
    const { tableData } = this.state;
    const splittedData = tableData.trim().split(/\s+/);
    const chunckedData = this.convertToChunckedData(splittedData);
    const latexData = this.convertToLatex(chunckedData);
    this.setState({ latexData });
  }

  renderAlignments() {
    const { numberCols } = this.state;
    [...Array(numberCols).keys()].map(key => {
      return <input key={key} />;
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar is-primary" color="blue" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a class="navbar-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/2000px-LaTeX_logo.svg.png" alt="LaTeX Table Paste" width="80" height="85"></img>
              </a>
              <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <p>LatexTablePaste</p>
              </a>
          </div>
        </nav>

          <div className="container" >
            <h2 className="app-title">LatexTablePaste</h2>
            <br />
            <p>Submit your shitty table to instantly have it for your Latex assignment!</p>

            <div class="field input-table">
              <div class="control ">
                <textarea
                  className="textarea is-primary" type="text" placeholder="Paste your table here..."
                  value={this.state.tableData} onChange={event => this.onDataChange(event.target.value)}></textarea>
              </div>
            </div>

          <div className="field">
            <div className="control">
              <input
                className="input auto-width" value={this.state.numberCols}
                onChange={event => this.onColumnsChange(event.target.value)}/>
              {this.renderAlignments()}
              <button
                className="button is-rounded is-primary"
                onClick={() => this.onGenerateOutputTable()}>Convert!
            </button>
              </div>

              <h4 className="app-title">Result</h4>
              <div className="field result-table">
                <div className="control">
                  <textarea
                    className="textarea is-primary"
                    type="text" placeholder="Latex result here..."
                    value={this.state.latexData}></textarea>
                </div>
              </div>
            </div>
          </div>
      </div>
        );
      }
    }
