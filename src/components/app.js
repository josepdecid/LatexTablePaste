import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: '',
      numberCols: 1,
      alignmentCols: ['c'],
      latexData: ''
    };
  }

  onColumnsChange(numberCols) {
    this.setState({
      numberCols: numberCols,
      alignmentCols: Array(numberCols).fill('c')
    });
  }

  onDataChange(tableData) {
    this.setState({ tableData });
  }

  onAlignmentChange(value, index) {
    const { alignmentCols } = this.state;
    alignmentCols[index] = value;
    this.setState({ alignmentCols });
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
    const { numberCols, alignmentCols } = this.state;
    return [...Array(numberCols).keys()].map(i => {
      return (
        <input
          className="input single-character"
          key={i} value={alignmentCols[i]}
          onChange={event => this.onAlignmentChange(event.target.value, index)}
        />
      );
    });
  }

  render() {
    const alignments = this.renderAlignments();
    return (
      <div>
        <nav className="navbar is-primary" color="blue" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <a className="navbar-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/2000px-LaTeX_logo.svg.png" alt="LaTeX Table Paste" width="80" height="85"></img>
            </a>
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
              <p>LatexTablePaste</p>
            </a>
          </div>
        </nav>

        <div className="container" >
          <h2 className="app-title">LaTeX·Table·Paste</h2>
          <br />
          <p>Submit your shitty table to instantly have it for your Latex assignment!</p>

          <div className="field input-table">
            <div className="control ">
              <textarea
                className="textarea is-primary" type="text" placeholder="Paste your table here..."
                value={this.state.tableData} onChange={event => this.onDataChange(event.target.value)}></textarea>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                type="number" className="input auto-width" value={this.state.numberCols}
                onChange={event => this.onColumnsChange(event.target.value)} />
              {alignments}
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
