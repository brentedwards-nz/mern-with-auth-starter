const avatarStyle = {
  backgroundColor: '#117e6a'
}

const textFieldStyle = {
  padding: "0px 0px 10px 0px"
}

const checkBoxLabelStyle = {
  fontSize: "12px",
}

const linkStyle = {
  fontSize: "12px",
  color: '#117e6a'
}

const paperStyle = {
  padding: 20,
  height: '45vh',
  width: 280,
  margin: "40px AUTO"
}

const authError = {
  color: 'red',
  fontSize: "12px",
}

const authMessage = {
  color: 'black',
  fontSize: "12px",
}

const loginPage = {
  paperStyle: {
    ...paperStyle
  }
}

const registerPage = {
  paperStyle: {
    ...paperStyle,
    height: '70vh',
  }
}

const protectedPage = {
  paperStyle: {
    ...paperStyle,
    height: '25vh',
  }
}

const unauthorisedPage = {
  paperStyle: {
    ...paperStyle,
    height: '20vh',
  }
}

const resetPage = {
  paperStyle: {
    ...paperStyle,
    height: '30vh',
  }
}

const showOutline = {
  outline: "#000000 solid 1px"
};

const showBackGround = {
  opacity: 0.3,
  backgroundColor: "#00ffff"
};

const showHightLight = {
  outline: "#000000 solid 1px",
  opacity: 0.3,
  backgroundColor: "#ff0000"
};

export {
  authError,
  authMessage,
  avatarStyle,
  textFieldStyle,
  checkBoxLabelStyle,
  linkStyle,
  registerPage,
  loginPage,
  protectedPage,
  unauthorisedPage,
  resetPage,
  paperStyle,
  showBackGround,
  showOutline,
  showHightLight
}