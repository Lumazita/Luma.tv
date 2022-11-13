import React from 'react'
export const ColorModeContext = React.createContext({
    mode:"dark",
    setMode: () => {alert("Você precisa me configurar primeiro!")}
});

const ColorModeProvider = (props) => {
    const [mode, setMode] = React.useState(props.initialMode)
  return (
    <ColorModeContext.Provider value={{ mode: mode, setMode: setMode }}>
      {props.children}
    </ColorModeContext.Provider>
    // pesquisar o que é .children
  )
}

export default ColorModeProvider
