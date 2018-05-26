import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: '',
      numberCols: 1,
      alignmentCols: ['c'],
      latexData: '',
      caption: '',
      label: ''
    };
  }

  onColumnsChange(numberCols) {
    let num = numberCols ? parseInt(numberCols, 10) : 0;
    if (num > 100) num = 100;
    if (num < 0) num = 0;
    this.setState({
      numberCols: num,
      alignmentCols: Array(num).fill('c')
    });
  }

  onDataChange(tableData) {
    this.setState({ tableData });
  }

  onCaptionChange(caption) {
    this.setState({ caption });
  }

  onLabelChange(label) {
    this.setState({ label });
  }

  onAlignmentChange(value, index) {
    if (value === 'c' || value === 'l' || value === 'r' || !value) {
      const { alignmentCols } = this.state;
      alignmentCols[index] = value;
      this.setState({ alignmentCols });
    }
  }


  onCopyClipboard() {
    const copyText = document.getElementById('latexInput');
    const x = document.getElementById('snackbar');
    copyText.select();
    document.execCommand('copy');
    x.className = 'show';
    setTimeout(() => {
      x.className = x.className.replace('show', '');
    }, 2900);
  }

  onGenerateOutputTable() {
    const { tableData } = this.state;
    const splittedData = tableData.trim().split(/\s+/);
    const chunckedData = this.convertToChunckedData(splittedData);
    const latexData = this.convertToLatex(chunckedData);
    this.setState({ latexData });
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
    const { caption, label, alignmentCols } = this.state;
    let result = '\\begin{table}[htp!]\n\\centering\n\\begin{tabular}{';
    result += `${alignmentCols.reduce((acc, x) => `${acc}|${x}`, '')}|`;
    result += '}\\hline\n\t';
    data.forEach(row => {
      row.forEach(value => { result += `${value} & `; });
      result = result.slice(0, -2);
      result += '\\\\ \\hline\n\t';
    });
    result = `${result.slice(0, -1)}\\end{tabular}\n`;
    return `${result}\\caption{${caption}}\n\\label{table:${label}}\n\\end{table}`;
  }

  renderAlignments() {
    const { numberCols, alignmentCols } = this.state;
    if (numberCols) {
      let i = 0;
      return alignmentCols.map(alignment => {
        const input = (
          <input
            className="input single-character is-primary"
            key={i} value={alignment}
            onChange={event => this.onAlignmentChange(event.target.value, i)}
          />
        ); ++i;
        return input;
      });
    }
  }

  render() {
    return (
      <div>
        <nav
          className="navbar is-primary" color="blue"
          role="navigation" aria-label="main navigation"
        >
          <div className="navbar-brand">
            <a className="navbar-item">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/LaTeX_logo.svg/2000px-LaTeX_logo.svg.png" alt="LaTeX Table Paste" width="80" height="85" />
            </a>
            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
            </a>
          </div>
        </nav>

        <div className="container" >
          <h2 className="app-title">LaTeX·Table·Paste</h2>
          <br />
          <p>Submit your shitty table to instantly have it for your Latex assignment!</p>

          <div className="field">
            <div className="control">
              <input
                type="number" className="input input-cols auto-width is-primary"
                value={this.state.numberCols} placeholder="#columns"
                onChange={event => this.onColumnsChange(event.target.value)}
              />
              {this.renderAlignments()}
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input
                type="text" className="input input-caption auto-width is-primary"
                placeholder="Caption" value={this.state.caption}
                onChange={event => this.onCaptionChange(event.target.value)}
              />
              <input
                type="text" className="input input-label auto-width is-primary"
                placeholder="Label" value={this.state.label}
                onChange={event => this.onLabelChange(event.target.value)}
              />
            </div>
          </div>

          <div className="field input-table">
            <div className="control ">
              <textarea
                rows="5" className="textarea is-primary" type="text"
                placeholder="Paste your table here..." value={this.state.tableData}
                onChange={event => this.onDataChange(event.target.value)}
              />
            </div>
          </div>

          <button
            className="button is-rounded is-primary"
            onClick={() => this.onGenerateOutputTable()}
          >Convert!</button>

          <h4 className="app-title">Result</h4>
          <div className="field result-table">
            <div className="control">
              <textarea
                id="latexInput" rows="8"
                className="textarea is-primary"
                type="text" placeholder="Latex result here..."
                value={this.state.latexData}
              />
            </div>
          </div>
          <button
            className="button is-rounded is-primary"
            onClick={() => this.onCopyClipboard()}
          >Copy to clipboard</button>
        </div>

        <div id="snackbar">Table copied to Clipboard.</div>
      </div>
    );
  }
}
