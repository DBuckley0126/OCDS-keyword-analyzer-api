const terminalDisplay = (message, err, end) => {
  console.log("//////////ERROR////////////")
  console.log(message)
  console.log(err)

  if(end){
    process.exit()
  }
}

const errorManager = {
  handleError: (err) => {
    switch(true){
      case err.code == "ENOTFOUND":
        terminalDisplay("Failed to fetch URL", err, true)
        break;
      case err.code == "LDA_FAIL":
        terminalDisplay(err.message, err, false)
      case !!err.message:
        terminalDisplay(err.message, err, true)
        break;
      default:
        terminalDisplay("Unknown Error", err, true)
    }
  },
  terminalDisplay: terminalDisplay

}

module.exports = errorManager